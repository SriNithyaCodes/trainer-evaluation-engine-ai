import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Zap, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  BarChart3,
  MessageSquare,
  Sparkles,
  Search,
  Signal
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';

import { getDashboardStats } from '../services/api';

const radarData = [
  { subject: 'Comm', A: 120, fullMark: 150 },
  { subject: 'Story', A: 98, fullMark: 150 },
  { subject: 'Clarity', A: 86, fullMark: 150 },
  { subject: 'Interact', A: 99, fullMark: 150 },
  { subject: 'Confid', A: 85, fullMark: 150 },
];

const areaData = [
  { time: '0', val: 40 },
  { time: '1', val: 60 },
  { time: '2', val: 45 },
  { time: '3', val: 80 },
  { time: '4', val: 70 },
  { time: '5', val: 95 },
  { time: '6', val: 85 },
];

const FEED_ITEMS = [
  "✓ Detecting engagement spikes",
  "✓ Trainer pacing optimized",
  "✓ Attention level stable",
  "✓ AI Co-Pilot active",
  "✓ Emotional sentiment analyzed",
];

const ALERTS = [
  { text: "AI Suggestion: Add interactive example", color: "brand-primary" },
  { text: "Attention drop detected", color: "brand-accent" },
  { text: "Energy level excellent", color: "brand-secondary" },
];

export default function IntelligencePreview() {
  const [stats, setStats] = useState<any>(null);
  const [engagement, setEngagement] = useState(91);
  const [activeMetric, setActiveMetric] = useState('Engagement');
  const [chartData, setChartData] = useState(areaData);
  const [feed, setFeed] = useState<string[]>(FEED_ITEMS);
  const [alerts, setAlerts] = useState<any[]>(ALERTS);
  const [alertIndex, setAlertIndex] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        if (data.avg_engagement) {
          setEngagement(data.avg_engagement);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();

    // Fluctuations for visual effect
    const interval = setInterval(() => {
      setEngagement(prev => Math.min(100, Math.max(80, prev + (Math.random() * 4 - 2))));
    }, 3000);

    // Real-time WebSockets connection to AI Backend
    const ws = new WebSocket('ws://localhost:8000/ws/coaching');
    ws.onopen = () => console.log("Connected to AI Coaching Engine WS");
    
    ws.onmessage = (event) => {
      const text = event.data;
      const colors = ['brand-primary', 'brand-accent', 'brand-secondary'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setAlerts(prev => [{ text, color: randomColor }, ...prev].slice(0, 10));
      setAlertIndex(0); // Show the latest alert

      setFeed(prev => {
        // Just extract the core message if it starts with "AI Suggestion:"
        const cleanText = text.replace('AI Suggestion: ', '');
        return [`⚡ ${cleanText}`, ...prev].slice(0, 5);
      });
    };

    // Fallback rotation just in case WS is silent
    const alertInterval = setInterval(() => {
      setAlertIndex(prev => (prev + 1) % alerts.length);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearInterval(alertInterval);
      ws.close();
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto group">
      {/* Container with Glassmorphism & Neon Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/30 via-brand-secondary/30 to-brand-accent/30 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative aspect-video lg:aspect-[21/9] rounded-[32px] border border-white/10 bg-black/60 backdrop-blur-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row p-8 lg:p-12 gap-12">
        
        {/* Futuristic Background Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="scan-line opacity-20"></div>
          {/* Neural Particles / Light Streaks */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 1200, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i, delay: i * 2, ease: "linear" }}
              className="absolute h-[1px] w-64 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"
              style={{ top: `${20 * i}%` }}
            />
          ))}
        </div>

        {/* LEFT SIDE: AI Visualizations */}
        <div className="relative flex-1 flex flex-col gap-8 z-10">
          {/* Central AI Orb */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
              {/* Outer Rotating Rings */}
              <div className="absolute inset-0 border border-dashed border-brand-primary/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-dashed border-brand-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-8 border border-white/5 rounded-full animate-pulse"></div>
              
              {/* The Core Orb */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center justify-center group/orb overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 blur-2xl animate-orb"></div>
                <BrainCircuit className="w-16 h-16 text-brand-primary relative z-10 group-hover/orb:scale-110 transition-transform duration-700" />
                
                {/* Neural Activity Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                        x: [0, Math.cos(i) * 30, 0],
                        y: [0, Math.sin(i) * 30, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-primary"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary animate-pulse">Neural Engine Active</span>
               <div className="flex gap-1 mt-2">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-1 h-1 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>
                 ))}
               </div>
            </div>
          </div>

          {/* Engagement Graph + Waveform */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{activeMetric} Trend</span>
                <div className="px-3 py-1 rounded-full bg-white/10 text-[8px] font-bold text-white uppercase">Live Sync</div>
             </div>
             <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="heroEngage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#00f2ff" 
                        strokeWidth={2} 
                        fill="url(#heroEngage)" 
                        animationDuration={2000}
                      />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                   <Signal className="w-3 h-3 text-brand-primary" />
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Signal Integrity 99.8%</span>
                </div>
                <div className="flex gap-1">
                   {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, Math.random() * 12 + 4, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                        className="w-[1px] bg-brand-primary/40"
                      />
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: Intelligence Matrix */}
        <div className="relative flex-1 flex flex-col gap-6 z-10">
          {/* AI Intelligence Cards */}
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: 'Clarity', val: 94, color: '#00f2ff', icon: CheckCircle2 },
               { label: 'Engagement', val: 91, color: '#ff00c8', icon: Activity },
               { label: 'Confidence', val: 88, color: '#7000ff', icon: Zap },
               { label: 'Energy', val: 'High', color: '#00f2ff', icon: Sparkles },
             ].map((card, i) => (
               <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => {
                  setActiveMetric(card.label);
                  setChartData(Array.from({ length: 7 }).map((_, idx) => ({
                    time: idx.toString(),
                    val: Math.floor(Math.random() * 30) + 70
                  })));
                  setAlerts(prev => [{ text: `Analyzing detailed ${card.label} patterns...`, color: 'brand-primary' }, ...prev].slice(0, 10));
                  setAlertIndex(0);
                }}
                className={`glass-panel p-4 flex flex-col gap-2 group/card border-white/5 hover:border-white/20 transition-all cursor-pointer overflow-hidden relative ${activeMetric === card.label ? 'ring-2 ring-white/20 bg-white/10' : ''}`}
               >
                 <div className="absolute -right-2 -bottom-2 opacity-5 group-hover/card:opacity-10 transition-opacity">
                    <card.icon className="w-12 h-12" style={{ color: card.color }} />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{card.label}</span>
                    <card.icon className="w-3 h-3" style={{ color: card.color }} />
                 </div>
                 <div className="text-xl lg:text-2xl font-black text-white tracking-tighter">
                   {typeof card.val === 'number' ? (
                     <span className="flex items-baseline">
                        {card.val}<span className="text-[10px] text-slate-500 ml-0.5">%</span>
                     </span>
                   ) : card.val}
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: typeof card.val === 'number' ? `${card.val}%` : '90%' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                 </div>
               </motion.div>
             ))}
          </div>

          {/* Live Feed + DNA Radar Row */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
             {/* Live AI Feed */}
             <div className="flex-1 glass-panel p-6 bg-white/5 border-none flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/10 blur-2xl rounded-full"></div>
                <h3 className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></div>
                  AI Co-Pilot Feedback
                </h3>
                 <div className="space-y-3 flex-1">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={feed[0]} // re-animate on new item
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs font-bold text-slate-300 flex items-center gap-2"
                      >
                         <span className="text-brand-primary"></span> {feed[0]}
                      </motion.div>
                   </AnimatePresence>
                   <div className="space-y-1 opacity-40">
                      {feed.slice(1, 4).map((item, i) => (
                        <div key={i} className="text-[10px] font-medium text-slate-500">{item}</div>
                      ))}
                   </div>
                </div>
                {/* Typing Indicator */}
                <div className="flex gap-1 mt-4">
                   <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce"></div>
                   <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>

             {/* Trainer DNA Radar */}
             <div className="w-full lg:w-48 glass-panel p-4 bg-white/5 border-none flex items-center justify-center">
                <ResponsiveContainer width="100%" height={140}>
                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#ffffff05" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 'bold' }} />
                      <Radar
                         name="DNA"
                         dataKey="A"
                         stroke="#00f2ff"
                         fill="#00f2ff"
                         fillOpacity={0.3}
                      />
                   </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Floating AI Alerts */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 pointer-events-none">
             <AnimatePresence mode="wait">
               {alerts.length > 0 && (
                 <motion.div
                   key={alerts[alertIndex].text + alertIndex}
                   initial={{ opacity: 0, x: 20, scale: 0.9 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, x: -20, scale: 0.9 }}
                   className={`p-4 rounded-2xl glass-panel border-${alerts[alertIndex].color}/30 bg-${alerts[alertIndex].color}/10 backdrop-blur-xl w-64 shadow-2xl`}
                 >
                    <div className="flex gap-3 items-center">
                       <div className={`w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10`}>
                          <AlertCircle className={`w-4 h-4 text-${alerts[alertIndex].color}`} />
                       </div>
                       <p className="text-[10px] font-black text-white uppercase tracking-tight leading-tight">
                          {alerts[alertIndex].text}
                       </p>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Hero Text Overlays (Floating) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
           <div className="px-6 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 whitespace-nowrap">
              AI OPERATING SYSTEM FOR HUMAN TRAINERS
           </div>
        </div>

        {/* BOTTOM METRICS BAR */}
        <div className="absolute bottom-0 inset-x-0 h-16 border-t border-white/5 bg-white/5 flex items-center justify-around px-8 z-20 backdrop-blur-md">
           {[
             { label: 'Active Trainers', val: stats?.total_trainers || '...' },
             { label: 'Sessions Analyzed', val: stats?.total_sessions || '...' },
             { label: 'Engagement Accuracy', val: `${stats?.avg_engagement || '...'}` },
             { label: 'AI Co-Pilot Status', val: 'Running', color: 'text-brand-primary' },
           ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                <span className={`text-sm font-black text-white tracking-tighter ${stat.color || ''}`}>{stat.val}</span>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
