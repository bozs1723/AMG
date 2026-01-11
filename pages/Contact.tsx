
import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Facebook, Twitter, Instagram } from 'lucide-react';
import { Language } from '../types';

interface ContactProps {
  t: (key: string) => string;
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ t, lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{t('contact')}</h1>
            <p className="text-gray-500">Reach out to our global concierge team. We are available 24/7 to assist with your medical and luxury needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl w-fit text-blue-600"><Phone size={24} /></div>
              <div className="space-y-1">
                <h3 className="font-bold">Call Us</h3>
                <p className="text-sm text-gray-500">+66 2 123 4567</p>
                <p className="text-sm text-gray-500">+66 81 987 6543</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="p-3 bg-indigo-50 rounded-xl w-fit text-indigo-600"><Mail size={24} /></div>
              <div className="space-y-1">
                <h3 className="font-bold">Email</h3>
                <p className="text-sm text-gray-500">info@asiamedicare.com</p>
                <p className="text-sm text-gray-500">vip@asiamedicare.com</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-900 rounded-3xl text-white space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-500 shrink-0 mt-1" size={24} />
              <div className="space-y-1">
                <h3 className="font-bold">Main Headquarters</h3>
                <p className="text-sm text-gray-400">123 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="text-blue-500 shrink-0 mt-1" size={24} />
              <div className="space-y-1">
                <h3 className="font-bold">Operating Hours</h3>
                <p className="text-sm text-gray-400">Concierge Desk: 24/7 (Everyday)</p>
                <p className="text-sm text-gray-400">Office: Mon-Fri 09:00 - 18:00</p>
              </div>
            </div>
            <div className="pt-4 flex space-x-4 border-t border-gray-800">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option>General Inquiry</option>
                <option>Medical Tourism Request</option>
                <option>Membership Problem</option>
                <option>Partnership Proposal</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-40 resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2">
              <MessageSquare size={20} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
