import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import LiveCoachingBanner from './LiveCoachingBanner';
import { User, Bell, Search as SearchIcon } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('traiq_user') || '{"name":"Trainer","role":"Admin"}');

  const handleLogout = () => {
    localStorage.removeItem('traiq_user');
    localStorage.removeItem('traiq_token');
    navigate('/auth');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-primary/20 font-poppins">
      {/* Background Mesh Gradients (Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] animate-orb"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/5 blur-[120px] animate-orb" style={{ animationDelay: '-4s' }}></div>
      </div>

      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative z-10">
        <LiveCoachingBanner />

        {/* Futuristic Light Header */}
        <header className="h-20 border-b border-slate-100 bg-white/70 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-brand-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search intelligence..." 
                className="bg-slate-50 border border-slate-100 rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-primary/50 w-64 transition-all"
              />
            </div>
            <div className="h-4 w-[1px] bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Neural Sync Active</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative p-2 text-slate-400 hover:text-black transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-8 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-black tracking-tight">{user.name}</p>
                <p className="text-[9px] text-brand-primary uppercase font-black tracking-widest">{user.role}</p>
              </div>
              <div className="relative group">
                <div className="relative w-11 h-11 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center overflow-hidden group-hover:border-brand-primary/40 transition-colors">
                  <User className="w-5 h-5 text-slate-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12 animate-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

