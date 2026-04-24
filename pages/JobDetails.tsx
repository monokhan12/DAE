
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/firebaseService';
import { JobListing } from '../types';
import { 
  MapPin, Building2, Clock, Zap, DollarSign, ArrowLeft, ArrowRight,
  Share2, Bookmark, ShieldCheck, Briefcase, Globe, 
  CheckCircle2, Info, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (id) {
        const data = await getJobById(id);
        setJob(data);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Job Not Found</h2>
          <p className="text-slate-500 mb-8">The job listing you are looking for does not exist or has been removed.</p>
          <Link to="/jobs" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header / Hero */}
      <section className="bg-slate-950 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Job Listings
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white p-1 border border-white/10 shrink-0 shadow-2xl">
              <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{job.title}</h1>
                <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-600/30">
                  {job.type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  {job.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Posted {job.postedDate}
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-grow md:flex-grow-0 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all shadow-xl">
                Apply Now
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" /> Job Description
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed font-medium text-lg mb-6">
                  {job.description}
                </p>
                
                <h3 className="text-xl font-black text-slate-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "Perform regular maintenance and inspections on technical equipment.",
                    "Troubleshoot and resolve complex engineering issues in real-time.",
                    "Collaborate with cross-functional teams to optimize production efficiency.",
                    "Ensure compliance with international safety and quality standards.",
                    "Document all technical procedures and maintenance logs accurately."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-black text-slate-900 mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "DAE (Diploma of Associate Engineering) in relevant technology.",
                    "Minimum 2-3 years of hands-on experience in the industry.",
                    "Strong understanding of technical drawings and blueprints.",
                    "Excellent problem-solving and analytical skills.",
                    "Ability to work in a fast-paced, high-pressure environment."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Need help with your application?</h3>
                <p className="text-blue-100 mb-8 font-medium">Use our AI CV Analyzer to optimize your resume for this specific role and increase your chances of getting hired.</p>
                <Link to="/cv-analyzer" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">
                  Analyze My CV <Zap className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Job Overview</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Salary Range</p>
                    <p className="text-slate-900 font-bold">{job.salary || 'Competitive'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Type</p>
                    <p className="text-slate-900 font-bold">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-slate-900 font-bold">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified</p>
                    <p className="text-emerald-600 font-bold">Verified Listing</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-8 border-slate-100" />
              
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-xl shadow-slate-200">
                Apply Now
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">About the Company</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 leading-tight">{job.company}</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Industrial Leader</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {job.company} is a leading organization in the technical and engineering sector, committed to innovation and excellence in the Pakistani market.
              </p>
              <Link to="#" className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                View Company Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
