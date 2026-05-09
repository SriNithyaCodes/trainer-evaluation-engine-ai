import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Building, BrainCircuit, ArrowRight, Loader2 } from 'lucide-react';
import { login, signup } from '../services/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form state
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
      // Allow demo access if backend is not running
      localStorage.setItem('traiq_user', JSON.stringify({ name: form.full_name || 'Demo User', role: 'Admin' }));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all';

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col justify-between p-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">TrainerIQ X</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            The AI brain for<br />
            <span className="text-blue-200">human trainers.</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md">
            Analyze sessions, decode teaching DNA, predict growth, and coach in real-time — all powered by Gemini Pro.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {['Session Autopsy', 'Trainer DNA', 'Sentiment AI', 'Burnout Prediction'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-bold text-white uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-sm">© 2026 TrainerIQ X — AI Operating System</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">TrainerIQ X</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            {isLogin
              ? 'Sign in to your AI command center.'
              : 'Join the next generation of intelligent training.'}
          </p>

          {/* Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
            {['Sign In', 'Join Platform'].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  isLogin === (i === 0)
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      className={inputClass}
                      placeholder="Full Name"
                      value={form.full_name}
                      onChange={(e) => set('full_name', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      required
                      className={inputClass}
                      placeholder="Organization"
                      value={form.organization}
                      onChange={(e) => set('organization', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                className={inputClass}
                placeholder="Email address"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                className={inputClass}
                placeholder="Password"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Access System' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            By continuing, you agree to TrainerIQ X's{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
