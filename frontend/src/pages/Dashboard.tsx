import React from 'react';
import {
  Users,
  Video,
  Activity,
  Zap,
  ChevronRight,
  BrainCircuit,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', engagement: 65, clarity: 70 },
  { name: 'Tue', engagement: 78, clarity: 82 },
  { name: 'Wed', engagement: 82, clarity: 75 },
  { name: 'Thu', engagement: 70, clarity: 88 },
  { name: 'Fri', engagement: 90, clarity: 92 },
  { name: 'Sat', engagement: 85, clarity: 80 },
  { name: 'Sun', engagement: 95, clarity: 95 },
];

const leaderData = [
  { name: 'Sarah J.', score: 98, type: 'Motivator' },
  { name: 'David K.', score: 95, type: 'Expert' },
  { name: 'Elena R.', score: 92, type: 'Storyteller' },
];

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="pro-panel p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-xl">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+{trend}%</span>
    </div>
    <p className="text-slate-500 text-sm">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Trainers" value="124" trend="12" />
        <StatCard icon={Video} label="Sessions Analyzed" value="1,842" trend="8" />
        <StatCard icon={Activity} label="Avg Engagement" value="88.4%" trend="5" />
        <StatCard icon={Zap} label="AI Insights" value="12k+" trend="15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 pro-panel p-8" style={{ height: 420 }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Performance Trends</h3>
              <p className="text-slate-400 text-xs mt-0.5">Engagement & Clarity · 7-day view</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-2 outline-none text-slate-600 font-medium">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="82%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12 }}
                itemStyle={{ color: '#2563eb' }}
              />
              <Area type="monotone" dataKey="engagement" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEngage)" name="Engagement" />
              <Area type="monotone" dataKey="clarity"    stroke="#0ea5e9" strokeWidth={2}   fillOpacity={1} fill="url(#colorClarity)" name="Clarity" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Summary */}
        <div className="pro-panel p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Top Performers</h3>
            <Link to="/leaderboard" className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-5 flex-1">
            {leaderData.map((trainer, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors truncate">{trainer.name}</p>
                  <p className="text-xs text-slate-400">{trainer.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-black">{trainer.score}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Score</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              AI Insight
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Increase interactive polls in technical sessions to boost retention by ~15%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
