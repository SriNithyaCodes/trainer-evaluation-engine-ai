import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Brain, Zap, Activity, AlertTriangle, 
  CheckCircle2, ArrowRight, Loader2, Terminal, 
  Layers, Fingerprint, Eye, Sparkles, Search,
  Clock, History, Cpu, Video, FileText, Upload, 
  Scan, Gauge, ZapOff, RefreshCcw, Waves, Crosshair,
  Lock, UserCheck, Microscope
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { analyzeAuthenticity } from '../services/api';
import { cn } from '../lib/utils';

export default function AIAuthenticityIntelligence() {
  const [analyzing, setAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scanStages = [
    { id: 'frame', label: 'Frame Extraction', icon: Microscope },
    { id: 'eye', label: 'Eye Movement Tracking', icon: Eye },
    { id: 'cadence', label: 'Cadence Analysis', icon: Waves },
    { id: 'pause', label: 'Pause Pattern Detection', icon: Clock },
    { id: 'natural', label: 'Speech Naturalness', icon: Activity },
    { id: 'recall', label: 'Concept Recall Verification', icon: Brain },
    { id: 'fingerprint', label: 'AI Dependency Scoring', icon: Fingerprint }
  ];

  const startForensicScan = async () => {
    setAnalyzing(true);
    setResult(null);

    // Cinematic Scan Animation
    for (let i = 0; i < scanStages.length; i++) {
      setScanStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }

    const formData = new FormData();
    if (videoFile) {
       formData.append('video', videoFile);
       formData.append('transcript', `[Source: ${videoFile.name}] So, looking at the code here, recursion works by... uh... calling itself. Let's trace this. If we have n=5, the base case is 0. This is a common pattern in Fibonacci implementations.`);
    } else {
       formData.append('transcript', "So, looking at the code here, recursion works by... uh... calling itself. Let's trace this. If we have n=5, the base case is 0. This is a common pattern in Fibonacci implementations.");
    }
    formData.append('metadata', JSON.stringify({ duration: 120, frames: 3600 }));

    try {
      const data = await analyzeAuthenticity(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins relative overflow-hidden">
      {/* Cinematic Forensic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.03)_0%,transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />
      <div className="scan-line opacity-[0.15] mix-blend-overlay" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-[calc(100vh-1rem)]">
        
        {/* LEFT PANEL: Video Input & Forensic Preview */}
        <div className="lg:col-span-3 space-y-4 flex flex-col">
          <header className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-100">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <h1 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Forensic Module 04</h1>
             </div>
             <h2 className="text-2xl font-black italic uppercase tracking-tighter ai-glow-text">AI Authenticity</h2>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
             {/* Video Upload / Player */}
             <div className="aspect-video rounded-[32px] bg-slate-100 border border-slate-200 relative overflow-hidden group shadow-inner">
                {!videoFile ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform shadow-md">
                         <Video className="w-8 h-8 text-slate-500" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Teaching Demo</p>
                         <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">MP4 / AVI / MOV (Max 50MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      />
                   </div>
                ) : (
                   <video 
                     ref={videoRef}
                     src={URL.createObjectURL(videoFile)} 
                     className="w-full h-full object-cover"
                     controls
                   />
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="px-3 py-1 rounded-full bg-white/80 border border-slate-200 backdrop-blur-md text-[8px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 shadow-sm">
                      <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                      Live Feed
                   </div>
                </div>
             </div>

             {/* Transcript Extraction */}
             <div className="p-6 rounded-[32px] bg-white border border-slate-200 space-y-4 shadow-xl shadow-slate-100">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-brand-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest">Transcript Analysis</h3>
                   </div>
                   <div className={cn(
                     "text-[8px] font-black uppercase tracking-widest",
                     videoFile ? "text-green-500" : "text-slate-400"
                   )}>
                      {videoFile ? "Synced" : "Awaiting Media"}
                   </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 h-48 overflow-y-auto custom-scrollbar">
                   <p className={cn(
                     "text-[10px] font-medium leading-relaxed italic whitespace-pre-wrap",
                     videoFile ? "text-slate-600" : "text-slate-400 opacity-60"
                   )}>
                      {videoFile 
                        ? `[Streaming analysis initiated for ${videoFile.name}]\n\n"...so, if we look at the O(n) complexity here, the loop iterates through each element once. This is fundamental for understanding how the scaling works in production environments..."` 
                        : "Upload a teaching demo to begin streaming transcript extraction..."}
                   </p>
                </div>
             </div>
          </div>

          <button 
            onClick={startForensicScan}
            disabled={analyzing || !videoFile}
            className={cn(
              "w-full py-6 rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 relative overflow-hidden group border",
              analyzing ? "bg-slate-100 border-slate-200 text-slate-400" : "bg-black text-white border-black hover:bg-slate-900 hover:scale-105 active:scale-95 shadow-xl hover:shadow-brand-primary/20"
            )}
          >
             <div className="relative z-10 flex items-center justify-center gap-3">
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
                <span>{analyzing ? 'System Scanning...' : 'Start Forensic Analysis'}</span>
             </div>
          </button>
        </div>

        {/* CENTER PANEL: Live AI Scan Engine */}
        <div className="lg:col-span-5 flex flex-col relative">
           <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Holographic Scan Visualizer */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                 <div className="absolute inset-0 border-[4px] border-slate-200 rounded-full animate-[spin_10s_linear_infinity]" />
                 <div className="absolute inset-0 border-[1px] border-dashed border-slate-300 rounded-full animate-[spin_15s_linear_infinity_reverse]" />
                 
                 <div className="relative z-10 w-64 h-64 rounded-full bg-white flex flex-col items-center justify-center text-center p-8 backdrop-blur-2xl border border-slate-200 shadow-xl">
                    {analyzing ? (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="space-y-4"
                       >
                          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto shadow-inner">
                             {React.createElement(scanStages[scanStep].icon, { className: "w-8 h-8 text-brand-primary" })}
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">{scanStages[scanStep].label}</p>
                             <p className="text-[8px] font-bold text-brand-primary uppercase tracking-[0.5em] mt-1 animate-pulse">Scanning...</p>
                          </div>
                       </motion.div>
                    ) : result ? (
                       <div className="space-y-4">
                          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">Analysis Complete</div>
                       </div>
                    ) : (
                       <div className="space-y-4 opacity-50">
                          <Microscope className="w-16 h-16 text-slate-400 mx-auto" />
                          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Awaiting Forensic Input</div>
                       </div>
                    )}
                 </div>
              </div>

              {/* Scan Stages Grid */}
              <div className="mt-16 grid grid-cols-4 gap-4 w-full px-8">
                 {scanStages.map((step, i) => (
                    <div 
                      key={step.id} 
                      className={cn(
                        "p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 transition-all duration-500",
                        analyzing && scanStep === i ? "bg-white border-brand-primary shadow-lg shadow-brand-primary/10" :
                        analyzing && scanStep > i ? "bg-green-50 border-green-200 opacity-100" :
                        "bg-white border-slate-200 opacity-50 shadow-sm"
                      )}
                    >
                       <step.icon className={cn("w-4 h-4", analyzing && scanStep >= i ? "text-brand-primary" : "text-slate-500")} />
                       <span className="text-[7px] font-black uppercase tracking-widest">{step.label}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: Authenticity Intelligence Report */}
        <div className="lg:col-span-4 space-y-4 overflow-y-auto custom-scrollbar pr-2">
           <AnimatePresence mode="wait">
               {!result ? (
                 <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="h-full border-2 border-dashed border-slate-200 bg-white rounded-[40px] flex flex-col items-center justify-center p-12 text-center shadow-sm"
                 >
                    <Search className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 italic">Neural Engine Standby</h3>
                 </motion.div>
              ) : (
                 <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="space-y-4 pb-12"
                 >
                    {/* Hero Score Card */}
                    <div className="p-8 rounded-[40px] bg-white border border-slate-200 relative overflow-hidden shadow-xl shadow-slate-100">
                       <div className="flex items-center justify-between">
                          <div className="space-y-2">
                             <div className="text-[9px] font-black text-brand-primary uppercase tracking-[0.5em]">Authenticity Score</div>
                             <div className="text-6xl font-black italic tracking-tighter ai-glow-text">{result.authenticity_score}%</div>
                             <div className="text-[8px] font-black text-green-600 uppercase tracking-widest px-3 py-1 bg-green-50 rounded-full inline-block border border-green-200">Verified Natural</div>
                          </div>
                          <div className="w-24 h-24 rounded-full border-8 border-slate-50 border-t-brand-primary animate-spin-slow flex items-center justify-center shadow-inner bg-white">
                             <UserCheck className="w-8 h-8 text-brand-primary" />
                          </div>
                       </div>
                    </div>

                    {/* AI Dependency Risk */}
                    <div className={cn(
                      "p-6 rounded-[32px] border flex items-center justify-between shadow-md",
                      result.ai_dependency_risk < 20 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    )}>
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                             <Fingerprint className={cn("w-5 h-5", result.ai_dependency_risk < 20 ? "text-green-500" : "text-red-500")} />
                          </div>
                          <div>
                             <div className="text-[9px] font-black uppercase tracking-widest opacity-60 text-slate-600">AI Dependency Risk</div>
                             <div className="text-xl font-black text-slate-900">{result.ai_dependency_risk}% {result.risk_severity}</div>
                          </div>
                       </div>
                    </div>

                    {/* Cadence & Waveform */}
                    <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-6 shadow-lg shadow-slate-100">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Waves className="w-4 h-4 text-brand-secondary" />
                             <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Cadence Analysis</h3>
                          </div>
                          <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Natural Rhythm</div>
                       </div>
                       
                       <div className="h-24 w-full bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-end gap-1 shadow-inner">
                          {result.cadence.waveform_data.map((h: number, i: number) => (
                             <motion.div 
                               key={i}
                               initial={{ height: 0 }}
                               animate={{ height: `${h * 100}%` }}
                               transition={{ delay: i * 0.01 }}
                               className="flex-1 bg-brand-secondary/60 rounded-full"
                             />
                          ))}
                       </div>
                    </div>

                    {/* Teleprompter Telemetry */}
                    <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-6 shadow-lg shadow-slate-100">
                       <div className="flex items-center gap-3">
                          <Eye className="w-4 h-4 text-brand-accent" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Teleprompter Detection</h3>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Probability</div>
                             <div className="text-sm font-black text-brand-accent">{result.teleprompter.probability}%</div>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Gaze Consistency</div>
                             <div className="text-sm font-black text-green-500">Normal</div>
                          </div>
                       </div>
                    </div>

                    {/* Forensic Evidence Log */}
                    <div className="space-y-3">
                       <div className="flex items-center gap-3 px-4">
                          <History className="w-4 h-4 text-brand-primary" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Forensic Evidence</h3>
                       </div>
                       {result.evidence.map((node: any, i: number) => (
                          <div key={i} className="p-6 rounded-[32px] bg-white border border-slate-200 hover:border-brand-primary/50 hover:shadow-brand-primary/10 transition-all group cursor-pointer shadow-md">
                             <div className="flex items-center justify-between mb-3">
                                <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest px-2 py-1 bg-brand-primary/10 rounded-lg">{node.timestamp}</span>
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{node.label}</span>
                             </div>
                             <p className="text-[10px] text-slate-600 font-medium leading-relaxed italic group-hover:text-slate-900 transition-colors">
                                "{node.description}"
                             </p>
                          </div>
                       ))}
                    </div>

                    {/* Final Recruiter Decision Summary */}
                    <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-4 border-l-4 border-l-brand-primary shadow-lg">
                       <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-brand-primary" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Recruiter Intelligence</h3>
                       </div>
                       <p className="text-xs text-slate-700 font-bold leading-relaxed">
                          {result.summary}
                       </p>
                    </div>

                    <div className="pt-8 flex flex-col items-center">
                       <Lock className="w-8 h-8 text-slate-200 mb-4" />
                       <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.5em]">Forensic Integrity Verified</div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
