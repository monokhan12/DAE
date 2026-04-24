
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Mail, Lock, User, LogIn, UserPlus, Sparkles, AlertCircle, 
  ArrowLeft, Cpu, ShieldCheck, Zap, CheckCircle2, Globe, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginWithEmail, signUpWithEmail, loginWithGoogle, auth } from '../services/firebaseService';

interface AuthLandingProps {
  initialMode?: 'login' | 'signup';
}

const AuthLanding: React.FC<AuthLandingProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial mode based on prop or URL path
  const getInitialMode = () => {
    if (initialMode) return initialMode;
    if (location.pathname === '/signup') return 'signup';
    return 'login';
  };

  const [mode, setMode] = useState<'login' | 'signup'>(getInitialMode());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        if (!name) throw new Error('Please enter your name');
        await signUpWithEmail(email, password, name);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Branding & Value Proposition */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 p-20 flex-col justify-between overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group mb-20">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-900/40 group-hover:rotate-6 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">
              Jobs 4 <span className="text-blue-600">DAE</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl xl:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              Your Technical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Future Starts Here.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-md leading-relaxed font-medium mb-12">
              Join Pakistan's largest ecosystem for Diploma Engineers. Access AI-powered tools, global jobs, and expert mentorship.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Briefcase className="w-5 h-5" />, text: "500+ Active Technical Job Listings", color: "text-blue-400" },
                { icon: <Zap className="w-5 h-5" />, text: "AI-Powered CV Analysis & Optimization", color: "text-emerald-400" },
                { icon: <Globe className="w-5 h-5" />, text: "Global Career Migration Roadmaps", color: "text-indigo-400" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 text-white font-bold text-sm uppercase tracking-widest"
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-10 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified Technical Platform
          </div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            © 2025 Jobs 4 DAE
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-8 md:p-20 relative">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full mb-6 lg:hidden">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Jobs 4 DAE</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 font-medium">
              {mode === 'login' 
                ? 'Sign in to access your personalized career dashboard.' 
                : 'Join the community and start building your technical career.'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-bold text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {mode === 'login' ? 'Sign In to Dashboard' : 'Create My Account'}
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
              <span className="bg-white px-6">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pjax/google.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-medium text-sm">
              {mode === 'login' ? "Don't have an account yet?" : "Already have an account?"}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-20 flex items-center justify-center gap-6 opacity-30 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Cloud_Logo.svg" alt="Google Cloud" className="h-4" />
            <img src="https://firebase.google.com/static/images/brand-guidelines/logo-standard.png" alt="Firebase" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLanding;
