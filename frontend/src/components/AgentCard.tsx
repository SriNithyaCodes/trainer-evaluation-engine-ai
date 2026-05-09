import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Activity, 
  TrendingUp, 
  Zap, 
  Fingerprint, 
  Cpu,
  ChevronRight
} from 'lucide-react';

interface AgentCardProps {
  agent: {
    name: string;
    icon: any;
    status: string;
    desc: string;
    metrics: { label: string, val: string }[];
    color: string;
    visual: React.ReactNode;
  };
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 opacity-0 group-hover:opacity-20 transition-opacity blur-[80px] rounded-full"
        style={{ backgroundColor: agent.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-black transition-all duration-500">
            <agent.icon className="w-7 h-7 text-slate-400 group-hover:text-brand-primary transition-all duration-500" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none mb-2">{agent.name}</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">{agent.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 relative z-10 pr-4">
        {agent.desc}
      </p>

      {/* Visual Component Area */}
      <div className="h-32 mb-10 rounded-3xl bg-slate-50/50 border border-slate-100/50 p-6 flex items-center justify-center overflow-hidden relative group-hover:bg-white transition-all">
        {agent.visual}
        
        {/* Scan line effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent skew-x-12"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 relative z-10">
        {agent.metrics.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">{m.label}</span>
            <span className="text-xs font-black text-black tracking-tight">{m.val}</span>
          </div>
        ))}
      </div>

      {/* Action reveal */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="pt-4 mt-4 border-t border-slate-50 flex items-center gap-2"
      >
        <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Neural Access Authorized</span>
        <ChevronRight className="w-3 h-3 text-brand-primary" />
      </motion.div>
    </motion.div>
  );
}
