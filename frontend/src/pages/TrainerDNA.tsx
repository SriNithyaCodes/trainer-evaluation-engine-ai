import { motion } from "motion/react";
import { 
  Fingerprint, 
  Target, 
  Zap, 
  MessageCircle, 
  Lightbulb, 
  Rocket,
  ShieldAlert,
  Brain,
  TrendingUp,
  Activity,
  Award,
  Crown,
  Medal
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarComponent, ResponsiveContainer } from "recharts";
import { cn } from "../lib/utils";

const dnaData = [
  { subject: 'Engagement', A: 120, B: 110, fullMark: 150 },
  { subject: 'Clarity', A: 98, B: 130, fullMark: 150 },
  { subject: 'Confidence', A: 86, B: 130, fullMark: 150 },
  { subject: 'Interaction', A: 99, B: 100, fullMark: 150 },
  { subject: 'Pacing', A: 85, B: 90, fullMark: 150 },
  { subject: 'Energy', A: 65, B: 85, fullMark: 150 },
];

export default function TrainerDNA() {
  const user = JSON.parse(localStorage.getItem("traiq_user") || "{}");

  return (
    <div className="space-y-8 pb-20 font-sans text-slate-900 bg-mesh min-h-screen p-8">
      <header className="flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <Fingerprint className="text-brand-primary w-5 h-5" />
          </div>
          <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Neural Identity</span>
        </motion.div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] text-slate-900 uppercase italic ai-glow-text">
          Trainer <span className="text-brand-primary">DNA</span>.
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Your unique teaching intelligence fingerprint and personality classification.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Profile Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 flex flex-col items-center text-center relative overflow-hidden group bg-white"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
          <div className="scan-line opacity-20" />
          
          <div className="relative z-10 space-y-10">
            <div className="w-32 h-32 rounded-[40px] bg-slate-50 flex items-center justify-center border border-slate-100 mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500 shadow-slate-200">
              <Fingerprint className="w-16 h-16 text-brand-primary" />
            </div>
            
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Technical Expert</h2>
              <p className="text-brand-secondary font-black text-[10px] uppercase tracking-[0.5em] mt-4">{user.name || "Trainer"} Identity</p>
            </div>
            
            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-xs mx-auto">
              You excel at deconstructing complex concepts into logical frameworks. Your communication is precise, structured, and authoritative.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge label="Precision" />
              <Badge label="Logic" />
              <Badge label="Authority" />
            </div>
          </div>
        </motion.div>

        {/* Intelligence Spectrum */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="neon-card xl:col-span-2 p-12 bg-white relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-12">
            <Activity className="w-6 h-6 text-brand-secondary" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Intelligence Spectrum</h3>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }} />
                <RadarComponent
                  name="Current DNA"
                  dataKey="A"
                  stroke="#00e5ff"
                  fill="#00e5ff"
                  fillOpacity={0.15}
                  strokeWidth={4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* DNA Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <DNAFactor 
          icon={Zap} 
          title="CORE STRENGTHS" 
          items={[
            "Deep technical fluency",
            "Structured logical flow",
            "High credibility score"
          ]}
          color="cyan"
        />
        <DNAFactor 
          icon={ShieldAlert} 
          title="GROWTH AREAS" 
          items={[
            "Lower emotional resonance",
            "Potential pacing density",
            "Limited informal interaction"
          ]}
          color="accent"
        />
        <DNAFactor 
          icon={Rocket} 
          title="GROWTH PATH" 
          items={[
            "Implement empathetic hooks",
            "Vary rhythmic pacing",
            "Integrate narrative pauses"
          ]}
          color="secondary"
        />
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-6 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] shadow-lg shadow-slate-100 transition-all hover:scale-105">
      {label}
    </span>
  );
}

function DNAFactor({ icon: Icon, title, items, color }: any) {
  const colors: any = {
    cyan: "text-brand-primary bg-brand-primary/5 border-brand-primary/10 shadow-2xl shadow-brand-primary/5",
    accent: "text-brand-accent bg-brand-accent/5 border-brand-accent/10 shadow-2xl shadow-brand-accent/5",
    secondary: "text-brand-secondary bg-brand-secondary/5 border-brand-secondary/10 shadow-2xl shadow-brand-secondary/5",
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-panel p-10 space-y-10 group transition-all relative overflow-hidden bg-white shadow-2xl shadow-slate-200/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
      
      <div className={cn("p-5 w-fit rounded-[28px] border relative z-10 transition-transform group-hover:scale-110", colors[color])}>
        <Icon className="w-8 h-8" />
      </div>
      
      <div className="relative z-10">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-10">{title}</h4>
        <ul className="space-y-6">
          {items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-5 text-base text-slate-500 group-hover:text-slate-900 transition-colors">
              <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 transition-all group-hover:scale-125", 
                color === 'cyan' ? 'bg-brand-primary' :
                color === 'accent' ? 'bg-brand-accent' :
                'bg-brand-secondary'
              )} />
              <span className="font-bold leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
