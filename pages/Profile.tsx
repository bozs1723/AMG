
import React, { useState, useEffect } from 'react';
import { UserProfile, Language, MedicalRecord, CreditCard } from '../types';
import { db } from '../services/database';
import { User, Phone, Mail, Globe, Camera, Save, LogOut, X, AlertCircle, CreditCard as CardIcon, Activity, FileText, Plus, ChevronRight, Loader2 } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  t: (key: string) => string;
  lang: Language;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser, t, lang, onLogout }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'medical' | 'payment'>('info');
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);

  useEffect(() => {
    if (activeTab === 'medical') {
      fetchMedicalRecords();
    }
  }, [activeTab]);

  const fetchMedicalRecords = async () => {
    setIsLoadingRecords(true);
    try {
      const records = await db.getMedicalRecords(user.id);
      setMedicalRecords(records);
    } catch (err) {
      console.error('Failed to fetch medical records:', err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleSave = async () => {
    try {
      await db.updateProfile(user.id, {
        name: formData.name,
        phone: formData.phone,
        passportNumber: formData.passportNumber
      });
      setUser({ ...user, ...formData });
      setIsEditing(false);
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const mockCards: CreditCard[] = [
    { last4: '4242', brand: 'Visa', expiry: '12/26' },
    { last4: '8888', brand: 'Mastercard', expiry: '09/25' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-[#0a1d4a] to-[#3498db] relative">
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center text-[#0a1d4a] font-black text-5xl">
                {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover" /> : (user.name || 'U').charAt(0)}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-[#3498db] text-white rounded-xl shadow-lg hover:bg-[#2980b9] transition-all">
                <Camera size={16} />
              </button>
            </div>
            <div className="pb-4 space-y-1">
              <h2 className="text-3xl font-black text-white leading-none uppercase tracking-tight">{user.name}</h2>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                  {user.tier} Member
                </div>
                <div className="px-3 py-1 bg-[#e74c3c] rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                  VIP Concierge Active
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 flex space-x-8 border-b border-gray-100 overflow-x-auto scrollbar-hide">
          {[
            { id: 'info', label: t('personal_info'), icon: <User size={16} /> },
            { id: 'medical', label: t('medical_history'), icon: <Activity size={16} /> },
            { id: 'payment', label: t('payment_methods'), icon: <CardIcon size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs font-black uppercase tracking-[0.2em] flex items-center space-x-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-[#3498db] text-[#3498db]' : 'border-transparent text-gray-400 hover:text-[#0a1d4a]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-10">
          {activeTab === 'info' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('personal_info')}</h3>
                <button 
                  onClick={() => isEditing ? setShowConfirmModal(true) : setIsEditing(true)}
                  className="flex items-center space-x-2 px-8 py-3 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#2980b9] transition-all shadow-xl shadow-blue-100"
                >
                  {isEditing ? <><Save size={16} /> <span>{t('save_changes')}</span></> : <span>Edit Profile</span>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Full Name', value: formData.name, key: 'name', icon: <User size={18} /> },
                  { label: 'Email Address', value: formData.email, key: 'email', icon: <Mail size={18} />, disabledAlways: true },
                  { label: 'Phone Number', value: formData.phone, key: 'phone', icon: <Phone size={18} /> },
                  { label: 'Passport Number', value: formData.passportNumber || '', key: 'passportNumber', icon: <Globe size={18} /> }
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isEditing && !field.disabledAlways ? 'text-[#3498db]' : 'text-gray-400'}`}>
                        {field.icon}
                      </div>
                      <input 
                        type="text" 
                        disabled={!isEditing || field.disabledAlways}
                        value={field.value}
                        onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#3498db] transition-all outline-none disabled:opacity-70 text-sm font-bold text-[#0a1d4a]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('medical_history')}</h3>
                <button className="text-[10px] font-black text-[#3498db] uppercase tracking-widest flex items-center space-x-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
                  <Plus size={16} />
                  <span>Upload Document</span>
                </button>
              </div>
              
              {isLoadingRecords ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4">
                  <Loader2 size={32} className="animate-spin text-[#3498db]" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Secure Vault...</p>
                </div>
              ) : medicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                      <div className="flex items-center space-x-5">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-[#e74c3c]">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{record.date}</p>
                          <h4 className="text-lg font-black text-[#0a1d4a] uppercase tracking-tight">{record.hospital}</h4>
                          <p className="text-xs text-gray-500 font-medium">Under {record.doctor} • {record.diagnosis}</p>
                        </div>
                      </div>
                      <button className="p-4 text-gray-300 hover:text-[#3498db] transition-colors">
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                   <p className="text-sm font-bold text-gray-400 uppercase">No medical records found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('payment_methods')}</h3>
                <button className="flex items-center space-x-2 px-6 py-3 bg-[#0a1d4a] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all">
                  <Plus size={16} />
                  <span>Add New Card</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCards.map((card, i) => (
                  <div key={i} className="relative h-52 p-8 rounded-[2rem] bg-gradient-to-br from-gray-800 to-black text-white shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-700">
                      <CardIcon size={120} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <span className="text-lg font-black italic">{card.brand}</span>
                         <div className="w-10 h-8 bg-amber-400/20 rounded-md"></div>
                      </div>
                      <div className="space-y-4">
                        <p className="text-2xl font-mono tracking-[0.3em]">**** **** **** {card.last4}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[8px] uppercase opacity-50 font-black">Expiry</p>
                            <p className="text-sm font-bold">{card.expiry}</p>
                          </div>
                          <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white underline transition-colors">Set Default</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <button 
              onClick={onLogout}
              className="flex items-center space-x-3 text-[#e74c3c] font-black uppercase tracking-widest text-xs hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
            >
              <LogOut size={18} />
              <span>{t('logout')}</span>
            </button>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Account ID: {user.id.substring(0, 8)} • Global Member</p>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1d4a]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#0a1d4a] hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-10 space-y-6 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#3498db]">
                <AlertCircle size={40} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight">Confirm Changes</h3>
                <p className="text-gray-500 font-medium">Are you sure you want to save these changes to your profile?</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-4 border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2980b9] shadow-xl shadow-blue-100 transition-all"
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
