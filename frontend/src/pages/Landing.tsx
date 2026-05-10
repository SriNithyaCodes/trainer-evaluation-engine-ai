import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  BrainCircuit, 
  ArrowRight, 
  Zap, 
  Activity, 
  TrendingUp,
  Cpu,
  Globe,
  Shield,
  Layers,
  Fingerprint,
  ChevronRight,
  Terminal,
  Sparkles,
  Play
} from "lucide-react";
import IntelligencePreview from "../components/IntelligencePreview";
import AgentCard from "../components/AgentCard";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-poppins selection:bg-brand-primary/20 text-slate-900 overflow-x-hidden bg-mesh">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 px-8 py-8">
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="max-w-7xl mx-auto glass-panel border-slate-100 bg-white/70 backdrop-blur-3xl px-10 py-5 flex items-center justify-between shadow-2xl shadow-slate-200/40 rounded-[32px]"
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-xl group-hover:bg-slate-900 transition-all duration-500"
            >
              <BrainCircuit className="w-7 h-7 text-brand-primary" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter text-slate-900 leading-none group-hover:text-brand-primary transition-colors italic uppercase">TRAINER<span className="text-brand-primary">IQ</span></span>
              <span className="text-[9px] font-black text-slate-400 tracking-[0.4em] uppercase">Operating System</span>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {['Architecture', 'Intelligence', 'Reputation', 'Pricing'].map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="relative px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all group"
              >
                <span className="relative z-10">{item}</span>
                <motion.div 
                  className="absolute inset-0 bg-slate-50 rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="nav-pill"
                />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <Link to="/auth" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">Sign In</Link>
            <Link 
              to="/auth" 
              className="relative px-8 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden group shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all"
            >
              <span className="relative z-10">Access System</span>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-20 min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Subtle background decor */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-primary/5 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-secondary/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '-4s' }}></div>
        <div className="scan-line opacity-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          
          {/* LEFT SIDE: Animation */}
          <Link to="/auth" className="block cursor-pointer order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-[500px] lg:h-[750px] w-full overflow-hidden"
            >
               <iframe 
                  src='https://my.spline.design/robotfollowcursorforlandingpage-baAtqQoGivIRaeLjdGJTL7Jp/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  className="absolute inset-0 w-full h-[calc(100%+100px)] scale-110 -translate-y-10"
               ></iframe>
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
               <div className="absolute -z-10 inset-10 bg-brand-primary/10 blur-[120px] rounded-full"></div>
            </motion.div>
          </Link>

          {/* RIGHT SIDE: Hero Text */}
          <div className="relative z-10 space-y-10 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-slate-100 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-slate-100"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse shadow-lg shadow-brand-primary/40"></div>
              Neural Network v4.0 Active
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.9] max-w-2xl italic uppercase ai-glow-text"
            >
              AI Operating <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                System
              </span> <br />
              <span className="text-slate-300 font-light not-italic">for Human Trainers.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-xl max-w-lg font-medium leading-relaxed border-l-2 border-slate-100 pl-10"
            >
              Real-time intelligence. <span className="text-slate-900 font-bold">Predictive coaching.</span> Neural behavior audits. 
              Deploy your AI copilot and master your pedagogical DNA.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8"
            >
               <Link to="/auth" className="btn-nextgen px-12 py-6 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 group">
                 <span>Initialize Node</span>
                 <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </Link>
               <div className="flex items-center gap-5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors group">
                  <div className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 shadow-xl shadow-slate-100">
                     <Play className="w-6 h-6 text-brand-primary fill-current" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.5em]">Watch System Demo</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Intelligence Preview Panel */}
      <section id="intelligence" className="pt-32 pb-16 px-8 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] opacity-50"></div>
        <div className="scan-line opacity-20" />
        
        <div className="max-w-[110rem] mx-auto relative z-10">
          <div className="text-center mb-32">
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.5em] text-brand-secondary mb-8 shadow-xl shadow-slate-100"
            >
               <Sparkles className="w-4 h-4" />
               Neural Visualization Layer
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-[-0.05em] uppercase italic ai-glow-text">
              Live Neural <span className="text-brand-primary">Monitoring</span>.
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="glass-panel border-slate-100 bg-white/70 backdrop-blur-3xl p-8 rounded-[64px] shadow-2xl shadow-slate-200/50">
              <IntelligencePreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ AUTONOMOUS AI AGENT ECOSYSTEM ━━━ */}
      <section id="architecture" className="relative py-32 px-8 overflow-hidden bg-white">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Ambient glow orbs (light mode - very subtle) */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }} />
        <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.07, 0.04] }} transition={{ repeat: Infinity, duration: 10, delay: 2 }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: 'radial-gradient(circle, #6e00ff, transparent)' }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── AI ORCHESTRATION STATUS BAR ── */}
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 p-5 rounded-[24px] border border-slate-200 bg-white shadow-xl shadow-slate-100/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div animate={{ opacity: [0.5,1,0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">AI Orchestration Status</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Neural Engine', color: '#00e5ff' },
                { label: 'Capability Mapping', color: '#6e00ff' },
                { label: 'AI Copilot', color: '#00e5ff' },
                { label: 'Sentiment Tracking', color: '#ff00c8' },
                { label: 'Predictive Engine', color: '#00e5ff' }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div animate={{ opacity: [0.4,1,0.4] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                  <span className="text-[7px] font-black uppercase tracking-widest" style={{ color: s.color }}>ONLINE</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── SECTION HEADER ── */}
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-brand-secondary text-[9px] font-black uppercase tracking-[0.6em] mb-8 shadow-sm">
              <Sparkles className="w-3 h-3" />
              System Orchestration v4.2
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-8xl font-black uppercase italic tracking-[-0.04em] leading-[0.9] mb-8 text-slate-900">
              Autonomous{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500">Intelligence</span>
              {" "}Agents.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Self-operating AI systems continuously analyzing, predicting, coaching, and optimizing trainer performance in real time.
            </motion.p>
          </div>

          {/* ── 6 AGENT CARDS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Agent 1: Session Intelligence */}
            <AgentCard index={0} agent={{
              name: "Session Intelligence", icon: BrainCircuit, status: "ANALYZING LIVE", color: "#00e5ff",
              desc: "Autonomously deconstructs trainer sessions using Llama-powered reasoning to evaluate clarity, engagement, and semantic mapping.",
              metrics: [{ label: "Clarity", val: "94%" }, { label: "Engage", val: "91%" }, { label: "Neural", val: "88%" }],
              hiddenMetrics: [{ label: "Candidates Analyzed", val: "2,847" }, { label: "AI Confidence", val: "96.4%" }, { label: "Semantic Depth", val: "L7" }, { label: "Avg Session Score", val: "89.2" }],
              visual: (
                <div className="flex items-end gap-1.5 h-full w-full">
                  {[40,65,30,80,50,70,35,90,55,75,42,68,38,85,60].map((h, i) => (
                    <motion.div key={i} animate={{ height: [`${h}%`, `${Math.min(h+30,100)}%`, `${h}%`] }} transition={{ repeat: Infinity, duration: 1.5 + i * 0.1, delay: i * 0.08 }} className="flex-1 rounded-full" style={{ background: `linear-gradient(to top, #00e5ff, #00e5ff40)`, minHeight: '8px' }} />
                  ))}
                </div>
              )
            }} />

            {/* Agent 2: Sentiment Intelligence */}
            <AgentCard index={1} agent={{
              name: "Sentiment Intelligence", icon: Activity, status: "EMOTION TRACKING ACTIVE", color: "#6e00ff",
              desc: "Tracks emotional classroom behavior in real time by detecting confusion spikes, energy peaks, and rhythmic attention shifts.",
              metrics: [{ label: "Focus", val: "78%" }, { label: "Spikes", val: "12" }, { label: "Sync", val: "91%" }],
              hiddenMetrics: [{ label: "Confusion Events", val: "3 detected" }, { label: "Energy Level", val: "HIGH" }, { label: "Engagement Sync", val: "91%" }, { label: "Mood Score", val: "Positive" }],
              visual: (
                <div className="w-full h-full flex flex-col gap-3 justify-center">
                  <div className="flex gap-2 justify-center">
                    {['😊','😐','😕','🤔','😊'].map((e,i) => (
                      <motion.div key={i} animate={{ scale: i===2 ? [1,1.3,1] : [1,1.05,1], opacity: i===2 ? [0.6,1,0.6] : [0.5,0.8,0.5] }} transition={{ repeat: Infinity, duration: 2, delay: i*0.3 }} className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: i===2 ? '#6e00ff20' : '#ffffff08', border: `1px solid ${i===2 ? '#6e00ff40' : '#ffffff10'}` }}>{e}</motion.div>
                    ))}
                  </div>
                  <motion.div className="w-full h-8 rounded-xl overflow-hidden" style={{ background: '#6e00ff10', border: '1px solid #6e00ff20' }}>
                    <motion.div animate={{ x: ['-100%','100%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} className="h-full w-1/3 rounded-xl" style={{ background: 'linear-gradient(to right, transparent, #6e00ff50, transparent)' }} />
                  </motion.div>
                </div>
              )
            }} />

            {/* Agent 3: Predictive Risk */}
            <AgentCard index={2} agent={{
              name: "Predictive Risk", icon: TrendingUp, status: "PREDICTIVE MONITORING ONLINE", color: "#ff00c8",
              desc: "Forecasts trainer burnout, engagement decline, and pedagogical risks before they manifest in performance reports.",
              metrics: [{ label: "Risk", val: "LOW" }, { label: "Growth", val: "+18%" }, { label: "Trend", val: "STABLE" }],
              hiddenMetrics: [{ label: "Burnout Probability", val: "4.2%" }, { label: "30-Day Forecast", val: "Positive" }, { label: "Risk Factors", val: "1 flagged" }, { label: "Confidence", val: "93.1%" }],
              visual: (
                <svg viewBox="0 0 120 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff00c8" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#ff00c8" stopOpacity="1"/>
                    </linearGradient>
                  </defs>
                  <motion.path d="M0 42 Q30 38, 60 25 T120 8" fill="none" stroke="url(#riskGrad)" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }} />
                  <motion.path d="M0 42 Q30 38, 60 25 T120 8 L120 50 L0 50 Z" fill="#ff00c810" initial={{ opacity: 0 }} animate={{ opacity: [0,1,1,0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }} />
                  <motion.circle animate={{ r: [3,6,3], opacity: [1,0.4,1] }} transition={{ repeat: Infinity, duration: 2 }} cx="120" cy="8" r="4" fill="#ff00c8" />
                </svg>
              )
            }} />

            {/* Agent 4: Live AI Copilot */}
            <AgentCard index={3} agent={{
              name: "Live AI Copilot", icon: Zap, status: "LIVE COACHING ACTIVE", color: "#00e5ff",
              desc: "Provides sub-second teaching suggestions during live sessions via the neural feedback loop architecture.",
              metrics: [{ label: "Latency", val: "42ms" }, { label: "Accuracy", val: "99%" }, { label: "Signals", val: "14" }],
              hiddenMetrics: [{ label: "Suggestions Fired", val: "342" }, { label: "Accepted Rate", val: "87%" }, { label: "Neural Loops", val: "Active" }, { label: "Response Time", val: "42ms" }],
              visual: (
                <div className="flex flex-col gap-2 w-full">
                  {[
                    { msg: "Interaction suggested", delay: 0, dir: 1 },
                    { msg: "Energy dropping — pause", delay: 1.2, dir: -1 },
                    { msg: "Clarify recursion example", delay: 2.4, dir: 1 }
                  ].map((n, i) => (
                    <motion.div key={i} animate={{ x: [n.dir*20, 0, 0, n.dir*20], opacity: [0,1,1,0] }} transition={{ repeat: Infinity, duration: 4, delay: n.delay, times:[0,0.1,0.8,1] }} className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest" style={{ alignSelf: n.dir===1 ? 'flex-start' : 'flex-end', background: '#00e5ff12', border: '1px solid #00e5ff25', color: '#00e5ff' }}>
                      {n.msg}
                    </motion.div>
                  ))}
                </div>
              )
            }} />

            {/* Agent 5: Trainer DNA */}
            <AgentCard index={4} agent={{
              name: "Trainer DNA", icon: Fingerprint, status: "DNA ENGINE LEARNING", color: "#6e00ff",
              desc: "Constructs evolving intelligence signatures using semantic patterns and communication behavior audits.",
              metrics: [{ label: "Story", val: "91%" }, { label: "Logic", val: "88%" }, { label: "Trust", val: "94%" }],
              hiddenMetrics: [{ label: "DNA Evolution", val: "Stage 7" }, { label: "Behavior Patterns", val: "34 mapped" }, { label: "Semantic Sig", val: "Unique" }, { label: "Adaptation Rate", val: "HIGH" }],
              visual: (
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {[1,2,3].map(r => (
                    <motion.div key={r} animate={{ rotate: r%2===0 ? -360 : 360 }} transition={{ repeat: Infinity, duration: 10+(r*4), ease: 'linear' }} className="absolute rounded-full" style={{ inset: `${r*10}px`, border: `1px ${r===1?'solid':'dashed'} #6e00ff${r===1?'60':r===2?'30':'18'}` }} />
                  ))}
                  <motion.div animate={{ opacity: [0.6,1,0.6], scale: [0.95,1.05,0.95] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <Fingerprint className="w-10 h-10" style={{ color: '#6e00ff' }} />
                  </motion.div>
                </div>
              )
            }} />

            {/* Agent 6: Requirement Bot */}
            <AgentCard index={5} agent={{
              name: "Requirement Bot", icon: Cpu, status: "PLANNING ACTIVE", color: "#00e5ff",
              desc: "Autonomously generates hiring blueprints, skill matrices, and evaluation tasks from raw requirements.",
              metrics: [{ label: "Speed", val: "3s" }, { label: "Tasks", val: "12" }, { label: "Score", val: "98%" }],
              hiddenMetrics: [{ label: "Blueprints Created", val: "1,204" }, { label: "Avg Quality", val: "98.2%" }, { label: "Domains", val: "47 active" }, { label: "AI Confidence", val: "99.1%" }],
              visual: (
                <div className="flex flex-col items-center gap-1.5 w-full scale-90">
                  {[
                    { label: 'Requirement Input', active: true },
                    { label: 'Capability Mapping', active: false },
                    { label: 'Task Generation', active: false },
                    { label: 'Blueprint Created', active: false }
                  ].map((step, i) => (
                    <React.Fragment key={i}>
                      <motion.div animate={{ borderColor: [`#00e5ff20`,`#00e5ff60`,`#00e5ff20`], backgroundColor: [`#00e5ff05`,`#00e5ff15`,`#00e5ff05`] }} transition={{ repeat: Infinity, duration: 2, delay: i*0.5 }} className="w-full py-1.5 rounded-xl flex items-center justify-center text-[8px] font-black uppercase tracking-widest text-cyan-400 border">
                        {step.label}
                      </motion.div>
                      {i < 3 && <motion.div animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.5 }} className="w-0.5 h-2 bg-cyan-400/40 rounded-full" />}
                    </React.Fragment>
                  ))}
                </div>
              )
            }} />
          </div>
        </div>
      </section>


      {/* ━━━ PREMIUM FOOTER ━━━ */}
      <footer className="relative overflow-hidden bg-slate-950 text-white font-poppins">

        {/* Top gradient separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: 'radial-gradient(circle, #00e5ff, #6e00ff)' }} />

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-10 relative z-10">

          {/* Top row: Brand + columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">

            {/* Brand column */}
            <div className="md:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-4 group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10"
                >
                  <BrainCircuit className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <span className="font-extrabold text-2xl tracking-tighter italic uppercase">
                  TRAINER<span className="text-cyan-400">IQ</span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                The autonomous AI operating system for human trainers. Built for elite talent intelligence.
              </p>
              {/* Live status indicator */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">All Systems Active</span>
              </div>
            </div>

            {/* Intelligence Modules */}
            <div className="space-y-5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Intelligence Modules</h4>
              {[
                { label: 'Requirement Intelligence', path: '/intelligence' },
                { label: 'Adaptive Friction Engine', path: '/evaluation' },
                { label: 'AI Evaluation Engine', path: '/intelligence-engine' },
                { label: 'Authenticity Forensics', path: '/authenticity-engine' },
                { label: 'Diagnostic Intelligence', path: '/diagnostic-engine' },
              ].map((item) => (
                <Link key={item.label} to={item.path}
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Platform */}
            <div className="space-y-5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Platform</h4>
              {[
                { label: 'Command Dashboard', path: '/intelligence' },
                { label: 'AI Copilot', path: '/intelligence' },
                { label: 'Trainer DNA', path: '/dna' },
                { label: 'Session Autopsy', path: '/autopsy' },
                { label: 'AI Settings', path: '/intelligence' },
              ].map((item) => (
                <Link key={item.label} to={item.path}
                  className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium group"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Built With</h4>
              {[
                { label: 'Groq — Llama 3.3 70B', color: 'text-cyan-400' },
                { label: 'FastAPI + Python 3.12', color: 'text-violet-400' },
                { label: 'React 18 + TypeScript', color: 'text-pink-400' },
                { label: 'Tailwind CSS v4', color: 'text-cyan-400' },
                { label: 'Framer Motion', color: 'text-violet-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-10" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.5em]">
              © 2026 TrainerIQ X OS · Built for Elite Human Performance
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Shield className="w-3.5 h-3.5 text-cyan-500/60" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Neural Encryption Enabled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Activity className="w-3.5 h-3.5 text-violet-500/60" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">99.9% Uptime SLA</span>
              </div>
            </div>

            <div className="flex gap-8">
              {['Architecture', 'Privacy', 'Support'].map((link) => (
                <a key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-cyan-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
