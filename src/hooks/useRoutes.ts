import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Place } from '@/types/booking';

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const { data } = await api.get<Place[]>('/routes');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlaceLabel(place: Place | undefined, lang: 'en' | 'es'): string {
  if (!place) return '';
  return lang === 'es' ? place.labelEs : place.labelEn;
}
