import { motion } from "motion/react";
import { 
  Activity, 
  Smile, 
  Meh, 
  Frown, 
  Info,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "../lib/utils";

const timelineData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i * 2}m`,
  engagement: Math.floor(Math.random() * 40) + 60,
  sentiment: Math.floor(Math.random() * 30) + 70,
}));

export default function SentimentHeatmap() {
  return (
    <div className="space-y-8 pb-20 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sentiment Heatmap</h1>
        <p className="text-slate-500 text-sm">Chronological intelligence mapping of learner emotional states.</p>
      </header>

      <div className="pro-panel p-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
               <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">Session Engagement Timeline</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">AI Processed // React Patterns Deep Dive</p>
            </div>
          </div>
          
          <div className="flex gap-4">
             <SentimentBadge icon={Smile} label="Engaged" color="blue" />
             <SentimentBadge icon={Meh} label="Neutral" color="slate" />
             <SentimentBadge icon={Frown} label="Confused" color="orange" />
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} 
              />
              <Area 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#2563eb" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#sentimentGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="pro-panel p-6">
            <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              Critical Events Log
            </h4>
            <div className="space-y-4">
              <LogEvent 
                time="15:02" 
                title="Cognitive Overload detected" 
                desc="Abstraction level exceeded current learner foundation during Complex Logic segment." 
                type="alert"
              />
              <LogEvent 
                time="09:45" 
                title="Flow State Achieved" 
                desc="Seamless transition from theory to demonstration triggered peak resonance." 
                type="success"
              />
              <LogEvent 
                time="31:10" 
                title="Engagement Drop" 
                desc="Monotone delivery during theoretical reading caused a 40% retention dip." 
                type="warning"
              />
            </div>
         </div>

         <div className="pro-panel p-6 bg-slate-900 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] pointer-events-none" />
            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2 relative z-10">
              <Brain className="w-4 h-4 text-blue-400" />
              AI Recommendation
            </h4>
            <div className="relative z-10">
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                "To prevent the 15:00 'Logic Slump', integrate a <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">Interactive Whiteboard session</span>. Physical visualization reduces cognitive load by 28% for this specific trainer DNA type."
              </p>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer">
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Recommended Resource</p>
                  <p className="text-white text-sm font-bold mt-1">Cognitive Load Management 101</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 hover:text-white transition-colors" />
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function Brain({ className }: { className?: string }) {
  return <div className={cn("w-5 h-5", className)}>🧠</div>;
}

function SentimentBadge({ icon: Icon, label, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    slate: "text-slate-500 bg-slate-50",
    orange: "text-orange-600 bg-orange-50",
  };
  return (
    <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100", colors[color])}>
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}

function LogEvent({ time, title, desc, type }: any) {
  const types: any = {
    alert: "border-red-100 bg-red-50 text-red-600",
    success: "border-emerald-100 bg-emerald-50 text-emerald-600",
    warning: "border-orange-100 bg-orange-50 text-orange-600",
  };
  return (
    <div className="flex gap-4 group">
      <div className="text-[10px] font-bold text-slate-400 mt-1 min-w-[40px] tracking-widest">{time}</div>
      <div className={cn("flex-1 p-4 rounded-2xl border transition-all hover:-translate-y-1", types[type])}>
        <h5 className="text-sm font-bold mb-1">{title}</h5>
        <p className="text-xs opacity-80 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
