
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { 
  Menu, X, Facebook, Youtube, Linkedin, Cpu, Sparkles, Globe, 
  Brain, Bot, Target, ShieldCheck, Zap, LayoutDashboard,
  Home as HomeIcon, Briefcase, Terminal, Settings2, ChevronRight, ChevronDown
} from 'lucide-react';
import AuthStatus from './AuthStatus';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* --- MAIN HEADER --- */}
      <header className={`bg-white border-b border-slate-100 sticky top-0 z-[60] transition-all duration-300 ${scrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
              Jobs 4 <span className="text-blue-600">DAE</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
             <div className="hidden sm:block">
                <AuthStatus />
             </div>
             <button 
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
             >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </header>

      {/* --- STICKY TOP NAVIGATION TABS (Mobile & Desktop) --- */}
      <nav className="sticky top-[57px] md:top-[73px] z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 overflow-x-auto no-scrollbar shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-2 min-w-max md:justify-center">
            {NAV_LINKS.map((link) => (
              <div 
                key={link.path} 
                className="relative group/nav"
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `
                    px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
                  `}
                >
                  {link.label}
                  {link.subLinks && <ChevronDown className="w-3 h-3" />}
                </NavLink>

                {/* Dropdown Menu */}
                {link.subLinks && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
                      {link.subLinks.map(sub => (
                        <Link 
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDE MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
           <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)}></div>
           <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Career Station</span>
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-6 space-y-2">
                 <div className="sm:hidden mb-6">
                    <AuthStatus />
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Sections</p>
                 <Link 
                   to="/dashboard" 
                   onClick={() => setIsMenuOpen(false)}
                   className={`flex items-center justify-between px-4 py-4 rounded-2xl font-bold transition-all ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                 >
                   Dashboard
                   <ChevronRight className={`w-4 h-4 transition-transform ${location.pathname === '/dashboard' ? 'translate-x-1' : 'text-slate-300'}`} />
                 </Link>
                 {NAV_LINKS.map(link => (
                    <div key={link.path}>
                      <Link 
                        to={link.path} 
                        onClick={() => !link.subLinks && setIsMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 rounded-2xl font-bold transition-all ${location.pathname === link.path ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {link.label}
                        {link.subLinks ? (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronRight className={`w-4 h-4 transition-transform ${location.pathname === link.path ? 'translate-x-1' : 'text-slate-300'}`} />
                        )}
                      </Link>
                      {link.subLinks && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                          {link.subLinks.map(sub => (
                            <Link 
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="block py-3 text-sm font-bold text-slate-500 hover:text-blue-600"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                 ))}
                 <div className="h-px bg-slate-100 my-4"></div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">AI Pro Tools</p>
                 <Link to="/dreamer" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Target className="w-4 h-4" /></div>
                    Career Dreamer
                 </Link>
                 <Link to="/mentor" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><Bot className="w-4 h-4" /></div>
                    AI Mentor
                 </Link>
                 <Link to="/cv-analyzer" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><Settings2 className="w-4 h-4" /></div>
                    CV Analyzer
                 </Link>
              </div>
              <div className="p-6 bg-slate-50 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Jobs 4 DAE • Version 1.2
              </div>
           </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow">
        {children}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-300 relative mt-auto border-t border-white/5">
        <div className="container mx-auto px-4 pt-20 pb-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Jobs 4 DAE</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Pakistan's premier platform for Diploma Engineers. We bridge the gap between technical education and global career opportunities.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-400">AI Workspace</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/ai-tools" className="hover:text-white transition-colors">Utility Hub</Link></li>
                <li><Link to="/dreamer" className="hover:text-white transition-colors">AI Dreamer</Link></li>
                <li><Link to="/cv-analyzer" className="hover:text-white transition-colors">CV Analyzer</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-400">Navigation</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/dae-pakistan" className="hover:text-white transition-colors">DAE Guide</Link></li>
                <li><Link to="/jobs/pakistan" className="hover:text-white transition-colors">Jobs in Pakistan</Link></li>
                <li><Link to="/jobs/abroad" className="hover:text-white transition-colors">Jobs Abroad</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-400">Official Links</h3>
              <div className="flex flex-col gap-3">
                 <a href="https://pbte.edu.pk" target="_blank" rel="noreferrer" className="text-xs hover:text-white flex items-center gap-2">PBTE Official <Globe className="w-3 h-3" /></a>
                 <a href="https://navttc.gov.pk" target="_blank" rel="noreferrer" className="text-xs hover:text-white flex items-center gap-2">NAVTTC Portal <Globe className="w-3 h-3" /></a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] text-slate-500 flex items-center gap-2 uppercase font-black tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Data Board Aligned</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2025 Jobs 4 DAE Pakistan.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Layout;
