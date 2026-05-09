import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Mic2
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
  { time: '10:00', type: 'drop', label: 'Confusion Spike', desc: 'Technical jargon overload' },
  { time: '20:00', type: 'peak', label: 'Peak Engagement', desc: 'Interactive live coding demo' },
];

export default function EngagementReplay() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic flex items-center gap-3">
            <History className="w-8 h-8 text-brand-primary" />
            AI Engagement Replay
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Session Timeline Analytics</p>
        </div>
        <div className="flex gap-4">
           <button className="btn-glass px-6 py-2 text-xs uppercase tracking-widest font-black">Export Intelligence</button>
           <button className="btn-nextgen px-6 py-2 text-xs uppercase tracking-widest font-black">Share Session</button>
        </div>
      </header>

      {/* Main Replay Visualization */}
      <div className="glass-panel p-10 space-y-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
           {/* Player Controls */}
           <div className="flex-1 w-full space-y-8">
              <div className="aspect-video bg-black border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent"></div>
                 <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-brand-primary/20 backdrop-blur-xl border border-brand-primary/40 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 group-hover:bg-brand-primary/40" onClick={() => setIsPlaying(!isPlaying)}>
                       {isPlaying ? <Pause className="w-8 h-8 text-brand-primary" fill="currentColor" /> : <Play className="w-8 h-8 text-brand-primary" fill="currentColor" className="ml-1" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Analyzing Signal...</span>
                 </div>
                 {/* Waveform Visualization Placeholder */}
                 <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end gap-1 px-8 pb-4 opacity-30">
                    {[...Array(40)].map((_, i) => (
                       <motion.div 
                        key={i} 
                        animate={{ height: isPlaying ? [20, 60, 30, 80, 40] : 20 }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                        className="flex-1 bg-brand-primary rounded-t-sm" 
                       />
                    ))}
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                 <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-brand-primary w-1/3 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>
                 </div>
                 <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>10:00</span>
                    <span className="text-white">30:00</span>
                 </div>
              </div>
           </div>

           {/* AI Highlights Panel */}
           <div className="w-full lg:w-96 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-brand-primary" />
                 AI Intelligence Moments
              </h3>
              <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                 {MOMENTS.map((m, i) => (
                    <div key={i} className="glass-panel p-4 border-l-2 transition-all hover:bg-white/5 cursor-pointer group" style={{ borderLeftColor: m.type === 'peak' ? '#00f2ff' : '#ff00c8' }}>
                       <div className="flex justify-between items-start mb-2">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${m.type === 'peak' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-accent/10 text-brand-accent'}`}>
                             {m.label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">{m.time}</span>
                       </div>
                       <p className="text-xs text-slate-300 font-medium">{m.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-panel p-8 h-[400px]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-sm font-black text-white uppercase tracking-widest">Engagement Velocity</h3>
               <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"></div> Engagement</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-secondary"></div> Attention</div>
               </div>
            </div>
            <div className="h-[280px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                     />
                     <ReferenceLine x="10:00" stroke="#ff00c8" strokeDasharray="3 3" label={{ value: 'DROP', position: 'insideTopLeft', fill: '#ff00c8', fontSize: 10, fontWeight: 'bold' }} />
                     <Area type="monotone" dataKey="engagement" stroke="#00f2ff" strokeWidth={3} fill="url(#colorEngage)" />
                     <Area type="monotone" dataKey="attention" stroke="#7000ff" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="glass-panel p-8 space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest italic border-b border-white/5 pb-4">Speaking Quality</h3>
            <div className="space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filler Density</p>
                     <span className="text-brand-accent text-sm font-black">12.4%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-accent w-[40%] rounded-full"></div>
                  </div>
                  <p className="text-[9px] text-brand-accent/70 font-bold uppercase">Critical: High "umm" frequency detected</p>
               </div>

               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence Score</p>
                     <span className="text-brand-primary text-sm font-black">92.0%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-primary w-[92%] rounded-full"></div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="glass-panel p-4 bg-white/5 border-none">
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 text-center">UMM</p>
                     <p className="text-xl font-black text-white text-center">42</p>
                  </div>
                  <div className="glass-panel p-4 bg-white/5 border-none">
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 text-center">LIKE</p>
                     <p className="text-xl font-black text-white text-center">18</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
