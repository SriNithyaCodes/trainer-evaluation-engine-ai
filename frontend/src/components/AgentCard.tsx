import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Cpu, BrainCircuit, Activity, TrendingUp, Zap, Fingerprint } from 'lucide-react';

interface AgentCardProps {
  agent: {
    name: string;
    icon: any;
    status: string;
    desc: string;
    metrics: { label: string, val: string }[];
    color: string;
    visual: React.ReactNode;
    hiddenMetrics?: { label: string; val: string }[];
  };
  index?: number;
}

export default function AgentCard({ agent, index = 0 }: AgentCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative rounded-[32px] overflow-hidden cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {/* Dark glass card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-[32px]" />

      {/* Holographic border glow */}
      <motion.div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${agent.color}30, transparent 40%, ${agent.color}15 100%)`,
          boxShadow: `inset 0 0 0 1px ${agent.color}40, 0 0 40px ${agent.color}20`,
        }}
      />

      {/* Top ambient glow orb */}
      <motion.div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-all duration-700"
        style={{ backgroundColor: agent.color }}
      />

      {/* Scan line sweep */}
      <motion.div
        animate={{ x: ['-120%', '220%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
        className="absolute inset-y-0 w-16 skew-x-6 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(to right, transparent, ${agent.color}18, transparent)` }}
      />

      {/* Neural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Card content */}
      <div className="relative z-10 p-8 flex flex-col h-full">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Icon box */}
            <motion.div
              animate={hovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: hovered ? Infinity : 0, duration: 2 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}08)`, border: `1px solid ${agent.color}40` }}
            >
              <agent.icon className="w-7 h-7 relative z-10" style={{ color: agent.color }} />
              {/* Breathing inner glow */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 blur-sm"
                style={{ backgroundColor: agent.color }}
              />
            </motion.div>

            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-2">
                {agent.name}
              </h3>
              {/* Live pulse status */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: agent.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: agent.color }}
                  />
                </span>
                <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: agent.color }}>
                  {agent.status}
                </span>
              </div>
            </div>
          </div>

          {/* AI Active badge */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest border"
            style={{ borderColor: `${agent.color}30`, color: agent.color, backgroundColor: `${agent.color}10` }}
          >
            ACTIVE
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-[13px] font-medium leading-relaxed mb-6">
          {agent.desc}
        </p>

        {/* Visual Area */}
        <div
          className="h-36 mb-6 rounded-2xl p-5 flex items-center justify-center overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${agent.color}08, transparent)`, border: `1px solid ${agent.color}15` }}
        >
          {agent.visual}
        </div>

        {/* Base metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {agent.metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl p-3 flex flex-col"
              style={{ background: `${agent.color}08`, border: `1px solid ${agent.color}15` }}
            >
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-wider mb-1">{m.label}</span>
              <span className="text-sm font-black text-white">{m.val}</span>
            </div>
          ))}
        </div>

        {/* Hidden hover intelligence metrics */}
        <AnimatePresence>
          {hovered && agent.hiddenMetrics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 mb-3">
                {agent.hiddenMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl px-3 py-2 bg-slate-800/60"
                  >
                    <span className="text-[7px] font-black text-slate-500 uppercase tracking-wider block">{m.label}</span>
                    <span className="text-xs font-black" style={{ color: agent.color }}>{m.val}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer action */}
        <div className="pt-4 mt-auto border-t border-slate-800 flex items-center justify-between">
          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
            Neural Engine v4.2
          </span>
          <motion.div
            animate={hovered ? { x: [0, 4, 0] } : {}}
            transition={{ repeat: hovered ? Infinity : 0, duration: 1 }}
            className="flex items-center gap-1"
            style={{ color: agent.color }}
          >
            <span className="text-[8px] font-black uppercase tracking-widest">Access Intel</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
