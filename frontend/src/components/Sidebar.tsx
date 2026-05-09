import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Fingerprint,
  Activity,
  TrendingUp,
  Trophy,
  LogOut,
  BrainCircuit,
  Settings,
  ShieldCheck,
  Gamepad2,
  History,
} from 'lucide-react';
import { cn } from '../lib/utils';

const links = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'CONTROL CENTER' },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-80 flex flex-col z-20 bg-white border-r border-slate-100 min-h-screen sticky top-0 shadow-2xl shadow-slate-200/50">
      {/* Premium Logo */}
      <div className="flex items-center gap-4 p-10 mb-6">
        <div className="relative group">
          <div className="relative w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-xl shadow-black/10">
            <BrainCircuit className="w-7 h-7 text-brand-primary" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter text-black leading-none uppercase italic">
            TRAINER<span className="text-brand-primary">IQ</span>
          </span>
          <span className="text-[9px] font-black text-brand-secondary tracking-[0.3em] uppercase">
            Operating System
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 px-4">
          Neural Core
        </p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest border border-transparent',
                isActive
                  ? 'bg-black text-white shadow-2xl shadow-black/20'
                  : 'text-slate-400 hover:text-black hover:bg-slate-50'
              )
            }
          >
            <link.icon
              className={cn(
                'w-5 h-5 transition-all duration-500 group-hover:scale-110',
                'group-[.active]:text-brand-primary'
              )}
            />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="p-6 mt-auto border-t border-slate-100 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest border border-transparent',
              isActive
                ? 'bg-black text-white'
                : 'text-slate-400 hover:text-black hover:bg-slate-50'
            )
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

