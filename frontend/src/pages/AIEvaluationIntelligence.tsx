import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Brain, Zap, Activity, AlertTriangle, 
  CheckCircle2, ArrowRight, Loader2, Terminal, 
  Layers, Fingerprint, Eye, Sparkles, Search,
  MessageSquare, Clock, History, TrendingUp, Cpu,
  Video, FileText, Upload, Radar, Info, ExternalLink,
  ShieldAlert, Scan, Gauge, ZapOff, RefreshCcw
} from 'lucide-react';
import { 
  Radar as RadarChart, RadarChart as ReRadarChart, 
  PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';
import { analyzeEvaluation } from '../services/api';
import { cn } from '../lib/utils';

export default function AIEvaluationIntelligence() {
  const [analyzing, setAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [files, setFiles] = useState({
    resume: null as File | null,
    video: null as File | null
  });

  const pipelineSteps = [
    { id: 'resume', label: 'Resume Parsing', icon: FileText },
    { id: 'capability', label: 'Capability Detection', icon: TargetIcon },
    { id: 'behavior', label: 'Behavioral Analysis', icon: Activity },
    { id: 'authenticity', label: 'AI Authenticity Scan', icon: Shield },
    { id: 'diagnostic', label: 'Diagnostic Scoring', icon: Brain },
    { id: 'composite', label: 'Composite Intelligence', icon: Sparkles }
  ];

  const startAnalysis = async () => {
    setAnalyzing(true);
    setResult(null);
    
    // Simulate pipeline animation
    for (let i = 0; i < pipelineSteps.length; i++) {
      setPipelineStep(i);
      await new Promise(r => setTimeout(r, 1500));
    }

    const formData = new FormData();
    if (files.resume) {
      formData.append('resume', files.resume);
    } else {
      formData.append('resume_text', "Senior Java Developer with 8 years of experience. Specialized in Spring Boot and DSA. Expert at teaching complex concepts to juniors.");
    }
    
    formData.append('form_answers', JSON.stringify([
       { section: "Diagnostic", answer: "I look for the root cause of the bug by checking stack traces first." },
       { section: "Patience", answer: "I repeat the concept using a different analogy if the student is confused." }
    ]));
    formData.append('behavioral_metadata', JSON.stringify({ typing_speed: 65, pauses: 4, edits: 12 }));

    try {
      const data = await analyzeEvaluation(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins relative overflow-hidden">
      {/* Neural Background Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="scan-line opacity-20" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-2rem)]">
        
        {/* LEFT PANEL: Candidate Inputs */}
        <div className="lg:col-span-3 space-y-6">
          <header className="p-4 border-l-2 border-brand-primary">
            <h1 className="text-xl font-black uppercase tracking-tighter italic">Evaluation <span className="text-brand-primary">Inputs</span>.</h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Recruiter Core Orchestrator</p>
          </header>

          <div className="space-y-4">
             <UploadCard 
               title="Resume Intelligence" 
               subtitle="PDF / DOCX / TEXT" 
               icon={FileText} 
               status={files.resume ? 'Ready' : 'Pending'}
               onChange={(f) => setFiles(prev => ({ ...prev, resume: f }))}
             />
             <UploadCard 
               title="Demo Video Module" 
               subtitle="MP4 / AVI / MOV" 
               icon={Video} 
               status={files.video ? 'Ready' : 'Pending'}
               onChange={(f) => setFiles(prev => ({ ...prev, video: f }))}
             />
             
             <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                   <Terminal className="w-4 h-4 text-brand-secondary" />
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Form Meta-Data</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Status</div>
                      <div className="text-[10px] font-black text-green-500">SYNCED</div>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Packets</div>
                      <div className="text-[10px] font-black">1,402</div>
                   </div>
                </div>
             </div>
          </div>

          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className={cn(
              "w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-2xl relative overflow-hidden group",
              analyzing ? "bg-slate-100 text-slate-400" : "bg-black text-white hover:scale-105 active:scale-95"
            )}
          >
             <div className="relative z-10 flex items-center justify-center gap-3">
                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                <span>{analyzing ? 'Neural Engine Active' : 'Initialize Analysis'}</span>
             </div>
             <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* CENTER PANEL: Pipeline Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="absolute top-0 py-8 text-center w-full">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                <Cpu className="w-3 h-3 animate-pulse" />
                Multi-Stage Intelligence Pipeline
             </div>
          </div>

          <div className="space-y-12 w-full max-w-sm relative">
             <div className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-gradient-to-b from-brand-primary/50 via-brand-secondary/50 to-transparent" />
             
             {pipelineSteps.map((step, i) => (
                <PipelineStep 
                  key={step.id}
                  {...step}
                  active={analyzing && pipelineStep === i}
                  completed={analyzing ? pipelineStep > i : !!result}
                />
             ))}
          </div>
          
          {analyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center space-y-4"
            >
               <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em] animate-pulse">Processing Evidence Nodes</div>
               <div className="flex gap-2 justify-center">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                      className="w-1 h-6 bg-brand-primary rounded-full"
                    />
                  ))}
               </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT PANEL: AI Results */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto custom-scrollbar pr-2">
          <AnimatePresence mode="wait">
            {!result ? (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 bg-white rounded-[48px]"
               >
                  <Search className="w-16 h-16 mb-6 opacity-20" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-slate-500 italic">Awaiting Input</h3>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">Initialize pipeline to view intelligence report</p>
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 pb-20"
              >
                {/* Composite Score Header */}
                <div className="p-10 rounded-[48px] bg-white border border-slate-200 relative overflow-hidden shadow-xl shadow-slate-200/50">
                   <div className="absolute top-0 right-0 p-8">
                      <div className="w-3 h-3 rounded-full bg-brand-primary animate-pulse" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-2">
                         <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em]">Trainer Intelligence Score</div>
                         <h2 className="text-7xl font-black tracking-tighter italic ai-glow-text">{result.composite_score}</h2>
                      </div>
                      <div className="w-24 h-24 relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={result.capabilities.slice(0, 5)}>
                               <PolarGrid stroke="rgba(0,0,0,0.1)" />
                               <PolarAngleAxis dataKey="capability" tick={false} />
                               <RadarChart dataKey="score" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.5} />
                            </RadarChart>
                         </ResponsiveContainer>
                      </div>
                   </div>
                </div>

                {/* Reject Risk Indicator */}
                <div className={cn(
                  "p-8 rounded-[40px] border flex items-center justify-between",
                  result.reject_probability > 50 ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"
                )}>
                   <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Reject Risk Probability</div>
                      <div className={cn("text-3xl font-black italic", result.reject_probability > 50 ? "text-red-500" : "text-green-500")}>
                         {result.reject_probability}%
                      </div>
                   </div>
                   <ShieldAlert className={cn("w-10 h-10", result.reject_probability > 50 ? "text-red-500" : "text-green-500")} />
                </div>

                {/* Summary */}
                <div className="p-10 rounded-[40px] bg-white border border-slate-200 space-y-4 shadow-lg shadow-slate-100">
                   <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-brand-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Neural Summary</h3>
                   </div>
                   <p className="text-sm text-slate-600 font-medium leading-relaxed italic border-l-2 border-brand-primary/30 pl-6">
                      "{result.summary}"
                   </p>
                </div>

                {/* Capability Drill-down */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 px-4">
                      <TargetIcon className="w-4 h-4 text-brand-secondary" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Capability Evidence</h3>
                   </div>
                   {result.capabilities.map((cap: any, i: number) => (
                      <CapabilityDrillDown key={i} cap={cap} />
                   ))}
                </div>

                {/* Video Intelligence */}
                <div className="p-10 rounded-[40px] bg-white border border-slate-200 space-y-8 shadow-lg shadow-slate-100">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Video className="w-4 h-4 text-brand-accent" />
                         <h3 className="text-[10px] font-black uppercase tracking-[0.5em]">Video Intelligence</h3>
                      </div>
                      <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest">
                         {result.video_intelligence.confidence_score}% Confidence
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                         <div className="text-[8px] font-bold text-slate-400 uppercase mb-2">Authenticity</div>
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                               <div key={i} className={cn("h-1 flex-1 rounded-full", i < 4 ? "bg-brand-accent" : "bg-slate-200")} />
                            ))}
                         </div>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                         <div className="text-[8px] font-bold text-slate-400 uppercase mb-1">Energy Level</div>
                         <div className="text-xs font-black text-brand-accent">{result.video_intelligence.energy_level}</div>
                      </div>
                   </div>
                </div>

                {/* Red Flags */}
                <div className="space-y-4">
                    {result.red_flags.map((flag: any, i: number) => (
                      <div key={i} className="p-6 rounded-3xl bg-red-50 border border-red-100 flex items-start gap-4">
                         <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                         <div>
                            <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">{flag.label}</div>
                            <p className="text-xs text-slate-600 font-medium mt-1">{flag.description}</p>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Quick Tags */}
                <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500">
                         {tag}
                      </span>
                   ))}
                </div>

                <div className="pt-10 flex flex-col items-center">
                   <Fingerprint className="w-12 h-12 text-slate-200 mb-4" />
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Recruiter Operating System v1.0</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function UploadCard({ title, subtitle, icon: Icon, status, onChange }: any) {
  return (
    <div className="p-8 rounded-[40px] bg-white border border-slate-200 group hover:border-brand-primary/50 hover:shadow-brand-primary/10 transition-all cursor-pointer relative overflow-hidden shadow-xl shadow-slate-100">
       <input 
         type="file" 
         className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full" 
         onChange={(e) => onChange(e.target.files?.[0] || null)}
       />
       <div className="flex items-center gap-6 relative z-10 pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform shadow-inner">
             <Icon className="w-8 h-8 text-slate-400 group-hover:text-brand-primary transition-colors" />
          </div>
          <div className="flex-1">
             <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{subtitle}</p>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-colors",
            status === 'Ready' ? "bg-green-500/20 text-green-600 border border-green-500/20" : "bg-slate-50 text-slate-500 border border-slate-200"
          )}>
             {status}
          </div>
       </div>
    </div>
  );
}

function PipelineStep({ label, icon: Icon, active, completed }: any) {
  return (
    <div className="flex items-center gap-6 group">
       <div className={cn(
         "w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 relative z-10",
         completed ? "bg-brand-primary border-brand-primary shadow-[0_0_20px_rgba(0,229,255,0.4)]" :
         active ? "bg-white border-brand-primary shadow-xl animate-pulse" : "bg-slate-50 border-slate-200 opacity-50"
       )}>
          <Icon className={cn("w-6 h-6", completed ? "text-white" : active ? "text-brand-primary" : "text-slate-400")} />
          {active && <div className="absolute inset-0 bg-brand-primary/20 animate-ping rounded-2xl" />}
       </div>
       <div className={cn(
         "transition-all duration-700",
         completed ? "opacity-100" : active ? "opacity-100 scale-105" : "opacity-40"
       )}>
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">{label}</h4>
          {active && <div className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] mt-1">Analyzing...</div>}
          {completed && <div className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em] mt-1">Verified</div>}
       </div>
    </div>
  );
}

function CapabilityDrillDown({ cap }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "rounded-[32px] border transition-all duration-500 overflow-hidden cursor-pointer",
        expanded ? "bg-slate-50 border-slate-300" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
      )}
      onClick={() => setExpanded(!expanded)}
    >
       <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-[10px] text-brand-primary border border-slate-200">
                {Math.round(cap.score)}
             </div>
             <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">{cap.capability}</h4>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
             <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
          </motion.div>
       </div>
       
       <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6 space-y-4"
            >
               <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <div className="text-[8px] font-black text-brand-primary uppercase mb-2 tracking-widest">Neural Reasoning</div>
                  <p className="text-[10px] text-slate-600 font-medium leading-relaxed italic">"{cap.reasoning}"</p>
               </div>
               <div className="space-y-2">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-2">Evidence Nodes</div>
                  {cap.evidence.map((ev: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                       <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5" />
                       <span className="text-[10px] text-slate-600 font-medium leading-tight">{ev}</span>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}

function TargetIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
