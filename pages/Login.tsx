
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, ArrowRight, User, Loader2, Github, Zap } from 'lucide-react';
import { db } from '../services/database';
import Logo from '../components/Logo';

interface LoginProps {
  t: (key: string) => string;
}

const Login: React.FC<LoginProps> = ({ t }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await db.signIn(email, password);
      window.location.href = '/'; 
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setIsLoading(true);
    try {
      await db.signIn('demo@asiamedicare.com', 'password123');
      window.location.href = '/';
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsSocialLoading(true);
    setError(null);
    try {
      await db.signInWithGithub();
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Failed to connect with GitHub.');
      setIsSocialLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-[#0a1d4a]">
           <ShieldCheck size={120} />
        </div>

        <div className="text-center space-y-4 relative z-10">
          <div className="flex justify-center mb-6">
            <Logo showText={false} />
          </div>
          <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">
            {t('login')}
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            Access your health concierge dashboard
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in">
            {error}
          </div>
        )}

        <div className="space-y-4 relative z-10">
          {/* Quick Login Button */}
          <button
            onClick={handleQuickLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl group hover:bg-blue-600 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 text-blue-600 group-hover:text-white transition-colors">
              <Zap size={20} className="fill-current" />
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-widest">Try Demo Member</p>
                <p className="text-[10px] opacity-70 font-bold uppercase">One-click experience</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-blue-300 group-hover:text-white" />
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[8px] font-black uppercase tracking-widest">
              <span className="px-4 bg-white text-gray-300">or use credentials</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3498db] transition-all outline-none text-sm font-bold text-[#0a1d4a]"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3498db] transition-all outline-none text-sm font-bold text-[#0a1d4a]"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isSocialLoading}
              className="w-full flex items-center justify-center space-x-3 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl bg-[#3498db] text-white hover:bg-[#2980b9] shadow-blue-100 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>{t('login')}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex flex-col items-center space-y-4">
             <p className="text-xs font-bold text-gray-500">
               New to Asia Medicare? <button type="button" onClick={() => navigate('/signup')} className="text-[#3498db] hover:underline uppercase tracking-widest ml-1">{t('signup')}</button>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
