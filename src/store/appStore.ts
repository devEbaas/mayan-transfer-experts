import { create } from 'zustand';

export type Currency = 'USD' | 'MXN' | 'CAD' | 'EUR';
export type Lang = 'en' | 'es';

interface CurrencyInfo {
  rate: number;
  symbol: string;
  code: Currency;
}

const RATES: Record<Currency, CurrencyInfo> = {
  USD: { rate: 1, symbol: '$', code: 'USD' },
  MXN: { rate: 17.2, symbol: 'MX$', code: 'MXN' },
  CAD: { rate: 1.37, symbol: 'C$', code: 'CAD' },
  EUR: { rate: 0.92, symbol: '€', code: 'EUR' },
};

interface AppStore {
  lang: Lang;
  currency: Currency;
  toggleLang: () => void;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number) => string;
}

export const useAppStore = create<AppStore>((set, get) => ({
  lang: 'es',
  currency: 'USD',
  toggleLang: () => set((s) => ({ lang: s.lang === 'en' ? 'es' : 'en' })),
  setCurrency: (currency) => set({ currency }),
  formatPrice: (usd) => {
    const { currency } = get();
    const info = RATES[currency];
    const converted = usd * info.rate;
    const val = currency === 'MXN' ? Math.round(converted) : Math.round(converted * 10) / 10;
    return `${info.symbol}${val} ${info.code}`;
  },
}));
