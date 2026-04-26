import React, { useState } from 'react';
import { Globe, GraduationCap, MapPin, Languages, ExternalLink, Search, Sparkles, Loader2, Info, CheckCircle, ArrowRight, Building2, Landmark, ShieldCheck, Zap, X } from 'lucide-react';
import { searchAbroadOpportunities } from '../services/geminiService';
import { EuroOpportunity } from '../types';
import { ABROAD_PORTALS } from '../constants';

const AbroadPath: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(ABROAD_PORTALS[0]);
  const [tech, setTech] = useState('');
  const [langLevel, setLangLevel] = useState('All');
  const [visaType, setVisaType] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [loadStage, setLoadStage] = useState('');
  const [opportunities, setOpportunities] = useState<EuroOpportunity[]>([]);

  const handleSearch = async () => {
    if (!tech || !selectedCountry) return;
    setIsLoading(true);
    setLoadStage(`Connecting to ${selectedCountry.country} national portals...`);
    
    // Fake loading stages to make it feel responsive
    const stages = [
      `Querying ${selectedCountry.portal}...`,
      `Filtering for ${tech} Technology...`,
      `Analyzing language requirements (${langLevel})...`,
      `Verifying Visa compatibility...`
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setLoadStage(stages[currentStage]);
        currentStage++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    try {
      const results = await searchAbroadOpportunities(
        selectedCountry.country, 
        tech, 
        selectedCountry.portal,
        langLevel !== 'All' ? langLevel : undefined,
        visaType !== 'All' ? visaType : undefined
      );
      setOpportunities(results);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch opportunities. Please try again.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setLoadStage('');
    }
  };

  const DAE_FIELDS = [
    "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", 
    "CIT", "Auto & Diesel", "HVAC", "Petroleum", "Mechatronics", "Textile", "Food"
  ];

  const LANGUAGE_LEVELS = ["All", "A2 (Basic)", "B1 (Intermediate)", "B2 (Upper Int)", "C1 (Advanced)"];
  const VISA_TYPES = ["All", "Vocational Training", "Skilled Worker", "Job Seeker", "Apprenticeship"];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-md">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest text-blue-300">Global Technical Gateway 2.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            DAE Abroad: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Global Success</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Quickly find technical jobs and apprenticeships across Canada, Europe, and GCC. We map your Pakistani DAE directly to international technical requirements.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
              <h3 className="font-extrabold text-slate-900 mb-8 flex items-center gap-2 text-lg">
                <Search className="w-5 h-5 text-blue-600" />
                Configure Path
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Country Selection</label>
                  <div className="grid grid-cols-4 gap-2 mb-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {ABROAD_PORTALS.map(p => (
                      <button
                        key={p.country}
                        onClick={() => setSelectedCountry(p)}
                        className={`p-2 rounded-xl text-lg flex items-center justify-center transition-all border ${selectedCountry.country === p.country ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}
                        title={p.country}
                      >
                        {p.flag}
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 truncate">{selectedCountry.flag} {selectedCountry.country}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">DAE Technology</label>
                  <select 
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-bold text-sm shadow-inner"
                  >
                    <option value="">-- Choose Field --</option>
                    {DAE_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                   <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Language</label>
                      <select value={langLevel} onChange={(e) => setLangLevel(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold bg-white">
                        {LANGUAGE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Visa Type</label>
                      <select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold bg-white">
                        {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                   </div>
                </div>

                <button 
                  onClick={handleSearch}
                  disabled={!tech || isLoading}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Sparkles className="w-5 h-5" /> Quick Search</>}
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -mr-12 -mt-12"></div>
               <h4 className="font-bold flex items-center gap-2 mb-4 text-blue-400">
                 <ShieldCheck className="w-5 h-5" />
                 Visa Quick-Guide
               </h4>
               <p className="text-xs text-slate-400 leading-relaxed mb-6">
                 DAE graduates often qualify for <strong>Vocational Training Visas</strong> (like Sect 16a in Germany) which include pay.
               </p>
               <ul className="text-[10px] space-y-3 text-slate-300 font-bold uppercase tracking-widest">
                 <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-400" /> Pay: €800-€1400/mo</li>
                 <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-400" /> Path to PR: 3-5 Years</li>
               </ul>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {isLoading ? (
              <div className="bg-white rounded-[3rem] border border-slate-200 py-32 text-center animate-in fade-in zoom-in duration-300 shadow-sm">
                <div className="relative inline-block mb-8">
                   <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">AI Agent Searching...</h3>
                <p className="text-blue-600 font-bold animate-pulse text-sm px-4">{loadStage}</p>
                <div className="mt-8 max-w-xs mx-auto space-y-2 opacity-50">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loading_3s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            ) : opportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {opportunities.map((opp, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 -mr-12 -mt-12 rounded-full group-hover:bg-blue-100 transition-colors"></div>
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <img 
                            src={`https://flagcdn.com/w40/${(ABROAD_PORTALS.find(p => p.country === opp.country)?.code || 'eu')}.png`} 
                            alt={opp.country}
                            className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                          <span className="bg-slate-100 text-slate-500 text-[9px] font-extrabold px-2 py-1 rounded uppercase tracking-widest border border-slate-200">
                            {opp.location}
                          </span>
                        </div>
                        <h4 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {opp.title}
                        </h4>
                      </div>
                      <div className="bg-slate-900 text-white p-3 rounded-2xl font-bold text-[10px] flex flex-col items-center min-w-[60px] shadow-lg group-hover:bg-blue-600 transition-colors">
                        <Languages className="w-4 h-4 mb-1" />
                        {opp.languageRequirement}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 mb-6 relative z-10 font-bold uppercase tracking-widest text-[10px]">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      {opp.company}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-grow relative z-10">
                      {opp.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          Source: {opp.portalSource}
                        </span>
                        {opp.visaType && (
                           <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1 mt-1">
                             <CheckCircle className="w-2.5 h-2.5" /> {opp.visaType}
                           </span>
                        )}
                      </div>
                      <a 
                        href={opp.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-blue-600 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-blue-100"
                      >
                        Apply Now <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] border border-slate-200 py-32 text-center shadow-sm">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-blue-200 w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Abroad Path Finder</h3>
                <p className="text-slate-400 max-w-sm mx-auto mb-10 text-sm">
                  Select a country and your technical field to begin the AI-powered search across national technical and vocational databases.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                   <div className="px-5 py-3 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-bold border border-slate-100">Global Coverage</div>
                   <div className="px-5 py-3 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-bold border border-slate-100">Real-time Portal Data</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AbroadPath;
