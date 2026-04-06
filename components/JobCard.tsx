
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Zap, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { JobListing } from '../types';

interface JobCardProps {
  job: JobListing;
  index?: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{job.title}</h4>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{job.company}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
          <MapPin className="w-4 h-4 text-slate-400" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
          <Clock className="w-4 h-4 text-slate-400" />
          {job.postedDate}
        </div>
        <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
          <Zap className="w-4 h-4" />
          {job.type}
        </div>
        {job.salary && (
          <div className="flex items-center gap-2 text-slate-900 text-xs font-black">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            {job.salary}
          </div>
        )}
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium flex-grow">
        {job.description}
      </p>

      <Link to={`/jobs/${job.id}`} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors mt-auto">
        View Details <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
};

export default JobCard;
