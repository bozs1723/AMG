
import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import { Language } from '../types';

interface FAQProps {
  t: (key: string) => string;
  lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ t, lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I earn points?",
      a: "Points are earned on every transaction with Asia Medicare partners. Generally, you earn 1 point for every 100 THB spent on medical services or concierge bookings."
    },
    {
      q: "How long does it take to confirm a booking?",
      a: "Our concierge team usually confirms medical appointments within 2-4 hours during business days, and within 24 hours for weekend requests."
    },
    {
      q: "Can I use points for international flights?",
      a: "Currently, points can be redeemed for regional transfers, limousine services, hotel stays, and hospital upgrades. We are working on adding airline partners soon."
    },
    {
      q: "Is my medical data secure?",
      a: "Absolutely. Asia Medicare follows strict international patient privacy standards. We only share necessary information with your selected hospital and doctor."
    },
    {
      q: "How do I upgrade to Platinum tier?",
      a: "Platinum tier requires 10,000 points earned within a 12-month period. Benefits include a dedicated 24/7 personal manager and complimentary airport upgrades."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{t('faq')}</h1>
        <div className="relative max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-900">{faq.q}</span>
              <div className="p-1 bg-blue-50 rounded-lg text-blue-600">
                {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-6 text-gray-600 text-sm animate-in fade-in slide-in-from-top-2">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
