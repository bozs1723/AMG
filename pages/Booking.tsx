
import React, { useState } from 'react';
import { Calendar, Clock, Clipboard, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface BookingProps {
  t: (key: string) => string;
  lang: Language;
}

const Booking: React.FC<BookingProps> = ({ t, lang }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Full Executive Check-up",
    "Specialist Consultation",
    "Dental Care",
    "Oncology Treatment",
    "Plastic Surgery",
    "Orthopedic Surgery"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Request Sent Successfully</h1>
        <p className="text-gray-600">Our medical concierge will contact you within 24 hours to confirm your appointment and arrange your travel details if needed.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{t('book_now')}</h1>
          <p className="text-blue-100 opacity-80 mt-2">Personalized medical care is just a few clicks away.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-8 px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {s}
                </div>
                <span className={`text-[10px] uppercase font-bold mt-2 ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
                  {s === 1 ? 'Service' : s === 2 ? 'Date & Time' : 'Details'}
                </span>
                {s < 3 && <div className={`absolute top-5 left-10 w-[calc(100vw/5)] md:w-32 h-[2px] -z-10 ${step > s ? 'bg-blue-600' : 'bg-gray-100'}`}></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clipboard className="text-blue-600" size={20} />
                Select Preferred Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label key={service} className="relative cursor-pointer group">
                    <input type="radio" name="service" className="peer hidden" required />
                    <div className="p-4 border border-gray-200 rounded-2xl group-hover:border-blue-300 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all flex items-center justify-between">
                      <span className="font-medium text-gray-700">{service}</span>
                      <div className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} />
                Choose Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Preferred Time</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                    <option>Morning (08:00 - 12:00)</option>
                    <option>Afternoon (13:00 - 17:00)</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Send className="text-blue-600" size={20} />
                Additional Details
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Additional Requests (Optional)</label>
                  <textarea 
                    placeholder="e.g. Dietary requirements, wheelchair assistance, language translator needed..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <Clock size={20} className="text-yellow-600 shrink-0" />
                  <p className="text-xs text-yellow-700">
                    <strong>Note:</strong> Final confirmation depends on doctor availability. We will verify and update you shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-500 font-bold hover:text-gray-800"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Next Step
              </button>
            ) : (
              <button 
                type="submit" 
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
