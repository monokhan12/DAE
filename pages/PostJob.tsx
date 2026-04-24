
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, FileText, Tag, Image as ImageIcon, Send, ArrowLeft, CheckCircle, Loader2, MapPin, DollarSign, Clock } from 'lucide-react';
import { createJob } from '../services/firebaseService';
import { useAuth } from '../components/FirebaseProvider';

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    type: 'Full-time' as const,
    salary: '',
    category: 'Jobs',
    tags: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You must be signed in to post a job.');
      return;
    }
    
    setIsLoading(true);

    try {
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        description: formData.description,
        type: formData.type,
        salary: formData.salary,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        logo: formData.image,
        authorUid: user.uid
      };

      const result = await createJob(jobData);

      if (result) {
        setIsSuccess(true);
        setTimeout(() => navigate('/jobs/pakistan'), 2000);
      } else {
        alert('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Job Posted!</h2>
          <p className="text-slate-500 font-medium">Your job listing has been successfully submitted and is now live on the portal.</p>
          <div className="mt-8 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-[loading_2s_linear]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Post a <span className="text-blue-400">Job</span></h1>
            <p className="text-slate-400 font-medium">Reach thousands of qualified DAE graduates across Pakistan.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Job Title
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Electrical Maintenance Engineer"
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Company Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Lucky Cement Ltd"
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-3 h-3" /> Job Description
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the role, requirements, and how to apply..."
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Karachi, Pakistan"
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Job Type
                </label>
                <select 
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign className="w-3 h-3" /> Salary (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. PKR 70,000 - 90,000"
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Category
                </label>
                <select 
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Jobs">General Jobs</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" /> Skills Tags (comma separated)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Electrical, Maintenance, Karachi"
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-6 h-6" /> Publish Job Listing</>}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PostJob;
