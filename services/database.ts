
import { UserProfile, Appointment, MedicalRecord, UserTier } from '../types';

// คีย์หลักสำหรับเก็บข้อมูลจำลองใน LocalStorage
const MOCK_STORAGE_KEY = 'asia_medicare_mock_user';

// ข้อมูลผู้ใช้งานตัวอย่างระดับ VIP
const DEMO_USER: UserProfile = {
  id: 'demo-vip-123',
  name: 'Demo VIP Member',
  email: 'demo@asiamedicare.com',
  phone: '081-234-5678',
  points: 12500,
  tier: UserTier.GOLD,
  language: 'th',
  passportNumber: 'AA1234567',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
};

export const isSupabaseConfigured = false; 

export const db = {
  // ฟังก์ชันจำลองการสมัครสมาชิก
  async signUp(email: string, password: string, fullName: string) {
    const newUser: UserProfile = {
      ...DEMO_USER,
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: fullName,
      email: email,
      points: 500, 
      tier: UserTier.BRONZE
    };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(newUser));
    return { user: newUser };
  },

  // ฟังก์ชันจำลองการเข้าสู่ระบบ (รองรับ Demo Account)
  async signIn(email: string, password: string) {
    let userToSave: UserProfile;
    
    // ตรวจสอบว่าเป็นบัญชี Demo หรือไม่
    if (email === 'demo@asiamedicare.com') {
      userToSave = { ...DEMO_USER };
    } else {
      userToSave = {
        ...DEMO_USER,
        id: 'user-' + Math.random().toString(36).substr(2, 5),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        points: 100,
        tier: UserTier.BRONZE
      };
    }
    
    // บันทึกลง LocalStorage ทันที
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(userToSave));
    return { user: userToSave };
  },

  async signOut() {
    localStorage.removeItem(MOCK_STORAGE_KEY);
  },

  // ดึงข้อมูลโปรไฟล์จาก LocalStorage
  async getProfile(userId: string): Promise<UserProfile | null> {
    const saved = localStorage.getItem(MOCK_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return null;
  },

  // อัปเดตข้อมูลโปรไฟล์
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const current = await this.getProfile(userId);
    const updated = { ...(current || DEMO_USER), ...updates };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // ข้อมูลนัดหมายจำลอง
  async getAppointments(userId: string) {
    return [
      {
        id: 'apt-demo-1',
        userId: userId,
        userName: 'Demo VIP Member',
        userPhone: '0812345678',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        service: 'Executive Check-up',
        status: 'confirmed',
        addons: ['VIP Fast Track', 'Limo Transfer']
      }
    ] as unknown as Appointment[];
  },

  // ประวัติการรักษาจำลอง
  async getMedicalRecords(userId: string): Promise<MedicalRecord[]> {
    return [
      {
        id: 'med-rec-1',
        date: '2023-11-20',
        hospital: 'Bumrungrad International',
        doctor: 'Dr. Wichai S.',
        diagnosis: 'Wellness Checkup - Perfect Condition',
        reportUrl: '#'
      }
    ];
  }
};
