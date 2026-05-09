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
  Activity
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
    <div className="space-y-8 pb-20 font-sans">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Session Autopsy</h1>
        <p className="text-slate-500 text-sm">Deep AI analysis of trainer performance and communication DNA.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="pro-panel p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Input Source</h3>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                placeholder="Paste session transcript here (Zoom, Teams, or Audio transcription)..."
                className="flex-1 min-h-[400px] w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 focus:outline-none focus:border-blue-500 transition-all font-sans custom-scrollbar"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || !transcript}
                  className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-100"
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                      Analytic Reasoning...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      Run AI Autopsy
                    </>
                  )}
                </button>
                <button className="p-4 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all shadow-sm">
                  <Upload className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3">
          <AnimatePresence mode="wait">
            {!result && !analyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pro-panel p-10 h-full flex flex-col items-center justify-center text-center bg-slate-50/50"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <Activity className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">System Ready</h4>
                <p className="text-sm text-slate-500 max-w-sm">
                  Upload or paste a session transcript to begin the AI-powered intelligence autopsy.
                </p>
              </motion.div>
            ) : analyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pro-panel p-10 h-full flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-10">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-10 h-10 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">AI Reasoning Engine</h4>
                <p className="text-slate-400 font-bold text-[10px] tracking-[.3em] uppercase">Processing pedagogical semantic layers</p>
                
                <div className="mt-10 flex flex-col gap-2 w-full max-w-xs">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-full bg-blue-600" 
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ScoreBox label="Clarity" score={result.clarityScore} color="blue" />
                  <ScoreBox label="Engagement" score={result.engagementScore} color="indigo" />
                  <ScoreBox label="Confidence" score={result.confidenceScore} color="emerald" />
                  <ScoreBox label="Pacing" score={result.pacingScore} color="orange" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="pro-panel p-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[.2em] mb-6 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" />
                       Intelligence Strengths
                    </h4>
                    <ul className="space-y-3">
                      {result.strengths.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-emerald-900 font-medium">{s}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pro-panel p-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[.2em] mb-6 flex items-center gap-2">
                       <AlertCircle className="w-4 h-4 text-orange-500" />
                       Growth Vectors
                    </h4>
                    <ul className="space-y-3">
                      {result.weaknesses.map((w: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 bg-orange-50 p-3 rounded-xl border border-orange-100">
                          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-orange-900 font-medium">{w}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pro-panel p-6 bg-blue-50/50 border-blue-100">
                  <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-[.2em] mb-6 flex items-center gap-2">
                     <Brain className="w-4 h-4" />
                     Coaching Roadmap
                  </h4>
                  <div className="space-y-3">
                    {result.suggestions.map((s: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 group transition-all hover:border-blue-200">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                            0{i + 1}
                          </div>
                          <p className="text-sm text-slate-700 font-medium">{s}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pro-panel p-6 bg-slate-50 border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[.3em] mb-4">DNA Signature Evidence</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.personalityTraits.map((t: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
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
    blue: "text-blue-600 bg-blue-50/50 border-blue-100",
    indigo: "text-indigo-600 bg-indigo-50/50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
    orange: "text-orange-600 bg-orange-50/50 border-orange-100",
  };

  return (
    <div className={cn("pro-panel p-5 flex flex-col items-center justify-center text-center", colors[color])}>
      <p className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60 text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{score}</p>
    </div>
  );
}
