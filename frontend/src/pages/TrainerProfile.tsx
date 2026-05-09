import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Fingerprint, Star, TrendingUp, AlertTriangle, BookOpen, Zap, Clock } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const radarData = [
  { subject: 'Clarity',     A: 88 },
  { subject: 'Engagement',  A: 75 },
  { subject: 'Confidence',  A: 92 },
  { subject: 'Pacing',      A: 70 },
  { subject: 'Interaction', A: 82 },
  { subject: 'Energy',      A: 85 },
];

const progressData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 79 },
  { month: 'Apr', score: 83 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
];

const sessions = [
  { title: 'Advanced React Patterns',     date: 'May 07', score: 91, duration: '2h 10m' },
  { title: 'Clean Architecture Bootcamp', date: 'Apr 29', score: 87, duration: '1h 45m' },
  { title: 'TypeScript Deep Dive',        date: 'Apr 18', score: 84, duration: '2h 30m' },
];

export default function TrainerProfile() {
  const { id } = useParams();

  return (
    <div className="space-y-8 pb-10">
      {/* Back + Header */}
      <div className="flex items-start gap-4">
        <Link to="/dashboard" className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors mt-1">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900">Sarah Jenkins</h1>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
              Motivator
            </span>
          </div>
          <p className="text-slate-500 text-sm">Machine Learning · 6 years experience · Trainer #{id || '1'}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-blue-600">98.4</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">IQ Score</p>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* DNA Radar */}
        <div className="pro-panel p-8">
          <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-blue-600" /> Intelligence DNA
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <Radar dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="xl:col-span-2 pro-panel p-8">
          <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> Performance Trajectory
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[60, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}
                  itemStyle={{ color: '#2563eb' }}
                />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strengths / Blind Spots / Burnout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="pro-panel p-6 space-y-4">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" /> Core Strengths
          </h4>
          <ul className="space-y-2.5">
            {['Exceptional motivation', 'High audience rapport', 'Adaptive storytelling', 'Clear analogies'].map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="pro-panel p-6 space-y-4">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" /> Blind Spots
          </h4>
          <ul className="space-y-2.5">
            {['Pacing inconsistency', 'Technical depth variability', 'Limited structured Q&A'].map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="pro-panel p-6 space-y-4">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" /> Burnout Risk
          </h4>
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[18%] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>Low</span><span>Medium</span><span>High</span>
          </div>
          <p className="text-sm text-slate-500 pt-2 leading-relaxed">
            Burnout probability is <span className="text-green-600 font-bold">18%</span> — within safe zone. Recommend a check-in in 30 days.
          </p>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="pro-panel overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Recent Sessions
          </h3>
          <Link to="/autopsy" className="text-blue-600 text-sm font-semibold hover:underline">
            View All
          </Link>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {['Session Title', 'Date', 'Duration', 'AI Score'].map((h) => (
                <th key={h} className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sessions.map((s) => (
              <tr key={s.title} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.title}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{s.date}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {s.duration}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-black text-blue-600">{s.score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
