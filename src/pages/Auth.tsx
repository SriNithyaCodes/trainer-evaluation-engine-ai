import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth({ onLogin }: { onLogin: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        email: formData.email,
        name: formData.name || formData.email.split("@")[0],
        id: "usr-" + Math.random().toString(36).substr(2, 9)
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Branding Side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-sm text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 mx-auto mb-8 shadow-2xl">
            <BrainCircuit className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight">Elevate Human Potential through AI Intelligence.</h2>
          <p className="text-blue-100 text-lg">Join 10,000+ trainers using TrainerIQ X to redefine the science of teaching.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white md:bg-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100"
        >
          <div className="mb-10">
             <Link to="/" className="flex items-center gap-2 mb-8 group w-fit">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <BrainCircuit className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <span className="font-bold text-lg text-slate-900">TrainerIQ</span>
             </Link>
             <h1 className="text-2xl font-bold text-slate-900 mb-2">
               {isLogin ? "Welcome Back" : "Create Enterprise Account"}
             </h1>
             <p className="text-slate-500 text-sm">
               {isLogin ? "Enter your credentials to access the intelligence engine." : "Start your 14-day professional trial today."}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required 
                      className="pro-input pl-12" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  className="pro-input pl-12" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required 
                  className="pro-input pl-12" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
              ) : (
                <>
                  {isLogin ? "Log In" : "Get Started"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
             <div className="flex-1 h-[1px] bg-slate-100" />
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
             <div className="flex-1 h-[1px] bg-slate-100" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600">
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                 <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                 <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                 <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                 <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
               </svg>
               Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600">
               <Github className="w-5 h-5" />
               GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-10">
            {isLogin ? "Don't have an account?" : "Already used TrainerIQ?"}
            {" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-bold hover:underline"
            >
              {isLogin ? "Sign Up Free" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
