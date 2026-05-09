import { motion } from "motion/react";
import { 
  Users, 
  MessageSquare, 
  Zap, 
  Target, 
  TrendingUp, 
  ChevronRight,
  Brain,
  Rocket
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { cn } from "../lib/utils";

const data = [
  { name: "Mon", score: 65, engagement: 40 },
  { name: "Tue", score: 72, engagement: 55 },
  { name: "Wed", score: 68, engagement: 48 },
  { name: "Thu", score: 85, engagement: 70 },
  { name: "Fri", score: 78, engagement: 62 },
  { name: "Sat", score: 90, engagement: 82 },
  { name: "Sun", score: 88, engagement: 78 },
];

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("traiq_user") || "{}");

  return (
    <div className="space-y-8 pb-10 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {user.name || "Trainer"}</h1>
        <p className="text-slate-500 text-sm">Here's what's happening with your teaching metrics today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Sessions" 
          value="124" 
          change="+12%" 
          icon={MessageSquare} 
          trend="up" 
        />
        <StatCard 
          label="Avg Engagement" 
          value="84%" 
          change="+5.2%" 
          icon={Zap} 
          trend="up" 
          color="blue"
        />
        <StatCard 
          label="Trainer IQ Score" 
          value="92.4" 
          change="+2.1" 
          icon={Brain} 
          trend="up" 
          color="indigo"
        />
        <StatCard 
          label="Next Milestones" 
          value="8" 
          change="On track" 
          icon={Target} 
          trend="neutral" 
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="pro-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Performance Velocity</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] text-blue-600 uppercase tracking-widest font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Actual
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Target
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} 
                />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pro-panel p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Engagement Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} 
                />
                <Bar dataKey="engagement" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 pro-panel p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent AI Autopsies</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    S{i}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Advanced React Patterns Deep Dive</h4>
                    <p className="text-xs text-slate-500">Dec 24, 2026 • 45 min session</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">92/100</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">AI Score</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pro-panel p-6 bg-blue-600 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            AI Co-Pilot
          </h3>
          <p className="text-xs text-blue-100 mb-6 opacity-80 uppercase tracking-widest font-bold">Real-time optimization</p>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] text-blue-200 mb-1 font-bold uppercase tracking-widest">Active Insight</p>
              <p className="text-sm text-white font-medium">"Energy signature is dipping in segment 4. Recommend inserting a brief interactive poll."</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  className="h-full bg-white" 
                />
              </div>
              <div className="flex justify-between text-[10px] text-blue-100 font-bold uppercase tracking-widest">
                <span>Engagement Prob</span>
                <span>85%</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 py-3.5 rounded-xl bg-white text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg">
            Start Live Simulation
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, trend, color = "slate" }: any) {
  const colorMap: any = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    slate: "text-slate-600 bg-slate-50 border-slate-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="pro-panel p-6 flex flex-col gap-4 group"
    >
      <div className="flex items-center justify-between">
        <div className={cn("p-2.5 rounded-xl border", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest",
          trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"
        )}>
          {change}
        </div>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
