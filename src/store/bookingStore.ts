import { create } from 'zustand';

export type TripType = 'round' | 'oneway';
export type Screen = 'route' | 'pax' | 'vehicle' | 'details' | 'pay' | 'done';
export type ContactPref = 'whatsapp' | 'email';
export type PayMethod = 'card' | 'paypal';

export interface BookingForm {
  tripType: TripType;
  from: string;
  to: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

interface BookingStore {
  screen: Screen;
  form: BookingForm;
  vehicleId: string;
  contactPref: ContactPref;
  payMethod: PayMethod;

  setScreen: (s: Screen) => void;
  setField: <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => void;
  setVehicle: (id: string) => void;
  setContactPref: (p: ContactPref) => void;
  setPayMethod: (m: PayMethod) => void;
  swap: () => void;
  bumpAdults: (delta: number) => void;
  bumpChildren: (delta: number) => void;
  next: () => void;
  back: () => void;
  goHome: () => void;
  reset: () => void;
}

const ORDER: Screen[] = ['route', 'pax', 'vehicle', 'details', 'pay'];

const defaultForm: BookingForm = {
  tripType: 'round',
  from: 'cun',
  to: 'hotelzone',
  arrival: '2026-07-18',
  departure: '2026-07-25',
  adults: 2,
  children: 0,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  screen: 'route',
  form: defaultForm,
  vehicleId: 'van',
  contactPref: 'whatsapp',
  payMethod: 'card',

  setScreen: (screen) => {
    set({ screen });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  setField: (key, value) => set((s) => ({ form: { ...s.form, [key]: value } })),
  setVehicle: (vehicleId) => set({ vehicleId }),
  setContactPref: (contactPref) => set({ contactPref }),
  setPayMethod: (payMethod) => set({ payMethod }),
  swap: () => set((s) => ({ form: { ...s.form, from: s.form.to, to: s.form.from } })),
  bumpAdults: (delta) =>
    set((s) => ({
      form: { ...s.form, adults: Math.max(1, Math.min(12, s.form.adults + delta)) },
    })),
  bumpChildren: (delta) =>
    set((s) => ({
      form: { ...s.form, children: Math.max(0, Math.min(8, s.form.children + delta)) },
    })),
  next: () => {
    const { screen } = get();
    const i = ORDER.indexOf(screen);
    if (i >= 0 && i < ORDER.length - 1) {
      get().setScreen(ORDER[i + 1]);
    }
  },
  back: () => {
    const { screen } = get();
    const i = ORDER.indexOf(screen);
    if (i > 0) {
      get().setScreen(ORDER[i - 1]);
    }
  },
  goHome: () => get().setScreen('route'),
  reset: () =>
    set({
      screen: 'route',
      form: defaultForm,
      vehicleId: 'van',
      contactPref: 'whatsapp',
      payMethod: 'card',
    }),
}));
