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
  ChevronRight
} from "lucide-react";
import IntelligencePreview from "../components/IntelligencePreview";
import AgentCard from "../components/AgentCard";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-poppins selection:bg-brand-primary/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 px-8 py-8">
        <div className="max-w-7xl mx-auto glass-panel border-black/5 bg-white/70 backdrop-blur-2xl px-10 py-5 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.04)] rounded-[24px]">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-2xl shadow-black/20 group-hover:shadow-brand-primary/20 transition-all duration-500"
            >
              <BrainCircuit className="w-7 h-7 text-brand-primary" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter text-black leading-none group-hover:text-brand-primary transition-colors">TRAINER<span className="text-brand-primary">IQ</span></span>
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
                className="relative px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-all group"
              >
                <span className="relative z-10">{item}</span>
                <motion.div 
                  className="absolute inset-0 bg-slate-100 rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="nav-pill"
                />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <Link to="/auth" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-black transition-colors">Sign In</Link>
            <Link 
              to="/auth" 
              className="relative px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden group shadow-xl shadow-black/10 hover:shadow-brand-primary/20 transition-all"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <span className="relative z-10">Get Access</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-20 min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Subtle background decor */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-secondary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '-4s' }}></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          
          {/* LEFT SIDE: Animation */}
          {/* LEFT SIDE: Animation */}
          <Link to="/auth" className="block cursor-pointer">
            <motion.div 
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-[500px] lg:h-[750px] w-full overflow-hidden"
            >
               <iframe 
                  src='https://my.spline.design/robotfollowcursorforlandingpage-baAtqQoGivIRaeLjdGJTL7Jp/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  className="absolute inset-0 w-full h-[calc(100%+100px)] scale-110 -translate-y-10"
               ></iframe>
               <div className="absolute -z-10 inset-10 bg-brand-primary/10 blur-[100px] rounded-full"></div>
            </motion.div>
          </Link>

          {/* RIGHT SIDE: Hero Text */}
          <div className="relative z-10 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-brand-secondary text-[10px] font-black uppercase tracking-widest shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></div>
              Neural Network v3.3 Active
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-[-0.04em] leading-[0.95] max-w-2xl italic"
            >
              AI Operating <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent drop-shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                System
              </span> <br />
              <span className="text-slate-400 font-light not-italic">for Human Trainers.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-slate-600 text-lg md:text-xl max-w-lg font-medium leading-relaxed border-l-2 border-brand-primary/20 pl-6"
            >
              Real-time intelligence. <span className="text-black font-bold">Predictive coaching.</span> Emotional analytics. 
              Deploy your neural copilot and master your teaching DNA.
            </motion.p>
            
            {/* Buttons removed as requested */}
          </div>
        </div>
      </section>

      {/* Interactive Intelligence Preview Panel */}
      <section id="intelligence" className="py-16 px-8 relative overflow-hidden bg-slate-50">
        {/* Section Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.03)_0%,transparent_70%)]"></div>
        
        <div className="max-w-[100rem] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-brand-secondary uppercase tracking-[0.5em] mb-4">Neural Visualization</h2>
            <p className="text-4xl md:text-6xl font-black text-black tracking-[-0.04em] uppercase italic">
              Live Neural <span className="text-brand-primary">Monitoring</span>
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="glass-panel border-black/5 bg-white/40 backdrop-blur-sm p-4 rounded-[40px] shadow-2xl shadow-black/5">
              <IntelligencePreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autonomous AI Agent Ecosystem */}
      <section id="architecture" className="py-48 relative z-10 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-8"
            >
              System Orchestration v4.0
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-black mb-8 tracking-[-0.05em] uppercase italic leading-none">
              Autonomous AI <br />
              <span className="text-brand-primary">Intelligence</span> Agents
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Self-operating AI systems continuously analyzing, predicting, coaching, and optimizing trainer performance in real time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Agent 1: Session Intelligence */}
            <AgentCard 
              agent={{
                name: "Session Intelligence",
                icon: BrainCircuit,
                status: "ANALYZING LIVE",
                desc: "Autonomously deconstructs trainer sessions using Groq-powered reasoning to evaluate clarity, pacing, engagement, and teaching intelligence.",
                color: "#00f2ff",
                metrics: [
                  { label: "Clarity", val: "94%" },
                  { label: "Engage", val: "91%" },
                  { label: "Confid", val: "88%" }
                ],
                visual: (
                  <div className="flex items-center gap-1.5 h-full">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [10, 40, 15, 35, 10] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                        className="w-1.5 bg-brand-primary/40 rounded-full"
                      />
                    ))}
                  </div>
                )
              }}
            />

            {/* Agent 2: Sentiment Intelligence */}
            <AgentCard 
              agent={{
                name: "Sentiment Intelligence",
                icon: Activity,
                status: "EMOTION TRACKING ACTIVE",
                desc: "Tracks emotional classroom behavior in real time by detecting confusion, excitement, frustration, and attention shifts.",
                color: "#7000ff",
                metrics: [
                  { label: "Focus", val: "78%" },
                  { label: "Spikes", val: "12" },
                  { label: "Satisfy", val: "91%" }
                ],
                visual: (
                  <div className="w-full h-full flex flex-col justify-center gap-3">
                    <div className="flex justify-between w-full">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-12 h-4 rounded-md ${i === 2 ? 'bg-red-500/20' : 'bg-brand-secondary/20'}`} />
                      ))}
                    </div>
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-full h-12 bg-gradient-to-r from-brand-secondary/20 via-red-500/10 to-brand-secondary/20 rounded-xl"
                    />
                  </div>
                )
              }}
            />

            {/* Agent 3: Predictive Risk */}
            <AgentCard 
              agent={{
                name: "Predictive Risk",
                icon: TrendingUp,
                status: "PREDICTIVE MONITORING ONLINE",
                desc: "Forecasts trainer burnout, engagement decline, and performance risks before they become critical.",
                color: "#ff00c8",
                metrics: [
                  { label: "Risk", val: "LOW" },
                  { label: "Growth", val: "+18%" },
                  { label: "Forecast", val: "STABLE" }
                ],
                visual: (
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                    <motion.path
                      d="M0 35 Q 25 35, 50 20 T 100 5"
                      fill="none"
                      stroke="#ff00c8"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                      animate={{ r: [3, 6, 3], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      cx="100" cy="5" r="3" fill="#ff00c8"
                    />
                  </svg>
                )
              }}
            />

            {/* Agent 4: Live AI Copilot */}
            <AgentCard 
              agent={{
                name: "Live AI Copilot",
                icon: Zap,
                status: "LIVE COACHING ACTIVE",
                desc: "Provides real-time teaching suggestions during live sessions using autonomous classroom intelligence.",
                color: "#ff8a00",
                metrics: [
                  { label: "Latency", val: "120ms" },
                  { label: "Accuracy", val: "99%" },
                  { label: "Suggestions", val: "14" }
                ],
                visual: (
                  <div className="flex flex-col gap-2 w-full">
                    <motion.div
                      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-[8px] font-black text-brand-primary uppercase"
                    >
                      "Speak slower - Engagement dipping"
                    </motion.div>
                    <motion.div
                      animate={{ x: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                      className="px-4 py-2 bg-brand-secondary/10 border border-brand-secondary/20 rounded-xl text-[8px] font-black text-brand-secondary uppercase self-end"
                    >
                      "Add interaction now"
                    </motion.div>
                  </div>
                )
              }}
            />

            {/* Agent 5: Trainer DNA */}
            <AgentCard 
              agent={{
                name: "Trainer DNA",
                icon: Fingerprint,
                status: "DNA ENGINE LEARNING",
                desc: "Builds evolving trainer intelligence fingerprints using communication patterns and teaching behavior analysis.",
                color: "#00f2ff",
                metrics: [
                  { label: "Story", val: "91%" },
                  { label: "Interact", val: "88%" },
                  { label: "Confid", val: "94%" }
                ],
                visual: (
                  <div className="relative w-24 h-24">
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-brand-primary/30 rounded-full"
                     />
                     <div className="absolute inset-4 border border-brand-primary/10 rounded-full flex items-center justify-center">
                        <Fingerprint className="w-8 h-8 text-brand-primary animate-pulse" />
                     </div>
                  </div>
                )
              }}
            />

            {/* Agent 6: Automation Decision */}
            <AgentCard 
              agent={{
                name: "Automation Decision",
                icon: Cpu,
                status: "AUTOMATION RUNNING",
                desc: "Autonomously triggers coaching plans, alerts, and AI workflows based on trainer performance patterns.",
                color: "#7000ff",
                metrics: [
                  { label: "Today", val: "32" },
                  { label: "Reports", val: "12" },
                  { label: "Accuracy", val: "98%" }
                ],
                visual: (
                  <div className="flex flex-col items-center gap-1 w-full scale-75">
                    <div className="w-12 h-6 rounded bg-black flex items-center justify-center text-[6px] font-black text-white">UPLOAD</div>
                    <ChevronRight className="w-3 h-3 text-brand-primary rotate-90" />
                    <div className="w-12 h-6 rounded bg-brand-primary/20 flex items-center justify-center text-[6px] font-black text-brand-primary">ANALYZE</div>
                    <ChevronRight className="w-3 h-3 text-brand-primary rotate-90" />
                    <div className="w-12 h-6 rounded bg-brand-secondary/20 flex items-center justify-center text-[6px] font-black text-brand-secondary">TRIGGER</div>
                  </div>
                )
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-100 bg-slate-50 relative z-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-brand-primary" />
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-black">
              TRAINER<span className="text-brand-primary">IQ</span>
            </span>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">© 2026 TrainerIQ X OS • Built for Elite Human Performance.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-black transition-all text-xs">Architecture</a>
            <a href="#" className="hover:text-black transition-all text-xs">Privacy</a>
            <a href="#" className="hover:text-black transition-all text-xs">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[32px] border border-slate-100 bg-white hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 group">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all duration-500">
        <Icon className="w-8 h-8 text-black group-hover:text-brand-primary group-hover:scale-110 transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-black text-black mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

