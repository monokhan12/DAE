import React from 'react';
import { Target, Globe, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 px-4 text-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Empowering Pakistan's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Technical Talent</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We are the dedicated bridge between your DAE diploma and a successful professional career. From government job alerts to university admissions, we navigate the path with you.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Our Mission is to Reduce the <span className="text-blue-600">Guidance Gap</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Thousands of DAE graduates in Pakistan face uncertainty after completing their diploma. Information is scattered, and career counseling is rare. 
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We aim to centralize every opportunity—be it WAPDA jobs, B.Tech admissions, or scholarship updates—providing a clear roadmap for every technology student.
              </p>
              
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Authentic Information</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Student-Centric Approach</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Career Development</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Industry Connections</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl transform rotate-3 opacity-10"></div>
               <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 relative shadow-xl">
                   <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                     <Globe className="w-6 h-6 mr-3 text-blue-600" /> 
                     Why Choose Us?
                   </h3>
                   <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold mr-4 border border-slate-100">1</div>
                        <div>
                          <h4 className="font-bold text-slate-900">Dedicated to DAEs</h4>
                          <p className="text-sm text-slate-500 mt-1">Unlike general job portals, we filter out irrelevant noise. Every post is for you.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold mr-4 border border-slate-100">2</div>
                        <div>
                          <h4 className="font-bold text-slate-900">AI-Powered Mentorship</h4>
                          <p className="text-sm text-slate-500 mt-1">Our AI tool searches official boards (PBTE, TEVTA) to give you accurate syllabus and result info.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold mr-4 border border-slate-100">3</div>
                        <div>
                          <h4 className="font-bold text-slate-900">Higher Ed Pathways</h4>
                          <p className="text-sm text-slate-500 mt-1">We specialize in B.Tech and BS Engineering Technology admission guides.</p>
                        </div>
                      </div>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-20 px-4 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-3">50k+</div>
            <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">Monthly Users</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3">150+</div>
            <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">Job Alerts/Mo</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3">24/7</div>
            <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">AI Support</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-3">100%</div>
            <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">Free Resources</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;