
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, Zap, ArrowRight, Brain, FileText, CheckCircle, ShieldCheck, 
  ExternalLink, MessageSquare, Layout, X, Loader2, Copy, FileCode, Search, 
  ClipboardList, Mail, Edit3, ListChecks, FlaskConical, Presentation, 
  Hash, Cpu, Info, Star, TrendingUp, HelpCircle, Terminal, Calculator, Languages
} from 'lucide-react';
import { generateTechnicalContent } from '../services/geminiService';

interface Tool {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  category: 'writing' | 'career' | 'academic' | 'technical';
  placeholder: string;
  buttonText: string;
  badge?: string;
}

const AiTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'writing' | 'career' | 'academic' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools: Tool[] = [
    // --- WRITING TOOLS ---
    {
      id: 'grammarFixer',
      title: "Grammar & Tone Fixer",
      desc: "Instantly correct grammar and make your engineering reports sound professional.",
      icon: <Edit3 className="w-6 h-6" />,
      color: "bg-blue-500",
      glow: "shadow-blue-500/20",
      category: 'writing',
      placeholder: "Paste your technical draft here...",
      buttonText: "Fix My Text",
      badge: "Most Used"
    },
    {
      id: 'emailGenerator',
      title: "Official Email Writer",
      desc: "Generate professional emails for job applications, leave requests, or inquiries.",
      icon: <Mail className="w-6 h-6" />,
      color: "bg-cyan-500",
      glow: "shadow-cyan-500/20",
      category: 'writing',
      placeholder: "e.g. Asking for internship at Lucky Cement...",
      buttonText: "Write Email"
    },
    {
      id: 'translator',
      title: "Urdu Tech Translator",
      desc: "Translate complex engineering English to professional technical Urdu.",
      icon: <Languages className="w-6 h-6" />,
      color: "bg-emerald-500",
      glow: "shadow-emerald-500/20",
      category: 'technical',
      placeholder: "Enter technical terms or sentences...",
      buttonText: "Translate Now",
      badge: "Popular"
    },

    // --- CAREER TOOLS ---
    {
      id: 'coverLetter',
      title: "Cover Letter Pro",
      desc: "Generate a custom technical cover letter based on a job description.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-500",
      glow: "shadow-indigo-500/20",
      category: 'career',
      placeholder: "Paste job title and requirements here...",
      buttonText: "Create Letter",
      badge: "Career Boost"
    },
    {
      id: 'interview',
      title: "Interview Prep Bot",
      desc: "Get 5 custom interview questions for any DAE job role.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-violet-500",
      glow: "shadow-violet-500/20",
      category: 'career',
      placeholder: "e.g., WAPDA Line Superintendent or Sub-Engineer...",
      buttonText: "Get Questions"
    },
    {
      id: 'skillExtractor',
      title: "Job Skill Extractor",
      desc: "Paste a job description to see what skills you need to highlight.",
      icon: <ListChecks className="w-6 h-6" />,
      color: "bg-slate-700",
      glow: "shadow-slate-500/20",
      category: 'career',
      placeholder: "Paste the job description text...",
      buttonText: "Extract Skills"
    },

    // --- ACADEMIC TOOLS ---
    {
      id: 'mcqGen',
      title: "DAE MCQ Generator",
      desc: "Create practice exam questions for any DAE subject topic.",
      icon: <Hash className="w-6 h-6" />,
      color: "bg-orange-500",
      glow: "shadow-orange-500/20",
      category: 'academic',
      placeholder: "e.g. DC Motor working principles...",
      buttonText: "Generate MCQs",
      badge: "Exam Prep"
    },
    {
      id: 'studyPlan',
      title: "7-Day Study Planner",
      desc: "Create an intensive study roadmap for your upcoming PBTE exams.",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "bg-amber-500",
      glow: "shadow-amber-500/20",
      category: 'academic',
      placeholder: "Enter Subject Name (e.g., Power Plants)...",
      buttonText: "Create Roadmap"
    },
    {
      id: 'syllabusSimplifier',
      title: "Topic Simplifier",
      desc: "Break down complex syllabus topics into easy-to-learn bullet points.",
      icon: <Layout className="w-6 h-6" />,
      color: "bg-rose-500",
      glow: "shadow-rose-500/20",
      category: 'academic',
      placeholder: "e.g. Kirchhoff's Laws explained simply...",
      buttonText: "Simplify Topic"
    },

    // --- TECHNICAL TOOLS ---
    {
      id: 'plc',
      title: "PLC Logic Suggester",
      desc: "Get pseudo-code or ladder logic steps for industrial automation tasks.",
      icon: <FileCode className="w-6 h-6" />,
      color: "bg-slate-900",
      glow: "shadow-slate-900/40",
      category: 'technical',
      placeholder: "Describe the task (e.g., Star-Delta starter)...",
      buttonText: "Suggest Logic",
      badge: "Industry Standard"
    },
    {
      id: 'codeDebugger',
      title: "Code Debugger Pro",
      desc: "Debug snippets and understand technical logic (CIT/Computer focus).",
      icon: <Terminal className="w-6 h-6" />,
      color: "bg-blue-600",
      glow: "shadow-blue-600/20",
      category: 'technical',
      placeholder: "Paste the code snippet that needs fixing...",
      buttonText: "Debug Code"
    },
    {
      id: 'labReport',
      title: "Lab Report Builder",
      desc: "Generate professional outlines for your technical experiments.",
      icon: <FlaskConical className="w-6 h-6" />,
      color: "bg-sky-500",
      glow: "shadow-sky-500/20",
      category: 'technical',
      placeholder: "Describe the experiment...",
      buttonText: "Build Outline"
    },
    {
      id: 'mathFormula',
      title: "Formula Explainer",
      desc: "Step-by-step breakdown of complex engineering math formulas.",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-indigo-600",
      glow: "shadow-indigo-600/20",
      category: 'technical',
      placeholder: "Enter the formula or problem (e.g., Fourier series)...",
      buttonText: "Explain Step-by-Step"
    }
  ];

  const handleRunTool = async () => {
    if (!activeTool || !userInput.trim() || isLoading) return;
    setIsLoading(true);
    setResult('');
    
    try {
      const output = await generateTechnicalContent(activeTool.id, userInput);
      setResult(output);
    } catch (error) {
      setResult("The AI engine encountered an error. Please refine your input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Dynamic Header & Search */}
      <section className="relative bg-slate-950 pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Technical AI Workspace</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter leading-[1.1]">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Toolkit</span> for Students
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            A specialized collection of professional AI utilities built exclusively for the Pakistani technical community. 
            Free, fast, and optimized for engineering standards.
          </p>

          {/* Glow Search Bar */}
          <div className={`max-w-2xl mx-auto transition-all duration-300 ${scrolled ? 'fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4' : 'relative'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl">
                <Search className="absolute left-6 text-slate-500 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="What can we solve for you today? (e.g. MCQs, PLC, Debug)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-transparent text-white placeholder:text-slate-500 focus:outline-none font-medium text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center gap-1 py-4">
            {['all', 'writing', 'career', 'academic', 'technical'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {activeCategory === 'all' && !searchQuery && (
          <div className="flex items-center gap-4 mb-10">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Utilities</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => { setActiveTool(tool); setResult(''); setUserInput(''); }}
              className={`relative bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer flex flex-col ${tool.glow}`}
            >
              {tool.badge && (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/10">
                  {tool.badge}
                </div>
              )}

              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 ${tool.color}`}>
                  {tool.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{tool.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{tool.desc}</p>
              
              <div className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                Launch Tool
              </div>
            </div>
          ))}

          {/* External Links */}
          <a href="https://gemini.google.com" target="_blank" className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl hover:shadow-2xl transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
             <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Sparkles className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-3">Google Gemini</h3>
             <p className="text-white/70 text-sm mb-8 flex-grow">Advanced technical research and diagram analysis platform.</p>
             <div className="w-full py-4 bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-indigo-900 transition-all">
               Visit Portal <ExternalLink className="w-3 h-3" />
             </div>
          </a>
        </div>

        {filteredTools.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <HelpCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">No tools found for "{searchQuery}"</h3>
            <p className="text-slate-500 mt-2">Try broader keywords like "Writing" or "Math".</p>
            <button onClick={() => setSearchQuery('')} className="mt-8 text-blue-600 font-bold hover:underline">Clear Search</button>
          </div>
        )}
      </div>

      {/* AI Workstation Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${activeTool.color}`}>
                     {activeTool.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeTool.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Technical Session • Ready</p>
                    </div>
                  </div>
               </div>
               <button 
                 onClick={() => { setActiveTool(null); setResult(''); setUserInput(''); }} 
                 className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-900"
               >
                  <X className="w-7 h-7" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar bg-white">
               {!result ? (
                 <div className="max-w-3xl mx-auto">
                    <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100/50 mb-10 flex items-start gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                          <Info className="w-5 h-5" />
                       </div>
                       <p className="text-sm text-blue-900 leading-relaxed font-medium">{activeTool.desc}</p>
                    </div>
                    
                    <div className="relative">
                      <textarea 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={activeTool.placeholder}
                        className="w-full h-64 p-8 rounded-[2.5rem] border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-slate-700 bg-slate-50 font-medium text-base transition-all shadow-inner placeholder:text-slate-300"
                      />
                      <div className="absolute bottom-6 right-8 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Workspace Ready
                      </div>
                    </div>
                    
                    <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                       <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">End-to-End Encrypted Input</p>
                       </div>
                       <button 
                        onClick={handleRunTool}
                        disabled={!userInput.trim() || isLoading}
                        className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 text-yellow-400" /> 
                            {activeTool.buttonText}
                          </>
                        )}
                      </button>
                    </div>
                 </div>
               ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                             <CheckCircle className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Analysis Complete</h3>
                       </div>
                       <button 
                         onClick={copyToClipboard} 
                         className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl transition-all border border-blue-100 shadow-sm"
                       >
                          <Copy className="w-4 h-4" /> Copy Output
                       </button>
                    </div>
                    
                    <div className="bg-slate-950 rounded-[2.5rem] p-10 text-slate-200 leading-[1.8] whitespace-pre-wrap font-mono text-sm border border-white/5 shadow-inner selection:bg-blue-500 selection:text-white overflow-x-auto">
                       {result}
                    </div>
                    
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <button 
                         onClick={() => setResult('')} 
                         className="py-5 border-2 border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-colors"
                        >
                          New Session
                        </button>
                       <button 
                         onClick={() => { setActiveTool(null); setResult(''); }} 
                         className="py-5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                       >
                         Close Workspace
                       </button>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Technical Standards Section */}
      <section className="bg-white py-32 border-t border-slate-100">
         <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Engineered for Accuracy</h2>
               <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                  Our utilities are fine-tuned with PBTE standards and Pakistani industrial context to ensure high-accuracy professional outputs.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Verified Frameworks</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Tools designed to supplement learning, not bypass it. Perfect for professional document drafting.</p>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Instant Processing</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Powered by Gemini 3 Flash, providing high-speed responses for complex technical tasks.</p>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Cpu className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Technical Context</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Built-in knowledge of WAPDA, AEC, and Pakistani Technical Board syllabus requirements.</p>
               </div>
            </div>
         </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default AiTools;
