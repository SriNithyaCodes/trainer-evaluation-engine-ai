import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import axios from 'axios';

const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', speed: 'Ultra-Fast', reliability: 'High' },
  { id: 'llama-3.1-405b-reasoning', name: 'Llama 3.1 405B', speed: 'Reasoning-Deep', reliability: 'Enterprise' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', speed: 'Balanced', reliability: 'Standard' },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', speed: 'Instant', reliability: 'Lightweight' },
];

export default function AISettings() {
  const [activeModel, setActiveModel] = useState('');
  const [stats, setStats] = useState<any>(null);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/ai/settings');
      setActiveModel(res.data.active_model);
      const statsRes = await axios.get('http://localhost:8000/ai/stats');
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleModelChange = async (modelId: string) => {
    try {
      await axios.post(`http://localhost:8000/ai/settings/model?model_name=${modelId}`);
      setActiveModel(modelId);
      fetchSettings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10 p-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black text-black tracking-tight uppercase italic mb-2">NEURAL CONFIGURATION</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">MANAGE GLOBAL AI INTELLIGENCE MODELS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'INTELLIGENCE MODEL', val: activeModel.split('-')[0].toUpperCase(), icon: Cpu },
          { label: 'TOKENS PROCESSED', val: stats?.tokens_processed || 0, icon: Zap },
          { label: 'LATENCY (AVG)', val: `${Math.round(stats?.avg_response_ms || 0)}ms`, icon: Activity },
          { label: 'AUTONOMOUS ACTIONS', val: stats?.total_autonomous_actions || 0, icon: ShieldCheck },
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 group hover:bg-black hover:border-black transition-all duration-500">
            <stat.icon className="w-6 h-6 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-500">{stat.label}</p>
            <p className="text-2xl font-black text-black group-hover:text-white transition-colors tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Model Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Available Neural Models</h3>
          {MODELS.map((model) => (
            <motion.button
              key={model.id}
              onClick={() => handleModelChange(model.id)}
              whileHover={{ x: 10 }}
              className={`w-full p-6 rounded-[24px] flex items-center justify-between border transition-all ${
                activeModel === model.id 
                ? 'bg-black border-black text-white shadow-xl shadow-black/20' 
                : 'bg-white border-slate-100 text-black hover:border-brand-primary/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${activeModel === model.id ? 'bg-white/10' : 'bg-slate-50'}`}>
                  <Cpu className={`w-5 h-5 ${activeModel === model.id ? 'text-brand-primary' : 'text-slate-400'}`} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black uppercase tracking-tight">{model.name}</p>
                  <p className={`text-[10px] font-medium ${activeModel === model.id ? 'text-slate-400' : 'text-slate-500'}`}>
                    {model.speed} • {model.reliability} Reliability
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${activeModel === model.id ? 'text-brand-primary' : 'text-slate-200'}`} />
            </motion.button>
          ))}
        </div>

        <div className="bg-brand-primary/5 rounded-[40px] p-12 flex flex-col items-center justify-center text-center border border-brand-primary/10">
           <div className="w-20 h-20 bg-white rounded-[24px] shadow-xl flex items-center justify-center mb-8">
              <ShieldCheck className="w-10 h-10 text-brand-primary" />
           </div>
           <h3 className="text-xl font-black text-black uppercase tracking-tight italic mb-4">Autonomous Safety Shield</h3>
           <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-sm">
              Model switching is monitored by the Automation Decision Agent. Model changes propagate across all 10 autonomous agents within 500ms.
           </p>
        </div>
      </div>
    </div>
  );
}
