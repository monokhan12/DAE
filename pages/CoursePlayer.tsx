
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  auth, 
  getCourseById, 
  completeLesson, 
  getUserProfile,
  UserProfile,
  MockUser
} from '../services/firebaseService';
import { Course, Lesson } from '../types';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  ChevronRight,
  Menu,
  X,
  Award,
  MessageSquare
} from 'lucide-react';

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const [courseData, profileData] = await Promise.all([
          getCourseById(courseId || ''),
          getUserProfile(u.uid)
        ]);
        setCourse(courseData);
        setProfile(profileData);
        if (courseData && courseData.lessons.length > 0) {
          setActiveLesson(courseData.lessons[0]);
        }
      }
      setLoading(false);
    });
  }, [courseId]);

  const handleCompleteLesson = async (lessonId: string) => {
    if (!user) return;
    await completeLesson(user.uid, lessonId);
    // Refresh profile to update completed lessons
    const updatedProfile = await getUserProfile(user.uid);
    setProfile(updatedProfile);
    
    // Auto-advance to next lesson
    if (course) {
      const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
      if (currentIndex < course.lessons.length - 1) {
        setActiveLesson(course.lessons[currentIndex + 1]);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course || !activeLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Course Not Found</h2>
        <button onClick={() => navigate('/academy')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Back to Academy</button>
      </div>
    );
  }

  const isLessonCompleted = (lessonId: string) => {
    return profile?.completedLessons?.includes(lessonId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar - Lesson List */}
      <aside className={`
        fixed lg:relative z-50 w-80 h-full bg-white border-r border-slate-200 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 tracking-tight">Course Content</h3>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {course.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`
                  w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3 group
                  ${activeLesson.id === lesson.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'}
                `}
              >
                <div className="mt-1">
                  {isLessonCompleted(lesson.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className={`w-5 h-5 ${activeLesson.id === lesson.id ? 'text-blue-600' : 'text-slate-300'}`} />
                  )}
                </div>
                <div>
                  <p className={`text-xs font-black uppercase tracking-widest mb-1 ${activeLesson.id === lesson.id ? 'text-blue-600' : 'text-slate-400'}`}>
                    Lesson {index + 1}
                  </p>
                  <h4 className={`text-sm font-bold leading-tight ${activeLesson.id === lesson.id ? 'text-blue-900' : 'text-slate-700'}`}>
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-400">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Progress</p>
                <p className="text-sm font-black text-slate-900">
                  {Math.round((profile?.completedLessons?.filter(id => course.lessons.some(l => l.id === id)).length || 0) / course.lessons.length * 100)}% Complete
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${(profile?.completedLessons?.filter(id => course.lessons.some(l => l.id === id)).length || 0) / course.lessons.length * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-slate-50 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-slate-900 tracking-tight line-clamp-1">{course.title}</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{activeLesson.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/academy')} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Exit
            </button>
          </div>
        </header>

        {/* Video Player Area */}
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 lg:p-10">
            {/* Video Container */}
            <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 relative group">
              {activeLesson.videoUrl ? (
                <iframe 
                  src={activeLesson.videoUrl} 
                  className="w-full h-full" 
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                  <Play className="w-20 h-20 mb-4" />
                  <p className="font-black uppercase tracking-widest text-sm">No Video Content Available</p>
                </div>
              )}
            </div>

            {/* Lesson Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                      Lesson {course.lessons.indexOf(activeLesson) + 1}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" /> {activeLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">{activeLesson.title}</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed text-lg">{activeLesson.content}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100">
                  <button 
                    onClick={() => handleCompleteLesson(activeLesson.id)}
                    disabled={isLessonCompleted(activeLesson.id)}
                    className={`
                      px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3
                      ${isLessonCompleted(activeLesson.id) 
                        ? 'bg-emerald-50 text-emerald-600 cursor-default' 
                        : 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-100'}
                    `}
                  >
                    {isLessonCompleted(activeLesson.id) ? (
                      <><CheckCircle2 className="w-5 h-5" /> Lesson Completed</>
                    ) : (
                      'Mark as Complete'
                    )}
                  </button>
                  <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" /> Discussion
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {['Technical Documentation.pdf', 'Source Code.zip', 'Cheat Sheet.png'].map((res, i) => (
                      <li key={i}>
                        <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                          {res}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Next Lesson</p>
                  {course.lessons.indexOf(activeLesson) < course.lessons.length - 1 ? (
                    <>
                      <h4 className="font-bold text-sm mb-6 leading-tight">
                        {course.lessons[course.lessons.indexOf(activeLesson) + 1].title}
                      </h4>
                      <button 
                        onClick={() => setActiveLesson(course.lessons[course.lessons.indexOf(activeLesson) + 1])}
                        className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
                      >
                        Go to Next Lesson
                      </button>
                    </>
                  ) : (
                    <p className="font-bold text-sm text-emerald-400">You've reached the end of the course!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
