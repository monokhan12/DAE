
import React, { useEffect, useState } from 'react';
import { auth, logout, MockUser } from '../services/firebaseService';
import { LogIn, LogOut, User as UserIcon, LayoutDashboard, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const AuthStatus: React.FC = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    return auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  const openModal = (mode: 'login' | 'signup') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="relative group">
            <img src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} alt={user.displayName || 'User'} className="w-9 h-9 rounded-xl border-2 border-white shadow-sm group-hover:border-blue-100 transition-all" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-black text-slate-900 leading-none">{user.displayName || 'Technician'}</p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">DAE Professional</p>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link 
        to="/login"
        className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-slate-600 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-all"
      >
        Sign In
      </Link>
      <Link 
        to="/signup"
        className="flex items-center gap-2 px-6 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
      >
        <UserPlus className="w-4 h-4" />
        Join Free
      </Link>
    </div>
  );
};

export default AuthStatus;
