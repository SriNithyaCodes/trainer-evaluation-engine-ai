import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Brain, 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Terminal, 
  Layers, 
  Fingerprint, 
  Eye, 
  Sparkles,
  Search,
  MessageSquare,
  Clock,
  History,
  TrendingUp,
  Cpu,
  Video
} from 'lucide-react';
import { generateForm, submitAnswer, getFormState } from '../services/api';
import { cn } from '../lib/utils';

interface Question {
  id: string;
  section: string;
  type: string;
  prompt: string;
  expected_signals: string[];
}

interface Signals {
  patience: number;
  scenario_reasoning: number;
  ai_authenticity: number;
  diagnostic_ability: number;
  concept_simplification: number;
}

export default function AdaptiveFrictionEvaluation() {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [signals, setSignals] = useState<Signals>({
    patience: 50,
    scenario_reasoning: 50,
    ai_authenticity: 100,
    diagnostic_ability: 50,
    concept_simplification: 50
  });
  const [adaptiveLogs, setAdaptiveLogs] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<'tech' | 'soft'>('tech');
  const [behaviorMetrics, setBehaviorMetrics] = useState({
    typing_speed: 0,
    pauses: 0,
    edits: 0,
    startTime: Date.now()
  });

  // Track behavioral metrics
  const lastKeyTime = useRef(Date.now());
  const editCount = useRef(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    const diff = now - lastKeyTime.current;
    if (diff > 2000) {
      setBehaviorMetrics(prev => ({ ...prev, pauses: prev.pauses + 1 }));
    }
    if (e.target.value.length < answer.length) {
      editCount.current += 1;
    }
    setAnswer(e.target.value);
    lastKeyTime.current = now;
  };

  const startEvaluation = async () => {
    setLoading(true);
    try {
      const subject = selectedRole === 'tech' ? 'Java + DSA' : 'Communication & Empathy';
      const trainerType = selectedRole === 'tech' ? 'Senior Technical Trainer' : 'Soft Skills Lead';
      const data = await generateForm(subject, trainerType);
      setFormId(data.form_id);
      setQuestions(data.questions);
      setSignals(data.signals);
      setAdaptiveLogs(["System Initialized", "Behavioral tracking active"]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim() || submitting || !formId) return;
    setSubmitting(true);
    
    const metrics = {
      ...behaviorMetrics,
      edits: editCount.current,
      total_time: (Date.now() - behaviorMetrics.startTime) / 1000
    };

    try {
      const res = await submitAnswer({
        form_id: formId,
        question_id: questions[currentIndex].id,
        answer,
        behavior_metrics: metrics
      });

      setSignals(res.signals);
      setAdaptiveLogs(prev => [res.analysis_brief, ...prev]);
      
      // Refresh state to get any injected follow-up questions
      const newState = await getFormState(formId);
      setQuestions(newState.questions);
      
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      editCount.current = 0;
      setBehaviorMetrics({
        typing_speed: 0,
        pauses: 0,
        edits: 0,
        startTime: Date.now()
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex];

  if (!formId) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-12 bg-mesh">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-black rounded-[32px] flex items-center justify-center mx-auto shadow-2xl">
            <Shield className="w-12 h-12 text-brand-primary" />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic ai-glow-text">
            Friction <span className="text-brand-primary">Engine</span>.
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto font-medium leading-relaxed">
            Initialize the adaptive capability-testing engine for specialized trainer evaluation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8">
           <div 
             onClick={() => setSelectedRole('tech')}
             className={`glass-panel p-10 space-y-4 hover:shadow-2xl transition-all cursor-pointer group bg-white ${selectedRole === 'tech' ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-slate-200'}`}
           >
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Terminal className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold">Tech Trainer V1</h3>
              <p className="text-sm text-slate-400 font-medium">Full-stack, DSA, and System Design blueprint.</p>
           </div>
           <div 
             onClick={() => setSelectedRole('soft')}
             className={`glass-panel p-10 space-y-4 hover:shadow-2xl transition-all cursor-pointer group bg-white ${selectedRole === 'soft' ? 'border-brand-secondary ring-2 ring-brand-secondary/20' : 'border-slate-200'}`}
           >
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Layers className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold">Soft Skills Lead</h3>
              <p className="text-sm text-slate-400 font-medium">Communication, leadership, and empathy blueprint.</p>
           </div>
        </div>

        <button 
          onClick={startEvaluation}
          disabled={loading}
          className="btn-nextgen px-16 py-6 group"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
            <div className="flex items-center gap-3">
               <span>Initialize Evaluation Engine</span>
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 bg-mesh min-h-screen text-slate-900 font-sans">
      <div className="scan-line opacity-10" />
      
      {/* LEFT PANEL: Adaptive Form */}
      <div className="lg:col-span-7 space-y-10">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <Shield className="text-brand-primary w-5 h-5" />
            </div>
            <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Adaptive Friction Form</span>
          </div>
          <h1 className="text-5xl font-black tracking-[-0.05em] uppercase italic ai-glow-text">
            Evaluation <span className="text-brand-primary">Module</span>.
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">High-pressure capability detection in real-time.</p>
        </header>

        <AnimatePresence mode="wait">
          {currentIndex < questions.length ? (
            <motion.div 
              key={currentQ.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="glass-panel p-12 bg-white space-y-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                 <span className="text-[10px] font-black text-slate-200 uppercase tracking-[0.5em]">Section 0{questions.findIndex(q => q.id === currentQ.id) + 1}</span>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                  <Brain className="w-4 h-4" />
                  {currentQ.section}
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  {currentQ.prompt}
                </h2>
              </div>

              <div className="space-y-8">
                {currentQ.type === 'video' ? (
                   <div className="aspect-video bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-6 group hover:border-brand-primary transition-colors">
                      <div className="w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                         <Video className="w-8 h-8 text-slate-300 group-hover:text-brand-primary" />
                      </div>
                      <div className="text-center">
                         <p className="text-sm font-bold text-slate-600">Click to record or upload demo</p>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">AI Authenticity Scan Active</p>
                      </div>
                   </div>
                ) : (
                  <textarea 
                    value={answer}
                    onChange={handleTextChange}
                    placeholder="Provide your detailed reasoning..."
                    className="w-full h-80 bg-slate-50 border border-slate-300 rounded-[40px] p-10 text-lg text-black font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-sans custom-scrollbar placeholder:text-slate-400 shadow-inner"
                  />
                )}

                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                       <Clock className="w-4 h-4" />
                       {Math.floor((Date.now() - behaviorMetrics.startTime) / 1000)}s Elapsed
                    </div>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    disabled={submitting || (!answer.trim() && currentQ.type !== 'video')}
                    className="btn-nextgen px-12 py-5 group"
                  >
                    {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                      <div className="flex items-center gap-3">
                         <span>Analyze & Continue</span>
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-20 text-center space-y-10 bg-white"
            >
               <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter ai-glow-text">Evaluation Complete</h2>
                  <p className="text-slate-400 text-lg font-medium max-w-md mx-auto">
                    Capabilities mapped. Neural fingerprint stored. System generates final report.
                  </p>
               </div>
               <button className="btn-nextgen px-16 py-6 uppercase tracking-[0.3em] font-black">View Final Intelligence Report</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT PANEL: AI Evaluation Monitor */}
      <div className="lg:col-span-5 space-y-10">
        <div className="neon-card p-12 h-full bg-white relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
           
           <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-4">
                 <Activity className="w-6 h-6 text-brand-primary" />
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Live AI Monitoring</h3>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
                 <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Neural Link Active</span>
              </div>
           </div>

           {/* Capability Signals */}
           <div className="space-y-10 relative z-10">
              <SignalBar label="Patience" value={signals.patience} color="cyan" />
              <SignalBar label="Scenario Reasoning" value={signals.scenario_reasoning} color="purple" />
              <SignalBar label="AI Authenticity" value={signals.ai_authenticity} color="pink" />
              <SignalBar label="Diagnostic Ability" value={signals.diagnostic_ability} color="blue" />
              <SignalBar label="Concept Simplification" value={signals.concept_simplification} color="cyan" />
           </div>

           {/* Behavioral Indicators */}
           <div className="mt-16 pt-16 border-t border-slate-100 space-y-10 relative z-10">
              <div className="flex items-center gap-3">
                 <Cpu className="w-5 h-5 text-brand-secondary" />
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Behavioral Vectors</h4>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <BehaviorBox label="Edit Frequency" value={editCount.current} sub="Active Edits" />
                 <BehaviorBox label="Thought Pauses" value={behaviorMetrics.pauses} sub="Neural Gaps" />
              </div>
           </div>

           {/* Adaptive Logs */}
           <div className="mt-16 space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                 <History className="w-5 h-5 text-brand-accent" />
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Adaptive Decision Log</h4>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-4">
                 {adaptiveLogs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4 group hover:bg-white hover:shadow-xl transition-all"
                    >
                       <div className="w-2 h-2 rounded-full bg-brand-primary mt-1.5 animate-pulse" />
                       <p className="text-xs text-slate-500 font-bold leading-relaxed">{log}</p>
                    </motion.div>
                 ))}
                 {adaptiveLogs.length === 0 && (
                    <div className="text-center py-10 opacity-20">
                       <Terminal className="w-8 h-8 mx-auto mb-4" />
                       <p className="text-[9px] font-black uppercase tracking-widest">Awaiting neural input...</p>
                    </div>
                 )}
              </div>
           </div>
           
           <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center relative z-10">
              <Fingerprint className="w-10 h-10 text-brand-primary/20 mb-4" />
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Cryptographic Proof Active</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function SignalBar({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: any = {
    cyan: "bg-brand-primary shadow-[0_0_15px_rgba(0,229,255,0.4)]",
    purple: "bg-brand-secondary shadow-[0_0_15px_rgba(110,0,255,0.4)]",
    pink: "bg-brand-accent shadow-[0_0_15px_rgba(255,0,200,0.4)]",
    blue: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  };

  return (
    <div className="space-y-4">
       <div className="flex justify-between items-end">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{label}</p>
          <span className="text-lg font-black italic ai-glow-text">{Math.round(value)}%</span>
       </div>
       <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1 }}
            className={cn("h-full rounded-full transition-all duration-1000", colors[color])} 
          />
       </div>
    </div>
  );
}

function BehaviorBox({ label, value, sub }: { label: string; value: number | string; sub: string }) {
  return (
    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center space-y-2 group hover:bg-white hover:shadow-2xl transition-all shadow-inner">
       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
       <p className="text-4xl font-black text-slate-900 italic group-hover:scale-110 transition-transform">{value}</p>
       <p className="text-[8px] font-black text-brand-primary uppercase tracking-widest">{sub}</p>
    </div>
  );
}
