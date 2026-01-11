
import { createClient } from '@supabase/supabase-js';
import { UserProfile, Appointment, MedicalRecord, UserTier } from '../types';

// จำลองฐานข้อมูลใน LocalStorage
const MOCK_STORAGE_KEY = 'asia_medicare_mock_user';

const DEMO_USER: UserProfile = {
  id: 'demo-123',
  name: 'Demo VIP Member',
  email: 'demo@asiamedicare.com',
  phone: '081-234-5678',
  points: 12500,
  tier: UserTier.GOLD,
  language: 'th',
  passportNumber: 'AA1234567',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
};

export const isSupabaseConfigured = false; // บังคับเป็น false เพื่อใช้ Mock Mode

// สร้าง Supabase client ทิ้งไว้ (แต่จะไม่ถูกเรียกใช้จริงในฟังก์ชันด้านล่าง)
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => {}
  }
} as any;

export const db = {
  // Authentication Mock
  async signUp(email: string, password: string, fullName: string) {
    const newUser: UserProfile = {
      ...DEMO_USER,
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
      email: email,
      points: 500, // คะแนนเริ่มต้นสำหรับสมาชิกใหม่
      tier: UserTier.BRONZE
    };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(newUser));
    return { user: newUser };
  },

  async signIn(email: string, password: string) {
    // จำลองการล็อกอิน: ถ้าเป็น demo@asiamedicare.com ให้ใช้ค่าเริ่มต้น
    if (email === 'demo@asiamedicare.com') {
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(DEMO_USER));
      return { user: DEMO_USER };
    }
    // สำหรับอีเมลอื่น ให้สร้าง User จำลองขึ้นมา
    const user: UserProfile = {
      ...DEMO_USER,
      name: email.split('@')[0],
      email: email,
    };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(user));
    return { user };
  },

  async signInWithGithub() {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(DEMO_USER));
    return { user: DEMO_USER };
  },

  async signOut() {
    localStorage.removeItem(MOCK_STORAGE_KEY);
    window.location.reload(); // รีโหลดเพื่อล้าง State
  },

  // Profiles
  async getProfile(userId: string): Promise<UserProfile> {
    const saved = localStorage.getItem(MOCK_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return DEMO_USER;
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const current = await this.getProfile(userId);
    const updated = { ...current, ...updates };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Appointments Mock
  async getAppointments(userId: string) {
    return [
      {
        id: 'apt-1',
        userId: userId,
        userName: 'Demo User',
        userPhone: '0812345678',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        service: 'Executive Check-up',
        status: 'confirmed',
        addons: ['VIP Fast Track']
      }
    ] as unknown as Appointment[];
  },

  async createAppointment(userId: string, appointment: any) {
    console.log('Mock Appointment Created:', appointment);
    return { success: true };
  },

  // Medical Records Mock
  async getMedicalRecords(userId: string): Promise<MedicalRecord[]> {
    return [
      {
        id: 'med-1',
        date: '2023-10-15',
        hospital: 'Bangkok Hospital',
        doctor: 'Dr. Somsak P.',
        diagnosis: 'Annual Physical - Excellent',
        reportUrl: '#'
      },
      {
        id: 'med-2',
        date: '2023-05-20',
        hospital: 'Bumrungrad International',
        doctor: 'Dr. Jane Smith',
        diagnosis: 'Vitamin Deficiency - Resolved',
        reportUrl: '#'
      }
    ];
  }
};
