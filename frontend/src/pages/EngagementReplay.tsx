import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Zap, 
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Mic2,
  Activity,
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { time: '0:00', engagement: 80, attention: 90 },
  { time: '5:00', engagement: 85, attention: 88 },
  { time: '10:00', engagement: 40, attention: 35 }, // Spike Drop
  { time: '15:00', engagement: 60, attention: 70 },
  { time: '20:00', engagement: 95, attention: 98 }, // Spike Peak
  { time: '25:00', engagement: 75, attention: 80 },
  { time: '30:00', engagement: 88, attention: 90 },
];

const MOMENTS = [
  { time: '10:00', type: 'drop', label: 'Confusion Spike', desc: 'Technical jargon overload during recursion explanation.' },
  { time: '20:00', type: 'peak', label: 'Peak Engagement', desc: 'Interactive live coding demo of binary tree traversal.' },
  { time: '25:40', type: 'peak', label: 'Dynamic Q&A', desc: 'High energy response to student scenario prompt.' },
];

export default function EngagementReplay() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-8 pb-20 font-sans text-slate-900 bg-mesh min-h-screen p-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-end">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <History className="text-brand-primary w-5 h-5" />
            </div>
            <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Temporal Intelligence</span>
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] text-slate-900 uppercase italic ai-glow-text">
            Engagement <span className="text-brand-primary">Replay</span>.
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Session Timeline Analytics & Neural Signal Reconstruction.</p>
        </div>
        <div className="flex gap-4 pt-4">
           <button className="btn-glass px-10 py-4 text-[10px] uppercase tracking-widest font-black shadow-xl shadow-slate-100">Export Intelligence</button>
           <button className="btn-nextgen px-10 py-4 text-[10px] uppercase tracking-widest font-black">Share Session</button>
        </div>
      </header>

      {/* Main Replay Visualization */}
      <div className="glass-panel p-10 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
        <div className="scan-line opacity-20" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
           {/* Player Controls */}
           <div className="lg:col-span-8 space-y-12">
              <div className="aspect-video bg-slate-50 border border-slate-100 rounded-[48px] relative overflow-hidden flex items-center justify-center group shadow-2xl shadow-slate-200">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent"></div>
                 
                 <div className="relative z-10 flex flex-col items-center gap-8">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileActive={{ scale: 0.95 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-28 h-28 rounded-full bg-white border border-slate-100 flex items-center justify-center cursor-pointer transition-all hover:border-brand-primary/50 shadow-2xl shadow-slate-200"
                    >
                       {isPlaying ? <Pause className="w-10 h-10 text-brand-primary" fill="currentColor" /> : <Play className="w-10 h-10 text-brand-primary ml-1" fill="currentColor" />}
                    </motion.div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-secondary animate-pulse">Analyzing Neural Signal...</span>
                 </div>

                 {/* Waveform Visualization Placeholder */}
                 <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end gap-1.5 px-16 pb-10 opacity-40">
                    {[...Array(50)].map((_, i) => (
                       <motion.div 
                        key={i} 
                        animate={{ height: isPlaying ? [20, 80, 30, 100, 40] : 20 }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.04 }}
                        className="flex-1 bg-brand-primary rounded-full shadow-inner" 
                       />
                    ))}
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-8">
                 <div className="relative h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "33%" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-lg shadow-brand-primary/20" 
                    />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4 text-brand-primary" />
                       <span>Current: 10:00</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-slate-900 font-black">Total: 30:00</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* AI Highlights Panel */}
           <div className="lg:col-span-4 space-y-10">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
                 <Zap className="w-5 h-5 text-brand-primary" />
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Intelligence Moments</h3>
              </div>
              
              <div className="space-y-6 overflow-y-auto max-h-[550px] pr-4 custom-scrollbar">
                 {MOMENTS.map((m, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "glass-panel p-8 border-l-4 transition-all hover:shadow-2xl hover:shadow-slate-100 cursor-pointer group bg-white",
                        m.type === 'peak' ? "border-l-brand-primary" : "border-l-brand-accent"
                      )}
                    >
                       <div className="flex justify-between items-start mb-6">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full",
                            m.type === 'peak' ? "bg-brand-primary/5 text-brand-primary border border-brand-primary/10" : "bg-brand-accent/5 text-brand-accent border border-brand-accent/10"
                          )}>
                             {m.label}
                          </span>
                          <span className="text-[10px] text-slate-300 font-black">{m.time}</span>
                       </div>
                       <p className="text-base text-slate-600 font-bold leading-relaxed italic group-hover:text-slate-900 transition-colors">"{m.desc}"</p>
                       <div className="mt-6 flex items-center gap-3 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-black uppercase tracking-widest">Jump to Moment</span>
                          <ChevronRight className="w-4 h-4" />
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Engagement Velocity Chart */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="lg:col-span-8 neon-card p-12 h-[480px] bg-white"
         >
            <div className="flex justify-between items-center mb-16">
               <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-brand-primary" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.5em]">Engagement Velocity</h3>
               </div>
               <div className="flex items-center gap-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/30"></div> Engagement</div>
                  <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-brand-secondary shadow-lg shadow-brand-secondary/30"></div> Attention</div>
               </div>
            </div>
            
            <div className="h-[320px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.15}/>
                           <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAttention" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6e00ff" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#6e00ff" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                     <XAxis dataKey="time" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}
                        itemStyle={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <ReferenceLine x="10:00" stroke="#ff00c8" strokeDasharray="5 5" label={{ value: 'DROP', position: 'insideTopLeft', fill: '#ff00c8', fontSize: 10, fontBlack: true }} />
                     <Area type="monotone" dataKey="engagement" stroke="#00e5ff" strokeWidth={5} fill="url(#colorEngage)" />
                     <Area type="monotone" dataKey="attention" stroke="#6e00ff" strokeWidth={3} fill="url(#colorAttention)" strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </motion.div>

         {/* Speaking Quality Metrics */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="lg:col-span-4 glass-panel p-12 space-y-12 bg-white"
         >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
               <Mic2 className="w-6 h-6 text-brand-accent" />
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">Speaking Quality</h3>
            </div>
            
            <div className="space-y-12">
               <div className="space-y-5">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Filler Density</p>
                     <span className="text-brand-accent text-2xl font-black italic ai-glow-text">12.4%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        className="h-full bg-brand-accent shadow-lg shadow-brand-accent/20 rounded-full" 
                     />
                  </div>
                  <div className="flex items-center gap-3 text-brand-accent/90">
                     <AlertTriangle className="w-4 h-4" />
                     <p className="text-[9px] font-black uppercase tracking-[0.2em]">High "umm" frequency detected</p>
                  </div>
               </div>

               <div className="space-y-5">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Confidence Score</p>
                     <span className="text-brand-primary text-2xl font-black italic ai-glow-text">92.0%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        className="h-full bg-brand-primary shadow-lg shadow-brand-primary/20 rounded-full" 
                     />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all shadow-inner">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-3 text-center">UMM</p>
                     <p className="text-4xl font-black text-slate-900 italic group-hover:scale-125 transition-transform">42</p>
                  </div>
                  <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all shadow-inner">
                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-3 text-center">LIKE</p>
                     <p className="text-4xl font-black text-slate-900 italic group-hover:scale-125 transition-transform">18</p>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Narrative Context Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-12 bg-gradient-to-br from-brand-secondary/5 to-white border-brand-secondary/10 shadow-2xl shadow-slate-200/40"
      >
        <div className="flex items-center gap-3 mb-10">
           <MessageSquare className="w-6 h-6 text-brand-secondary" />
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">AI Context Narrative</h3>
        </div>
        <p className="text-2xl text-slate-700 font-bold leading-relaxed italic border-l-4 border-brand-secondary/20 pl-10">
          "The session demonstrated a strong technical command, but engagement dipped significantly during the 10-minute mark due to cognitive overload. Re-establishing connection through the interactive demo at 20:00 successfully restored the neural attention bridge."
        </p>
        <div className="mt-12 flex gap-6">
           <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 text-[10px] font-black text-brand-secondary uppercase tracking-[0.3em] shadow-lg shadow-slate-100">
              Semantic Analysis: 98%
           </div>
           <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] shadow-lg shadow-slate-100">
              Pedagogical Score: 8.4/10
           </div>
        </div>
      </motion.div>
    </div>
  );
}
