
import React, { useState } from 'react';
import { UserProfile, UserTier, Reward, Language } from '../types';
import { Crown, Gift, ArrowRight, Shield, X, CheckCircle2, Loader2, LogIn, Star, Sparkles, CreditCard as CardIcon, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoyaltyProps {
  user: UserProfile | null;
  t: (key: string) => string;
  lang: Language;
  onRedeem: (points: number) => void;
}

const Loyalty: React.FC<LoyaltyProps> = ({ user, t, lang, onRedeem }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#3498db] rounded-full flex items-center justify-center">
          <Crown size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Membership Exclusive</h2>
          <p className="text-gray-500 font-medium">Please log in to view your points and redeem luxury rewards.</p>
        </div>
        <Link to="/login" className="px-10 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 shadow-xl shadow-blue-100">
          <LogIn size={18} />
          <span>{t('login')}</span>
        </Link>
      </div>
    );
  }

  const rewards: Reward[] = [
    {
      id: 'r1',
      title: { en: 'Luxury Airport Limo', th: 'รถรับส่งสนามบินสุดหรู', ar: 'ليموزين مطار فاخرة', zh: '豪华机场接送' },
      points: 2000,
      type: 'limousine',
      description: { en: 'VIP Mercedes S-Class transfer between any Bangkok airport and city.', th: 'บริการรถรับส่ง Mercedes S-Class ในกทม. และสนามบิน', ar: 'مرسيدس S-Class داخل بانكوك.', zh: '曼谷市内的梅赛德斯 S 级接送服务。' },
      image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'r2',
      title: { en: 'Medical Wellness Stay', th: 'ที่พักโรงแรม 5 ดาวพร้อมบริการสุขภาพ', ar: 'إقامة عافية طبية', zh: '医疗康养住宿' },
      points: 5000,
      type: 'hotel',
      description: { en: 'Luxury hotel suite night with premium breakfast and spa access.', th: 'พักห้องสวีทหนึ่งคืนพร้อมอาหารเช้าและบริการสปา', ar: 'إقامة في جناح فاخر مع إفطار وسبا.', zh: '豪华套房一晚住宿，包含早餐和水疗。' },
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'r3',
      title: { en: 'VIP Hospital Fast Track', th: 'บริการช่องทางด่วนในโรงพยาบาล', ar: 'مسาร سريع لكبار الشخصيات', zh: 'VIP 医院快速通道' },
      points: 500,
      type: 'service',
      description: { en: 'Priority registration and escort at our elite partner hospitals.', th: 'บริการลงทะเบียนและผู้ติดตามส่วนตัว ณ โรงพยาบาลชั้นนำ', ar: 'تسجيل الأولوية في المستชفيات الشريكة النخبة.', zh: '在精英合作医院享受优先注册和护送服务。' },
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const tierBenefits = [
    { tier: UserTier.BRONZE, points: "0 - 2,499", benefits: ["Standard Concierge", "Point Accrual (1/100 THB)", "Quarterly Newsletter"] },
    { tier: UserTier.SILVER, points: "2,500 - 4,999", benefits: ["Priority Support", "5% Discount on Concierge Fees", "Birthday Bonus Points", "Express Check-in"] },
    { tier: UserTier.GOLD, points: "5,000 - 9,999", benefits: ["Dedicated Personal Manager", "10% Discount on Concierge Fees", "1 Free Limo Transfer/Year", "VIP Lounge Access"] },
    { tier: UserTier.PLATINUM, points: "10,000+", benefits: ["Unlimited Fast-Track Services", "24/7 Global Medical Assistance", "Complimentary Room Upgrades", "Elite Networking Events"] }
  ];

  const getTierStyles = (tier: UserTier) => {
    switch (tier) {
      case UserTier.PLATINUM: 
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-black',
          accent: 'text-slate-300',
          border: 'border-slate-700',
          glow: 'shadow-slate-900/50',
          pattern: 'opacity-10'
        };
      case UserTier.GOLD: 
        return {
          bg: 'bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] via-[#b38728] via-[#fbf5b7] to-[#aa771c]',
          accent: 'text-[#5d4037]',
          border: 'border-[#bf953f]',
          glow: 'shadow-yellow-600/30',
          pattern: 'opacity-20'
        };
      case UserTier.SILVER: 
        return {
          bg: 'bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400',
          accent: 'text-slate-700',
          border: 'border-slate-300',
          glow: 'shadow-slate-400/20',
          pattern: 'opacity-10'
        };
      default: 
        return {
          bg: 'bg-gradient-to-br from-[#a87932] to-[#6b4226]',
          accent: 'text-orange-100',
          border: 'border-[#a87932]',
          glow: 'shadow-orange-900/20',
          pattern: 'opacity-10'
        };
    }
  };

  const styles = getTierStyles(user.tier);

  const handleConfirmRedeem = async () => {
    if (!selectedReward || !user) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onRedeem(selectedReward.points);
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedReward(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      {/* Enhanced Luxury Membership Card Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: The Virtual Card */}
          <div className="lg:col-span-5 perspective-1000 group">
            <div className={`relative w-full aspect-[1.586/1] rounded-[2rem] ${styles.bg} ${styles.glow} shadow-2xl p-8 transition-all duration-700 transform group-hover:rotate-y-12 group-hover:scale-105 border ${styles.border} overflow-hidden`}>
              
              {/* Card Pattern Overlay */}
              <div className={`absolute inset-0 pointer-events-none ${styles.pattern}`}>
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                   <pattern id="cardPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M0 40 L40 0 M-10 10 L10 -10 M30 50 L50 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#cardPattern)" />
                 </svg>
              </div>

              {/* Card Glare Effect */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${styles.accent} opacity-80`}>Asia Medicare Group</p>
                    <div className="flex items-center space-x-2">
                       <Crown size={20} className={styles.accent} />
                       <span className={`text-xl font-black italic tracking-tight uppercase ${styles.accent}`}>{user.tier}</span>
                    </div>
                  </div>
                  <div className="w-14 h-11 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-lg flex items-center justify-center shadow-inner overflow-hidden border border-yellow-400/50">
                    <div className="w-full h-px bg-yellow-900/20 my-1"></div>
                    <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                       {[...Array(9)].map((_, i) => <div key={i} className="border-[0.5px] border-yellow-900/10"></div>)}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                   <p className={`text-[8px] font-black uppercase tracking-[0.2em] ${styles.accent} opacity-60`}>Member Balance</p>
                   <div className="flex items-baseline space-x-2">
                      <span className={`text-4xl font-black ${styles.accent}`}>{user.points.toLocaleString()}</span>
                      <span className={`text-xs font-black uppercase tracking-widest ${styles.accent} opacity-60`}>Credits</span>
                   </div>
                </div>

                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className={`text-[10px] font-mono tracking-[0.3em] ${styles.accent} opacity-80`}>
                        {user.id.substring(0, 4)} {user.id.substring(4, 8)} {user.id.substring(8, 12)} VIP
                      </p>
                      <p className={`text-xs font-black uppercase tracking-widest ${styles.accent}`}>{user.name}</p>
                   </div>
                   <div className={`flex flex-col items-end ${styles.accent}`}>
                      <Sparkles size={24} className="animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Points Stats & Quick Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
               <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#3498db] px-4 py-1 rounded-full border border-blue-100">
                  <Star size={14} className="fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exclusive Rewards</span>
               </div>
               <h2 className="text-4xl font-black text-[#0a1d4a] uppercase tracking-tight">Privilege Status</h2>
               <p className="text-gray-500 font-medium text-lg">Your loyalty is our priority. Every point unlocks a new world of luxury healthcare.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-blue-50 rounded-2xl text-[#3498db] group-hover:scale-110 transition-transform">
                      <Zap size={24} className="fill-current" />
                   </div>
                   <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Next Milestone</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-[#0a1d4a]">Progress to {user.tier === UserTier.PLATINUM ? 'Ultimate' : 'Elite'}</span>
                    <span className="text-[#3498db]">{Math.min(100, (user.points / 10000) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#3498db] to-[#0a1d4a] transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.min(100, (user.points / 10000) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                    Earn {Math.max(0, 10000 - user.points).toLocaleString()} more points to reach the next tier.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-[#0a1d4a] rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                    <CardIcon size={80} />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Quick Access</p>
                    <div className="space-y-4">
                       <Link to="/booking" className="flex items-center justify-between group/link">
                          <span className="text-xs font-black uppercase tracking-widest">VIP Fast Track</span>
                          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                       </Link>
                       <Link to="/profile" className="flex items-center justify-between group/link">
                          <span className="text-xs font-black uppercase tracking-widest">Medical Wallet</span>
                          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                       </Link>
                       <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">24/7 Concierge</span>
                          <div className="flex -space-x-2">
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a1d4a] bg-blue-500 overflow-hidden">
                                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Agent" />
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privilege Roadmap (Keep but refine) */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-4">
             <div className="h-px w-12 bg-gray-200"></div>
             <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Privilege Roadmap</h2>
             <div className="h-px w-12 bg-gray-200"></div>
          </div>
          <p className="text-gray-500 font-medium">The more you care for your health, the more we care for your lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tierBenefits.map((tb, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${user.tier === tb.tier ? 'bg-white border-blue-200 shadow-2xl scale-105 relative ring-4 ring-blue-50/50' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}>
              {user.tier === tb.tier && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#3498db] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">Current Level</div>
              )}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className={`font-black uppercase tracking-tight ${user.tier === tb.tier ? 'text-[#0a1d4a] text-lg' : 'text-gray-400'}`}>{tb.tier}</h4>
                  <span className="text-[9px] font-black text-[#3498db] uppercase tracking-widest">{tb.points} Pts</span>
                </div>
                <ul className="space-y-4">
                  {tb.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-[10px] font-bold text-gray-600 uppercase tracking-tight leading-relaxed">
                      <CheckCircle2 size={14} className={`${user.tier === tb.tier ? 'text-[#3498db]' : 'text-gray-300'} shrink-0 mt-0.5`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reward Redemption Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('redeem')}</h2>
            <p className="text-gray-500 text-sm font-medium italic">Handpicked luxury and medical rewards.</p>
          </div>
          <div className="flex space-x-2">
            {['All', 'Travel', 'Wellness'].map((cat) => (
              <button key={cat} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${cat === 'All' ? 'bg-[#0a1d4a] text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rewards.map((reward) => (
            <div key={reward.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-500">
              <div className="h-60 relative overflow-hidden">
                <img src={reward.image} alt={reward.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d4a]/80 to-transparent"></div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[#3498db] font-black text-sm shadow-xl">
                  {reward.points} <span className="text-[10px] opacity-70">PTS</span>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col space-y-6">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight leading-tight">{reward.title[lang]}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed flex-grow">{reward.description[lang]}</p>
                <button 
                  onClick={() => setSelectedReward(reward)}
                  disabled={user.points < reward.points}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-3 ${
                    user.points >= reward.points 
                    ? 'bg-[#3498db] text-white hover:bg-[#2980b9] shadow-xl shadow-blue-100 hover:-translate-y-1' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{user.points >= reward.points ? t('redeem') : t('insufficient_points')}</span>
                  {user.points >= reward.points && <ArrowRight size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Redemption Confirmation Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a1d4a]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            
            {showSuccess ? (
              <div className="p-16 text-center space-y-8 animate-in fade-in zoom-in-95">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner">
                  <CheckCircle2 size={64} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('redemption_success')}</h3>
                  <p className="text-gray-500 font-medium">Your request for {selectedReward.title[lang]} has been processed.</p>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => !isProcessing && setSelectedReward(null)}
                  className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#0a1d4a] hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="h-56 relative">
                  <img src={selectedReward.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </div>

                <div className="p-12 space-y-10">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('confirm_redemption')}</h3>
                    <p className="text-gray-500 font-medium italic">{selectedReward.title[lang]}</p>
                  </div>

                  <div className="flex justify-center items-center space-x-12 py-8 border-y border-gray-100">
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Cost</p>
                      <p className="text-3xl font-black text-[#e74c3c]">{selectedReward.points}</p>
                    </div>
                    <ArrowRight className="text-gray-300" />
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Balance After</p>
                      <p className="text-3xl font-black text-[#3498db]">{user.points - selectedReward.points}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setSelectedReward(null)}
                      disabled={isProcessing}
                      className="flex-1 py-5 border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      {t('cancel')}
                    </button>
                    <button 
                      onClick={handleConfirmRedeem}
                      disabled={isProcessing}
                      className="flex-1 py-5 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2980b9] shadow-xl shadow-blue-100 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>{t('confirm')}</span>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Loyalty;
