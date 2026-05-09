import { motion } from "motion/react";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  ChevronRight, 
  AlertTriangle,
  Brain,
  History,
  Lightbulb,
  Calendar,
  ShieldAlert
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "../lib/utils";

const forecastData = [
  { month: "Jan", val: 65, future: 65 },
  { month: "Feb", val: 72, future: 72 },
  { month: "Mar", val: 68, future: 68 },
  { month: "Apr", val: 82, future: 82 },
  { month: "May", val: 85, future: 85 },
  { month: "Jun", val: null, future: 91 },
  { month: "Jul", val: null, future: 94 },
  { month: "Aug", val: null, future: 98 },
];

export default function Predictions() {
  return (
    <div className="space-y-8 pb-20 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Intelligence Predictions</h1>
        <p className="text-slate-500 text-sm">Forecasting trainer growth, burnout risk, and future performance DNA.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 pro-panel p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Growth Projection (12mo)</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Based on DNA Velocity + Mastery Curve</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /> Historical</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600" /> AI Forecast</div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} 
                />
                <Line type="monotone" dataKey="val" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="future" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <PredictionCard 
            title="Burnout Velocity"
            value="Low (12%)"
            desc="Current workload suggests stable performance for next 90 days."
            icon={Zap}
            color="blue"
          />
          <PredictionCard 
            title="Growth Rate"
            value="High (94%)"
            desc="Based on rapid adaptation to AI feedback loops in Q4."
            icon={TrendingUp}
            color="emerald"
          />
          <PredictionCard 
            title="Risk Profile"
            value="Minimal"
            desc="Depth remains in the upper decile of enterprise benchmarks."
            icon={ShieldAlert}
            color="indigo"
          />
        </div>
      </div>

      <div className="pro-panel overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Projected Milestones</h3>
        </div>
        <div className="divide-y divide-slate-100">
           {[
             { name: "Global Master Certification", date: "Sep 2026", prob: 98 },
             { name: "Top 1% Communicator Elite", date: "Nov 2026", prob: 85 },
             { name: "AI Adaptive Specialist", date: "Dec 2026", prob: 92 },
           ].map((m, i) => (
             <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group cursor-pointer">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                   {i + 1}
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                   <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                     <Calendar className="w-3 h-3" />
                     {m.date}
                   </div>
                 </div>
               </div>
               <div className="flex items-center gap-8">
                 <div className="text-right">
                   <p className="text-sm font-bold text-blue-600">{m.prob}%</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Probability</p>
                 </div>
                 <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function PredictionCard({ title, value, desc, icon: Icon, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 shadow-blue-50",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-50",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 shadow-indigo-50",
  };

  return (
    <div className={cn("pro-panel p-6 border", colors[color])}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5" />
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">{title}</h4>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-2">{value}</p>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
