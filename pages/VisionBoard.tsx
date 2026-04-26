
import React, { useState } from 'react';
import { Sparkles, MapPin, Briefcase, Loader2, Download, Share2, Camera, Eye, Zap } from 'lucide-react';
import { generateCareerVision } from '../services/geminiService';

const VisionBoard: React.FC = () => {
  const [field, setField] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisualize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!field || !location || isLoading) return;

    setIsLoading(true);
    try {
      const url = await generateCareerVision(field, location);
      setImageUrl(url);
    } catch (error) {
      alert("Visualization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const PRESETS = [
    { field: "Solar Power Engineer", location: "Neelum Valley, Pakistan" },
    { field: "Marine Electrician", location: "Port of Rotterdam, Netherlands" },
    { field: "High-Rise Site Supervisor", location: "Dubai Marina, UAE" },
    { field: "CNC Automation Specialist", location: "Munich, Germany" }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20 overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 pt-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">AI Career Projection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter">
            Don't Just Plan. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">See Your Future.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Upload your dreams to our AI and witness a photorealistic vision of your professional life as a technician.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <form onSubmit={handleVisualize} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Field of Excellence</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input 
                      type="text" 
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      placeholder="e.g. Electrical Supervisor" 
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Dream Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Frankfurt, Germany" 
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !field || !location}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                      Project Vision
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((p, i) => (
                <button 
                  key={i}
                  onClick={() => { setField(p.field); setLocation(p.location); }}
                  className="p-4 bg-white/5 border border-white/5 rounded-2xl text-left hover:bg-white/10 transition-colors text-xs font-medium text-slate-400 hover:text-white"
                >
                  <span className="block text-blue-400 mb-1">{p.field}</span>
                  {p.location}
                </button>
              ))}
            </div>
          </div>

          {/* Vision Display */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden group">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="Career Vision" 
                  className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                   <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <Eye className="w-10 h-10 text-blue-400" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Awaiting Your Input</h3>
                   <p className="text-slate-500 max-w-sm">
                     The visualizer will generate a hyper-realistic representation of your career goals once you provide the details.
                   </p>
                </div>
              )}

              {/* Overlay Controls */}
              {imageUrl && !isLoading && (
                <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-4 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-blue-600 transition-colors shadow-2xl">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-4 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-blue-600 transition-colors shadow-2xl">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                   <div className="relative">
                     <div className="w-24 h-24 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                     <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
                   </div>
                   <p className="mt-8 text-blue-400 font-bold tracking-widest uppercase text-sm animate-pulse">
                     Visualizing Professional Horizon...
                   </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex items-start gap-4 p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
              <Sparkles className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">How it works</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our Career Projection AI analyzes your selected field and the geographic context of your target location to generate an accurate representation of a world-class workspace. This visualization helps in subconscious goal-setting and professional alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;
