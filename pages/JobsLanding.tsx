
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, ArrowRight, Briefcase, Sparkles, Bot, ShieldCheck, Zap, Clock, Building2, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { getJobs } from '../services/firebaseService';
import { JobListing } from '../types';

const JobsLanding: React.FC = () => {
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await getJobs();
      setFeaturedJobs(jobs.slice(0, 5));
      setLoading(false);
    };
    fetchJobs();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-slate-950 py-24 px-4 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -ml-64 -mb-64"
        ></motion.div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-xl"
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Career Command Center</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Career Path</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Whether you want to serve in Pakistan's top industries or explore global technical opportunities, we have the AI tools to get you there.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Link 
              to="/jobs/post" 
              className="group relative inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-3">
                <Briefcase className="w-5 h-5" /> Are you an Employer? Post a Job
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Options Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Option 1: Jobs in Pakistan */}
          <motion.div variants={itemVariants}>
            <Link to="/jobs/pakistan" className="group block h-full">
              <div className="bg-white rounded-[3.5rem] p-12 h-full border border-slate-200 shadow-2xl shadow-slate-200/50 hover:shadow-emerald-200/50 hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -mr-20 -mt-20 group-hover:bg-emerald-100 transition-colors"></div>
                
                <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-xl shadow-emerald-200 group-hover:rotate-12 transition-transform">
                  <MapPin className="w-10 h-10" />
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Jobs in <span className="text-emerald-600">Pakistan</span></h2>
                <p className="text-slate-500 mb-10 leading-relaxed font-medium text-lg">
                  Access our real-time FastAPI scraper and AI Job Bot. We track WAPDA, PAEC, and private sector openings specifically for DAE graduates.
                </p>
                
                <div className="space-y-5 mb-12">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-emerald-500" />
                    </div>
                    AI Job Search Bot
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-emerald-500" />
                    </div>
                    Real-time Portal Sync
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    Verified Govt Listings
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  Explore Local Jobs <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Option 2: Abroad Jobs */}
          <motion.div variants={itemVariants}>
            <Link to="/jobs/abroad" className="group block h-full">
              <div className="bg-white rounded-[3.5rem] p-12 h-full border border-slate-200 shadow-2xl shadow-slate-200/50 hover:shadow-blue-200/50 hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 group-hover:bg-blue-100 transition-colors"></div>
                
                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-xl shadow-blue-200 group-hover:-rotate-12 transition-transform">
                  <Globe className="w-10 h-10" />
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Abroad <span className="text-blue-600">Jobs</span></h2>
                <p className="text-slate-500 mb-10 leading-relaxed font-medium text-lg">
                  Global technical gateway for DAE. Search apprenticeships and skilled worker roles in Germany, Canada, Turkey, and the GCC.
                </p>
                
                <div className="space-y-5 mb-12">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                    </div>
                    AI Visa Path Finder
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-500" />
                    </div>
                    International Portals
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    Skilled Worker Guidance
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  Explore Global Jobs <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Job Listings */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-4">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Fresh Opportunities</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Featured <span className="text-blue-600">Job Listings</span></h2>
            <p className="text-slate-500 mt-2 font-medium">Hand-picked technical roles for DAE graduates</p>
          </div>
          <Link to="/jobs/pakistan" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
            View All Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-3xl"></div>
              ))}
            </div>
          ) : (
            featuredJobs.map((job) => (
              <motion.div 
                key={job.id}
                variants={itemVariants}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                    <img src={job.logo || 'https://images.unsplash.com/photo-1590674116497-606233ca0f9b?auto=format&fit=crop&q=80&w=200'} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-500 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {job.postedDate}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      )}
                    </div>
                    
                    <p className="mt-4 text-slate-500 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <Link to={`/jobs/${job.id}`} className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 group-hover:shadow-blue-200 inline-block text-center">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </section>

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
