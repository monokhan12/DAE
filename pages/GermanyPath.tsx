
import React, { useState } from 'react';
import { Globe, GraduationCap, MapPin, Languages, ExternalLink, Search, Sparkles, Loader2, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { searchGermanAusbildung } from '../services/geminiService';
import { GermanOpportunity } from '../types';

const GermanyPath: React.FC = () => {
  const [tech, setTech] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<GermanOpportunity[]>([]);

  const handleSearch = async () => {
    if (!tech) return;
    setIsLoading(true);
    try {
      const results = await searchGermanAusbildung(tech);
      setOpportunities(results);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch opportunities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const DAE_FIELDS = [
    "Electrical", "Mechanical", "Civil", "Electronics", "Chemical", 
    "Computer Information Technology", "Auto & Diesel", "HVAC"
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-md">
            <span className="flex gap-1">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              <span className="w-3 h-3 bg-red-600 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            </span>
            <span className="text-white text-xs font-bold uppercase tracking-widest">Germany Technical Gateway</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            From DAE to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">German Ausbildung</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Germany needs skilled technicians. Use our AI to find vocational positions from <span className="text-white font-bold underline decoration-red-500">ausbildung.de</span> that match your Pakistani diploma.
          </p>
        </div>
      </section>

      {/* Main Tools */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Quick Requirements
              </h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <Languages className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span><strong>German Language:</strong> Minimum A2/B1 level is usually required.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span><strong>Equivalence:</strong> DAE is highly respected as a technical background.</span>
                </li>
                <li className="flex gap-3">
                  <GraduationCap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span><strong>Benefits:</strong> Get paid while you learn (stipend approx €800-€1200).</span>
                </li>
              </ul>
              <a 
                href="https://www.make-it-in-germany.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                Official Visa Guide <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Search Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-grow">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select your DAE Technology</label>
                  <select 
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-slate-50 font-medium"
                  >
                    <option value="">-- Choose Field --</option>
                    {DAE_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="md:pt-7">
                  <button 
                    onClick={handleSearch}
                    disabled={!tech || isLoading}
                    className="w-full md:w-auto h-full px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Sparkles className="w-5 h-5" /> Find Germany Paths</>}
                  </button>
                </div>
              </div>

              {opportunities.length > 0 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="text-blue-500" />
                    Available Positions (Fetched from ausbildung.de)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {opportunities.map((opp, idx) => (
                      <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {opp.location}
                          </span>
                          <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                            <Languages className="w-3 h-3 mr-1" /> {opp.languageLevel}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{opp.title}</h4>
                        <p className="text-sm font-bold text-slate-400 mb-3">{opp.company}</p>
                        <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed">
                          {opp.description}
                        </p>
                        <a 
                          href={opp.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="mt-auto py-3 px-4 border border-blue-600 text-blue-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all group"
                        >
                          View on ausbildung.de <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : !isLoading && (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-slate-300 w-8 h-8" />
                  </div>
                  <p className="text-slate-400 font-medium italic">Select your technology to fetch active German opportunities.</p>
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
