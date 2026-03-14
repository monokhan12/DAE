
import React from 'react';
import { GraduationCap, BookOpen, Landmark, Globe, ArrowRight, Star, Award, Building2, ChevronRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HigherStudiesProps {
  title?: string;
}

const HigherStudies: React.FC<HigherStudiesProps> = ({ title }) => {
  const universityOptions = [
    {
      name: "UET Lahore",
      type: "Engineering University",
      programs: ["B.Sc Engineering (Reserved Seats)", "B.Tech (Hons)"],
      description: "Pakistan's premier engineering institution with dedicated quotas for DAE graduates.",
      link: "https://uet.edu.pk"
    },
    {
      name: "NUST Islamabad",
      type: "Research University",
      programs: ["B.S Engineering", "Applied Sciences"],
      description: "Top-ranked university offering competitive entry for technical diploma holders.",
      link: "https://nust.edu.pk"
    },
    {
      name: "QUEST Nawabshah",
      type: "Technical University",
      programs: ["B.E Engineering", "B.Tech"],
      description: "Specialized engineering programs for Sindh-based DAE students.",
      link: "https://quest.edu.pk"
    }
  ];

  const internationalPaths = [
    {
      country: "Germany",
      path: "Fachhochschule (Applied Sciences)",
      details: "DAE is often recognized as equivalent to Fachhochschulreife after a preparatory year (Studienkolleg).",
      icon: "🇩🇪"
    },
    {
      country: "China",
      path: "Bachelors in Engineering",
      details: "Numerous scholarships available for Pakistani DAE students under CPEC initiatives.",
      icon: "🇨🇳"
    },
    {
      country: "Turkey",
      path: "Technical Education",
      details: "Turkish universities offer high-quality technical education with affordable tuition for Pakistanis.",
      icon: "🇹🇷"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">Academic Excellence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
            {title || "Higher Studies"} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Roadmap for DAE</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Your diploma is just the beginning. Explore local university quotas, B.Tech programs, and international scholarship opportunities.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Local Universities */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Top Local Universities</h2>
                  <p className="text-slate-500 text-sm">Institutions with reserved seats for DAE holders</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {universityOptions.map((uni, idx) => (
                  <div key={idx} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{uni.name}</h3>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">{uni.type}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">{uni.description}</p>
                    <div className="space-y-2 mb-6">
                      {uni.programs.map((prog, pidx) => (
                        <div key={pidx} className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                          <ChevronRight className="w-3 h-3 text-blue-400" />
                          {prog}
                        </div>
                      ))}
                    </div>
                    <a href={uni.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group/btn">
                      Visit Website <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* B.Tech vs B.Sc Engineering */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400" />
                B.Tech vs B.Sc Engineering
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-emerald-400 font-bold uppercase text-xs tracking-widest">B.Tech (Hons)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Focuses on practical application and industrial management. Highly recommended for DAE students who want to stay in technical leadership roles.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-slate-300 text-xs flex items-center gap-2"><Star className="w-3 h-3 text-yellow-400" /> 4-Year Degree Program</li>
                    <li className="text-slate-300 text-xs flex items-center gap-2"><Star className="w-3 h-3 text-yellow-400" /> Recognized by HEC</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest">B.Sc Engineering</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Focuses on theoretical design and research. Requires high merit for reserved DAE seats in public sector universities.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-slate-300 text-xs flex items-center gap-2"><Star className="w-3 h-3 text-yellow-400" /> PEC Accreditation Required</li>
                    <li className="text-slate-300 text-xs flex items-center gap-2"><Star className="w-3 h-3 text-yellow-400" /> Competitive Entrance Exams</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* International Paths */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Global Paths</h2>
                  <p className="text-slate-500 text-xs">Study abroad opportunities</p>
                </div>
              </div>

              <div className="space-y-6">
                {internationalPaths.map((path, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{path.icon}</span>
                      <h3 className="font-bold text-slate-900">{path.country}</h3>
                    </div>
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2">{path.path}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{path.details}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-center">
                <p className="text-white text-xs font-bold mb-4">Need a personalized study abroad plan?</p>
                <Link to="/mentor" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                  Ask AI Mentor <Bot className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 shadow-xl text-white">
              <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Quick Tips
              </h3>
              <ul className="space-y-4">
                <li className="text-xs leading-relaxed opacity-90">• Keep your DAE percentage above 70% for university admissions.</li>
                <li className="text-xs leading-relaxed opacity-90">• Prepare for ECAT/Entry tests early.</li>
                <li className="text-xs leading-relaxed opacity-90">• Get your diploma verified by IBCC for foreign studies.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HigherStudies;
