import { create } from 'zustand';
import type { BookingSearch, ExtrasState } from '@/types/booking';

interface BookingStore {
  currentStep: number;
  search: BookingSearch;
  vehicleId: string | null;
  extras: ExtrasState;
  editSummary: boolean;
  twoTerminals: boolean;

  setSearch: (data: BookingSearch) => void;
  setVehicle: (id: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  incExtra: (id: string) => void;
  decExtra: (id: string) => void;
  toggleEditSummary: () => void;
  closeEditSummary: () => void;
  setTwoTerminals: (val: boolean) => void;
  reset: () => void;
}

const defaultSearch: BookingSearch = {
  tripType: 'round',
  from: '',
  to: '',
  arrival: '',
  departure: '',
  adults: 1,
  children: 0,
};

export const useBookingStore = create<BookingStore>((set) => ({
  currentStep: 1,
  search: defaultSearch,
  vehicleId: null,
  extras: {},
  editSummary: false,
  twoTerminals: false,

  setSearch: (data) => set({ search: data }),
  setVehicle: (id) => set({ vehicleId: id }),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 3) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  incExtra: (id) =>
    set((s) => ({ extras: { ...s.extras, [id]: (s.extras[id] || 0) + 1 } })),
  decExtra: (id) =>
    set((s) => ({
      extras: { ...s.extras, [id]: Math.max(0, (s.extras[id] || 0) - 1) },
    })),
  toggleEditSummary: () => set((s) => ({ editSummary: !s.editSummary })),
  closeEditSummary: () => set({ editSummary: false }),
  setTwoTerminals: (val) => set({ twoTerminals: val }),
  reset: () =>
    set({
      currentStep: 1,
      search: defaultSearch,
      vehicleId: null,
      extras: {},
      editSummary: false,
      twoTerminals: false,
    }),
}));
