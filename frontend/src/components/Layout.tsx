import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

// Live coaching WebSocket alert banner
import LiveCoachingBanner from './LiveCoachingBanner';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('traiq_user');
    localStorage.removeItem('traiq_token');
    navigate('/auth');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Live AI Coaching Banner */}
        <LiveCoachingBanner />

        {/* Top Header */}
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">AI Operating System</h2>
            <p className="text-xs text-slate-400">Powered by Google Gemini Pro</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                {JSON.parse(localStorage.getItem('traiq_user') || '{"name":"Trainer"}').name || 'Trainer'}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                {JSON.parse(localStorage.getItem('traiq_user') || '{"role":"Admin"}').role || 'Admin'}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200">
              T
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
