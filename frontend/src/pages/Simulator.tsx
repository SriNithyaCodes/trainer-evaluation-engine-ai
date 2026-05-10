import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Send, 
  User, 
  BrainCircuit, 
  Settings as SettingsIcon,
  MessageSquare,
  Zap,
  Frown,
  Meh,
  Smile,
  Sparkles,
  Activity,
  Brain,
  Terminal,
  Shield,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  role: 'trainer' | 'student';
  content: string;
  confusion?: number;
  engagement?: number;
}

const PERSONAS = [
  { id: 'confused', label: 'Confused Learner', icon: Frown, color: '#ff00c8' },
  { id: 'advanced', label: 'Advanced Expert', icon: Zap, color: '#00e5ff' },
  { id: 'weak', label: 'Weak Foundation', icon: Meh, color: '#6e00ff' },
  { id: 'distracted', label: 'Distracted Student', icon: Smile, color: '#64748b' },
];

export default function Simulator() {
  const [persona, setPersona] = useState('confused');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const trainerMsg: Message = { role: 'trainer', content: input };
    setMessages(prev => [...prev, trainerMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/ai/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona,
          message: input,
          context: messages.slice(-5).map(m => m.content).join('\n')
        })
      });
      const data = await response.json();
      
      const studentMsg: Message = { 
        role: 'student', 
        content: data.response,
        confusion: data.confusion_level,
        engagement: data.engagement_level
      };
      setMessages(prev => [...prev, studentMsg]);
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setLoading(false);
    }
  };

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
              <Gamepad2 className="text-brand-primary w-5 h-5" />
            </div>
            <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Neural Sandbox</span>
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] text-slate-900 uppercase italic ai-glow-text">
            Student <span className="text-brand-primary">Simulator</span>.
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Practice with virtual personas in a low-stakes pedagogical environment.</p>
        </div>
        
        <div className="flex gap-2 p-2 bg-white border border-slate-100 rounded-[32px] backdrop-blur-xl shadow-2xl shadow-slate-200/50">
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              className={cn(
                "px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all",
                persona === p.id 
                ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/30' 
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Simulator Stats */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-10 space-y-10 relative overflow-hidden bg-white"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
             <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
                <Activity className="w-5 h-5 text-brand-primary" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Real-time Metrics</h3>
             </div>
             
             <div className="space-y-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em]">
                   <span className="text-slate-300">Confusion Level</span>
                   <span className="text-brand-accent italic">{messages.findLast(m => m.role === 'student')?.confusion || 0}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${messages.findLast(m => m.role === 'student')?.confusion || 0}%` }}
                    className="h-full bg-brand-accent shadow-lg shadow-brand-accent/20" 
                   />
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em]">
                   <span className="text-slate-300">Engagement</span>
                   <span className="text-brand-primary italic">{messages.findLast(m => m.role === 'student')?.engagement || 0}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${messages.findLast(m => m.role === 'student')?.engagement || 0}%` }}
                    className="h-full bg-brand-primary shadow-lg shadow-brand-primary/20" 
                   />
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="neon-card p-10 bg-white"
          >
             <div className="flex items-center gap-3 mb-8">
                <Brain className="w-5 h-5 text-brand-secondary" />
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Coaching Agent</h4>
             </div>
             <p className="text-base text-slate-600 leading-relaxed italic font-bold">
                "The student seems confused about the 'closure' concept. Try using a physical world analogy like a 'backpack' to simplify the semantic mapping."
             </p>
             <div className="mt-10 flex items-center gap-3 text-brand-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Suggestion Active</span>
             </div>
          </motion.div>
        </div>

        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass-panel flex flex-col h-[750px] relative overflow-hidden bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent pointer-events-none" />
          <div className="scan-line opacity-10" />
          
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 relative z-10">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-[20px] bg-white border border-slate-200 flex items-center justify-center shadow-xl">
                   <Terminal className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                   <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-900">Neural Uplink Active</span>
                   <div className="flex items-center gap-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-lg shadow-brand-primary/20" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Student v4.2 Authenticated</span>
                   </div>
                </div>
             </div>
             <button className="w-12 h-12 flex items-center justify-center hover:bg-slate-50 rounded-[20px] transition-all border border-slate-200 shadow-sm text-slate-400 hover:text-slate-900">
                <SettingsIcon className="w-6 h-6" />
             </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar relative z-10"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
                 <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                    <Gamepad2 className="w-14 h-14 text-slate-400" />
                 </div>
                 <p className="text-[11px] uppercase tracking-[0.6em] font-black">Awaiting trainer neural transmission...</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn("flex", m.role === 'trainer' ? 'justify-end' : 'justify-start')}
                >
                  <div className={cn("max-w-[75%] flex gap-8", m.role === 'trainer' ? 'flex-row-reverse' : '')}>
                    <div className={cn(
                      "w-14 h-14 rounded-[24px] flex-shrink-0 flex items-center justify-center border shadow-2xl transition-transform hover:scale-110",
                      m.role === 'trainer' ? 'bg-brand-primary text-white border-brand-primary/20' : 'bg-brand-secondary text-white border-brand-secondary/20'
                    )}>
                      {m.role === 'trainer' ? <User className="w-7 h-7" /> : <BrainCircuit className="w-7 h-7" />}
                    </div>
                    <div className={cn(
                      "p-8 rounded-[40px] text-lg font-medium shadow-2xl relative transition-all",
                      m.role === 'trainer' 
                      ? 'bg-slate-900 text-white rounded-tr-none font-bold' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-slate-100'
                    )}>
                      {m.content}
                      <div className={cn(
                        "absolute top-0 w-5 h-5",
                        m.role === 'trainer' ? "-right-2.5 bg-slate-900" : "-left-2.5 bg-white border-l border-t border-slate-100"
                      )} style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] flex gap-4 shadow-xl shadow-slate-100 shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary/40 animate-bounce"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary/40 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-10 bg-slate-50/50 border-t border-slate-100 backdrop-blur-3xl relative z-10">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your pedagogical explanation..."
                className="w-full bg-white border border-slate-200 rounded-[40px] py-8 pl-10 pr-24 text-lg focus:outline-none focus:border-brand-primary focus:bg-white transition-all text-slate-900 placeholder:text-slate-300 shadow-2xl shadow-slate-100"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-brand-primary rounded-[28px] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-brand-primary/40 hover:shadow-brand-primary/60"
              >
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Send className="w-8 h-8" />}
              </button>
            </div>
            <div className="flex justify-center mt-8 gap-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
               <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-brand-primary/40" />
                  <span>Secure Transmission</span>
               </div>
               <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-brand-primary/40" />
                  <span>Latency: 42ms</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
