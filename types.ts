
export type Language = 'en' | 'th' | 'ar' | 'zh';

export enum UserTier {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export interface MedicalRecord {
  id: string;
  date: string;
  hospital: string;
  doctor: string;
  diagnosis: string;
  reportUrl?: string;
}

export interface CreditCard {
  last4: string;
  brand: string;
  expiry: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: UserTier;
  language: Language;
  passportNumber?: string;
  medicalHistory?: MedicalRecord[];
  paymentMethods?: CreditCard[];
  photoUrl?: string;
}

export interface Reward {
  id: string;
  title: Record<Language, string>;
  points: number;
  type: 'limousine' | 'hotel' | 'service';
  description: Record<Language, string>;
  image: string;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userPhoto?: string;
  date: string;
  time: string;
  service: string;
  doctor?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  addons?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'admin';
  text: string;
  timestamp: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalAppointments: number;
  activeChats: number;
  pointsRedeemed: number;
  dailyUsers: { date: string; count: number }[];
}
