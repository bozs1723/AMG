
import React from 'react';
import { Shield, Plane, Briefcase, HeartPulse, Sparkles, Building2, ChevronRight, Stethoscope, Microscope, Activity } from 'lucide-react';
import { Language } from '../types';

interface ServicesProps {
  t: (key: string) => string;
  lang: Language;
}

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
    { name: "BPK 9 International", color: "text-[#e74c3c]" },
    { name: "Bangkok Hospital Siriroj", color: "text-[#0a1d4a]" },
    { name: "Yanhee International", color: "text-[#3498db]" },
    { name: "Vejthani Hospital", color: "text-[#0a1d4a]" },
    { name: "CHG Chularat 3", color: "text-[#3498db]" },
    { name: "Phyathai 1 & 2 & 3", color: "text-[#27ae60]" },
    { name: "Bumrungrad International", color: "text-[#0a1d4a]" },
    { name: "VitalLife", color: "text-[#d4af37]" },
    { name: "MedPark Hospital", color: "text-[#0a1d4a]" },
    { name: "Samitivej Sukhumvit", color: "text-[#27ae60]" },
    { name: "Panacee Medical Center", color: "text-[#d4af37]" },
    { name: "Zen Cell Rejuvenation", color: "text-[#e74c3c]" },
    { name: "Rutnin Eye Hospital", color: "text-[#0a1d4a]" },
    { name: "Praram 9 Hospital", color: "text-[#27ae60]" },
    { name: "RAKxa Bang Krachao", color: "text-[#0a1d4a]" }
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
        
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, i) => (
            <div key={i} className="group p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center space-y-4 text-center">
              <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                 <Building2 size={24} className="text-blue-300" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest leading-tight transition-colors group-hover:text-white`}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-16 flex justify-center">
           <div className="inline-flex items-center space-x-8 px-10 py-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center space-x-3">
                 <Shield className="text-green-400" size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest">JCI Accredited</span>
              </div>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <div className="flex items-center space-x-3">
                 <Stethoscope className="text-blue-400" size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Certified Specialists</span>
              </div>
              <div className="w-[1px] h-4 bg-white/20"></div>
              <div className="flex items-center space-x-3">
                 <Activity className="text-rose-400" size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Global Standards</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
