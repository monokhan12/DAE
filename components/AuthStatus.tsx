
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
        <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-slate-200" />
          <div className="hidden lg:block">
            <p className="text-xs font-black text-slate-900 leading-none">{user.displayName}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Technician</p>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => openModal('login')}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-100"
      >
        <LogIn className="w-4 h-4" />
        Login
      </button>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialMode={modalMode} 
      />
    </>
  );
};

export default AuthStatus;
