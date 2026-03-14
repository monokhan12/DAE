
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { MOCK_POSTS } from '../constants';
import { Search, Bot, Activity, RefreshCw, AlertCircle, Sparkles, Send, Loader2, ExternalLink } from 'lucide-react';
import { fetchLiveJobsFromBot } from '../services/jobService';
import { searchJobsInPakistan, MentorResponse } from '../services/geminiService';
import { BlogPost } from '../types';
import Markdown from 'react-markdown';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [liveJobs, setLiveJobs] = useState<BlogPost[]>([]);
  const [isBotLoading, setIsBotLoading] = useState(false);
  const [botStatus, setBotStatus] = useState<'online' | 'offline' | 'searching'>('searching');
  
  // AI Bot State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<MentorResponse | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  useEffect(() => {
    loadBotJobs();
  }, []);

  const loadBotJobs = async () => {
    setIsBotLoading(true);
    setBotStatus('searching');
    const jobs = await fetchLiveJobsFromBot();
    if (jobs.length > 0) {
      setLiveJobs(jobs);
      setBotStatus('online');
    } else {
      setBotStatus('offline');
    }
    setIsBotLoading(false);
  };

  const handleAiJobSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || isAiSearching) return;

    setIsAiSearching(true);
    setAiResponse(null);
    try {
      const response = await searchJobsInPakistan(aiQuery);
      setAiResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiSearching(false);
    }
  };

  const allJobs = [...liveJobs, ...MOCK_POSTS];

  const filteredPosts = allJobs.filter(post => 
    (post.category === 'Jobs' || post.category === 'Internship' || post.category === 'Apprenticeship') &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* AI Job Assistant Bot - NEW */}
        <div className="mb-12 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
                <Bot className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-[10px] font-black uppercase tracking-widest">AI Job Assistant v2.0</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Ask AI for <span className="text-blue-400">Specific Jobs</span></h2>
              <p className="text-slate-400 mb-8 max-w-xl">Search beyond our database. Our AI uses Google Search grounding to find real-time openings across WAPDA, PAEC, and private firms.</p>
              
              <form onSubmit={handleAiJobSearch} className="relative max-w-2xl group">
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl group-hover:bg-blue-600/30 transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Latest WAPDA Electrical jobs 2025..." 
                    className="bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 w-full py-4 px-4 font-bold"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    disabled={isAiSearching}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-900/40"
                  >
                    {isAiSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* AI Response Area */}
          {aiResponse && (
            <div className="p-8 md:p-12 bg-white animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed font-medium">
                    <Markdown>{aiResponse.text}</Markdown>
                  </div>
                </div>
              </div>

              {aiResponse.sources && aiResponse.sources.length > 0 && (
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Verified Sources Found:</p>
                  <div className="flex flex-wrap gap-3">
                    {aiResponse.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scraper Status Bar */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${botStatus === 'online' ? 'bg-emerald-500 animate-pulse' : botStatus === 'searching' ? 'bg-blue-500 animate-spin' : 'bg-red-500'}`}></div>
             <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">FastAPI Scraper Bot Status</span>
                <span className="text-sm font-bold text-slate-700">
                  {botStatus === 'online' ? 'Bot Live: Syncing Portals' : botStatus === 'searching' ? 'Bot is searching...' : 'Bot Connection Pending'}
                </span>
             </div>
          </div>
          <button 
            onClick={loadBotJobs}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isBotLoading ? 'animate-spin' : ''}`} />
            Sync Scraper
          </button>
        </div>

        {/* Job Filter Section */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 text-center mb-12 border border-slate-200 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Database <span className="text-blue-600">Filter</span></h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto font-medium text-sm">Filter through our curated database of technical opportunities.</p>
            
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text"
                    placeholder="Filter by Technology, Company, or Scraped Source..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner font-bold"
                />
            </div>
        </div>

        {/* Live Bot Alerts (if bot is offline) */}
        {botStatus === 'offline' && (
          <div className="flex items-center gap-3 p-4 mb-8 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>FastAPI Scraper is currently offline. Showing cached and curated job listings instead.</p>
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <div key={post.id} className="relative group">
                    {post.id.startsWith('bot') && (
                      <div className="absolute -top-3 -right-3 z-10 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                        <Activity className="w-3 h-3" /> LIVE BOT
                      </div>
                    )}
                    <PostCard post={post} />
                  </div>
                ))
            ) : (
                <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <Bot className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                    <p className="text-xl font-bold">No results found</p>
                    <p className="text-sm">Try broadening your search or technology keywords.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
