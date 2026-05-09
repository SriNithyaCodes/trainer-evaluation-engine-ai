import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Fingerprint, 
  Eye, 
  Database, 
  TrendingUp,
  Cpu,
  Workflow
} from 'lucide-react';

const AGENTS = [
  { name: 'Session Intelligence', icon: BrainCircuit, status: 'IDLE', desc: 'Analyzes communication & clarity.' },
  { name: 'Sentiment Analysis', icon: Activity, status: 'IDLE', desc: 'Maps learner emotional response.' },
  { name: 'Predictive Risk', icon: TrendingUp, status: 'IDLE', desc: 'Forecasts burnout & performance.' },
  { name: 'Trainer DNA', icon: Fingerprint, status: 'IDLE', desc: 'Evolves unique trainer profile.' },
  { name: 'Live Co-Pilot', icon: Zap, status: 'ACTIVE', desc: 'Real-time coaching suggestions.' },
  { name: 'Improvement Coach', icon: Workflow, status: 'IDLE', desc: 'Generates 7-day roadmaps.' },
  { name: 'Attention Monitor', icon: Eye, status: 'IDLE', desc: 'Detects student disengagement.' },
  { name: 'Classroom Memory', icon: Database, status: 'IDLE', desc: 'Tracks long-term growth trends.' },
  { name: 'Reputation Intel', icon: ShieldCheck, status: 'IDLE', desc: 'Calculates trust & loyalty scores.' },
  { name: 'Automation Engine', icon: Cpu, status: 'ACTIVE', desc: 'Executes autonomous workflows.' },
];

export default function AgentCommandCenter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {AGENTS.map((agent, i) => (
        <motion.div
          key={agent.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -5, borderColor: 'rgba(0, 242, 255, 0.3)' }}
          className="p-6 rounded-[24px] border border-black/5 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-brand-primary/10 transition-colors">
              <agent.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'ACTIVE' ? 'bg-brand-primary animate-pulse' : 'bg-slate-200'}`} />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{agent.status}</span>
            </div>
          </div>
          
          <h3 className="text-[10px] font-black text-black uppercase tracking-widest mb-2">{agent.name}</h3>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{agent.desc}</p>
          
          {agent.status === 'ACTIVE' && (
            <div className="mt-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1/2 h-full bg-brand-primary/40"
                     />
                  </div>
                  <span className="text-[8px] font-black text-brand-primary">PROCESSING</span>
               </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
