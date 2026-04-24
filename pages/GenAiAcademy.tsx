
import React, { useEffect, useState } from 'react';
import { 
  Sparkles, ShieldCheck, Zap, ArrowRight, Brain, Globe, 
  Cpu, Award, Calendar, Users, Target, BookOpen, 
  ChevronRight, Rocket, Star, PlayCircle, Loader2,
  CheckCircle2, Clock, Filter, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  auth, 
  getCourses, 
  enrollInCourse, 
  getUserProfile,
  UserProfile,
  MockUser
} from '../services/firebaseService';
import { Course } from '../types';

const GenAiAcademy: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
      setLoading(false);
    };

    fetchData();

    return auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const profileData = await getUserProfile(u.uid);
        setProfile(profileData);
      }
    });
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      alert("Please login to enroll in courses.");
      return;
    }
    
    try {
      await enrollInCourse(user.uid, courseId);
      const updatedProfile = await getUserProfile(user.uid);
      setProfile(updatedProfile);
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Enrollment error:", error);
    }
  };

  const isEnrolled = (courseId: string) => {
    return profile?.enrolledCourses?.includes(courseId);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 px-4 bg-slate-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Empowering Technical Talent</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            DAE GenAI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 italic">Academy</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Master the most in-demand technical skill of the 21st century. Tailored specifically for Pakistan's DAE community to bridge the global technology gap.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#catalog" className="flex items-center justify-center bg-blue-600 text-white font-black py-5 px-10 rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40 text-sm uppercase tracking-widest">
              Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <button className="flex items-center justify-center bg-white/5 backdrop-blur-xl text-white font-black py-5 px-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm uppercase tracking-widest">
              <PlayCircle className="mr-2 w-5 h-5 text-emerald-400" /> Watch Promo
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
             <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Verified Curriculum</div>
             <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest"><Users className="w-5 h-5 text-blue-500" /> 1000+ Students</div>
             <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest"><Award className="w-5 h-5 text-yellow-500" /> Industry Certs</div>
          </div>
        </div>
      </section>

      {/* 2. COURSE CATALOG */}
      <section id="catalog" className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Course <span className="text-blue-600">Catalog</span></h2>
              <p className="text-slate-500 font-medium">Professional certifications designed for the modern technician.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                <Filter className="w-4 h-4 text-slate-400 ml-2" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-transparent text-xs font-black text-slate-600 focus:outline-none pr-4 uppercase tracking-widest"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-black">
                      <Star className="w-3 h-3 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.category}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.enrolledCount} Students</span>
                    </div>
                    
                    {isEnrolled(course.id) ? (
                      <Link 
                        to={`/course/${course.id}`}
                        className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleEnroll(course.id)}
                        className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        Enroll Now <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-400 font-medium">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. BENTO ACADEMY EXPERIENCE */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            {/* Main Feature */}
            <div className="md:col-span-8 md:row-span-2 bg-slate-950 rounded-[3rem] p-12 text-white flex flex-col justify-end relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8"><Zap className="w-8 h-8" /></div>
                 <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Hands-on Industrial <br/>Projects</h3>
                 <p className="text-slate-400 max-w-md text-lg">Work on real scenarios like AI-optimized solar grid designs and automated warehouse simulations.</p>
              </div>
            </div>

            {/* Support */}
            <div className="md:col-span-4 md:row-span-1 bg-emerald-50 rounded-[3rem] p-8 border border-emerald-100 flex flex-col justify-between group overflow-hidden">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white"><Users className="w-6 h-6" /></div>
                 <Star className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-900">Community Access</h4>
                 <p className="text-xs text-slate-500 mt-2">Join a network of 5000+ engineering professionals.</p>
              </div>
            </div>

            {/* Certification Badge */}
            <div className="md:col-span-4 md:row-span-2 bg-blue-50 rounded-[3rem] p-10 border border-blue-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
               <Award className="w-24 h-24 text-blue-600 mb-8 transition-transform group-hover:scale-110" />
               <h4 className="text-2xl font-black text-slate-900 mb-2 leading-tight">Professional Certification</h4>
               <p className="text-sm text-slate-500 max-w-xs">Earn a LinkedIn-verified certificate valid for skilled worker visas Abroad and in GCC.</p>
            </div>

            {/* Live Stats */}
            <div className="md:col-span-4 md:row-span-1 bg-slate-50 rounded-[3rem] p-8 border border-slate-100 flex flex-col justify-center">
               <span className="text-4xl font-black text-slate-900 tracking-tighter">98%</span>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Student Satisfaction Rate</p>
            </div>

            {/* Call to Action */}
            <div className="md:col-span-4 md:row-span-1 bg-indigo-600 rounded-[3rem] p-8 text-white flex items-center justify-between group cursor-pointer hover:bg-indigo-700 transition-colors">
               <h4 className="text-xl font-black">Limited Seats <br/>Batch 1</h4>
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ChevronRight className="w-6 h-6" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYLLABUS SECTION */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
           <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight">Academic Curriculum</h2>
              </div>
              
              <div className="space-y-6">
                 {[
                   { week: "Week 01", title: "Introduction to Generative Engineering", topics: ["LLM Foundations", "Technical Prompting", "Ethics in Engineering AI"] },
                   { week: "Week 02", title: "Industrial Intelligence", topics: ["AI-PLC Integration", "Troubleshooting with Gemini", "Logic Optimization"] },
                   { week: "Week 03", title: "Advanced Technical Design", topics: ["AutoCAD AI Extensions", "3D Modeling with Generative Tools", "Design Automation"] },
                   { week: "Week 04", title: "Professional Launchpad", topics: ["AI Career Strategy", "The European Job Market", "Capstone Project Submission"] }
                 ].map((module, i) => (
                   <div key={i} className="group p-6 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{module.week}</span>
                         <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{module.title}</h4>
                      <div className="flex flex-wrap gap-2">
                         {module.topics.map((t, idx) => (
                           <span key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t}</span>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
         <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">Ready to <span className="text-blue-600">Upgrade</span> Your Career?</h2>
            <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium">Join hundreds of DAE students already transforming their professional journey with Generative AI.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <button className="bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all">Apply Now</button>
               <button className="bg-white border-2 border-slate-200 text-slate-900 px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">Download Syllabus</button>
            </div>
         </div>
         {/* Decorative elements */}
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2"></div>
         <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default GenAiAcademy;
