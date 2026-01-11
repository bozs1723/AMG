
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  HeartPulse, 
  Crown, 
  Calendar, 
  User, 
  LayoutDashboard, 
  Globe, 
  Menu, 
  X,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  LogIn,
  UserPlus,
  Star
} from 'lucide-react';
import { translations } from './translations';
import { Language, UserProfile } from './types';
import { db } from './services/database';
import Home from './pages/Home';
import Services from './pages/Services';
import Loyalty from './pages/Loyalty';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatWidget from './components/ChatWidget';
import Logo from './components/Logo';

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('th');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ Mock Session จาก LocalStorage
    const checkSession = async () => {
      const mockUser = localStorage.getItem('asia_medicare_mock_user');
      if (mockUser) {
        const parsedUser = JSON.parse(mockUser);
        setUser(parsedUser);
        if (parsedUser.email === 'admin@asiamedicare.com' || parsedUser.email === 'thedecor.th@gmail.com') {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const t = (key: string) => translations[lang][key] || key;
  const isRTL = lang === 'ar';

  const handleUpdatePoints = async (pointsToSubtract: number) => {
    if (!user) return;
    try {
      const newPoints = user.points - pointsToSubtract;
      const updated = await db.updateProfile(user.id, { points: newPoints });
      setUser(updated);
    } catch (err) {
      console.error('Failed to update points:', err);
    }
  };

  const handleLogout = async () => {
    await db.signOut();
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1d4a]">
        <div className="text-center space-y-4">
          <Logo showText={false} />
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-blue-200 font-black uppercase tracking-widest text-[10px]">Initializing Concierge...</p>
        </div>
      </div>
    );
  }

  const Navigation = () => {
    const location = useLocation();
    const navItems = [
      { path: '/', icon: <HomeIcon size={18} />, label: t('home') },
      { path: '/services', icon: <HeartPulse size={18} />, label: t('services') },
      { path: '/loyalty', icon: <Crown size={18} />, label: t('loyalty') },
      { path: '/booking', icon: <Calendar size={18} />, label: t('booking') },
      { path: '/profile', icon: <User size={18} />, label: t('profile') },
    ];

    if (isAdmin) {
      navItems.push({ path: '/admin', icon: <LayoutDashboard size={18} />, label: t('admin') });
    }

    return (
      <>
        <nav className="hidden md:flex items-center lg:space-x-4 space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-1.5 px-2 lg:px-3 py-2 rounded-xl transition-all whitespace-nowrap ${
                location.pathname === item.path 
                ? 'bg-blue-50 text-[#3498db] shadow-sm' 
                : 'text-gray-600 hover:text-[#3498db] hover:bg-gray-50'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className={`font-bold uppercase tracking-tighter ${lang === 'th' ? 'text-[11px] lg:text-sm' : 'text-xs lg:text-sm'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 z-50 flex justify-around items-center shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${
                location.pathname === item.path ? 'text-[#3498db]' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-black uppercase tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>
      </>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl text-right font-["Cairo"]' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <Logo />
          </Link>

          <Navigation />

          <div className="flex items-center space-x-2 md:space-x-3">
            {user && (
              <div className="hidden sm:flex items-center space-x-1 px-3 py-1 bg-blue-50 text-[#3498db] rounded-full border border-blue-100 font-black text-[10px] tracking-widest uppercase">
                <Star size={12} fill="currentColor" />
                <span>{user.points.toLocaleString()}</span>
              </div>
            )}

            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLangDropdown(!showLangDropdown);
                }}
                className="flex items-center space-x-1.5 px-3 py-2 border border-gray-100 rounded-xl text-xs font-black hover:bg-gray-50 transition-all bg-white shadow-sm"
              >
                <Globe size={14} className="text-[#3498db]" />
                <span className="uppercase text-[#0a1d4a]">{lang}</span>
              </button>
              {showLangDropdown && (
                <div 
                  className="absolute right-0 mt-3 w-40 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(['en', 'th', 'ar', 'zh'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors flex items-center justify-between ${
                        lang === l ? 'bg-blue-50 text-[#3498db]' : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>
                        {l === 'en' ? 'English' : l === 'th' ? 'ภาษาไทย' : l === 'ar' ? 'العربية' : '中文'}
                      </span>
                      {lang === l && <div className="w-1.5 h-1.5 bg-[#3498db] rounded-full"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              {!user ? (
                <>
                  <Link to="/login" className="px-5 py-2 text-xs font-black uppercase tracking-widest text-[#0a1d4a] border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    {t('login')}
                  </Link>
                  <Link to="/signup" className="px-5 py-2 text-xs font-black uppercase tracking-widest text-white bg-[#3498db] rounded-xl hover:bg-[#2980b9] transition-all shadow-lg shadow-blue-100">
                    {t('signup')}
                  </Link>
                </>
              ) : (
                <Link to="/profile" className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#3498db] font-black border border-blue-100">
                  {user.name.charAt(0)}
                </Link>
              )}
            </div>
            
            <button className="md:hidden text-[#0a1d4a] p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-50 py-8 px-6 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
            {!user ? (
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-2xl font-black uppercase tracking-widest text-sm text-[#0a1d4a]"
                >
                  <LogIn size={20} />
                  <span>{t('login')}</span>
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-3 p-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-100"
                >
                  <UserPlus size={20} />
                  <span>{t('signup')}</span>
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#3498db] font-black">
                     {user.name.charAt(0)}
                   </div>
                   <div>
                     <p className="text-sm font-black text-[#0a1d4a] uppercase">{user.name}</p>
                     <p className="text-[10px] text-gray-500 font-bold uppercase">{user.tier} Member</p>
                   </div>
                </div>
                <button onClick={handleLogout} className="text-[#e74c3c]">
                   <LogIn className="rotate-180" size={20} />
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link to="/faq" className="flex items-center space-x-2 text-gray-600 p-4 bg-gray-50 rounded-2xl" onClick={() => setIsMenuOpen(false)}>
                <HelpCircle size={20} className="text-[#3498db]" />
                <span className="font-bold text-xs uppercase">{t('faq')}</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-2 text-gray-600 p-4 bg-gray-50 rounded-2xl" onClick={() => setIsMenuOpen(false)}>
                <Phone size={20} className="text-[#3498db]" />
                <span className="font-bold text-xs uppercase">{t('contact')}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main 
        className="flex-grow pb-24 md:pb-8" 
        onClick={() => setShowLangDropdown(false)}
      >
        <Routes>
          <Route path="/" element={<Home t={t} lang={lang} />} />
          <Route path="/services" element={<Services t={t} lang={lang} />} />
          <Route 
            path="/loyalty" 
            element={user ? <Loyalty user={user} t={t} lang={lang} onRedeem={handleUpdatePoints} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/booking" 
            element={user ? <Booking user={user} t={t} lang={lang} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} setUser={setUser} t={t} lang={lang} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login t={t} />} />
          <Route path="/signup" element={<Signup t={t} />} />
          <Route path="/faq" element={<FAQ t={t} lang={lang} />} />
          <Route path="/contact" element={<Contact t={t} lang={lang} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard t={t} /> : <Navigate to="/" />} />
        </Routes>
      </main>

      <ChatWidget t={t} lang={lang} />

      <footer className="hidden md:block bg-[#0a1d4a] text-gray-400 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Logo showText={true} light={true} />
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              Asia's premier medical concierge service. We connect international patients with the region's elite medical institutions and luxury lifestyle management.
            </p>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{t('services')}</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tighter">
              <li><Link to="/services" className="hover:text-[#3498db] transition-colors">Medical Tourism</Link></li>
              <li><Link to="/services" className="hover:text-[#3498db] transition-colors">Executive Check-ups</Link></li>
              <li><Link to="/services" className="hover:text-[#3498db] transition-colors">VIP Patient Fast Track</Link></li>
              <li><Link to="/services" className="hover:text-[#3498db] transition-colors">Specialist Referrals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Patient Portal</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tighter">
              <li><Link to="/faq" className="hover:text-[#3498db] transition-colors">{t('faq')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#3498db] transition-colors">{t('contact')}</Link></li>
              <li><Link to="/loyalty" className="hover:text-[#3498db] transition-colors">Membership Perks</Link></li>
              <li><Link to="/profile" className="hover:text-[#3498db] transition-colors">Manage Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{t('contact')}</h3>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-xl">
                  <Phone size={18} className="text-[#3498db]" />
                </div>
                <span className="font-black">+66 2 123 4567</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-xl">
                  <Mail size={18} className="text-[#3498db]" />
                </div>
                <span className="font-black">concierge@asiamedicare.com</span>
              </li>
              <li className="flex items-start space-x-4">
                <div className="p-2.5 bg-white/5 rounded-xl mt-1">
                  <MapPin size={18} className="text-[#3498db]" />
                </div>
                <span className="leading-relaxed font-bold">123 Sukhumvit Road, Khlong Toei,<br/>Bangkok 10110, Thailand</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          &copy; {new Date().getFullYear()} Asia Medicare Group. Global Standard Medical Concierge.
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
