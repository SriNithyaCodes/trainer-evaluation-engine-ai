import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from "motion/react";

export default function Layout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-white md:m-4 md:rounded-3xl md:shadow-2xl md:shadow-slate-200/50 border border-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 max-w-7xl mx-auto w-full min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
