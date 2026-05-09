import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SessionAutopsy from "./pages/SessionAutopsy";
import TrainerDNA from "./pages/TrainerDNA";
import SentimentHeatmap from "./pages/SentimentHeatmap";
import Predictions from "./pages/Predictions";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("traiq_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    localStorage.setItem("traiq_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("traiq_user");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white text-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-blue-600 font-medium tracking-widest uppercase text-xs">Booting Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={!user ? <Auth onLogin={login} /> : <Navigate to="/dashboard" />} />
        
        <Route element={user ? <Layout onLogout={logout} /> : <Navigate to="/auth" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/autopsy" element={<SessionAutopsy />} />
          <Route path="/dna" element={<TrainerDNA />} />
          <Route path="/sentiment" element={<SentimentHeatmap />} />
          <Route path="/predictions" element={<Predictions />} />
        </Route>
      </Routes>
    </Router>
  );
}
