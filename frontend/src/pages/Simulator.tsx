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
  Smile
} from 'lucide-react';

interface Message {
  role: 'trainer' | 'student';
  content: string;
  confusion?: number;
  engagement?: number;
}

const PERSONAS = [
  { id: 'confused', label: 'Confused Learner', icon: Frown, color: '#ff00c8' },
  { id: 'advanced', label: 'Advanced Expert', icon: Zap, color: '#00f2ff' },
  { id: 'weak', label: 'Weak Foundation', icon: Meh, color: '#7000ff' },
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
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-brand-primary" />
            AI Mock Student Simulator
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Practice with virtual personas</p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                persona === p.id 
                ? 'bg-brand-primary text-black' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Simulator Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 space-y-6">
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-4">Real-time Metrics</h3>
             
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                   <span className="text-slate-400">Confusion Level</span>
                   <span className="text-brand-accent">{messages.findLast(m => m.role === 'student')?.confusion || 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${messages.findLast(m => m.role === 'student')?.confusion || 0}%` }}
                    className="h-full bg-brand-accent" 
                   />
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                   <span className="text-slate-400">Engagement</span>
                   <span className="text-brand-primary">{messages.findLast(m => m.role === 'student')?.engagement || 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${messages.findLast(m => m.role === 'student')?.engagement || 0}%` }}
                    className="h-full bg-brand-primary" 
                   />
                </div>
             </div>
          </div>

          <div className="glass-panel p-6 bg-brand-primary/5 border-brand-primary/20">
             <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="w-5 h-5 text-brand-primary" />
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Live Coaching</h4>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed italic">
                "The student seems confused about the 'closure' concept. Try using a physical world analogy like a 'backpack'."
             </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3 glass-panel flex flex-col h-[600px]">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center">
                   <MessageSquare className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Simulation Active</span>
             </div>
             <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <SettingsIcon className="w-4 h-4 text-slate-500" />
             </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                 <Gamepad2 className="w-12 h-12" />
                 <p className="text-xs uppercase tracking-widest font-black">Waiting for trainer input...</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'trainer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-4 ${m.role === 'trainer' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      m.role === 'trainer' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-secondary/20 text-brand-secondary'
                    }`}>
                      {m.role === 'trainer' ? <User className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm font-medium ${
                      m.role === 'trainer' 
                      ? 'bg-brand-primary text-black rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="bg-white/5 p-4 rounded-2xl animate-pulse flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-black/40 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your explanation or question..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm focus:outline-none focus:border-brand-primary/50 transition-all text-white"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
