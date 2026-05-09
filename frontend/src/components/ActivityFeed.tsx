import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Terminal } from 'lucide-react';
import axios from 'axios';

interface Activity {
  id: number;
  agent_name: string;
  status: string;
  message: string;
  created_at: string;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ai/activity');
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching AI activity:", error);
    }
  };

  useEffect(() => {
    fetchActivity();
    const interval = setInterval(fetchActivity, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/95 rounded-[32px] p-8 border border-white/10 shadow-2xl overflow-hidden h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-brand-primary" />
          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Neural Activity Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Live Stream</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-4">
        <AnimatePresence initial={false}>
          {activities.length > 0 ? activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative pl-6 border-l border-white/5 hover:border-brand-primary/40 transition-colors py-2"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">
                  {activity.agent_name}
                </span>
                <span className="text-[8px] font-medium text-slate-600 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {new Date(activity.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium group-hover:text-white transition-colors">
                <span className={`mr-2 px-1.5 py-0.5 rounded text-[8px] font-black ${
                  activity.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                  activity.status === 'ERROR' ? 'bg-red-500/20 text-red-400' :
                  'bg-brand-primary/20 text-brand-primary'
                }`}>
                  {activity.status}
                </span>
                {activity.message}
              </p>
            </motion.div>
          )) : (
            <div className="h-full flex items-center justify-center">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest animate-pulse">Waiting for neural triggers...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
