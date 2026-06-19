import { useAppStore } from '@/store/appStore';
import type { Vehicle } from '@/types/booking';

const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'van',
    name: 'Private Van',
    capacity: 'Up to 8 passengers · luggage included',
    price: 89.6,
    imgNote: 'VEHICLE PHOTO · Van',
  },
  {
    id: 'suv',
    name: 'Suburban SUV',
    capacity: 'Up to 6 passengers · premium service',
    price: 260.1,
    imgNote: 'VEHICLE PHOTO · SUV',
  },
];

const VEHICLES_DATA_ES: Vehicle[] = [
  {
    id: 'van',
    name: 'Van Privada',
    capacity: 'Hasta 8 pasajeros · equipaje incluido',
    price: 89.6,
    imgNote: 'VEHICLE PHOTO · Van',
  },
  {
    id: 'suv',
    name: 'SUV Suburban',
    capacity: 'Hasta 6 pasajeros · servicio premium',
    price: 260.1,
    imgNote: 'VEHICLE PHOTO · SUV',
  },
];

export function useVehicles() {
  const lang = useAppStore((s) => s.lang);
  return lang === 'es' ? VEHICLES_DATA_ES : VEHICLES_DATA;
}

export function useVehicleById(id: string | null) {
  const vehicles = useVehicles();
  return vehicles.find((v) => v.id === id) || vehicles[0];
}
