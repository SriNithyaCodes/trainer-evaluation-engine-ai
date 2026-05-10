import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Brain, Target, Shield, AlertTriangle, 
  ChevronRight, Loader2, BarChart3, Users, 
  Clock, CreditCard, Monitor, BookOpen, Layers,
  Terminal, Sparkles, TrendingUp, Compass
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell 
} from 'recharts';
import { analyzeRequirement } from '../services/api';

const RequirementIntelligence: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({
    subject: 'Java + DSA',
    duration: 40,
    budget: 40000,
    delivery_mode: 'Online',
    batch_size: 30,
    project_type: 'Mini Project',
    topics: 'Java Fundamentals, Collections, OOPs, Arrays, Linked Lists, Trees, Graphs, Sorting, Searching.',
    experience_preference: 4
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateAnalysis = async () => {
    setLoading(true);
    try {
      const data = await analyzeRequirement(formData);
      setAnalysis(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <Brain className="text-brand-primary w-6 h-6" />
            </div>
            <span className="text-brand-secondary font-bold tracking-widest uppercase text-xs">Module 01: Entry Intelligence</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 italic tracking-tighter uppercase leading-[0.85]"
          >
            <span className="text-slate-900">Requirement</span> <br />
            <span className="text-slate-900">Intelligence</span> <br />
            <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Engine</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl text-lg font-medium"
          >
            Autonomous trainer assessment blueprint generator powered by Impexus CPS-01 logic.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL - INPUT */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 sticky top-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="text-brand-primary w-5 h-5" />
                <h2 className="text-lg font-bold">Requirement Input</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Subject</label>
                  <select 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-futuristic"
                  >
                    <option>Python</option>
                    <option>Python + DSA</option>
                    <option>Java</option>
                    <option>Java + DSA</option>
                    <option>C</option>
                    <option>C + DSA</option>
                    <option>Python Data Science</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Duration (Hrs)</label>
                    <input 
                      type="number" 
                      name="duration" 
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="input-futuristic" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Budget (INR)</label>
                    <input 
                      type="number" 
                      name="budget" 
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input-futuristic" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Delivery</label>
                    <select 
                      name="delivery_mode" 
                      value={formData.delivery_mode}
                      onChange={handleInputChange}
                      className="input-futuristic"
                    >
                      <option>Online</option>
                      <option>In-Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Batch Size</label>
                    <input 
                      type="number" 
                      name="batch_size" 
                      value={formData.batch_size}
                      onChange={handleInputChange}
                      className="input-futuristic" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Project Component</label>
                  <select 
                    name="project_type" 
                    value={formData.project_type}
                    onChange={handleInputChange}
                    className="input-futuristic"
                  >
                    <option>None</option>
                    <option>Mini Project</option>
                    <option>Major Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Experience (Years)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="15" 
                      name="experience_preference"
                      value={formData.experience_preference}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary" 
                    />
                    <span className="text-brand-primary font-bold w-12 text-center">{formData.experience_preference}Y</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-black uppercase tracking-[0.3em] mb-3">Topics Covered</label>
                  <textarea 
                    rows={4} 
                    name="topics"
                    value={formData.topics}
                    onChange={handleInputChange}
                    className="input-futuristic resize-none text-xs"
                    placeholder="Enter detailed syllabus..."
                  />
                </div>

                <button 
                  onClick={generateAnalysis}
                  disabled={loading}
                  className="btn-nextgen w-full group flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>AI Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                      <span>Generate AI Evaluation Blueprint</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL - OUTPUT */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!analysis && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="h-full min-h-[600px] glass-panel flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Zap className="text-slate-200 w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Engine Standby</h3>
                  <p className="text-slate-400 max-w-sm font-medium">
                    Enter the hiring requirements on the left to activate the AI Intelligence Engine and generate a trainer blueprint.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[600px] glass-panel flex flex-col items-center justify-center p-12 overflow-hidden relative"
                >
                  <div className="scan-line" />
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/10 blur-[80px] rounded-full animate-orb" />
                    <Brain className="w-24 h-24 text-brand-primary relative animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black mt-8 ai-glow-text animate-pulse italic uppercase">Analyzing Requirements</h3>
                  <div className="mt-12 w-64 space-y-4">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full w-full bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                      <span>Neural Mapping</span>
                      <span>87% complete</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {analysis && !loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* 1. TOP ROW: SKILL GRAPH & DIFFICULTY */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Derived Skill Graph */}
                    <div className="neon-card lg:col-span-1 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Target className="text-brand-primary w-5 h-5" />
                          <h3 className="font-bold">Skill Matrix</h3>
                        </div>
                      </div>
                      
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analysis.derived_skills} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="skill" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 9, fontWeight: 700}} />
                            <Tooltip 
                              cursor={{fill: 'rgba(0,0,0,0.02)'}}
                              contentStyle={{backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}
                            />
                            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                              {analysis.derived_skills.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00e5ff' : '#6e00ff'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Intelligence Radar */}
                    <div className="neon-card lg:col-span-1 p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <Brain className="text-brand-secondary w-5 h-5" />
                        <h3 className="font-bold">Intelligence Radar</h3>
                      </div>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysis.derived_skills}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="skill" tick={{fill: '#64748b', fontSize: 8, fontWeight: 700}} />
                            <Radar
                              name="Requirement"
                              dataKey="score"
                              stroke="#00e5ff"
                              fill="#00e5ff"
                              fillOpacity={0.3}
                              strokeWidth={3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Difficulty Engine */}
                    <div className="neon-card lg:col-span-1 p-8 flex flex-col justify-between bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <TrendingUp className="text-brand-accent w-5 h-5" />
                          <h3 className="font-bold text-slate-900">Difficulty Engine</h3>
                        </div>
                        
                        <div className="flex items-end gap-4 mb-6">
                          <span className="text-6xl font-black text-slate-900 tracking-tighter">
                            {analysis.difficulty.score}%
                          </span>
                          <div className="mb-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Level</div>
                            <div className="text-xl font-bold text-brand-secondary">{analysis.difficulty.level}</div>
                          </div>
                        </div>
                        
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed border-l-2 border-slate-200 pl-4 italic">
                          "{analysis.difficulty.reasoning}"
                        </p>
                      </div>

                      <div className="mt-8">
                         <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${analysis.difficulty.score}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary"
                            />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. IDEAL PERSONA */}
                  <div className="neon-card p-10 bg-gradient-to-br from-white to-slate-50">
                    <div className="flex items-center gap-2 mb-8">
                      <Users className="text-brand-primary w-5 h-5" />
                      <h3 className="font-bold">Ideal Trainer Persona</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                      <div className="md:col-span-1">
                        <div className="w-full aspect-square rounded-[32px] bg-slate-50 flex flex-col items-center justify-center border border-slate-100 relative overflow-hidden shadow-inner">
                           <div className="absolute inset-0 bg-brand-primary/5 animate-pulse" />
                           <Brain className="w-12 h-12 text-brand-primary mb-3 relative" />
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary relative">Persona Match</div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Trainer Type</div>
                          <div className="text-xl font-black text-slate-900">{analysis.trainer_persona.type}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Personality</div>
                          <div className="text-sm text-slate-600 font-medium">{analysis.trainer_persona.personality}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Communication Style</div>
                          <div className="text-sm text-slate-600 font-medium">{analysis.trainer_persona.communication_style}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engagement Behavior</div>
                          <div className="text-sm text-slate-600 font-medium">{analysis.trainer_persona.engagement_behavior}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. CAPABILITY MAPPING */}
                  <div className="glass-panel p-10 bg-white">
                    <div className="flex items-center gap-2 mb-8">
                      <Layers className="text-brand-secondary w-5 h-5" />
                      <h3 className="font-bold">Capability Mapping (CPS-01)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {analysis.capability_mapping.map((cap: any, index: number) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col h-full hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group"
                        >
                          <div className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-4 group-hover:text-brand-primary transition-colors">{cap.capability}</div>
                          <div className="text-xs text-slate-400 mb-6 font-medium line-clamp-3">{cap.importance}</div>
                          <div className="mt-auto space-y-3">
                            <div className="p-3 bg-white rounded-2xl border border-slate-100">
                              <div className="text-[8px] font-black text-slate-300 uppercase mb-1 tracking-widest">Test Scope</div>
                              <div className="text-[10px] leading-tight font-bold text-slate-700">{cap.what_to_test}</div>
                            </div>
                            <div className="flex items-center gap-2 text-brand-primary px-1">
                              <Compass className="w-3 h-3" />
                              <span className="text-[9px] font-black uppercase tracking-widest">{cap.recommended_method}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 4. EVALUATION TASKS */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 space-y-4">
                      <div className="flex items-center gap-2 mb-6 px-2">
                        <Monitor className="text-brand-primary w-5 h-5" />
                        <h3 className="font-bold text-slate-900">Adaptive Evaluation Tasks</h3>
                      </div>
                      
                      {analysis.evaluation_tasks.map((task: any, index: number) => (
                        <motion.div 
                          key={index}
                          whileHover={{ x: 10 }}
                          className="group p-8 bg-white border border-slate-100 rounded-[32px] flex items-center gap-8 transition-all hover:shadow-2xl hover:shadow-slate-100"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-brand-primary text-xl shadow-inner group-hover:bg-brand-primary group-hover:text-white transition-all">
                            0{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h4 className="font-black text-xl text-slate-900">{task.title}</h4>
                              <span className="px-3 py-1 rounded-full bg-slate-100 text-[9px] font-black uppercase text-slate-400 tracking-widest">{task.difficulty}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{task.objective}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-brand-secondary" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.mapped_capability}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-brand-primary transition-all translate-x-0 group-hover:translate-x-2" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Risk Analysis */}
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-8 px-2">
                        <AlertTriangle className="text-brand-accent w-5 h-5" />
                        <h3 className="font-bold text-slate-900">Risk Analysis</h3>
                      </div>
                      
                      <div className="space-y-6">
                        {analysis.risks.map((risk: any, index: number) => (
                          <div key={index} className="p-6 border border-slate-100 bg-white rounded-[32px] shadow-lg shadow-slate-100/50">
                            <div className="font-black text-brand-accent mb-3 flex items-center gap-2 text-xs uppercase tracking-widest">
                               <Shield className="w-4 h-4" />
                               {risk.risk}
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                              {risk.mitigation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 5. AI DECISION TIMELINE */}
                  <div className="neon-card p-12 bg-white">
                    <div className="flex items-center gap-2 mb-12">
                      <Sparkles className="text-brand-primary w-5 h-5" />
                      <h3 className="font-bold">AI Decision Architecture</h3>
                    </div>
                    
                    <div className="flex items-center justify-between relative px-12">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-50 -translate-y-1/2 z-0" />
                      
                      {analysis.timeline.map((step: any, index: number) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            className={`w-5 h-5 rounded-full border-4 transition-all ${
                              step.status === 'completed' ? 'bg-brand-primary border-white shadow-xl shadow-brand-primary/40' : 'bg-white border-slate-100'
                            }`}
                          />
                          <div className="absolute top-10 text-center w-40">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{step.step}</div>
                            {step.status === 'completed' && <div className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Processed</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementIntelligence;
