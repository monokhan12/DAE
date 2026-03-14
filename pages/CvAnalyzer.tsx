
import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, Briefcase, GraduationCap, Lightbulb, Target, Sparkles, Loader2, Save, LogIn, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeCvAndProvideRoadmap } from '../services/geminiService';
import { auth, saveRoadmap, loginWithGoogle, MockUser } from '../services/firebaseService';
import { CvRoadmap } from '../types';

const CvAnalyzer: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [interests, setInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<CvRoadmap | null>(null);
  const [user, setUser] = useState<MockUser | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    setSaveSuccess(false);
    try {
      const base64 = await fileToBase64(file);
      const result = await analyzeCvAndProvideRoadmap(base64, file.type, interests);
      setRoadmap(result);
    } catch (error) {
      alert("Failed to analyze CV.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToProfile = async () => {
    if (!user || !roadmap) return;
    setIsSaving(true);
    try {
      await saveRoadmap(user.uid, roadmap);
      setSaveSuccess(true);
    } catch (error) {
      alert("Error saving roadmap.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <Target className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">AI Career Roadmap Finder</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Upload your CV to get a personalized professional analysis saved to your profile.</p>
      </div>

      {!roadmap ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">Upload CV (Image or PDF)</label>
              <div className="relative group">
                <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${file ? 'border-blue-500 bg-blue-50' : 'border-slate-300 group-hover:border-blue-400'}`}>
                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-blue-600">{file.name}</p>
                      <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-2 text-xs text-red-500 font-bold hover:underline">Remove file</button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-slate-400 mb-4" />
                      <p className="font-bold text-slate-600">Click or drag your CV here</p>
                      <p className="text-xs text-slate-400 mt-2">PDF, PNG, JPG (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Tell us your goals</label>
              <textarea 
                value={interests} 
                onChange={(e) => setInterests(e.target.value)} 
                placeholder="e.g. I want to work in Dubai as an Electrical Supervisor or learn PLC Programming." 
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32" 
              />
            </div>
            <button 
              onClick={handleAnalyze} 
              disabled={!file || isLoading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all flex justify-center items-center gap-2 shadow-xl shadow-blue-200 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Career Roadmap</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Analysis Ready</h2>
              <p className="text-sm text-slate-500 font-medium">Based on your provided credentials and interests.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              {user ? (
                <button 
                  onClick={handleSaveToProfile} 
                  disabled={isSaving || saveSuccess}
                  className={`flex-grow md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${saveSuccess ? 'bg-green-100 text-green-700 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saveSuccess ? 'Saved to Profile' : 'Save Roadmap'}
                </button>
              ) : (
                <button onClick={loginWithGoogle} className="flex-grow md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                  <LogIn className="w-4 h-4" /> Login to Save
                </button>
              )}
              <button 
                onClick={() => navigate('/dreamer')}
                className="flex-grow md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all"
              >
                <Eye className="w-4 h-4" /> Visual Vision
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Career Synthesis</h2>
                <p className="text-slate-700 leading-relaxed text-lg">{roadmap.summary}</p>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Briefcase className="text-blue-600" /> Top Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmap.suggestedJobs.map((job, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 transition-all group">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">{job.title}</h3>
                      <p className="text-xs text-blue-600 font-black mb-3 uppercase tracking-widest">{job.company}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{job.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400" /> Skill Inventory</h3>
                <div className="flex flex-wrap gap-2">
                  {roadmap.extractedSkills.map((s, i) => <span key={i} className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold border border-white/10">{s}</span>)}
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900"><GraduationCap className="text-indigo-600" /> Gap Analysis</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{roadmap.gapAnalysis}</p>
                <button onClick={() => setRoadmap(null)} className="w-full py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Analyze New CV</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CvAnalyzer;
