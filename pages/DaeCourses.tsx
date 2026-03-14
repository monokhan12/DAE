
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DAE_PROGRAMS, TECHNICAL_BOARDS } from '../constants';
import { searchTechnicalResources, MentorResponse } from '../services/geminiService';
import { Search, GraduationCap, ExternalLink, BookOpen, Sparkles, ArrowRight, Loader2, Landmark, Info, Briefcase, Zap, Star, X, ShieldCheck, Globe, Building2, ChevronRight } from 'lucide-react';

const DaeCourses: React.FC = () => {
  const location = useLocation();
  const [filterTerm, setFilterTerm] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<MentorResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter) {
      setFilterTerm(filter);
      setAiQuery(`Career scope and latest syllabus for ${filter} in Pakistan 2025`);
    } else {
      setFilterTerm('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const filteredPrograms = useMemo(() => {
    return DAE_PROGRAMS.filter(p => 
      p.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      p.specialization.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [filterTerm]);

  const activeProgram = filteredPrograms.length === 1 ? filteredPrograms[0] : null;

  const handleAiSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuery.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiResponse(null);
    
    try {
      const response = await searchTechnicalResources(aiQuery);
      setAiResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Immersive Landing Section */}
      {!activeProgram && !filterTerm ? (
        <section className="bg-white border-b border-slate-200">
           <div className="bg-slate-900 py-24 px-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md border border-white/10">
                   <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   <span className="text-white text-xs font-bold uppercase tracking-widest">Official Technical Gateway of Pakistan</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter leading-tight">
                  DAE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Technical Excellence</span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                  Comprehensive roadmap for Diploma of Associate Engineering (DAE) and Short Vocational Courses offered by NAVTTC, PSDF, and Provincial TEVTAs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#boards" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/40">Explore Boards</a>
                  <a href="#directory" className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold backdrop-blur-sm transition-all">Course Directory</a>
                </div>
              </div>
           </div>

           {/* Quick Stats & Info */}
           <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 <div className="flex gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 text-blue-600 shadow-inner">
                       <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">3-Year DAE</h3>
                       <p className="text-slate-500 text-sm leading-relaxed">Equivalent to F.Sc (Pre-Engineering) with a heavy focus on practical industrial skills.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 text-emerald-600 shadow-inner">
                       <Zap className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Short Courses</h3>
                       <p className="text-slate-500 text-sm leading-relaxed">3 to 6 month fast-track certifications (Hi-Tech & Conventional) by NAVTTC & PSDF.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 text-indigo-600 shadow-inner">
                       <Globe className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">Global Validity</h3>
                       <p className="text-slate-500 text-sm leading-relaxed">Recognized by the Dublin Accord (partial) and accepted for skilled visas in GCC and Abroad.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      ) : (
        /* Filtered/Detail Header (Keep existing logic but styled) */
        <div className="bg-white border-b border-slate-200 pt-12 pb-16 px-4">
           <div className="max-w-6xl mx-auto">
             <Link to="/dae-pakistan" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase mb-6 transition-colors">
                <ArrowRight className="rotate-180 w-3 h-3" /> Back to Technical Guide
             </Link>
             {activeProgram ? (
               <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">{activeProgram.name}</h1>
                  <div className="flex flex-wrap gap-4 mb-8">
                     <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> 3 Years Diploma</span>
                     <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 flex items-center gap-2"><Landmark className="w-4 h-4" /> {activeProgram.institution}</span>
                  </div>
                  <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">{activeProgram.details}</p>
                  <button onClick={() => handleAiSearch()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200">
                     <Sparkles className="w-5 h-5 text-blue-400" /> Career Analysis
                  </button>
               </div>
             ) : (
               <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-900">Search Results for "{filterTerm}"</h2>
                  <p className="text-slate-500 mt-2">Browse technical technologies matching your query.</p>
               </div>
             )}
           </div>
        </div>
      )}

      {/* Institutional Boards Section */}
      {!filterTerm && (
        <section id="boards" className="py-20 px-4 max-w-6xl mx-auto">
           <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Regulatory & Training Boards</h2>
              <p className="text-slate-500">The core bodies responsible for technical education in Pakistan.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TECHNICAL_BOARDS.map((board) => (
                <div key={board.id} className="bg-white border border-slate-200 p-8 rounded-[2rem] hover:shadow-2xl hover:border-blue-200 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                         <Building2 className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{board.location}</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">{board.name}</h3>
                   <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-tighter leading-tight">{board.fullname}</p>
                   <p className="text-sm text-slate-500 mb-8">{board.focus}</p>
                   <a 
                     href={`https://www.google.com/search?q=${encodeURIComponent(board.fullname)}`} 
                     target="_blank" 
                     className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
                   >
                     Visit Portal <ArrowRight className="w-4 h-4" />
                   </a>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* Directory Section */}
      <section id="directory" className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    DAE Course Directory
                </h2>
                <p className="text-slate-500 mt-2">Official PBTE technology list for 2025-2026 Academic Year.</p>
            </div>
            
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text"
                    placeholder="Filter by Technology (e.g. Electrical, Fashion)..."
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white shadow-sm"
                />
                {filterTerm && (
                  <button onClick={() => setFilterTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
            </div>
        </div>

        {/* AI Insight Section */}
        {(isAiLoading || aiResponse) && (
          <div className="mb-12 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Technical Insight Report
              </h3>
              {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                      <p className="text-slate-400 animate-pulse">Analyzing PBTE Syllabus & Industry Demand...</p>
                  </div>
              ) : (
                  <div className="animate-in fade-in zoom-in duration-500">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                          {aiResponse?.text}
                      </div>
                  </div>
              )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-[2rem] border ${activeProgram?.name === program.name ? 'border-blue-500 shadow-xl shadow-blue-100' : 'border-slate-200'} p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col`}
                    >
                        <div className="mb-6">
                            <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors uppercase leading-tight mb-4">
                                {program.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">{program.duration}</span>
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest">{program.specialization}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3 text-sm text-slate-600 mb-8 flex-grow">
                            <div className="flex items-center gap-3">
                                <Landmark className="w-4 h-4 text-slate-400" />
                                <span className="font-medium">{program.institution}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-4 h-4 text-slate-400" />
                                <span>Req: {program.qualification}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mt-4 italic line-clamp-3">
                              {program.details}
                            </p>
                        </div>
                        
                        <div className="pt-6 border-t border-slate-50">
                            <Link 
                              to={`/dae-pakistan?filter=${encodeURIComponent(program.name)}`}
                              className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-blue-600 shadow-lg shadow-slate-100"
                            >
                                View Detailed Path <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                    <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-800">Technology not found</h3>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto">We couldn't find a PBTE technology matching your query. Try searching for "Electrical" or "Creative".</p>
                    <button onClick={() => setFilterTerm('')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200">Reset Search</button>
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default DaeCourses;
