
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, ArrowRight, Briefcase, Sparkles, Bot, ShieldCheck, Zap } from 'lucide-react';

const JobsLanding: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-md">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Career Command Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Career Path</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want to serve in Pakistan's top industries or explore global technical opportunities, we have the AI tools to get you there.
          </p>
          
          <div className="flex justify-center">
            <Link 
              to="/jobs/post" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all"
            >
              <Briefcase className="w-5 h-5" /> Are you an Employer? Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Options Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Option 1: Jobs in Pakistan */}
          <Link to="/jobs/pakistan" className="group">
            <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>
              
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Jobs in <span className="text-emerald-600">Pakistan</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                Access our real-time FastAPI scraper and AI Job Bot. We track WAPDA, PAEC, and private sector openings specifically for DAE graduates.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <Bot className="w-4 h-4 text-emerald-500" />
                  AI Job Search Bot
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  Real-time Portal Sync
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Verified Govt Listings
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest">
                Explore Local Jobs <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Option 2: Abroad Jobs */}
          <Link to="/jobs/abroad" className="group">
            <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors"></div>
              
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Abroad <span className="text-blue-600">Jobs</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                Global technical gateway for DAE. Search apprenticeships and skilled worker roles in Germany, Canada, Turkey, and the GCC.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  AI Visa Path Finder
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <Globe className="w-4 h-4 text-blue-500" />
                  International Portals
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  Skilled Worker Guidance
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest">
                Explore Global Jobs <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center border border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-black text-white mb-1">500+</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Local Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-400 mb-1">12+</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Countries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400 mb-1">24/7</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Bot Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">DAE Focused</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsLanding;
