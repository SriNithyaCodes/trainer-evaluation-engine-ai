import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Database, 
  Shield, 
  Globe, 
  Zap, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Meta / Groq', type: 'High Intelligence', speed: 'Ultra-Fast', active: true },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Mistral / Groq', type: 'Reasoning', speed: 'Fast', active: false },
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', provider: 'Google / Groq', type: 'Lightweight', speed: 'Instant', active: false },
];

export default function Settings() {
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpdateModel = async (id: string) => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch('/ai/settings/model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
      });
      if (response.ok) {
        setSelectedModel(id);
        setStatus("AI Model successfully reconfigured.");
      }
    } catch (error) {
      console.error("Failed to update model", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-black text-white tracking-tight italic flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-brand-primary" />
          System Settings
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Configure your AI Neural Network</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
           {[
              { label: 'Model Management', icon: Cpu, active: true },
              { label: 'Database Indexing', icon: Database, active: false },
              { label: 'Security & Keys', icon: Shield, active: false },
              { label: 'Localization', icon: Globe, active: false },
           ].map((item, i) => (
              <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                 item.active ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}>
                 <item.icon className="w-5 h-5" />
                 {item.label}
              </button>
           ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
           <div className="glass-panel p-10 space-y-10">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-white tracking-tight italic">AI Model Selector</h3>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Select the neural architecture for your trainer evaluations. High-parameter models provide deeper analysis but may have higher latency.
                 </p>
              </div>

              <div className="space-y-4">
                 {MODELS.map((model) => (
                    <div 
                       key={model.id}
                       onClick={() => handleUpdateModel(model.id)}
                       className={`p-6 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between ${
                          selectedModel === model.id 
                          ? 'bg-brand-primary/10 border-brand-primary/30' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                       }`}
                    >
                       <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                             selectedModel === model.id ? 'bg-brand-primary text-black' : 'bg-white/5 text-slate-500'
                          }`}>
                             <Cpu className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="font-black text-white tracking-tight">{model.name}</h4>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{model.provider} • {model.type}</p>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                             selectedModel === model.id ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/10 text-slate-400'
                          }`}>
                             {model.speed}
                          </span>
                          {selectedModel === model.id && <CheckCircle className="w-4 h-4 text-brand-primary" />}
                       </div>
                    </div>
                 ))}
              </div>

              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center gap-4"
                >
                   <Zap className="w-5 h-5 text-brand-primary" />
                   <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">{status}</p>
                </motion.div>
              )}

              <div className="pt-10 border-t border-white/5">
                 <div className="p-6 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex items-start gap-6">
                    <AlertCircle className="w-6 h-6 text-brand-accent flex-shrink-0" />
                    <div className="space-y-1">
                       <h4 className="text-sm font-black text-white uppercase tracking-widest">Model Latency Warning</h4>
                       <p className="text-xs text-slate-400 leading-relaxed">
                          Switching to Llama-3-70B provides enterprise-grade reasoning but requires ~2s for response generation.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
