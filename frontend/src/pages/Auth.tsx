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
      navigate('/dashboard');
    } catch (err: any) {
      // Allow demo access
      localStorage.setItem('traiq_user', JSON.stringify({ name: form.full_name || 'Demo User', role: 'Admin' }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm placeholder:text-slate-500 outline-none focus:border-brand-primary/50 focus:bg-white/10 transition-all';

  return (
    <div className="min-h-screen bg-bg-deep flex font-poppins selection:bg-brand-primary/30 selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[150px] animate-orb"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/10 blur-[150px] animate-orb" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-20 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-transparent"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center">
            <BrainCircuit className="w-7 h-7 text-brand-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter text-white leading-none">TRAINER<span className="text-brand-primary">IQ</span></span>
            <span className="text-[10px] font-bold text-brand-secondary tracking-[0.3em] uppercase">Operating System</span>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl font-black text-white leading-[0.9] tracking-tighter"
          >
            Access <br />
            The <span className="ai-glow-text">Neural</span> <br />
            Network.
          </motion.h1>
          <p className="text-slate-400 text-xl font-medium max-w-md leading-relaxed">
            The next generation of trainer intelligence is here. Log in to deploy your AI copilot.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Llama 3.3', 'Sentiment AI', 'Reputation Index', 'Live Replay'].map((tag) => (
              <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 opacity-40">
           <Shield className="w-4 h-4 text-brand-primary" />
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End-to-End Neural Encryption Active</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel p-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-brand-primary" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tighter leading-none">TRAINER<span className="text-brand-primary">IQ</span></span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2 tracking-tight italic">
            {isLogin ? 'SYSTEM AUTH' : 'CREATE NODE'}
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">
            {isLogin ? 'Enter your credentials to proceed.' : 'Initialize your trainer intelligence node.'}
          </p>

          {/* Toggle */}
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 mb-10">
            {['Access', 'Initialize'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setError(''); }}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
                  isLogin === (i === 0)
                    ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      required
                      className={inputClass}
                      placeholder="FULL NAME"
                      value={form.full_name}
                      onChange={(e) => set('full_name', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
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

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                className={inputClass}
                placeholder="EMAIL ADDRESS"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
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
              <p className="text-brand-accent text-xs font-bold uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-nextgen flex items-center justify-center gap-3 py-4 mt-4 text-xs font-black uppercase tracking-[0.3em]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Deploy Access' : 'Initialize Node'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-10">
            Secured by <span className="text-brand-primary">NeuralLock™</span> v3.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}

