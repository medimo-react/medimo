import { create } from 'zustand';

export const useOcrStore = create((set) => ({
  ocrText: '',
  setOcrText: (text) => set({ ocrText: text }),
  clear: () => set({ ocrText: '' }),
}));
