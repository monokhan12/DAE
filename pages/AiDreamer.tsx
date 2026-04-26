
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Sparkles, Loader2, ArrowRight, Eye, Camera, MapPin, Briefcase, Target, Zap, Download, Share2, Save, LogIn, CheckCircle2, ChevronRight, Brain } from 'lucide-react';
import { generateUnifiedCareerDream } from '../services/geminiService';
import { auth, saveRoadmap, loginWithGoogle, MockUser } from '../services/firebaseService';
import { UnifiedDreamResult, DreamerAnswers } from '../types';

const AiDreamer: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'questions' | 'results'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<DreamerAnswers>({
    dreamLocation: '',
    dreamEnvironment: '',
    primaryMotivation: '',
    preferredWorkStyle: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UnifiedDreamResult | null>(null);
  const [user, setUser] = useState<MockUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const startDreaming = async () => {
    if (!file || isLoading) return;
    setIsLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const synthesis = await generateUnifiedCareerDream(base64, file.type, answers);
      setResult(synthesis);
      setStep('results');
    } catch (error) {
      alert("The dreamer process failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !result) return;
    setIsSaving(true);
    try {
      await saveRoadmap(user.uid, result.roadmap);
      setSaveSuccess(true);
    } catch (error) {
      alert("Error saving your dream.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDERING HELPERS ---

  if (step === 'upload') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
          <Brain className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Phase 1: Professional Grounding</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
          Where are you <span className="text-blue-600">Starting</span>?
        </h1>
        <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
          Upload your CV. Our AI will analyze your technical grounding to anchor your professional dreams in reality.
        </p>

        <div className="max-w-xl mx-auto bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className={`border-4 border-dashed rounded-[2rem] p-12 transition-all ${file ? 'border-blue-500 bg-blue-50' : 'border-slate-100 group-hover:border-blue-200 bg-slate-50/50'}`}>
            {file ? (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-200">
                   <FileText className="w-10 h-10" />
                </div>
                <p className="font-black text-blue-600 text-xl tracking-tight">{file.name}</p>
                <p className="text-xs font-bold text-blue-400 mt-2 uppercase tracking-widest">Grounding Established</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-16 h-16 text-slate-300 mb-6" />
                <p className="text-slate-900 font-black text-2xl tracking-tight">Drop your CV here</p>
                <p className="text-slate-400 font-medium mt-2">PDF, JPEG, or PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        </div>

        {file && (
          <button 
            onClick={() => setStep('questions')}
            className="mt-12 bg-slate-900 hover:bg-black text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 mx-auto shadow-2xl transition-all hover:-translate-y-1"
          >
            Enter the Dreamer <ChevronRight className="w-5 h-5 text-blue-400" />
          </button>
        )}
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-100 py-24 px-4 flex items-center justify-center overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl w-full relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
               <Zap className="w-4 h-4 text-yellow-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Phase 2: Destiny Manifestation</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">What do you <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300">Dream</span> of?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Target Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  <input 
                    type="text" 
                    value={answers.dreamLocation}
                    onChange={(e) => setAnswers({...answers, dreamLocation: e.target.value})}
                    placeholder="e.g. Dubai, UAE or Munich, Germany"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-white font-medium shadow-inner"
                  />
                </div>
              </div>

              <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Work Environment</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                  <select 
                    value={answers.dreamEnvironment}
                    onChange={(e) => setAnswers({...answers, dreamEnvironment: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-white font-medium"
                  >
                    <option value="">Select Environment</option>
                    <option value="High-Tech Automated Factory">Automated Factory</option>
                    <option value="Offshore Wind Farm or Rig">Offshore Energy</option>
                    <option value="Advanced Microelectronics Lab">Advanced R&D Lab</option>
                    <option value="Modern Civil Infrastructure Project">Smart Infrastructure</option>
                    <option value="Renewable Energy Complex">Solar/Renewable Farm</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Primary Motivation</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input 
                    type="text" 
                    value={answers.primaryMotivation}
                    onChange={(e) => setAnswers({...answers, primaryMotivation: e.target.value})}
                    placeholder="e.g. Financial Freedom or Innovation"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-white font-medium shadow-inner"
                  />
                </div>
              </div>

              <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Leadership Style</label>
                <div className="relative">
                  <Brain className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <input 
                    type="text" 
                    value={answers.preferredWorkStyle}
                    onChange={(e) => setAnswers({...answers, preferredWorkStyle: e.target.value})}
                    placeholder="e.g. Team Lead or Solo Expert"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-white font-medium shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={startDreaming}
            disabled={!answers.dreamLocation || !answers.dreamEnvironment || isLoading}
            className="w-full mt-12 bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-blue-600/40 transition-all flex items-center justify-center gap-4 disabled:opacity-50 text-xl tracking-tight"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin" />
                Synthesizing Destiny...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Manifest the Future
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'results' && result) {
    return (
      <div className="bg-slate-50 min-h-screen">
        {/* Immersive Vision Board Header */}
        <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                <div>
                   <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2 mb-4">
                     <Sparkles className="w-4 h-4" /> Synthesized Professional Vision
                   </span>
                   <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Your Future <br/><span className="text-blue-400">Manifested</span></h2>
                </div>
                <div className="flex gap-4">
                   {user ? (
                     <button onClick={handleSave} disabled={isSaving || saveSuccess} className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-900/40">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saveSuccess ? 'Saved to Station' : 'Save Path'}
                     </button>
                   ) : (
                     <button onClick={loginWithGoogle} className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 border border-white/10 backdrop-blur-md">
                        <LogIn className="w-4 h-4" /> Login to Save
                     </button>
                   )}
                </div>
             </div>

             <div className="relative group rounded-[3.5rem] border border-white/10 shadow-3xl overflow-hidden aspect-video bg-slate-900">
                <img 
                  src={result.visionImageUrl} 
                  alt="Career Vision" 
                  className="w-full h-full object-cover animate-in fade-in duration-1000" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-12 md:p-16">
                   <div className="max-w-2xl">
                      <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-4">Manifested Reality Projection</p>
                      <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{result.roadmap.suggestedJobs[0]?.title}</h3>
                      <div className="flex items-center gap-4 text-slate-300 text-lg md:text-xl font-medium">
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                           <MapPin className="w-5 h-5 text-emerald-400" /> {answers.dreamLocation}
                        </span>
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                           <Briefcase className="w-5 h-5 text-blue-400" /> {answers.dreamEnvironment}
                        </span>
                      </div>
                   </div>
                </div>
                <div className="absolute top-12 right-12 flex gap-3">
                   <button className="p-5 bg-black/40 backdrop-blur-xl rounded-3xl hover:bg-blue-600 transition-all shadow-2xl border border-white/10"><Download className="w-6 h-6" /></button>
                   <button className="p-5 bg-black/40 backdrop-blur-xl rounded-3xl hover:bg-blue-600 transition-all shadow-2xl border border-white/10"><Share2 className="w-6 h-6" /></button>
                </div>
             </div>
          </div>
        </section>

        {/* Roadmap Analytical Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                   {/* Summary */}
                   <div className="space-y-6">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" /> 
                        The Manifestation Logic
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-xl font-medium">{result.roadmap.summary}</p>
                   </div>

                   {/* Jobs */}
                   <div className="space-y-8">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-blue-600" /> 
                        Target Vocational Nodes
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {result.roadmap.suggestedJobs.map((job, i) => (
                            <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:border-blue-200 transition-all shadow-sm">
                               <h5 className="font-black text-xl text-slate-900 mb-2">{job.title}</h5>
                               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{job.company}</p>
                               <p className="text-sm text-slate-500 leading-relaxed">{job.reason}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-10">
                   <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <h4 className="font-black text-xl mb-8 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400" /> 
                        Power Matrix
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                         {result.roadmap.extractedSkills.map((s, i) => (
                            <span key={i} className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300">{s}</span>
                         ))}
                      </div>
                   </div>

                   <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                      <h4 className="font-black text-lg mb-6 text-slate-900 flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-500" />
                        Skills Gap
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed mb-10 font-medium">{result.roadmap.gapAnalysis}</p>
                      <button onClick={() => setStep('upload')} className="w-full py-5 border-2 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">Reset Projection</button>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
};

export default AiDreamer;
