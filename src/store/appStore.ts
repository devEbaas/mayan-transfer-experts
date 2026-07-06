import { create } from 'zustand';

export type Lang = 'en' | 'es';

interface AppStore {
  lang: Lang;
  toggleLang: () => void;
  formatPrice: (amount: number, currency: string) => string;
}

export const useAppStore = create<AppStore>((set) => ({
  lang: 'es',
  toggleLang: () => set((s) => ({ lang: s.lang === 'en' ? 'es' : 'en' })),
  formatPrice: (amount, currency) => `$${amount.toFixed(2)} ${currency}`,
}));
