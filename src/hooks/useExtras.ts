import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ExtraCatalogItem } from '@/types/booking';

export function useExtras() {
  return useQuery({
    queryKey: ['extras'],
    queryFn: async () => {
      const { data } = await api.get<ExtraCatalogItem[]>('/extras');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
