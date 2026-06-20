import { useAppStore } from '@/store/appStore';
import type { Vehicle } from '@/types/booking';

const VEHICLES_EN: Vehicle[] = [
  {
    id: 'van',
    name: 'Private Van',
    cap: 'Up to 8 passengers · luggage included',
    price: 89.6,
    imgNote: 'PHOTO · Private Van',
  },
  {
    id: 'suv',
    name: 'Suburban SUV',
    cap: 'Up to 6 passengers · premium service',
    price: 260.1,
    imgNote: 'PHOTO · Suburban SUV',
  },
];

const VEHICLES_ES: Vehicle[] = [
  {
    id: 'van',
    name: 'Van Privada',
    cap: 'Hasta 8 pasajeros · equipaje incluido',
    price: 89.6,
    imgNote: 'PHOTO · Private Van',
  },
  {
    id: 'suv',
    name: 'SUV Suburban',
    cap: 'Hasta 6 pasajeros · servicio premium',
    price: 260.1,
    imgNote: 'PHOTO · Suburban SUV',
  },
];

export function useVehicles() {
  const lang = useAppStore((s) => s.lang);
  return lang === 'es' ? VEHICLES_ES : VEHICLES_EN;
}

export function useVehicleById(id: string) {
  const vehicles = useVehicles();
  return vehicles.find((v) => v.id === id) || vehicles[0];
}
