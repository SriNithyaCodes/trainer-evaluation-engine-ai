import React, { useState, useEffect } from 'react';
import {
  Users,
  Video,
  Activity,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { getDashboardStats } from '../services/api';

const StatCard = ({ icon: Icon, label, value, trend, loading }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-lg shadow-slate-100/20 relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">
        <ArrowUpRight className="w-3 h-3" />
        {trend}%
      </div>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
    {loading ? (
      <div className="h-9 w-24 bg-slate-50 animate-pulse rounded-lg mt-1"></div>
    ) : (
      <h3 className="text-3xl font-black text-black mt-1 tracking-tighter">{value}</h3>
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

  return (
    <div className="space-y-12 pb-20">
      {/* Clean Minimal Hero */}
      <section className="relative p-12 rounded-[48px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">
             System Operational
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.9] uppercase italic">
            Command <span className="text-brand-primary">Center</span>.
          </h1>
          <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed">
            Welcome to the TrainerIQ X core orchestration layer. All autonomous systems are initialized and standing by.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
