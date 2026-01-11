
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Star, Clock, Heart, Award, Crown, HeartPulse, Building2, Globe } from 'lucide-react';
import { Language } from '../types';

interface PartnerLogoProps {
  partner: { name: string; domain: string };
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ partner }) => {
  const [error, setError] = useState(false);
  const logoUrl = `https://logo.clearbit.com/${partner.domain}?size=200`;

  return (
    <a 
      href={`https://${partner.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-center h-40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
      title={`Visit ${partner.name}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3498db] to-[#0a1d4a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      
      <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4">
        {!error ? (
          <img 
            src={logoUrl} 
            alt={partner.name} 
            className="max-w-[85%] max-h-[60%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
            onError={() => setError(true)}
          />
        ) : (
          <div className="text-center px-4 py-3 bg-blue-50/50 rounded-2xl w-full h-full flex flex-col items-center justify-center border border-dashed border-blue-100 group-hover:border-blue-300 transition-colors">
            <Building2 size={24} className="text-[#3498db] mb-2 opacity-40" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-[#0a1d4a] leading-tight block">
              {partner.name}
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Globe size={10} className="text-[#3498db]" />
          <span className="text-[8px] font-black uppercase tracking-widest text-[#3498db] text-center leading-none">
            {partner.domain}
          </span>
        </div>
      </div>
    </a>
  );
};

interface HomeProps {
  t: (key: string) => string;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ t, lang }) => {
  const partners = [
    { name: "BPK 9 International", domain: "bangpakokhospital.com" },
    { name: "Bangkok Siriroj", domain: "phuketinternationalhospital.com" },
    { name: "Yanhee International", domain: "yanhee.net" },
    { name: "Vejthani Hospital", domain: "vejthani.com" },
    { name: "CHG Chularat 3", domain: "chularat.com" },
    { name: "Phyathai 1", domain: "phyathai.com" },
    { name: "Phyathai 2", domain: "phyathai.com" },
    { name: "Phyathai 3", domain: "phyathai.com" },
    { name: "Bumrungrad", domain: "bumrungrad.com" },
    { name: "VitalLife", domain: "vitallifeintegratedhealth.com" },
    { name: "MedPark", domain: "medparkhospital.com" },
    { name: "Samitivej Sukhumvit", domain: "samitivejhospitals.com" },
    { name: "Panacee", domain: "panacee.com" },
    { name: "Zen Cell", domain: "zencellthailand.com" },
    { name: "Rutnin Eye", domain: "rutnin.com" },
    { name: "Praram 9", domain: "praram9.com" },
    { name: "Arun Health Garden", domain: "arunhealthgarden.com" },
    { name: "Kasemrad International", domain: "kasemrad.co.th" },
    { name: "Thonburi Bamrungmuang", domain: "thonburihospital.com" },
    { name: "RAKxa Wellness", domain: "rakxawellness.com" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center overflow-hidden bg-[#0a1d4a]">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop" 
          alt="Luxury Medical Concierge" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d4a] via-[#0a1d4a]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 z-10 text-white space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/40 rounded-full px-4 py-2 backdrop-blur-md">
            <Award size={16} className="text-blue-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">{t('welcome')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black max-w-3xl leading-[1.1] uppercase">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/70 max-w-xl font-medium leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link 
              to="/booking" 
              className="px-10 py-4 bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-xl font-black uppercase tracking-widest text-sm text-center transition-all shadow-xl shadow-red-900/20"
            >
              {t('book_now')}
            </Link>
            <Link 
              to="/services" 
              className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl font-black uppercase tracking-widest text-sm text-center backdrop-blur-md transition-all"
            >
              {t('services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <ShieldCheck size={28} className="text-[#3498db]" />, label: "JCI Accredited", sub: "Global Standards" },
          { icon: <Star size={28} className="text-[#3498db]" />, label: "VIP Concierge", sub: "Personalized Support" },
          { icon: <Clock size={28} className="text-[#3498db]" />, label: "24/7 Response", sub: "Immediate Assistance" },
          { icon: <Heart size={28} className="text-[#3498db]" />, label: "Elite Care", sub: "Top 1% Specialists" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 transform transition-hover hover:-translate-y-1 duration-300">
            <div className="mb-4 p-4 bg-blue-50 rounded-2xl">{item.icon}</div>
            <h3 className="font-black text-[#0a1d4a] uppercase tracking-wider text-sm">{item.label}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{item.sub}</p>
          </div>
        ))}
      </section>

      {/* Dynamic Partner Logos Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
           <div className="flex items-center justify-center space-x-3 mb-2">
             <div className="w-12 h-px bg-gray-200"></div>
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3498db]">Exclusive Network</h2>
             <div className="w-12 h-px bg-gray-200"></div>
           </div>
           <h3 className="text-4xl font-black text-[#0a1d4a] uppercase tracking-tight">Our Elite Strategic Partners</h3>
           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
             Direct Priority Access to the Region's Most Prestigious JCI-Accredited Medical Institutions.
           </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
           {partners.map((partner, i) => (
             <PartnerLogo key={i} partner={partner} />
           ))}
        </div>

        <div className="pt-12 text-center">
          <Link to="/services" className="inline-flex items-center space-x-2 text-[#3498db] hover:text-[#0a1d4a] font-black uppercase tracking-widest text-[10px] transition-colors group">
            <span>Explore full network services</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Medical Service Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#3498db]">
              <div className="w-8 h-1 bg-[#e74c3c] rounded-full"></div>
              <span className="text-xs font-black uppercase tracking-[0.3em]">Excellence</span>
            </div>
            <h2 className="text-4xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('services')}</h2>
            <p className="text-gray-500 max-w-lg font-medium">World-class medical solutions integrated with luxury hospitality.</p>
          </div>
          <Link to="/services" className="px-6 py-2 border-2 border-[#3498db] text-[#3498db] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#3498db] hover:text-white transition-all flex items-center">
            View All Services <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Specialist Consultations", 
              desc: "Direct access to board-certified specialists in Cardiology, Oncology, and Regenerative Medicine.", 
              img: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=800&auto=format&fit=crop" 
            },
            { 
              title: "Luxury Medical Travel", 
              desc: "Complete travel management including visa support, 5-star stays, and chauffeured transfers.", 
              img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop" 
            },
            { 
              title: "Executive Check-ups", 
              desc: "Comprehensive diagnostic programs using the latest medical imaging and laboratory technology.", 
              img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" 
            },
          ].map((s, i) => (
            <div key={i} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="h-56 overflow-hidden relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d4a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{s.desc}</p>
                <button className="text-[#3498db] font-black text-xs uppercase tracking-[0.2em] flex items-center group-hover:translate-x-2 transition-transform">
                  Explore Details <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-[#0a1d4a] to-[#1e3a8a] rounded-[2.5rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3498db] rounded-full blur-[150px] opacity-20 -mr-48 -mt-48"></div>
          <div className="relative z-10 space-y-6 max-w-xl text-center md:text-left mb-10 md:mb-0">
            <div className="flex items-center space-x-2 text-[#3498db] justify-center md:justify-start">
              <Crown size={20} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Premium Membership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">Elite Loyalty Rewards</h2>
            <p className="text-blue-100 font-medium text-lg leading-relaxed">Unlock exclusive medical fast-tracks, luxury limousine credits, and priority specialist bookings as part of our circle.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-5 pt-4">
              <Link to="/loyalty" className="px-8 py-3 bg-[#3498db] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#0a1d4a] transition-all shadow-lg">
                Join Membership
              </Link>
              <Link to="/services" className="px-8 py-3 border border-white/20 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl w-72 space-y-6 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-[#e74c3c] rounded-2xl flex items-center justify-center text-white">
                  <HeartPulse size={24} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-300">Asia Medicare</div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Active Status</p>
                <p className="text-3xl font-black text-[#3498db]">VIP GOLD</p>
              </div>
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold">Next Reward</span>
                  <span className="text-blue-300 font-black">Limo Credit</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3498db] to-blue-400 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
