import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      email: '',
      name: '',

      setUser: ({ email, name }) => set({ email, name }),
      clearUser: () => set({ email: '', name: '' }),
    }),
    {
      name: 'medimo-user-store',
    }
  )
);
