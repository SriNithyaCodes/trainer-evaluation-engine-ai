import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Loader2
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import { getReputation } from '../services/api';

const BADGES = [
  { id: 1, name: 'Communication Expert', icon: UserCheck, color: '#00f2ff' },
  { id: 2, name: 'Engagement Master', icon: Zap, color: '#ff00c8' },
  { id: 3, name: 'Loyalty Builder', icon: Heart, color: '#7000ff' },
  { id: 4, name: 'Session Specialist', icon: Target, color: '#00f2ff' },
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
    <div className="h-[600px] flex items-center justify-center">
       <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
    </div>
  );

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-primary" />
            Trainer Reputation Engine
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">AI Trust & Loyalty Index</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 glass-panel border-brand-primary/20">
           <Trophy className="w-5 h-5 text-brand-primary" />
           <span className="text-sm font-black text-white uppercase tracking-widest">Global Rank: #12</span>
        </div>
      </header>

      {/* Trust Score Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 glass-panel p-10 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 blur-3xl rounded-full"></div>
            <div className="relative">
               <svg className="w-48 h-48">
                  <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 502 }}
                    animate={{ strokeDashoffset: 502 - (502 * (data?.trust_score / 100)) }}
                    className="text-brand-primary" 
                    strokeWidth="8" 
                    strokeDasharray="502" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="80" cx="96" cy="96" 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-white tracking-tighter">{data?.trust_score}</span>
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">Trust Score</span>
               </div>
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-black text-white tracking-tight">Elite Reputation</h3>
               <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Your communication clarity and learner loyalty index are in the top 1% globally.
               </p>
            </div>
         </div>

         <div className="lg:col-span-2 glass-panel p-10">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Reputation Matrix</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-brand-primary"></div> AI Target
                  </div>
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                     <PolarGrid stroke="#ffffff10" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                     <Radar
                        name="Trainer"
                        dataKey="A"
                        stroke="#00f2ff"
                        fill="#00f2ff"
                        fillOpacity={0.4}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Achievement System */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {BADGES.map((badge) => (
            <motion.div 
               key={badge.id}
               whileHover={{ scale: 1.05 }}
               className="glass-panel p-6 flex flex-col items-center text-center space-y-4 group"
            >
               <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-brand-primary/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <badge.icon className="w-8 h-8 relative z-10 transition-transform group-hover:rotate-12" style={{ color: badge.color }} />
               </div>
               <h4 className="text-xs font-black text-white uppercase tracking-widest">{badge.name}</h4>
               <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <Star className="w-3 h-3 text-white/20 fill-current" />
               </div>
            </motion.div>
         ))}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Learner Loyalty', val: `${data?.metrics.loyalty}%`, icon: Heart, color: '#ff00c8' },
            { label: 'Consistency', val: data?.metrics.consistency > 80 ? 'High' : 'Stable', icon: Award, color: '#00f2ff' },
            { label: 'Growth Velocity', val: `+${data?.metrics.growth}%`, icon: TrendingUp, color: '#7000ff' },
            { label: 'Certifications', val: '12', icon: ShieldCheck, color: '#00f2ff' },
         ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white tracking-tighter">{stat.val}</p>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}

