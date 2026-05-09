import { motion } from "motion/react";
import { 
  Fingerprint, 
  Target, 
  Zap, 
  MessageCircle, 
  Lightbulb, 
  Rocket,
  ShieldAlert
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
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
    <div className="space-y-8 pb-20 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trainer DNA</h1>
        <p className="text-slate-500 text-sm">Your unique teaching intelligence fingerprint and personality classification.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="pro-panel p-10 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center border border-blue-100 mx-auto shadow-sm group-hover:bg-blue-600 transition-colors">
              <Fingerprint className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Technical Expert</h2>
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mt-3">{user.name || "Trainer"} Profile</p>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
              You excel at deconstructing complex concepts into logical frameworks. Your communication is precise, structured, and authoritative.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              <Badge label="Precision" />
              <Badge label="Logic" />
              <Badge label="Authority" />
            </div>
          </div>
        </div>

        <div className="pro-panel p-8 xl:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-8 px-4">Intelligence Spectrum</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} />
                <Radar
                  name="Current DNA"
                  dataKey="A"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DNAFactor 
          icon={Zap} 
          title="Core Strengths" 
          items={[
            "Deep technical fluency",
            "Structured logical flow",
            "High credibility score"
          ]}
          color="blue"
        />
        <DNAFactor 
          icon={ShieldAlert} 
          title="Growth Areas" 
          items={[
            "Lower emotional resonance",
            "Potential pacing density",
            "Limited informal interaction"
          ]}
          color="orange"
        />
        <DNAFactor 
          icon={Rocket} 
          title="Growth Path" 
          items={[
            "Implement empathetic hooks",
            "Vary rhythmic pacing",
            "Integrate narrative pauses"
          ]}
          color="emerald"
        />
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
      {label}
    </span>
  );
}

function DNAFactor({ icon: Icon, title, items, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  };

  return (
    <div className="pro-panel p-8 space-y-6 group hover:border-blue-200 transition-colors">
      <div className={cn("p-3 w-fit rounded-2xl border", colors[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-6">{title}</h4>
        <ul className="space-y-4">
          {items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5 group-hover:bg-blue-500 transition-colors" />
              <span className="font-medium leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
