import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Upload, 
  Search, 
  FileText, 
  Brain, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Activity,
  Zap,
  Sparkles,
  Layers,
  Terminal,
  Loader2
} from "lucide-react";
import { GeminiService } from "../services/gemini";
import { cn } from "../lib/utils";

export default function SessionAutopsy() {
  const [transcript, setTranscript] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!transcript) return;
    setAnalyzing(true);
    try {
      const data = await GeminiService.analyzeSession(transcript);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 font-sans bg-mesh min-h-screen text-slate-900 p-8">
      <header className="flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <Activity className="text-brand-primary w-5 h-5" />
          </div>
          <span className="text-brand-secondary font-bold tracking-widest uppercase text-[10px]">Neural Diagnostics</span>
        </motion.div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.05em] text-slate-900 uppercase italic ai-glow-text">
          Session <span className="text-brand-primary">Autopsy</span>.
        </h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Deep AI analysis of trainer performance and communication DNA.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
        {/* Input Panel */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-10 h-full flex flex-col relative overflow-hidden bg-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 mb-10 relative z-10">
              <Terminal className="w-5 h-5 text-brand-primary" />
              <h3 className="text-xl font-bold text-slate-900">Input Source</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-8 relative z-10">
              <textarea
                placeholder="Paste session transcript here (Zoom, Teams, or Audio transcription)..."
                className="flex-1 min-h-[450px] w-full bg-slate-50 border border-slate-200 rounded-[40px] p-10 text-base text-slate-700 focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-sans custom-scrollbar placeholder:text-slate-300 shadow-inner"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || !transcript}
                  className="btn-nextgen flex-1 py-6 group"
                >
                  {analyzing ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Analytic Reasoning...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Brain className="w-6 h-6 group-hover:animate-pulse" />
                      <span>Run AI Autopsy</span>
                    </div>
                  )}
                </button>
                <button className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-brand-primary hover:bg-white hover:border-brand-primary transition-all shadow-xl shadow-slate-200">
                  <Upload className="w-7 h-7 mx-auto" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-3">
          <AnimatePresence mode="wait">
            {!result && !analyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="glass-panel p-12 h-full min-h-[600px] flex flex-col items-center justify-center text-center relative overflow-hidden bg-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />
                <div className="w-28 h-28 rounded-full bg-slate-50 flex items-center justify-center mb-10 border border-slate-100 shadow-inner">
                  <Activity className="w-12 h-12 text-slate-200" />
                </div>
                <h4 className="text-3xl font-black mb-4 tracking-tight uppercase italic">System Ready</h4>
                <p className="text-slate-400 max-w-sm text-lg font-medium leading-relaxed">
                  Upload or paste a session transcript to begin the AI-powered intelligence autopsy.
                </p>
              </motion.div>
            ) : analyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-12 h-full min-h-[600px] flex flex-col items-center justify-center text-center relative overflow-hidden bg-white"
              >
                <div className="scan-line" />
                <div className="relative mb-16">
                  <div className="absolute inset-0 bg-brand-primary/10 blur-[80px] rounded-full animate-orb" />
                  <div className="w-40 h-40 rounded-full border-[8px] border-slate-50 border-t-brand-primary animate-spin relative shadow-2xl shadow-brand-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-brand-primary animate-pulse" />
                  </div>
                </div>
                <h4 className="text-4xl font-black mb-4 ai-glow-text uppercase italic">AI Reasoning Engine</h4>
                <p className="text-brand-secondary font-black text-[10px] tracking-[.5em] uppercase">Processing pedagogical semantic layers</p>
                
                <div className="mt-16 w-80 space-y-4">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-gradient-to-r from-transparent via-brand-primary to-transparent" 
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                {/* Score Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ScoreBox label="Clarity" score={result.clarityScore} color="cyan" />
                  <ScoreBox label="Engagement" score={result.engagementScore} color="purple" />
                  <ScoreBox label="Confidence" score={result.confidenceScore} color="pink" />
                  <ScoreBox label="Pacing" score={result.pacingScore} color="blue" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Strengths */}
                  <div className="neon-card p-10 bg-white">
                    <div className="flex items-center gap-3 mb-10">
                       <ShieldCheck className="w-6 h-6 text-brand-primary" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.4em]">Intelligence Strengths</h4>
                    </div>
                    <ul className="space-y-5">
                      {result.strengths.map((s: string, i: number) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group"
                        >
                          <CheckCircle2 className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <p className="text-base text-slate-700 font-bold leading-relaxed italic">"{s}"</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Vectors */}
                  <div className="neon-card p-10 bg-white">
                    <div className="flex items-center gap-3 mb-10">
                       <AlertCircle className="w-6 h-6 text-brand-accent" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.4em]">Growth Vectors</h4>
                    </div>
                    <ul className="space-y-5">
                      {result.weaknesses.map((w: string, i: number) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group"
                        >
                          <AlertCircle className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <p className="text-base text-slate-700 font-bold leading-relaxed italic">"{w}"</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Roadmap */}
                <div className="glass-panel p-10 bg-white border-brand-primary/10 shadow-2xl shadow-brand-primary/5">
                  <div className="flex items-center gap-3 mb-10">
                     <Brain className="w-6 h-6 text-brand-secondary" />
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.4em]">Coaching Roadmap</h4>
                  </div>
                  <div className="space-y-5">
                    {result.suggestions.map((s: string, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:border-brand-primary/30"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-10 h-10 rounded-2xl bg-white text-brand-primary flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                            0{i + 1}
                          </div>
                          <p className="text-base text-slate-700 font-black italic">{s}</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-brand-primary transition-all group-hover:translate-x-2" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DNA Evidence */}
                <div className="neon-card p-10 bg-slate-50/50">
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-6 h-6 text-brand-primary" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[.5em]">DNA Signature Evidence</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {result.personalityTraits.map((t: string, i: number) => (
                      <span key={i} className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[10px] font-black text-brand-secondary uppercase tracking-[0.3em] shadow-lg shadow-slate-100 transition-all hover:scale-105 hover:border-brand-primary">
                        {t}
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
  );
}

function ScoreBox({ label, score, color }: any) {
  const colors: any = {
    cyan: "text-brand-primary border-brand-primary/10 bg-brand-primary/5 shadow-2xl shadow-brand-primary/5",
    purple: "text-brand-secondary border-brand-secondary/10 bg-brand-secondary/5 shadow-2xl shadow-brand-secondary/5",
    pink: "text-brand-accent border-brand-accent/10 bg-brand-accent/5 shadow-2xl shadow-brand-accent/5",
    blue: "text-blue-500 border-blue-500/10 bg-blue-500/5 shadow-2xl shadow-blue-500/5",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.05 }}
      className={cn("glass-panel p-8 flex flex-col items-center justify-center text-center border-2 transition-all bg-white", colors[color])}
    >
      <p className="text-[10px] uppercase font-black tracking-[0.4em] mb-3 text-slate-400">{label}</p>
      <p className="text-5xl font-black tracking-tighter">{score}</p>
    </motion.div>
  );
}
