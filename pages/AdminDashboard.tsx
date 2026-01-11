
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Users, Calendar, MessageSquare, TrendingUp, Shield, Activity, 
  Bell, Search, Send, Filter, MoreHorizontal, User, Bot, 
  CheckCircle, AlertCircle, Clock, X, Phone, Heart, Sparkles, MapPin, ChevronLeft, ChevronRight,
  Stethoscope, Info
} from 'lucide-react';
import { Appointment } from '../types';

const AdminDashboard: React.FC<{ t: any }> = ({ t }) => {
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>('Sarah Ahmed');
  const [adminReply, setAdminReply] = useState('');
  const [showResolveConfirm, setShowResolveConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPatientContext, setShowPatientContext] = useState(true);

  const statsData = [
    { name: 'Mon', bookings: 12, revenue: 4500 },
    { name: 'Tue', bookings: 19, revenue: 5200 },
    { name: 'Wed', bookings: 15, revenue: 4800 },
    { name: 'Thu', bookings: 22, revenue: 6100 },
    { name: 'Fri', bookings: 30, revenue: 8900 },
    { name: 'Sat', bookings: 25, revenue: 7500 },
    { name: 'Sun', bookings: 10, revenue: 3200 },
  ];

  // Mock Daily Appointments
  const appointments: Appointment[] = [
    { id: '1', userId: 'USR101', userName: 'Sarah Ahmed', userPhone: '+971 50 123 4567', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', date: '2023-12-01', time: '09:00 AM', service: 'Cardiology Check-up', status: 'confirmed', addons: ['VIP Fast Track', 'Arabic Translator'] },
    { id: '2', userId: 'USR102', userName: 'Li Wei', userPhone: '+86 138 9876 5432', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', date: '2023-12-01', time: '11:30 AM', service: 'Oncology Consultation', status: 'confirmed', addons: ['Airport Limousine'] },
    { id: '3', userId: 'USR103', userName: 'John Smith', userPhone: '+1 212 555 0198', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop', date: '2023-12-01', time: '02:00 PM', service: 'Dental Veneers', status: 'pending', addons: ['Luxury Hotel Stay'] },
  ];

  // Find appointment for the currently selected chat user
  const selectedUserAppointment = appointments.find(apt => apt.userName === selectedChatUser);

  // Mock Chat Sessions
  const chatSessions = [
    { id: '1', user: 'Sarah Ahmed', phone: '+971 50 123 4567', lastMsg: 'I need a specialized cardiologist...', time: '2m ago', unread: true, status: 'urgent' },
    { id: '2', user: 'Li Wei', phone: '+86 138 9876 5432', lastMsg: 'When is my limo arriving?', time: '15m ago', unread: false, status: 'active' },
    { id: '3', user: 'Mohammed Ali', phone: '+966 50 555 1234', lastMsg: 'Thank you for the help.', time: '1h ago', unread: false, status: 'resolved' },
    { id: '4', user: 'John Smith', phone: '+1 212 555 0198', lastMsg: 'How do I earn more points?', time: '3h ago', unread: false, status: 'active' },
  ];

  const filteredChats = chatSessions.filter(s => 
    s.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.phone.includes(searchQuery)
  );

  const chatHistory = [
    { role: 'user', text: "Hello, I'm looking for a heart specialist in Bangkok.", time: '10:00 AM' },
    { role: 'ai', text: "Welcome Sarah! Asia Medicare works with top cardiologists at Bumrungrad and Samitivej. Would you like to see a list of specialists or book a direct consultation?", time: '10:01 AM' },
    { role: 'user', text: "I specifically need someone who deals with arrhythmia. I'm coming from Dubai next week.", time: '10:05 AM' },
    { role: 'admin', text: "Hello Sarah, this is the Concierge Manager. I've personally notified Dr. Somchai's team of your Dubai arrival. I can arrange an airport fast-track for you as well.", time: '10:15 AM' },
  ];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReply.trim()) return;
    setAdminReply('');
  };

  const handleResolveSession = () => {
    setShowResolveConfirm(false);
    setSelectedChatUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-500">
      {/* Header & Date Control */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#0a1d4a] uppercase tracking-tight">Executive Dashboard</h1>
          <p className="text-gray-500 font-medium">Global Operations & Concierge Monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronLeft size={16} /></button>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-black uppercase tracking-widest text-[#0a1d4a] bg-transparent outline-none cursor-pointer" 
            />
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronRight size={16} /></button>
          </div>
          <button className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative group hover:border-[#3498db] transition-all">
            <Bell size={20} className="text-gray-500 group-hover:text-[#3498db]" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Customer Today Highlights */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} className="text-[#3498db]" />
          <h2 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('customer_today')}</h2>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          {appointments.map((apt) => (
            <div key={apt.id} className="min-w-[320px] bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center space-x-5 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-blue-50 overflow-hidden">
                    <img src={apt.userPhoto} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-1.5 bg-green-500 text-white rounded-lg shadow-lg">
                    <CheckCircle size={14} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0a1d4a] uppercase tracking-tight">{apt.userName}</h3>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Phone size={12} />
                    <span className="text-[10px] font-bold uppercase">{apt.userPhone}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <span>Service</span>
                      <span>Time</span>
                   </div>
                   <div className="flex justify-between text-sm font-black text-[#0a1d4a] uppercase">
                      <span>{apt.service}</span>
                      <span className="text-[#3498db]">{apt.time}</span>
                   </div>
                </div>
                {apt.addons && (
                  <div className="flex flex-wrap gap-2">
                    {apt.addons.map((addon, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-[#3498db] rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100">
                        {addon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Stats and Daily Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Stats & Chart */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Users size={24} />, label: 'New Arrivals', value: '18', color: 'blue' },
              { icon: <Activity size={24} />, label: 'Active Sessions', value: '42', color: 'green' },
              { icon: <Heart size={24} />, label: 'Satisfaction', value: '98%', color: 'red' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-7 rounded-[2rem] border border-gray-50 shadow-sm space-y-4">
                 <div className="p-3 bg-gray-50 rounded-2xl w-fit text-[#3498db]">{stat.icon}</div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-[#0a1d4a]">{stat.value}</p>
                 </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">Revenue Analytics</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-50 text-[#3498db] rounded-xl text-[10px] font-black uppercase tracking-widest">7D</button>
                <button className="px-4 py-2 hover:bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest">30D</button>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498db" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'black', textTransform: 'uppercase' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3498db" strokeWidth={4} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Schedule List */}
        <div className="lg:col-span-4 bg-[#0a1d4a] p-10 rounded-[2.5rem] shadow-2xl text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex justify-between items-center">
            <h3 className="text-lg font-black uppercase tracking-tight">{t('all_appointments')}</h3>
            <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Filter size={16} /></button>
          </div>
          <div className="relative z-10 space-y-6">
             {appointments.map((apt) => (
               <div key={apt.id} className="flex items-start space-x-5 group cursor-pointer hover:bg-white/5 p-4 rounded-3xl transition-all border border-transparent hover:border-white/10">
                  <div className="text-center shrink-0">
                    <p className="text-sm font-black text-blue-300 italic">{apt.time.split(' ')[0]}</p>
                    <p className="text-[10px] font-black uppercase opacity-50">{apt.time.split(' ')[1]}</p>
                  </div>
                  <div className="flex-grow space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-tight">{apt.userName}</h4>
                    <p className="text-xs text-blue-100/60 font-medium">{apt.service}</p>
                    <div className="flex items-center space-x-2 pt-2">
                       <span className={`w-2 h-2 rounded-full ${apt.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{apt.status}</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
          <button className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all relative z-10">
            View Full Medical Log
          </button>
        </div>
      </div>

      {/* Concierge Chat Hub Section */}
      <section className="bg-white rounded-[2.5rem] border border-gray-50 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
        <div className="bg-[#0a1d4a] px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-2xl text-[#3498db]">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Concierge Chat Hub</h2>
              <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest">Real-time Advanced Search & Override</p>
            </div>
          </div>
          <div className="relative hidden md:block w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 outline-none focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 h-[650px]">
          {/* Chat Sidebar */}
          <div className="lg:col-span-4 border-r border-gray-100 flex flex-col">
            <div className="overflow-y-auto flex-grow divide-y divide-gray-50">
              {filteredChats.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => setSelectedChatUser(session.user)}
                  className={`p-6 flex items-start space-x-4 cursor-pointer transition-all hover:bg-gray-50 ${selectedChatUser === session.user ? 'bg-blue-50/50 border-l-4 border-l-[#3498db]' : ''}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center text-[#0a1d4a] font-black text-lg overflow-hidden">
                       {/* Try to find user photo from appointments if available */}
                       {appointments.find(a => a.userName === session.user)?.userPhoto ? 
                        <img src={appointments.find(a => a.userName === session.user)?.userPhoto} className="w-full h-full object-cover" /> : 
                        session.user.charAt(0)
                       }
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      session.status === 'urgent' ? 'bg-red-500' : 
                      session.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-black text-[#0a1d4a] uppercase tracking-tight truncate">{session.user}</h4>
                      <span className="text-[10px] text-gray-400 font-bold">{session.time}</span>
                    </div>
                    <p className="text-[10px] text-[#3498db] font-black uppercase mb-1">{session.phone}</p>
                    <p className="text-xs text-gray-500 truncate font-medium">{session.lastMsg}</p>
                  </div>
                  {session.unread && (
                    <div className="w-2.5 h-2.5 bg-[#3498db] rounded-full mt-1 shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Main Window + Context Sidebar */}
          <div className="lg:col-span-8 flex bg-gray-50/30 overflow-hidden">
            {selectedChatUser ? (
              <>
                <div className="flex-grow flex flex-col min-w-0 bg-white">
                  {/* Chat Header */}
                  <div className="px-8 py-5 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-50 text-[#3498db] rounded-xl flex items-center justify-center overflow-hidden">
                        {selectedUserAppointment?.userPhoto ? 
                          <img src={selectedUserAppointment.userPhoto} className="w-full h-full object-cover" /> : 
                          <User size={20} />
                        }
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#0a1d4a] uppercase tracking-tight">{selectedChatUser}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Active Consultation</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setShowPatientContext(!showPatientContext)}
                        className={`p-2 rounded-xl transition-all ${showPatientContext ? 'bg-blue-50 text-[#3498db]' : 'text-gray-400 hover:text-[#0a1d4a]'}`}
                        title="Patient Information"
                      >
                        <Info size={20} />
                      </button>
                      <button 
                        onClick={() => setShowResolveConfirm(true)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-400 rounded-xl hover:text-green-600 hover:border-green-200 transition-all text-[10px] font-black uppercase tracking-widest flex items-center space-x-2"
                      >
                        <CheckCircle size={14} />
                        <span className="hidden sm:inline">Resolve</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-grow overflow-y-auto p-8 space-y-6">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {msg.role === 'ai' && <Bot size={12} className="text-[#3498db]" />}
                          {msg.role === 'admin' && <Shield size={12} className="text-purple-600" />}
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                            {msg.role === 'user' ? 'Patient' : msg.role === 'ai' ? 'Digital Concierge' : 'Medical Staff'} • {msg.time}
                          </span>
                        </div>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm border ${
                          msg.role === 'user' 
                          ? 'bg-white border-gray-100 text-[#0a1d4a] rounded-tr-none' 
                          : msg.role === 'ai'
                          ? 'bg-blue-50 border-blue-100 text-[#0a1d4a] rounded-tl-none'
                          : 'bg-purple-50 border-purple-100 text-[#0a1d4a] rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Area */}
                  <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                    <form onSubmit={handleSendReply} className="relative flex items-center gap-4">
                      <div className="flex-grow relative">
                        <input 
                          type="text" 
                          value={adminReply}
                          onChange={(e) => setAdminReply(e.target.value)}
                          placeholder="Type a manual override message..."
                          className="w-full pl-6 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#3498db] transition-all outline-none"
                        />
                        <button 
                          type="submit"
                          disabled={!adminReply.trim()}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#3498db] text-white rounded-xl shadow-lg shadow-blue-100 hover:bg-[#2980b9] transition-all disabled:opacity-50"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                      <button type="button" className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:text-[#0a1d4a] transition-colors">
                        <Clock size={20} />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Patient Context Sidebar (Inside Chat) */}
                {showPatientContext && selectedUserAppointment && (
                  <div className="w-80 border-l border-gray-100 bg-gray-50/50 p-6 overflow-y-auto hidden xl:block animate-in slide-in-from-right-4">
                    <div className="space-y-8">
                       <div className="text-center space-y-4">
                          <div className="w-24 h-24 mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                            <img src={selectedUserAppointment.userPhoto} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-[#0a1d4a] uppercase tracking-tight">{selectedUserAppointment.userName}</h4>
                            <p className="text-[10px] text-[#3498db] font-black uppercase tracking-widest">{selectedUserAppointment.userPhone}</p>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Today's Appointment</h5>
                          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                             <div className="flex items-start space-x-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-[#3498db]"><Stethoscope size={16} /></div>
                                <div>
                                   <p className="text-xs font-black text-[#0a1d4a] uppercase">{selectedUserAppointment.service}</p>
                                   <p className="text-[10px] text-gray-400 font-bold">{selectedUserAppointment.time}</p>
                                </div>
                             </div>
                             <div className="flex items-center space-x-3 text-[10px] font-black uppercase">
                                <span className={`w-2 h-2 rounded-full ${selectedUserAppointment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                <span className="text-gray-600">{selectedUserAppointment.status}</span>
                             </div>
                          </div>
                       </div>

                       {selectedUserAppointment.addons && (
                         <div className="space-y-4">
                            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Selected Add-ons</h5>
                            <div className="flex flex-wrap gap-2">
                               {selectedUserAppointment.addons.map((addon, i) => (
                                 <span key={i} className="px-3 py-1.5 bg-blue-50 text-[#3498db] rounded-xl text-[9px] font-black uppercase tracking-widest border border-blue-100">
                                    {addon}
                                 </span>
                               ))}
                            </div>
                         </div>
                       )}

                       <div className="pt-4">
                          <button className="w-full py-3 bg-[#0a1d4a] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                             View Patient Records
                          </button>
                       </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center space-y-4 text-gray-400 bg-white">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <MessageSquare size={40} />
                </div>
                <div className="text-center px-10">
                  <h4 className="font-black uppercase tracking-widest text-xs mb-1">No Active Selection</h4>
                  <p className="text-[10px] font-medium uppercase tracking-tight">Select a patient by name or phone to begin administrative override</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Modal for Resolving Chat */}
      {showResolveConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1d4a]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            <button 
              onClick={() => setShowResolveConfirm(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#0a1d4a] hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div className="p-10 space-y-6 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#3498db]"><CheckCircle size={40} /></div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight">Resolve Session</h3>
                <p className="text-gray-500 font-medium">Close chat session with <span className="font-black text-[#0a1d4a]">{selectedChatUser}</span>?</p>
              </div>
              <div className="flex space-x-4 pt-4">
                <button onClick={() => setShowResolveConfirm(false)} className="flex-1 py-4 border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs">Cancel</button>
                <button onClick={handleResolveSession} className="flex-1 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-100">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
