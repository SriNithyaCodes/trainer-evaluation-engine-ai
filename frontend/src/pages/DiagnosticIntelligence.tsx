import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Brain, Zap, Activity, AlertTriangle, 
  CheckCircle2, ArrowRight, Loader2, Terminal, 
  Layers, Fingerprint, Eye, Sparkles, Search,
  Clock, History, Cpu, Video, FileText, Upload, 
  Scan, Gauge, ZapOff, RefreshCcw, Waves, Crosshair,
  Lock, UserCheck, Microscope, Bug, HelpCircle,
  Lightbulb, Target, ChevronRight, MessageSquare
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import { generateDiagnosticScenario, evaluateDiagnosticResponse } from '../services/api';
import { cn } from '../lib/utils';

export default function DiagnosticIntelligence() {
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [scenario, setScenario] = useState<any>(null);
  const [response, setResponse] = useState({
    first_question: '',
    reasoning: '',
    suspected_confusion: '',
    guidance_plan: ''
  });
  const [report, setReport] = useState<any>(null);

  const fetchScenario = async () => {
    setLoading(true);
    try {
      const data = await generateDiagnosticScenario("Java + DSA", "Intermediate");
      setScenario(data);
      setReport(null);
      setResponse({
        first_question: '',
        reasoning: '',
        suspected_confusion: '',
        guidance_plan: ''
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async () => {
    if (!response.first_question || evaluating) return;
    setEvaluating(true);
    try {
      const data = await evaluateDiagnosticResponse({
        scenario_id: scenario.id,
        ...response
      });
      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setEvaluating(true); // Keep it true for effect or reset later
      setEvaluating(false);
    }
  };

  useEffect(() => {
    fetchScenario();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins relative overflow-hidden">
      {/* Neural Logic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(110,0,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="scan-line opacity-[0.05]" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-2rem)]">
        
        {/* LEFT PANEL: Student Problem Context */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <header className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-100">
             <div className="flex items-center gap-3 mb-2">
                <Bug className="w-4 h-4 text-brand-secondary" />
                <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Diagnostic Module 05</h1>
             </div>
             <h2 className="text-2xl font-black italic uppercase tracking-tighter ai-glow-text">Student Confusion</h2>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
             {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                   <Loader2 className="w-8 h-8 animate-spin text-brand-secondary" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Generating Confusion Node...</p>
                </div>
             ) : scenario && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                   {/* Broken Code Snippet */}
                   <div className="p-6 rounded-[32px] bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Terminal className="w-4 h-4 text-brand-primary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Broken Implementation</span>
                         </div>
                         <span className="px-3 py-1 rounded-full bg-white/10 text-[8px] font-black uppercase tracking-widest text-slate-300 border border-white/10">{scenario.subject}</span>
                      </div>
                      <pre className="text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto p-4 bg-black/50 rounded-2xl">
                         {scenario.code}
                      </pre>
                   </div>

                   {/* Student Statement */}
                   <div className="p-6 rounded-[32px] bg-white border border-slate-200 space-y-4 border-l-4 border-l-brand-secondary shadow-lg shadow-slate-100">
                      <div className="flex items-center gap-3">
                         <MessageSquare className="w-4 h-4 text-brand-secondary" />
                         <h3 className="text-[10px] font-black uppercase tracking-widest">Student Feedback</h3>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                         "{scenario.student_statement}"
                      </p>
                   </div>

                   {/* Runtime Signals */}
                   <div className="p-6 rounded-[32px] bg-white border border-slate-200 space-y-4 shadow-lg shadow-slate-100">
                      <div className="flex items-center gap-3">
                         <Activity className="w-4 h-4 text-brand-accent" />
                         <h3 className="text-[10px] font-black uppercase tracking-widest">Runtime Behavior</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-[8px] font-bold text-slate-500 uppercase mb-1">Expected</div>
                            <div className="text-[10px] font-black text-green-600">{scenario.expected_output}</div>
                         </div>
                         <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-[8px] font-bold text-slate-500 uppercase mb-1">Actual</div>
                            <div className="text-[10px] font-black text-red-500">{scenario.actual_output}</div>
                         </div>
                      </div>
                   </div>
                </motion.div>
             )}
          </div>

          <button 
            onClick={fetchScenario}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
          >
             Regenerate Scenario
          </button>
        </div>

        {/* CENTER PANEL: Trainer Diagnostic Response */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-hidden">
           <header className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-100 flex justify-between items-center">
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <Target className="w-4 h-4 text-brand-primary" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Response Workspace</h2>
                 </div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase">Isolate the root cause of confusion</p>
              </div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                 <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse delay-75" />
              </div>
           </header>

           <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-12">
              <div className="space-y-4">
                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4">01. First Diagnostic Question</label>
                 <textarea 
                   value={response.first_question}
                   onChange={(e) => setResponse({...response, first_question: e.target.value})}
                   className="w-full bg-white border border-slate-200 rounded-[32px] p-6 text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:bg-slate-50 transition-all font-medium resize-none h-24 shadow-inner"
                   placeholder="e.g. 'What did you expect the value of n to be at this line?'"
                 />
              </div>

              <div className="space-y-4">
                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4">02. Reasoning (Why this question?)</label>
                 <textarea 
                   value={response.reasoning}
                   onChange={(e) => setResponse({...response, reasoning: e.target.value})}
                   className="w-full bg-white border border-slate-200 rounded-[32px] p-6 text-sm text-slate-900 focus:outline-none focus:border-brand-secondary focus:bg-slate-50 transition-all font-medium resize-none h-24 shadow-inner"
                   placeholder="Explain your diagnostic logic..."
                 />
              </div>

              <div className="space-y-4">
                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4">03. Suspected Confusion Node</label>
                 <textarea 
                   value={response.suspected_confusion}
                   onChange={(e) => setResponse({...response, suspected_confusion: e.target.value})}
                   className="w-full bg-white border border-slate-200 rounded-[32px] p-6 text-sm text-slate-900 focus:outline-none focus:border-brand-accent focus:bg-slate-50 transition-all font-medium resize-none h-24 shadow-inner"
                   placeholder="What is the student fundamentally missing?"
                 />
              </div>

              <div className="pt-6">
                 <button 
                   onClick={submitResponse}
                   disabled={evaluating || !response.first_question}
                   className={cn(
                     "w-full py-6 rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 relative overflow-hidden group border",
                     evaluating ? "bg-slate-100 border-slate-200 text-slate-400" : "bg-black text-white border-black hover:bg-slate-900 hover:scale-105 active:scale-95 shadow-xl hover:shadow-brand-secondary/20"
                   )}
                 >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                       {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-brand-secondary" />}
                       <span>{evaluating ? 'Analyzing Intelligence...' : 'Initialize AI Diagnostic Evaluation'}</span>
                    </div>
                 </button>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: AI Diagnostic Intelligence Evaluation */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
           <header className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-xl shadow-slate-100">
              <div className="flex items-center gap-3 mb-1">
                 <Gauge className="w-4 h-4 text-brand-primary" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Intelligence Report</h2>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Capability 04: Diagnostic Teaching</p>
           </header>

           <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
              <AnimatePresence mode="wait">
                 {!report ? (
                    <motion.div 
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 bg-white shadow-sm rounded-[48px]"
                    >
                       <Search className="w-16 h-16 mb-6 text-slate-300" />
                       <h3 className="text-xl font-black uppercase tracking-widest text-slate-500 italic">Neural Engine Awaiting</h3>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Initialize evaluation to view diagnostic scores</p>
                    </motion.div>
                 ) : (
                    <motion.div 
                      key="report"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6 pb-20"
                    >
                       {/* Intelligence Score */}
                       <div className="p-10 rounded-[48px] bg-white border border-slate-200 relative overflow-hidden text-center shadow-xl shadow-slate-100">
                          <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.5em] mb-4">Diagnostic Score</div>
                          <div className="text-7xl font-black italic tracking-tighter ai-glow-text mb-4">{report.score}</div>
                          <div className="flex justify-center gap-4">
                             <div className={cn(
                                "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                report.root_cause_identified ? "bg-green-50 border-green-200 text-green-600" : "bg-red-50 border-red-200 text-red-600"
                             )}>
                                {report.root_cause_identified ? "Root Cause Isolated" : "Root Cause Missed"}
                             </div>
                          </div>
                       </div>

                       {/* Precision Metrics */}
                       <div className="grid grid-cols-1 gap-4">
                          <MetricBar label="Problem-Space Narrowing" value={report.narrowing_score} color="cyan" />
                          <MetricBar label="Diagnostic Precision" value={report.precision_score} color="purple" />
                          <MetricBar label="Teaching Efficiency" value={report.efficiency_score} color="pink" />
                       </div>

                       {/* Neural Reasoning */}
                       <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-4 border-l-4 border-l-brand-primary shadow-lg shadow-slate-100">
                          <div className="flex items-center gap-3">
                             <Cpu className="w-4 h-4 text-brand-primary" />
                             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Neural Reasoning</h3>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                             "{report.summary}"
                          </p>
                       </div>

                       {/* Evidence Nodes */}
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 px-4">
                             <History className="w-4 h-4 text-brand-secondary" />
                             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-600">Evidence Drill-down</h3>
                          </div>
                          {report.evidence.map((ev: any, i: number) => (
                             <div key={i} className="p-6 rounded-[32px] bg-white border border-slate-200 space-y-2 shadow-sm">
                                <div className="text-[9px] font-black text-brand-secondary uppercase tracking-widest">{ev.point}</div>
                                <p className="text-[10px] text-slate-700 font-medium leading-relaxed">{ev.reason}</p>
                             </div>
                          ))}
                       </div>

                       {/* Detected Misconceptions */}
                       <div className="p-8 rounded-[40px] bg-white border border-slate-200 space-y-4 shadow-lg shadow-slate-100">
                          <div className="flex items-center gap-3">
                             <Fingerprint className="w-4 h-4 text-brand-accent" />
                             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Student Misconceptions Identified</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {report.detected_misconceptions.map((m: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-600">
                                   {m}
                                </span>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, color }: any) {
  const colors: any = {
    cyan: "bg-brand-primary",
    purple: "bg-brand-secondary",
    pink: "bg-brand-accent"
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-md">
       <div className="flex justify-between items-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
          <span className="text-xs font-black text-slate-900">{value}%</span>
       </div>
       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1 }}
            className={cn("h-full rounded-full", colors[color])}
          />
       </div>
    </div>
  );
}
