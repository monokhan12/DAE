
import React, { useState } from 'react';
import { Globe, GraduationCap, MapPin, Languages, ExternalLink, Search, Sparkles, Loader2, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { searchGermanAusbildung } from '../services/geminiService';
import { GermanOpportunity } from '../types';

const GermanyPath: React.FC = () => {
  const [tech, setTech] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<GermanOpportunity[]>([]);

  const [loadStage, setLoadStage] = useState('');

  const handleSearch = async () => {
    if (!tech) return;
    setIsLoading(true);
    setOpportunities([]);
    setLoadStage('Establishing connection to ausbildung.de...');

    const stages = [
      'Scanning German national apprenticeship database...',
      'Filtering results for visa-compliant positions...',
      'Verifying technical requirements for DAE holders...',
      'Translating German job descriptions...',
      'Ranking best career paths...'
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setLoadStage(stages[currentStage]);
        currentStage++;
      }
    }, 1800);

    try {
      const results = await searchGermanAusbildung(tech);
      setOpportunities(results);
    } catch (error) {
      console.error(error);
      alert("Germany portal is currently busy. Please try again in 1 minute.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setLoadStage('');
    }
  };

  const DAE_FIELDS = [
    "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", 
    "CIT", "Auto & Diesel", "HVAC", "Mechatronics", "Architecture"
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-950 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6 backdrop-blur-md">
            <span className="flex gap-1">
              <span className="w-3 h-3 bg-white/20 rounded-full"></span>
              <span className="w-3 h-3 bg-red-600 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            </span>
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Germany Technical Gateway</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
            Build Your Future <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">In Deutschland</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Germany needs skilled technicians. Use our AI to find vocational positions from <span className="text-white font-bold underline decoration-white/20 underline-offset-4">ausbildung.de</span> that match your Pakistani diploma.
          </p>
        </div>
      </section>

      {/* Main Tools */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl">
              <h3 className="font-black text-slate-900 mb-8 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Info className="w-5 h-5 text-blue-600" />
                Visa Mastery
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Languages className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase mb-1">Language</p>
                    <p className="text-xs text-slate-500 font-medium">B1 level German is your passport to success.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase mb-1">Equivalence</p>
                    <p className="text-xs text-slate-500 font-medium">DAE is recognized for its hands-on value.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase mb-1">Stipend</p>
                    <p className="text-xs text-slate-500 font-medium">Earn €1,000+ per month while you study.</p>
                  </div>
                </li>
              </ul>
              <a 
                href="https://www.make-it-in-germany.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-10 w-full py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Official Visa Guide <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Search Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-2xl shadow-slate-200/50">
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="flex-grow">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Select your Specialization</label>
                  <select 
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-black text-sm shadow-inner"
                  >
                    <option value="">-- Choose Field --</option>
                    {DAE_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="md:pt-7">
                  <button 
                    onClick={handleSearch}
                    disabled={!tech || isLoading}
                    className="w-full md:w-auto h-full px-12 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs uppercase tracking-widest"
                  >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Sparkles className="w-5 h-5 text-yellow-300" /> Live Search</>}
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="py-24 text-center animate-pulse">
                  <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-8"></div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Querying German Technical Portals</h3>
                  <p className="text-blue-600 font-bold text-sm tracking-wide">{loadStage}</p>
                </div>
              ) : opportunities.length > 0 ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                    <Globe className="text-blue-500 w-6 h-6" />
                    Current Ausbildung Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {opportunities.map((opp, idx) => (
                      <div key={idx} className="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/30 hover:border-blue-300 hover:bg-white hover:shadow-2xl transition-all flex flex-col h-full group">
                        <div className="flex justify-between items-start mb-6">
                          <span className="bg-white text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-blue-100 shadow-sm">
                            {opp.location}
                          </span>
                          <span className="flex items-center text-[10px] font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100 uppercase tracking-widest leading-none">
                            <Languages className="w-3.5 h-3.5 mr-1.5" /> Language: {opp.languageLevel}
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{opp.title}</h4>
                        <p className="text-xs font-black text-slate-400 mb-6 uppercase tracking-widest">{opp.company}</p>
                        <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed font-medium">
                          {opp.description}
                        </p>
                        <a 
                          href={opp.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="mt-auto py-4 px-6 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group shadow-xl shadow-slate-200"
                        >
                          Official Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Search className="text-slate-200 w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">Ready to Search?</h4>
                  <p className="text-slate-400 max-w-sm mx-auto text-sm font-medium">Select your technology above and our AI agent will perform a real-time crawl of the German job market.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GermanyPath;
