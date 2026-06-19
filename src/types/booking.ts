export type TripType = 'round' | 'oneway' | 'arrival' | 'departure';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export type ContactPref = 'whatsapp' | 'email';

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  contactPref: ContactPref;
  arrivalAirline?: string;
  arrivalFlightNo?: string;
  arrivalTime?: string;
  departureAirline?: string;
  departureFlightNo?: string;
  departureTime?: string;
  comments?: string;
  terminals: 'one' | 'two';
  acceptTerms: boolean;
}

export interface BookingSearch {
  tripType: TripType;
  from: string;
  to: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

export interface Vehicle {
  id: string;
  name: string;
  capacity: string;
  price: number;
  imgNote: string;
}

export interface ExtraItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
}

export type ExtrasState = Record<string, number>;

export interface PriceBreakdown {
  basePrice: number;
  returnPrice?: number;
  extrasTotal: number;
  twoTerminalFee: number;
  total: number;
}
