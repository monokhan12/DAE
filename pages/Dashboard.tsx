
import React, { useEffect, useState } from 'react';
import { 
  auth, 
  getUserProfile, 
  getUserRoadmaps, 
  UserProfile, 
  MockUser 
} from '../services/firebaseService';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  ChevronRight, 
  Star, 
  Zap, 
  FileText, 
  Settings,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const [profileData, roadmapsData] = await Promise.all([
          getUserProfile(u.uid),
          getUserRoadmaps(u.uid)
        ]);
        setProfile(profileData);
        setRoadmaps(roadmapsData);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Syncing Workstation...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-200 text-center border border-slate-100">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Dashboard Locked</h2>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">Please sign in to access your professional career dashboard and learning management system.</p>
          <button 
            onClick={() => window.location.href = '#/'} 
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-all shadow-xl shadow-blue-100"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Mock LSM Data
  const enrolledCourses = [
    { id: 'c1', title: 'Advanced PLC Programming', progress: 65, totalLessons: 12, completed: 8, instructor: 'Engr. Ahmed', category: 'Automation' },
    { id: 'c2', title: 'Solar PV System Design', progress: 30, totalLessons: 10, completed: 3, instructor: 'Dr. Sarah', category: 'Renewable Energy' },
    { id: 'c3', title: 'Industrial Safety Standards', progress: 100, totalLessons: 5, completed: 5, instructor: 'Safety Board', category: 'Compliance' }
  ];

  const recentActivities = [
    { id: 'a1', type: 'lesson', title: 'Completed: Logic Gates in PLC', time: '2 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    { id: 'a2', type: 'roadmap', title: 'Generated: Europe Career Path', time: 'Yesterday', icon: <FileText className="w-4 h-4 text-blue-500" /> },
    { id: 'a3', type: 'enroll', title: 'Enrolled: Solar PV Design', time: '2 days ago', icon: <Plus className="w-4 h-4 text-indigo-500" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses, roadmaps..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">{user.displayName}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {user.uid.slice(0, 8)}</p>
              </div>
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
              <Zap className="w-4 h-4 fill-current" />
              <span>Technical Workstation</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Welcome back, <span className="text-blue-600">{user.displayName?.split(' ')[0]}</span>!
            </h1>
            <p className="text-slate-500 font-medium mt-1">You have completed 75% of your weekly learning goal.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dreamer" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Roadmap
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Courses Enrolled', value: enrolledCourses.length, icon: <BookOpen className="w-5 h-5" />, color: 'blue' },
            { label: 'Completed Lessons', value: enrolledCourses.reduce((acc, c) => acc + c.completed, 0), icon: <CheckCircle2 className="w-5 h-5" />, color: 'emerald' },
            { label: 'Saved Roadmaps', value: roadmaps.length, icon: <FileText className="w-5 h-5" />, color: 'indigo' },
            { label: 'Certificates', value: 1, icon: <Trophy className="w-5 h-5" />, color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* LSM Section: Active Courses */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Active Learning
                </h2>
                <Link to="/academy" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All Courses</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.filter(c => c.progress < 100).map(course => (
                  <div key={course.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{course.category}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[10px] font-bold">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <p className="text-xs text-slate-400 font-bold mb-6">Instructor: {course.instructor}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] font-bold text-slate-400">{course.completed}/{course.totalLessons} Lessons</span>
                        <Link 
                          to={`/course/${course.id}`}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved Roadmaps Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  Career Projections
                </h2>
                <Link to="/my-roadmaps" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage All</Link>
              </div>
              <div className="space-y-4">
                {roadmaps.slice(0, 3).map(rm => (
                  <div key={rm.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{rm.title || 'Untitled Roadmap'}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Generated {rm.createdAt?.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Link to="/my-roadmaps" className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
                {roadmaps.length === 0 && (
                  <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                    <p className="text-slate-400 text-sm font-medium mb-4">No career roadmaps generated yet.</p>
                    <Link to="/dreamer" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Start AI Analysis</Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <img src={user.photoURL} alt="" className="w-16 h-16 rounded-2xl border-2 border-white/20" />
                  <div>
                    <h3 className="font-black text-lg leading-none">{user.displayName}</h3>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-2">Elite Technician</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Profile Strength</span>
                    <span className="text-blue-400 font-black">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                  Edit Professional Profile
                </button>
              </div>
            </div>

            {/* Recent Activity (LSM) */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-6">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{activity.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-blue-600 p-8 rounded-[3rem] text-white">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Weekly Goal
              </h3>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="text-white/20"
                      strokeDasharray="100, 100"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-white"
                      strokeDasharray="75, 100"
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black">75%</span>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Done</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs font-medium opacity-80 mb-6">You're almost there! 3 more lessons to reach your target.</p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
