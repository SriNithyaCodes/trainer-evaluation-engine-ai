import React, { useState } from 'react';
import { Upload, FileText, BarChart3, Heart, Target, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SessionAnalysis: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        scores: { clarity: 8.5, engagement: 7.2, confidence: 9.1, pacing: 6.8 },
        strengths: ["Strong technical analogies", "Excellent volume control"],
        weaknesses: ["Rapid topic transitions", "Limited eye contact simulation"],
        sentiment: "Highly Positive with occasional Confusion spikes"
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-2">Session Autopsy</h2>
          <p className="text-gray-400">Upload your training sessions for deep AI evaluation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card border-dashed border-2 border-primary/30 py-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="font-bold mb-1">Upload Session</p>
            <p className="text-xs text-gray-500">MP4, MP3, or TXT (Max 500MB)</p>
          </div>

          <div className="glass-card p-4">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-secondary" />
              AI Pre-check
            </h3>
            <ul className="space-y-3">
              {[
                "Audio Quality: Optimal",
                "Speaker Separation: Enabled",
                "Dialect Detection: English (US)",
                "Sentiment Accuracy: 98.4%"
              ].map((item, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {analyzing ? 'AI Processing...' : 'Start Autopsy'}
          </button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {!result && !analyzing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-gray-500"
              >
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p>Upload a session to see the AI Autopsy</p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                <p className="text-primary font-bold animate-pulse">Gemini Pro is analyzing the transcript...</p>
                <p className="text-xs text-gray-500 mt-2">Extracting sentiment and engagement markers</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.scores).map(([key, value]: any) => (
                    <div key={key} className="glass-card p-4 text-center">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">{key}</p>
                      <p className="text-2xl font-bold text-primary">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card bg-green-500/5 border-green-500/20">
                    <h4 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Growth Vectors
                    </h4>
                    <ul className="space-y-2">
                      {result.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-gray-300">• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-card bg-orange-500/5 border-orange-500/20">
                    <h4 className="text-sm font-bold text-orange-400 mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Blind Spots
                    </h4>
                    <ul className="space-y-2">
                      {result.weaknesses.map((w: string, i: number) => (
                        <li key={i} className="text-sm text-gray-300">• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h4 className="font-bold mb-4">Sentiment Heatmap</h4>
                  <div className="h-4 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full mb-2" />
                  <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
                    <span>Frustration</span>
                    <span>Neutral</span>
                    <span>Engagement</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SessionAnalysis;
