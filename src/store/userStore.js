import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      email: '',
      name: '',
      token: null,
      isLoggedIn: false,

      setUser: ({ email, name, token }) => {
        localStorage.setItem('token', token);
        set({ email, name, token, isLoggedIn: true });
      },
      clearUser: () => {
        localStorage.removeItem('token');
        set({ email: '', name: '', token: null, isLoggedIn: false });
      },
    }),
    {
      name: 'medimo-user-store',
    }
  )
);
