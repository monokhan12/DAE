
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import JobCard from '../components/JobCard';
import { MOCK_POSTS, DAE_PROGRAMS, TECHNICAL_BOARDS } from '../constants';
import { getJobs } from '../services/firebaseService';
import { JobListing } from '../types';
import { 
  ArrowRight, Briefcase, GraduationCap, Bot, Sparkles, Search, 
  Brain, Globe, Zap, ChevronRight, Landmark, ShieldCheck, 
  Users, Star, ExternalLink, Cpu, LayoutDashboard, Terminal, Eye,
  Building2, MapPin, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const recentPosts = [...MOCK_POSTS].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 3);
  const topTechnologies = ["Electrical", "Mechanical", "Civil", "Electronics", "CIT", "Mechatronics"];

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await getJobs();
      setFeaturedJobs(jobs.slice(0, 3));
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-white">
      {/* 1. FUTURISTIC HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center bg-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-20 pb-20">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Technical AI Suite</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                    The AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Workstation</span> <br/>
                    for DAE Students
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    Bridge the gap between technical education and a global career. Find premium jobs, AI-powered roadmaps, and specialized engineering tools.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link 
                        to="/ai-tools" 
                        className="group flex justify-center items-center bg-blue-600 text-white font-black py-5 px-12 rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40 text-sm uppercase tracking-widest"
                    >
                        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                        Explore AI Tools
                    </Link>
                    
                    <Link 
                        to="/dreamer" 
                        className="group flex justify-center items-center bg-white/5 backdrop-blur-xl text-white font-black py-5 px-12 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                    >
                        <Brain className="w-5 h-5 mr-2 text-indigo-400" />
                        AI Career Dreamer
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                   <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><ShieldCheck className="w-5 h-5" /> PBTE Aligned</div>
                   <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><Users className="w-5 h-5" /> 50k+ Users</div>
                   <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest"><Zap className="w-5 h-5" /> Instant Results</div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. TECHNOLOGY SWITCHOVER */}
      <section className="py-12 bg-white -mt-12 relative z-30">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="bg-white rounded-[3rem] p-5 shadow-2xl border border-slate-100 flex flex-wrap justify-center items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mr-2">Top Specializations:</span>
              {topTechnologies.map(tech => (
                <Link 
                  key={tech} 
                  to={`/dae-pakistan?filter=${tech}`}
                  className="px-6 py-3.5 rounded-2xl bg-slate-50 text-slate-700 font-black text-[10px] uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all border border-slate-100 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100"
                >
                  {tech}
                </Link>
              ))}
              <Link to="/dae-pakistan" className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all"><ChevronRight className="w-5 h-5" /></Link>
           </div>
        </div>
      </section>

      {/* 3. CORE AI CAPABILITIES */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
               <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Core Ecosystem</div>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">One Platform, <span className="text-blue-600">Infinite</span> Growth.</h2>
               <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">The most advanced technical career ecosystem ever built for Pakistani students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* AI Tools Hub */}
                <div className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-3xl hover:-translate-y-3 flex flex-col">
                    <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                        <Terminal className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">AI Utility Hub</h3>
                    <p className="text-slate-500 mb-10 leading-relaxed font-medium flex-grow">14+ specialized tools for PLC logic, technical translations, exam prep, and professional document drafting.</p>
                    <Link to="/ai-tools" className="w-full py-5 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-900 flex items-center justify-center gap-3 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                        Launch Workspace <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Jobs Portal */}
                <div className="group p-12 rounded-[3.5rem] bg-blue-50 border border-blue-100 transition-all hover:shadow-3xl hover:-translate-y-3 flex flex-col">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                        <Briefcase className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Smart Jobs Portal</h3>
                    <p className="text-slate-500 mb-10 leading-relaxed font-medium flex-grow">Our AI bots scan WAPDA, AEC, and major private industrial firms to find the best technical opportunities for you.</p>
                    <Link to="/jobs" className="w-full py-5 bg-white border border-blue-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-blue-600 flex items-center justify-center gap-3 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                        Find Opportunities <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* AI Career Mentor */}
                <div className="group p-12 rounded-[3.5rem] bg-indigo-50 border border-indigo-100 transition-all hover:shadow-3xl hover:-translate-y-3 flex flex-col">
                    <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                        <Bot className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Expert AI Mentor</h3>
                    <p className="text-slate-500 mb-10 leading-relaxed font-medium flex-grow">24/7 career counseling. Ask about university admissions (BS/B.Tech), foreign scholarships, or career paths.</p>
                    <Link to="/mentor" className="w-full py-5 bg-white border border-indigo-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-indigo-600 flex items-center justify-center gap-3 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                        Start Counseling <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* 4. FEATURED JOBS SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">New Openings</div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Featured <span className="text-emerald-600">Jobs</span> for DAE</h2>
                </div>
                <Link to="/jobs" className="group flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:text-emerald-600 transition-colors">
                    Browse All Jobs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredJobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                ))}
            </div>
        </div>
      </section>

      {/* 5. VISUALIZATION SECTION */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Future Visualization</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">Don't Just Plan. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">See Your Future.</span></h2>
                 <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                   Our **AI Dreamer** uses advanced generative models to show you exactly how your professional life will look. We combine your DAE skills with global career targets to manifest your destiny.
                 </p>
                 <Link to="/dreamer" className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all shadow-2xl">
                    Launch Dreamer Now <ArrowRight className="ml-3 w-5 h-5" />
                 </Link>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[3.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                 <div className="relative bg-slate-900 p-4 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" className="w-full aspect-[4/3] object-cover rounded-[2.5rem] opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="Technical Visualization" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-12">
                       <div className="w-full">
                          <div className="flex items-center gap-2 mb-4">
                             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white"><Sparkles className="w-5 h-5" /></div>
                             <span className="text-white font-black text-xs uppercase tracking-widest">AI Vision Board Generated</span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 w-[78%]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. LATEST BLOG POSTS */}
      <section id="blog" className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Insights & Updates</div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Technical <span className="text-blue-600">Knowledge</span> Base</h2>
                </div>
                <Link to="/blog" className="group flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">
                    View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              Ready to Build Your <br />
              <span className="text-blue-200">Technical Legacy?</span>
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
              Join 50,000+ DAE students and professionals already using our AI-powered ecosystem to accelerate their careers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/signup" 
                className="px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/40"
              >
                Create Free Account
              </Link>
              <Link 
                to="/about" 
                className="px-12 py-6 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
