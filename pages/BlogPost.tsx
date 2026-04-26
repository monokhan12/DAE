
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS } from '../constants';
import { BlogPost as IBlogPost } from '../types';
import { Calendar, Tag, User, ArrowLeft, Share2, Clock, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'framer-motion';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);

  useEffect(() => {
    const foundPost = MOCK_POSTS.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center max-w-md">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-slate-200" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-500 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] bg-slate-900 flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 pb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            
            <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                {post.author || 'Jobs 4 DAE Editorial'}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                8 min read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-a:text-blue-600">
                <div className="text-slate-600 leading-relaxed text-lg mb-12 font-medium italic border-l-4 border-blue-600 pl-6">
                  {post.excerpt}
                </div>
                
                <div className="markdown-body">
                  <Markdown>
                    {post.content || "Content coming soon..."}
                  </Markdown>
                </div>
              </div>
              
              <div className="mt-16 pt-16 border-t border-slate-100 flex flex-wrap gap-3">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 space-y-8">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-blue-600" /> Share Article
                  </h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-slate-200">
                      <span className="font-bold text-blue-600">F</span>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-slate-200">
                      <span className="font-bold text-blue-400">T</span>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-slate-200">
                      <span className="font-bold text-blue-700">L</span>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                  <h3 className="text-xl font-black mb-4 relative z-10">Get more tips!</h3>
                  <p className="text-blue-100 text-sm mb-6 relative z-10">Subscribe to our technical newsletter.</p>
                  <Link to="/blog" className="block w-full bg-white text-blue-600 text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors relative z-10">
                    Subscribe Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
