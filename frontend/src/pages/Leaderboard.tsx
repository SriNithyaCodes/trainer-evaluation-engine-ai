import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const trainers = [
  { rank: 1, name: "Sarah Jenkins", dept: "Machine Learning", score: 98.4, dna: "Motivator", sessions: 42, color: "text-yellow-400" },
  { rank: 2, name: "David Kumar", dept: "Cloud Architecture", score: 95.8, dna: "Technical Expert", sessions: 38, color: "text-gray-300" },
  { rank: 3, name: "Elena Rodriguez", dept: "Product Design", score: 92.1, dna: "Storyteller", sessions: 51, color: "text-amber-600" },
  { rank: 4, name: "Marcus Thorne", dept: "Cybersecurity", score: 89.5, dna: "Interactive Coach", sessions: 29, color: "text-blue-400" },
  { rank: 5, name: "Lisa Wong", dept: "Data Science", score: 88.2, dna: "Fast Lecturer", sessions: 45, color: "text-blue-400" },
  { rank: 6, name: "James Wilson", dept: "Soft Skills", score: 87.0, dna: "Motivator", sessions: 33, color: "text-blue-400" },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Elite Circle</h2>
        <p className="text-gray-400">The highest performing trainers globally across the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {trainers.slice(0, 3).map((t, i) => (
          <div key={t.rank} className="glass-card relative overflow-hidden group">
            <div className={`absolute top-4 right-4 ${t.color}`}>
              {i === 0 ? <Crown className="w-8 h-8" /> : i === 1 ? <Medal className="w-8 h-8" /> : <Trophy className="w-8 h-8" />}
            </div>
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tighter">Rank #{t.rank}</p>
            <h3 className="text-xl font-bold mb-1">{t.name}</h3>
            <p className="text-sm text-gray-400 mb-6">{t.dept}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-black text-primary">{t.score}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Trainer Score</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{t.dna}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">DNA Type</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Trainer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">DNA Profile</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Sessions</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">IQ Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trainers.map((t) => (
              <tr key={t.rank} className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-bold text-gray-500">#{t.rank}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-[10px] font-bold">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium group-hover:text-primary transition-colors">{t.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{t.dept}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
                    {t.dna}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center">{t.sessions}</td>
                <td className="px-6 py-4 text-right font-black text-primary">{t.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
