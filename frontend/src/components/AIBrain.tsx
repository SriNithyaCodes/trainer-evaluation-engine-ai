import React from 'react';
import { motion } from 'motion/react';

export default function AIBrain() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer Pulse */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl"
      />
      
      {/* Rotating Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
          className="absolute border border-brand-primary/20 rounded-full"
          style={{
            width: `${100 - i * 20}%`,
            height: `${100 - i * 20}%`,
            borderStyle: i === 1 ? 'dashed' : 'solid'
          }}
        />
      ))}

      {/* Central Core */}
      <motion.div
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          boxShadow: [
            "0 0 20px rgba(0, 242, 255, 0.2)",
            "0 0 50px rgba(0, 242, 255, 0.5)",
            "0 0 20px rgba(0, 242, 255, 0.2)"
          ]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative w-32 h-32 rounded-full bg-black flex items-center justify-center overflow-hidden border border-brand-primary/30"
      >
        {/* Internal Glow Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.4)_0%,transparent_70%)]"></div>
        
        {/* Scanning Line */}
        <motion.div
          animate={{ top: ['-10%', '110%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-x-0 h-1 bg-brand-primary/50 blur-[2px] z-10"
        />

        {/* Brain Icon / Visualization */}
        <div className="relative z-20">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-16 h-16 text-brand-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M12 6V12L16 14" />
              <path d="M12 2V4" />
              <path d="M12 20V22" />
              <path d="M22 12H20" />
              <path d="M4 12H2" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3 + i, 
            delay: i * 0.5,
            ease: "easeInOut" 
          }}
          className="absolute w-1 h-1 bg-brand-primary rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
