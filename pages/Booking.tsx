
import React, { useState } from 'react';
import { Calendar, Clock, Clipboard, Send, CheckCircle2, X, AlertCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface BookingProps {
  t: (key: string) => string;
  lang: Language;
}

const Booking: React.FC<BookingProps> = ({ t, lang }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: 'Morning (08:00 - 12:00)',
    notes: ''
  });

  const services = [
    "Full Executive Check-up",
    "Specialist Consultation",
    "Dental Care",
    "Oncology Treatment",
    "Plastic Surgery",
    "Orthopedic Surgery"
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const openConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
          <CheckCircle2 size={56} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#0a1d4a] uppercase tracking-tight">Request Sent Successfully</h1>
          <p className="text-gray-500 font-medium">Our medical concierge will contact you within 24 hours to confirm your appointment and arrange your travel details if needed.</p>
        </div>
        <button 
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setFormData({ service: '', date: '', time: 'Morning (08:00 - 12:00)', notes: '' });
          }}
          className="px-10 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100 hover:bg-[#2980b9] transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#0a1d4a] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tight">{t('book_now')}</h1>
            <p className="text-blue-100/70 font-medium text-lg italic">Personalized medical care is just a few clicks away.</p>
          </div>
        </div>
        
        <form onSubmit={openConfirmation} className="p-10 space-y-10">
          {/* Step Indicators */}
          <div className="flex justify-between items-center mb-12 px-4 max-w-2xl mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 ${
                  step >= s ? 'bg-[#3498db] text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-400'
                }`}>
                  {s}
                </div>
                <span className={`text-[10px] uppercase font-black tracking-widest mt-3 ${step >= s ? 'text-[#0a1d4a]' : 'text-gray-300'}`}>
                  {s === 1 ? 'Service' : s === 2 ? 'Schedule' : 'Details'}
                </span>
                {s < 3 && (
                  <div className={`absolute top-6 left-12 w-[calc(100vw/6)] md:w-40 h-[2px] -z-10 transition-colors duration-500 ${
                    step > s ? 'bg-[#3498db]' : 'bg-gray-100'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl text-[#3498db]"><Clipboard size={24} /></div>
                  Select Preferred Service
                </h2>
                <p className="text-gray-400 text-sm font-medium">Choose from our range of world-class medical services.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((service) => (
                  <label key={service} className="relative cursor-pointer group">
                    <input 
                      type="radio" 
                      name="service" 
                      className="peer hidden" 
                      required 
                      checked={formData.service === service}
                      onChange={() => setFormData({ ...formData, service })}
                    />
                    <div className="p-6 border-2 border-gray-50 rounded-[2rem] group-hover:border-blue-100 peer-checked:border-[#3498db] peer-checked:bg-blue-50/50 transition-all flex items-center justify-between shadow-sm">
                      <span className="font-black text-[#0a1d4a] uppercase tracking-tight text-sm">{service}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 peer-checked:border-[#3498db] peer-checked:bg-[#3498db] flex items-center justify-center transition-all">
                        <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl text-[#3498db]"><Calendar size={24} /></div>
                  Choose Date & Time
                </h2>
                <p className="text-gray-400 text-sm font-medium">Select your preferred arrival or consultation window.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Preferred Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3498db] transition-all outline-none text-sm font-bold text-[#0a1d4a]" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Preferred Time</label>
                  <select 
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3498db] transition-all outline-none text-sm font-bold text-[#0a1d4a] appearance-none cursor-pointer"
                  >
                    <option>Morning (08:00 - 12:00)</option>
                    <option>Afternoon (13:00 - 17:00)</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl text-[#3498db]"><Send size={24} /></div>
                  Additional Details
                </h2>
                <p className="text-gray-400 text-sm font-medium">Tell us more to provide the best possible care.</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Additional Requests (Optional)</label>
                  <textarea 
                    placeholder="e.g. Dietary requirements, wheelchair assistance, language translator needed..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-6 py-5 bg-gray-50 border-none rounded-[2rem] focus:ring-2 focus:ring-[#3498db] transition-all outline-none h-40 resize-none text-sm font-bold text-[#0a1d4a]"
                  ></textarea>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <Clock size={24} className="text-[#3498db] shrink-0" />
                  <p className="text-xs text-[#0a1d4a] font-bold leading-relaxed uppercase tracking-tight">
                    <strong>Notice:</strong> Final confirmation depends on hospital availability. Our Concierge will verify and contact you within 2-4 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-10 border-t border-gray-100">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBack}
                className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-[#0a1d4a] transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNext}
                disabled={step === 1 && !formData.service}
                className="px-10 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2980b9] transition-all shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center space-x-2"
              >
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="px-10 py-4 bg-[#0a1d4a] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-blue-100 flex items-center space-x-2"
              >
                <CheckCircle2 size={16} />
                <span>Confirm Booking</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1d4a]/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#0a1d4a] hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <div className="p-12 space-y-10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto text-[#3498db]">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Review Your Booking</h3>
                <p className="text-gray-400 text-sm font-medium italic">Please verify your appointment details below.</p>
              </div>

              <div className="space-y-6 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Selected Service</p>
                    <p className="text-sm font-black text-[#0a1d4a] uppercase">{formData.service}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</p>
                    <p className="text-sm font-black text-[#0a1d4a] uppercase">{formData.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time Window</p>
                    <p className="text-sm font-black text-[#0a1d4a] uppercase">{formData.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Passport Status</p>
                    <p className="text-sm font-black text-green-600 uppercase">Verified</p>
                  </div>
                </div>
                {formData.notes && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Additional Notes</p>
                    <p className="text-xs text-[#0a1d4a] font-medium leading-relaxed bg-white/50 p-3 rounded-xl italic">"{formData.notes}"</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-5 border-2 border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                >
                  Edit Details
                </button>
                <button 
                  onClick={handleFinalSubmit}
                  className="flex-1 py-5 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2980b9] shadow-2xl shadow-blue-100 transition-all flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>Confirm & Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
