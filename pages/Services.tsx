
import React, { useState } from 'react';
import { Shield, Plane, Briefcase, HeartPulse, Sparkles, Building2, ChevronRight, Stethoscope, Microscope, Activity } from 'lucide-react';
import { Language } from '../types';

interface ServicesProps {
  t: (key: string) => string;
  lang: Language;
}

const ServicePartnerCard: React.FC<{ partner: { name: string, domain: string } }> = ({ partner }) => {
  const [error, setError] = useState(false);
  const logoUrl = `https://logo.clearbit.com/${partner.domain}`;

  return (
    <div className="group p-8 bg-white rounded-[2.5rem] border border-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-4 text-center aspect-square shadow-sm">
      <div className="w-full h-full flex items-center justify-center p-2">
        {!error ? (
          <img 
            src={logoUrl} 
            alt={partner.name} 
            className="max-w-full max-h-[70%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
            onError={() => setError(true)}
          />
        ) : (
          <div className="p-6 bg-blue-50/50 rounded-3xl w-full h-full flex items-center justify-center border border-dashed border-blue-100">
            <span className="text-xs font-black uppercase tracking-tight text-[#3498db] leading-tight">
              {partner.name}
            </span>
          </div>
        )}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest leading-tight text-gray-400 group-hover:text-[#3498db] transition-colors">
        {partner.name}
      </span>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ t, lang }) => {
  const serviceCategories = [
    {
      title: "Medical Check-ups",
      icon: <HeartPulse className="text-rose-500" />,
      items: ["Executive Health Screening", "Cancer Screening", "Genetic Testing", "Heart Assessment"]
    },
    {
      title: "Medical Tourism",
      icon: <Plane className="text-sky-500" />,
      items: ["Visa Assistance", "Flight Booking", "Hospital Selection", "Multilingual Escorts"]
    },
    {
      title: "Treatment Plans",
      icon: <Shield className="text-emerald-500" />,
      items: ["Oncology Care", "Orthopedic Surgery", "In-Vitro Fertilization", "Stem Cell Therapy"]
    },
    {
      title: "Luxury Concierge",
      icon: <Sparkles className="text-amber-500" />,
      items: ["Airport Fast Track", "Limousine Transfer", "5-Star Hotel Stay", "Private Nursing"]
    }
  ];

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
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('services')}</h1>
        <p className="text-gray-500 font-medium">We offer a holistic ecosystem of healthcare and hospitality services, ensuring your medical journey in Asia is seamless and comfortable.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {serviceCategories.map((cat, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group space-y-8">
            <div className="flex items-center space-x-6">
              <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-[#3498db]/10 transition-colors">{cat.icon}</div>
              <h2 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight">{cat.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-gray-500 hover:text-[#3498db] cursor-pointer group/item transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3498db] opacity-30 group-hover/item:opacity-100 transition-opacity"></div>
                  <span className="text-sm font-bold uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
            <button className="pt-6 border-t border-gray-50 text-[#3498db] font-black text-[10px] uppercase tracking-[0.2em] flex items-center hover:translate-x-2 transition-transform">
              Request Full Portfolio <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        ))}
      </div>

      {/* Featured Partner Hospitals */}
      <section className="space-y-12 bg-[#0a1d4a] p-16 rounded-[3rem] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto mb-16">
           <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Trusted Network</h3>
           <h2 className="text-4xl font-black uppercase tracking-tight">Our Elite Partner Network</h2>
           <p className="text-blue-100/60 font-medium">Direct priority access to Asia's most prestigious JCI-accredited medical institutions.</p>
        </div>
        
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner, i) => (
            <ServicePartnerCard key={i} partner={partner} />
          ))}
        </div>

        <div className="relative z-10 pt-16 flex flex-wrap justify-center gap-8">
           <div className="inline-flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <Shield className="text-green-400" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">JCI Accredited Partners</span>
           </div>
           <div className="inline-flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <Stethoscope className="text-blue-400" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Certified Specialists</span>
           </div>
           <div className="inline-flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <Activity className="text-rose-400" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Standards</span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
