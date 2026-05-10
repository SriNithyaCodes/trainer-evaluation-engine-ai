import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Trophy, 
  Heart, 
  Target, 
  Zap, 
  Star,
  Award,
  TrendingUp,
  UserCheck,
  Loader2,
  Activity,
  Sparkles,
  Crown,
  Medal,
  CheckCircle2
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar as RadarComponent,
  ResponsiveContainer
} from 'recharts';
import { getReputation } from '../services/api';
import { cn } from '../lib/utils';

const BADGES = [
  { id: 1, name: 'Communication Expert', icon: UserCheck, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
  { id: 2, name: 'Engagement Master', icon: Zap, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  { id: 3, name: 'Loyalty Builder', icon: Heart, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
  { id: 4, name: 'Session Specialist', icon: Target, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
];

export default function ReputationEngine() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch for trainer ID 1 as default for demo
        const resp = await getReputation(1);
        setData(resp);
      } catch (error) {
        console.error("Reputation fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const radarData = data ? [
    { subject: 'Consistency', A: data.metrics.consistency * 1.5, fullMark: 150 },
    { subject: 'Engagement', A: data.metrics.engagement * 1.5, fullMark: 150 },
    { subject: 'Clarity', A: data.metrics.clarity * 1.5, fullMark: 150 },
    { subject: 'Loyalty', A: data.metrics.loyalty * 1.5, fullMark: 150 },
    { subject: 'Growth', A: data.metrics.growth * 1.5, fullMark: 150 },
  ] : [];

  if (loading) return (
    <div className="h-[600px] flex flex-col items-center justify-center text-slate-900 bg-mesh min-h-screen">
       <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/20 blur-[80px] rounded-full animate-orb" />
          <Loader2 className="w-16 h-16 text-brand-primary animate-spin relative" />
       </div>
       <p className="mt-8 text-[11px] font-black uppercase tracking-[0.5em] text-brand-primary animate-pulse">Synchronizing Trust Index...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 font-sans text-slate-900 bg-mesh min-h-screen p-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-end">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <ShieldCheck className="text-brand-primary w-5 h-5" />
            </div>
            <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Social Proof Engine</span>
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] text-slate-900 uppercase italic ai-glow-text">
            Reputation <span className="text-brand-primary">Engine</span>.
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">AI Trust, Learner Loyalty Index & Achievement Taxonomy.</p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-6 px-10 py-5 bg-white border border-slate-100 rounded-[32px] shadow-2xl shadow-slate-200/40 backdrop-blur-3xl"
        >
           <Trophy className="w-8 h-8 text-brand-primary" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
              <span className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Ranked #12</span>
           </div>
        </motion.div>
      </header>

      {/* Trust Score Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-4 glass-panel p-16 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden bg-white"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
            <div className="scan-line opacity-20" />
            
            <div className="relative">
               <svg className="w-72 h-72 -rotate-90">
                  <circle className="text-slate-50" strokeWidth="14" stroke="currentColor" fill="transparent" r="110" cx="144" cy="144" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 691 }}
                    animate={{ strokeDashoffset: 691 - (691 * (data?.trust_score / 100)) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-brand-primary shadow-2xl shadow-brand-primary/20" 
                    strokeWidth="14" 
                    strokeDasharray="691" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="110" cx="144" cy="144" 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-8xl font-black text-slate-900 tracking-tighter ai-glow-text">{data?.trust_score}</span>
                  <span className="text-[11px] font-black text-brand-primary uppercase tracking-[0.5em] mt-3">Trust Score</span>
               </div>
            </div>

            <div className="space-y-6">
               <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-brand-secondary text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <Crown className="w-4 h-4" />
                  Elite Reputation
               </div>
               <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                  Your communication clarity and learner loyalty index are in the top 1% globally.
               </p>
            </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-8 neon-card p-16 relative overflow-hidden bg-white"
         >
            <div className="flex justify-between items-center mb-16">
               <div className="flex items-center gap-4">
                  <Activity className="w-6 h-6 text-brand-primary" />
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Reputation Matrix</h3>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <div className="w-3 h-3 rounded-full bg-brand-primary animate-pulse shadow-lg shadow-brand-primary/30"></div> AI Baseline Comparison
                  </div>
               </div>
            </div>
            
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                     <PolarGrid stroke="rgba(0,0,0,0.05)" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(0,0,0,0.4)', fontSize: 12, fontWeight: 900, textTransform: 'uppercase' }} />
                     <RadarComponent
                        name="Trainer"
                        dataKey="A"
                        stroke="#00e5ff"
                        fill="#00e5ff"
                        fillOpacity={0.1}
                        strokeWidth={4}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </motion.div>
      </div>

      {/* Achievement System */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {BADGES.map((badge, idx) => (
            <motion.div 
               key={badge.id}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               whileHover={{ y: -10 }}
               className="glass-panel p-12 flex flex-col items-center text-center space-y-8 group relative overflow-hidden bg-white"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
               <div className={cn("w-24 h-24 rounded-[40px] border border-slate-100 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-slate-100", badge.bg)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <badge.icon className={cn("w-12 h-12 relative z-10 transition-transform group-hover:rotate-12", badge.color)} />
               </div>
               <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">{badge.name}</h4>
               <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 shadow-inner">
                  <Star className="w-3.5 h-3.5 text-brand-primary fill-current shadow-lg shadow-brand-primary/20" />
                  <Star className="w-3.5 h-3.5 text-brand-primary fill-current shadow-lg shadow-brand-primary/20" />
                  <Star className="w-3.5 h-3.5 text-brand-primary fill-current shadow-lg shadow-brand-primary/20" />
                  <Star className="w-3.5 h-3.5 text-brand-primary fill-current shadow-lg shadow-brand-primary/20" />
                  <Star className="w-3.5 h-3.5 text-slate-200 fill-current" />
               </div>
            </motion.div>
         ))}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
         {[
            { label: 'Learner Loyalty', val: `${data?.metrics.loyalty}%`, icon: Heart, color: 'text-brand-accent', bg: 'bg-brand-accent/5' },
            { label: 'Consistency', val: data?.metrics.consistency > 80 ? 'High' : 'Stable', icon: Award, color: 'text-brand-primary', bg: 'bg-brand-primary/5' },
            { label: 'Growth Velocity', val: `+${data?.metrics.growth}%`, icon: TrendingUp, color: 'text-brand-secondary', bg: 'bg-brand-secondary/5' },
            { label: 'Certifications', val: '12', icon: ShieldCheck, color: 'text-brand-primary', bg: 'bg-brand-primary/5' },
         ].map((stat, i) => (
            <motion.div 
               key={i} 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass-panel p-10 flex items-center gap-8 group hover:bg-slate-50/50 transition-all bg-white"
            >
               <div className={cn("w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110", stat.bg)}>
                  <stat.icon className={cn("w-8 h-8", stat.color)} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] leading-none mb-3">{stat.label}</p>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter ai-glow-text italic">{stat.val}</p>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Validation Message */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-16 rounded-[64px] bg-white border border-slate-100 text-center relative overflow-hidden shadow-2xl shadow-slate-200/40"
      >
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
         <div className="flex items-center justify-center gap-4 mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-primary animate-bounce" />
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Verified Reputation DNA</h3>
         </div>
         <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            All reputation scores are cryptographically verified through the TrainerIQ neural network. Scores reflect real student outcomes, session clarity audits, and pedagogical consistency over the last 90 days.
         </p>
      </motion.div>
    </div>
  );
}
