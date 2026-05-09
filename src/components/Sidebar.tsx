import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  Fingerprint, 
  Activity, 
  TrendingUp, 
  LogOut,
  BrainCircuit,
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/autopsy", icon: Search, label: "Session Autopsy" },
  { to: "/dna", icon: Fingerprint, label: "Trainer DNA" },
  { to: "/sentiment", icon: Activity, label: "Sentiment Heat" },
  { to: "/predictions", icon: TrendingUp, label: "Predictions" },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-72 flex flex-col p-8 z-20 bg-slate-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">
          Trainer<span className="text-blue-600">IQ</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Main Navigation</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm font-semibold",
              isActive 
                ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            )}
          >
            {({ isActive }) => (
              <>
                <link.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-blue-600" : "text-slate-400")} />
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-8 border-t border-slate-200 space-y-1.5">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-slate-900 hover:bg-white/50 rounded-xl transition-all text-sm font-semibold">
          <Settings className="w-5 h-5 text-slate-400" />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-semibold"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
