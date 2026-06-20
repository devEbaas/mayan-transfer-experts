export type TripType = 'round' | 'oneway';

export type ContactPref = 'whatsapp' | 'email';

export type PayMethod = 'card' | 'paypal';

export interface Place {
  key: string;
  label: string;
}

export interface Vehicle {
  id: string;
  name: string;
  cap: string;
  price: number;
  imgNote: string;
}
