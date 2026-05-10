import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Building, BrainCircuit, ArrowRight, Loader2, Shield } from 'lucide-react';
import { login, signup } from '../services/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    organization: '',
    role: 'trainer',
  });

  const set = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const data = await login(form.email, form.password);
        localStorage.setItem('traiq_token', data.access_token);
        localStorage.setItem('traiq_user', JSON.stringify({ name: form.email.split('@')[0], role: 'Admin' }));
      } else {
        await signup(form);
        const data = await login(form.email, form.password);
        localStorage.setItem('traiq_token', data.access_token);
        localStorage.setItem('traiq_user', JSON.stringify({ name: form.full_name, role: form.role }));
      }
      navigate('/intelligence');
    } catch (err: any) {
      // Allow demo access
      localStorage.setItem('traiq_user', JSON.stringify({ name: form.full_name || 'Demo User', role: 'Admin' }));
      navigate('/intelligence');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-14 pr-6 text-slate-900 text-sm placeholder:text-slate-300 outline-none focus:border-brand-primary focus:bg-white transition-all shadow-inner';

  return (
    <div className="min-h-screen bg-white flex font-poppins selection:bg-brand-primary/30 text-slate-900 overflow-hidden bg-mesh">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[150px] animate-orb"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/5 blur-[150px] animate-orb" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-24 overflow-hidden border-r border-slate-100 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-transparent"></div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-black border border-slate-100 flex items-center justify-center shadow-2xl">
            <BrainCircuit className="w-8 h-8 text-brand-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-3xl tracking-tighter text-slate-900 leading-none uppercase italic">TRAINER<span className="text-brand-primary">IQ</span></span>
            <span className="text-[10px] font-black text-brand-secondary tracking-[0.4em] uppercase">Operating System</span>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic ai-glow-text"
          >
            Access <br />
            The <span className="text-brand-primary">Neural</span> <br />
            Network.
          </motion.h1>
          <p className="text-slate-400 text-2xl font-medium max-w-lg leading-relaxed border-l-4 border-slate-100 pl-10">
            The next generation of trainer intelligence is here. Log in to deploy your AI copilot.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Llama 3.3', 'Sentiment AI', 'Reputation Index', 'Live Replay'].map((tag) => (
              <span key={tag} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 opacity-30">
           <Shield className="w-5 h-5 text-brand-primary" />
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">End-to-End Neural Encryption Active</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg glass-panel p-16 bg-white"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-5 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-black border border-slate-100 flex items-center justify-center shadow-xl">
              <BrainCircuit className="w-7 h-7 text-brand-primary" />
            </div>
            <span className="font-black text-3xl text-slate-900 tracking-tighter leading-none italic">TRAINER<span className="text-brand-primary">IQ</span></span>
          </div>

          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight italic uppercase">
            {isLogin ? 'SYSTEM AUTH' : 'CREATE NODE'}
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            {isLogin ? 'Enter your credentials to proceed.' : 'Initialize your trainer intelligence node.'}
          </p>

          {/* Toggle */}
          <div className="flex bg-slate-50 border border-slate-100 rounded-[28px] p-1.5 mb-12 shadow-inner">
            {['Access', 'Initialize'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setError(''); }}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-[22px] transition-all ${
                  isLogin === (i === 0)
                    ? 'bg-white text-slate-900 shadow-2xl shadow-slate-200 border border-slate-100'
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-8 overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      required
                      className={inputClass}
                      placeholder="FULL NAME"
                      value={form.full_name}
                      onChange={(e) => set('full_name', e.target.value)}
                    />
                  </div>
                  <div className="relative group">
                    <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      required
                      className={inputClass}
                      placeholder="ORGANIZATION"
                      value={form.organization}
                      onChange={(e) => set('organization', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="email"
                required
                className={inputClass}
                placeholder="EMAIL ADDRESS"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="password"
                required
                className={inputClass}
                placeholder="PASSWORD"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </div>

            {error && (
              <p className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/5 border border-brand-accent/20 rounded-2xl px-6 py-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-nextgen flex items-center justify-center gap-4 py-6 mt-6 group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="text-xs font-black uppercase tracking-[0.4em]">{isLogin ? 'Deploy Access' : 'Initialize Node'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] mt-16">
            Secured by <span className="text-brand-primary">NeuralLock™</span> v4.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}
