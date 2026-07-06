export type TripType = 'round' | 'oneway';

export type ContactPref = 'whatsapp' | 'email';

export type PayMethod = 'card';

export interface Place {
  id: string;
  key: string;
  labelEs: string;
  labelEn: string;
  zone: string | null;
  isAirport: boolean;
  isPopular: boolean;
  active: boolean;
}

export interface VehicleRate {
  vehicleId: string;
  name: string;
  capacityPassengers: number;
  capacityLuggage: number;
  description: string | null;
  imageUrl: string | null;
  rateId: string;
  currency: string;
  priceNormal: number;
  pricePromo: number | null;
}

export interface ExtraCatalogItem {
  id: string;
  key: string;
  labelEs: string;
  labelEn: string;
  price: number;
  currency: string;
  maxQty: number;
}

export interface BookingExtraInput {
  extraId: string;
  qty: number;
}

export interface BookingExtraLine extends BookingExtraInput {
  labelEs: string;
  labelEn: string;
  unitPrice: number;
  currency: string;
}

export interface CreateBookingPayload {
  tripType: TripType;
  originId: string;
  destinationId: string;
  vehicleId: string;
  arrivalDate: string;
  departureDate?: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactPref: ContactPref;
  arrivalAirline?: string;
  arrivalFlightNo?: string;
  arrivalTime?: string;
  departureAirline?: string;
  departureFlightNo?: string;
  departureTime?: string;
  comments?: string;
  payMethod: PayMethod;
  extras?: BookingExtraInput[];
}

export interface BookingResponse extends CreateBookingPayload {
  id: string;
  folio: string;
  vehicleName: string;
  priceTotal: number;
  currency: string;
  paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded';
  status: string;
  createdAt: string;
  updatedAt: string;
  extras: BookingExtraLine[];
}

export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}
