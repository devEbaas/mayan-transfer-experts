import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactPref, PayMethod, TripType } from '@/types/booking';

export type { TripType, ContactPref, PayMethod };
export type Screen = 'route' | 'pax' | 'vehicle' | 'extras' | 'details' | 'pay' | 'done' | 'payment-result';
export type PaymentOutcome = 'cancelled' | 'failed' | 'unknown';

export const BOOKING_TTL_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'mte-booking';

export interface TripForm {
  tripType: TripType;
  originId: string;
  destinationId: string;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  adults: number;
  children: number;
}

export interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  country: string;
  hotel: string;
  comments: string;
}

export interface FlightForm {
  arrivalAirline: string;
  arrivalFlightNo: string;
  departureAirline: string;
  departureFlightNo: string;
}

const defaultTrip: TripForm = {
  tripType: 'round',
  originId: '',
  destinationId: '',
  arrivalDate: '',
  arrivalTime: '',
  departureDate: '',
  departureTime: '',
  adults: 2,
  children: 0,
};

const defaultCustomer: CustomerForm = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  phone: '',
  country: '',
  hotel: '',
  comments: '',
};

const defaultFlight: FlightForm = {
  arrivalAirline: '',
  arrivalFlightNo: '',
  departureAirline: '',
  departureFlightNo: '',
};

interface BookingStore {
  screen: Screen;
  savedAt: number;
  /** Transient, not persisted — validation errors for the fields on the active screen. */
  errors: Record<string, string>;

  trip: TripForm;
  vehicleId: string | null;
  extras: Record<string, number>;
  customer: CustomerForm;
  flight: FlightForm;
  contactPref: ContactPref;
  payMethod: PayMethod;
  termsAccepted: boolean;
  bookingId: string | null;
  folio: string | null;
  /** Transient, not persisted — set right before navigating to the payment-result screen. */
  lastPaymentOutcome: PaymentOutcome | null;

  setScreen: (s: Screen) => void;
  setTripField: <K extends keyof TripForm>(key: K, value: TripForm[K]) => void;
  setCustomerField: <K extends keyof CustomerForm>(key: K, value: CustomerForm[K]) => void;
  setFlightField: <K extends keyof FlightForm>(key: K, value: FlightForm[K]) => void;
  setVehicle: (id: string) => void;
  setExtraQty: (id: string, qty: number) => void;
  setErrors: (errors: Record<string, string>) => void;
  setContactPref: (p: ContactPref) => void;
  setTermsAccepted: (v: boolean) => void;
  setBookingId: (id: string, folio: string) => void;
  setPaymentOutcome: (outcome: PaymentOutcome) => void;
  swap: () => void;
  bumpAdults: (delta: number) => void;
  bumpChildren: (delta: number) => void;
  next: () => void;
  back: () => void;
  goHome: () => void;
  reset: () => void;
}

const ORDER: Screen[] = ['route', 'pax', 'vehicle', 'extras', 'details', 'pay'];

/** Origin/destination/date/pax changes invalidate the previously quoted vehicle, per business rules. */
const TRIP_FIELDS_INVALIDATING_VEHICLE = new Set<keyof TripForm>([
  'tripType',
  'originId',
  'destinationId',
  'arrivalDate',
  'adults',
  'children',
]);

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      screen: 'route',
      savedAt: Date.now(),
      errors: {},

      trip: defaultTrip,
      vehicleId: null,
      extras: {},
      customer: defaultCustomer,
      flight: defaultFlight,
      contactPref: 'whatsapp',
      payMethod: 'card',
      termsAccepted: false,
      bookingId: null,
      folio: null,
      lastPaymentOutcome: null,

      setScreen: (screen) => {
        set({ screen, errors: {} });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      setErrors: (errors) => set({ errors }),
      setTripField: (key, value) =>
        set((s) => ({
          trip: { ...s.trip, [key]: value },
          vehicleId: TRIP_FIELDS_INVALIDATING_VEHICLE.has(key) ? null : s.vehicleId,
        })),
      setCustomerField: (key, value) =>
        set((s) => ({ customer: { ...s.customer, [key]: value } })),
      setFlightField: (key, value) => set((s) => ({ flight: { ...s.flight, [key]: value } })),
      setVehicle: (vehicleId) => set({ vehicleId }),
      setExtraQty: (id, qty) =>
        set((s) => {
          const extras = { ...s.extras };
          if (qty <= 0) {
            delete extras[id];
          } else {
            extras[id] = qty;
          }
          return { extras };
        }),
      setContactPref: (contactPref) => set({ contactPref }),
      setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
      setBookingId: (bookingId, folio) => set({ bookingId, folio }),
      setPaymentOutcome: (lastPaymentOutcome) => set({ lastPaymentOutcome }),
      swap: () =>
        set((s) => ({
          trip: { ...s.trip, originId: s.trip.destinationId, destinationId: s.trip.originId },
          vehicleId: null,
        })),
      bumpAdults: (delta) =>
        set((s) => ({
          trip: { ...s.trip, adults: Math.max(1, Math.min(12, s.trip.adults + delta)) },
          vehicleId: null,
        })),
      bumpChildren: (delta) =>
        set((s) => ({
          trip: { ...s.trip, children: Math.max(0, Math.min(8, s.trip.children + delta)) },
          vehicleId: null,
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
          savedAt: Date.now(),
          trip: defaultTrip,
          vehicleId: null,
          extras: {},
          customer: defaultCustomer,
          flight: defaultFlight,
          contactPref: 'whatsapp',
          payMethod: 'card',
          termsAccepted: false,
          bookingId: null,
          folio: null,
          lastPaymentOutcome: null,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        screen: state.screen,
        savedAt: Date.now(),
        trip: state.trip,
        vehicleId: state.vehicleId,
        extras: state.extras,
        customer: state.customer,
        flight: state.flight,
        contactPref: state.contactPref,
        payMethod: state.payMethod,
        termsAccepted: state.termsAccepted,
        bookingId: state.bookingId,
        folio: state.folio,
      }),
    },
  ),
);
