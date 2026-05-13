import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '@/types';

// Demo users for frontend-only mode
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  'admin@dayplanner.com': {
    password: 'Admin@123456',
    user: {
      _id: '1', firstName: 'Muhammad', lastName: 'Aleem', fullName: 'Muhammad Aleem',
      email: 'admin@dayplanner.com', role: 'super_admin', avatar: '', phone: '',
      designation: 'Chief Executive', status: 'active', lastLogin: new Date().toISOString(),
      loginCount: 42, performanceScore: 98,
      preferences: { theme: 'dark', notifications: true, emailAlerts: true },
      createdAt: '2024-01-01', updatedAt: new Date().toISOString()
    }
  },
  'ahmed.khan@dayplanner.com': {
    password: 'Director@123',
    user: {
      _id: '2', firstName: 'Ahmed', lastName: 'Khan', fullName: 'Ahmed Khan',
      email: 'ahmed.khan@dayplanner.com', role: 'director', avatar: '', phone: '',
      designation: 'Director of Operations', status: 'active', lastLogin: new Date().toISOString(),
      loginCount: 35, performanceScore: 92,
      preferences: { theme: 'dark', notifications: true, emailAlerts: true },
      createdAt: '2024-01-15', updatedAt: new Date().toISOString()
    }
  },
  'fatima.zahra@dayplanner.com': {
    password: 'AD@123456',
    user: {
      _id: '3', firstName: 'Fatima', lastName: 'Zahra', fullName: 'Fatima Zahra',
      email: 'fatima.zahra@dayplanner.com', role: 'assistant_director', avatar: '', phone: '',
      designation: 'Asst. Director Operations', status: 'active', lastLogin: new Date().toISOString(),
      loginCount: 28, performanceScore: 87,
      preferences: { theme: 'dark', notifications: true, emailAlerts: true },
      createdAt: '2024-02-01', updatedAt: new Date().toISOString()
    }
  },
  'ali.ahmed@dayplanner.com': {
    password: 'Lead@12345',
    user: {
      _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed',
      email: 'ali.ahmed@dayplanner.com', role: 'lead', avatar: '', phone: '',
      designation: 'Team Lead - Alpha', status: 'active', lastLogin: new Date().toISOString(),
      loginCount: 56, performanceScore: 82,
      preferences: { theme: 'dark', notifications: true, emailAlerts: true },
      createdAt: '2024-02-15', updatedAt: new Date().toISOString()
    }
  },
  'kashif.m@dayplanner.com': {
    password: 'Accounts@123',
    user: {
      _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood',
      email: 'kashif.m@dayplanner.com', role: 'accounts_manager', avatar: '', phone: '',
      designation: 'Accounts Manager', status: 'active', lastLogin: new Date().toISOString(),
      loginCount: 31, performanceScore: 86,
      preferences: { theme: 'dark', notifications: true, emailAlerts: true },
      createdAt: '2024-03-01', updatedAt: new Date().toISOString()
    }
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Try API first with a short timeout
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000);
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
              signal: controller.signal,
            });
            clearTimeout(timeout);
            if (res.ok) {
              const data = await res.json();
              set({
                user: data.data.user,
                token: data.data.accessToken,
                isAuthenticated: true,
                isLoading: false,
              });
              return true;
            }
          } catch {
            // API not available or timed out, use demo mode
          }

          // Demo mode fallback
          const demoUser = DEMO_USERS[email.toLowerCase()];
          if (demoUser && demoUser.password === password) {
            set({
              user: demoUser.user,
              token: 'demo-token-' + Date.now(),
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }

          set({ error: 'Invalid email or password', isLoading: false });
          return false;
        } catch {
          set({ error: 'Login failed. Please try again.', isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'dp-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  director: 'Director',
  assistant_director: 'Assistant Director',
  lead: 'Team Lead',
  accounts_manager: 'Accounts Manager',
  employee: 'Employee',
};

export const ROLE_COLORS: Record<Role, string> = {
  super_admin: 'from-indigo-500 to-purple-600',
  director: 'from-blue-500 to-cyan-500',
  assistant_director: 'from-violet-500 to-purple-500',
  lead: 'from-emerald-500 to-teal-500',
  accounts_manager: 'from-amber-500 to-orange-500',
  employee: 'from-slate-500 to-gray-500',
};
