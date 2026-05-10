import React, { useState, useEffect } from 'react';
import {
  Users,
  Video,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Brain,
  Shield,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'motion/react';
import { getDashboardStats } from '../services/api';

const StatCard = ({ icon: Icon, label, value, trend, loading, colorClass }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex justify-between items-start mb-8 relative z-10">
      <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
        <Icon className={`w-7 h-7 ${colorClass}`} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-brand-primary bg-brand-primary/5 px-4 py-1.5 rounded-full border border-brand-primary/10">
        <ArrowUpRight className="w-4 h-4" />
        {trend}%
      </div>
    </div>
    
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">{label}</p>
    {loading ? (
      <div className="h-10 w-32 bg-slate-50 animate-pulse rounded-xl mt-1 relative z-10"></div>
    ) : (
      <h3 className="text-4xl font-black text-slate-900 mt-1 tracking-tighter relative z-10">{value}</h3>
    )}
  </motion.div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { 
      icon: Users, 
      label: 'TOTAL TRAINERS', 
      value: stats?.total_trainers || 0, 
      trend: 12, 
      colorClass: 'text-brand-primary' 
    },
    { 
      icon: Video, 
      label: 'SESSIONS ANALYZED', 
      value: stats?.total_sessions || 0, 
      trend: 24, 
      colorClass: 'text-brand-secondary' 
    },
    { 
      icon: TrendingUp, 
      label: 'AVG ENGAGEMENT', 
      value: `${stats?.avg_engagement || 0}%`, 
      trend: 8, 
      colorClass: 'text-brand-accent' 
    },
    { 
      icon: Brain, 
      label: 'AI INSIGHTS', 
      value: stats?.ai_insights_count || 0, 
      trend: 15, 
      colorClass: 'text-slate-900' 
    },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white min-h-screen p-8 font-poppins text-slate-900 relative">
      {/* Premium Hero Section */}
      <section className="relative p-12 rounded-[56px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-50" />
        <div className="scan-line" />
        
        <div className="relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-sm"
          >
             <Zap className="w-3 h-3 animate-pulse" />
             System Operational
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.9] uppercase italic ai-glow-text"
          >
            Command <span className="text-brand-primary">Center</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed border-l-2 border-slate-100 pl-8"
          >
            Welcome to the TrainerIQ X core orchestration layer. All autonomous systems are initialized and standing by for neural analysis.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex gap-4 pt-4"
          >
            <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <Shield className="w-4 h-4 text-brand-primary" />
              <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Encrypted Session</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <Activity className="w-4 h-4 text-brand-secondary" />
              <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Live Pulse Active</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative Orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] rounded-full -mr-64 -mt-64 animate-orb" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {statItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard {...item} loading={loading} />
          </motion.div>
        ))}
      </div>

      {/* Visual Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-12 rounded-[56px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/30 h-[450px] flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.02)_0%,transparent_70%)]" />
          <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-8 shadow-inner">
             <LayoutDashboard className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">Neural Activity Map</h3>
          <p className="text-slate-400 text-lg max-w-md font-medium">Real-time visualization of trainer performance clusters across the organization.</p>
          <div className="mt-12 flex gap-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`w-10 h-${i*4} bg-brand-primary/10 rounded-full animate-pulse border border-brand-primary/5`} style={{ animationDelay: `${i*0.2}s` }} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-12 rounded-[56px] bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-2xl shadow-slate-200/30 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/5 border border-brand-accent/10 text-brand-accent text-[9px] font-black uppercase tracking-widest mb-6">
               Hot Update
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">AI Recommendation</h3>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              System suggests prioritizing <span className="text-slate-900 font-bold">"Java + DSA"</span> evaluations due to high batch volume and rising requirement complexity.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 mt-10 shadow-lg shadow-slate-100/50">
            <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4">Priority Agent</div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                 <Brain className="text-brand-primary w-6 h-6" />
               </div>
               <div>
                  <div className="text-sm font-black italic">RequirementBot v2.4</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Autonomous Planner</div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
