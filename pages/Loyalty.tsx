
import React, { useState } from 'react';
import { UserProfile, UserTier, Reward, Language } from '../types';
import { Crown, Gift, Plane, Hotel, Car, ArrowRight, ShieldCheck, Zap, Star, Shield, X, CheckCircle2, Loader2, LogIn, Sparkles, HeartPulse, MapPin } from 'lucide-react';
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
      title: { en: 'VIP Hospital Fast Track', th: 'บริการช่องทางด่วนในโรงพยาบาล', ar: 'مسار سريع لكبار الشخصيات', zh: 'VIP 医院快速通道' },
      points: 500,
      type: 'service',
      description: { en: 'Priority registration and escort at our elite partner hospitals.', th: 'บริการลงทะเบียนและผู้ติดตามส่วนตัว ณ โรงพยาบาลชั้นนำ', ar: 'تسجيل الأولوية في المستشفيات الشريكة النخبة.', zh: '在精英合作医院享受优先注册和护送服务。' },
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const tierBenefits = [
    { tier: UserTier.BRONZE, points: "0 - 2,499", benefits: ["Standard Concierge", "Point Accrual (1/100 THB)", "Quarterly Newsletter"] },
    { tier: UserTier.SILVER, points: "2,500 - 4,999", benefits: ["Priority Support", "5% Discount on Concierge Fees", "Birthday Bonus Points", "Express Check-in"] },
    { tier: UserTier.GOLD, points: "5,000 - 9,999", benefits: ["Dedicated Personal Manager", "10% Discount on Concierge Fees", "1 Free Limo Transfer/Year", "VIP Lounge Access"] },
    { tier: UserTier.PLATINUM, points: "10,000+", benefits: ["Unlimited Fast-Track Services", "24/7 Global Medical Assistance", "Complimentary Room Upgrades", "Elite Networking Events"] }
  ];

  const getTierColor = (tier: UserTier) => {
    switch (tier) {
      case UserTier.PLATINUM: return 'from-[#0a1d4a] to-[#1e3a8a]';
      case UserTier.GOLD: return 'from-[#d4af37] to-[#b8860b]';
      case UserTier.SILVER: return 'from-slate-400 to-slate-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

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
      {/* Membership Card & Status Section */}
      <section className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-[#0a1d4a]">
          <Shield size={300} strokeWidth={1} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative z-10">
          <div className="lg:col-span-1">
            <div className={`relative overflow-hidden rounded-[2rem] p-8 text-white bg-gradient-to-br ${getTierColor(user.tier)} aspect-[1.5/1] shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500`}>
              <div className="flex justify-between items-start mb-16">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <Crown size={28} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.2em]">{t('tier')}</p>
                  <p className="text-2xl font-black italic">{(user.tier || 'Bronze').toUpperCase()}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">{user.name}</p>
                <p className="text-sm font-mono tracking-[0.3em]">ID-{user.id.substring(0, 8)}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
               <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Your Member Profile</h2>
               <p className="text-gray-500 font-medium">Earn points with every world-class medical procedure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-center space-x-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-[#3498db]">
                  <Star size={32} />
                </div>
                <div>
                  <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{t('points_balance')}</p>
                  <p className="text-4xl font-black text-[#0a1d4a]">{user.points.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
                  <span className="text-[#3498db]">Current: {user.tier}</span>
                  <span className="text-gray-400">Target: Platinum</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3498db] transition-all duration-1000" style={{ width: `${Math.min(100, (user.points / 10000) * 100)}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest text-right">{Math.max(0, 10000 - user.points).toLocaleString()} pts to upgrade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Benefits Roadmap */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Privilege Roadmap</h2>
          <p className="text-gray-500 font-medium">The more you care for your health, the more we care for your lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tierBenefits.map((tb, i) => (
            <div key={i} className={`p-8 rounded-[2rem] border transition-all duration-500 ${user.tier === tb.tier ? 'bg-blue-50 border-blue-200 shadow-xl scale-105 relative ring-4 ring-blue-100' : 'bg-white border-gray-100 opacity-60'}`}>
              {user.tier === tb.tier && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">Your Current Level</div>
              )}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-[#0a1d4a] uppercase tracking-tight">{tb.tier}</h4>
                  <span className="text-[9px] font-black text-[#3498db] uppercase tracking-widest">{tb.points} Pts</span>
                </div>
                <ul className="space-y-3">
                  {tb.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                      <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
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
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('redeem')}</h2>
            <p className="text-gray-500 text-sm font-medium italic">Handpicked luxury and medical rewards.</p>
          </div>
          <div className="hidden sm:flex space-x-3">
            {['All', 'Travel', 'Wellness', 'VIP'].map((cat) => (
              <button key={cat} className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all ${cat === 'All' ? 'bg-[#0a1d4a] text-white shadow-lg' : 'text-gray-400 hover:text-[#0a1d4a]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rewards.map((reward) => (
            <div key={reward.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 flex flex-col hover:shadow-2xl transition-all duration-500">
              <div className="h-56 relative overflow-hidden">
                <img src={reward.image} alt={reward.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 right-6 px-4 py-2 bg-white rounded-2xl text-[#3498db] font-black text-sm shadow-xl">
                  {reward.points} <span className="text-[10px] opacity-70">PTS</span>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col space-y-4">
                <h3 className="text-xl font-black text-[#0a1d4a] uppercase tracking-tight">{reward.title[lang]}</h3>
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
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
            
            {showSuccess ? (
              <div className="p-12 text-center space-y-6 animate-in fade-in zoom-in-95">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
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
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#0a1d4a] hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="h-48 relative">
                  <img src={selectedReward.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                <div className="p-10 space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-[#0a1d4a] uppercase tracking-tight">{t('confirm_redemption')}</h3>
                    <p className="text-gray-500 font-medium italic">{selectedReward.title[lang]}</p>
                  </div>

                  <div className="flex justify-center items-center space-x-12 py-6 border-y border-gray-100">
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
                      className="flex-1 py-4 border border-gray-200 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      {t('cancel')}
                    </button>
                    <button 
                      onClick={handleConfirmRedeem}
                      disabled={isProcessing}
                      className="flex-1 py-4 bg-[#3498db] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#2980b9] shadow-xl shadow-blue-100 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
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
