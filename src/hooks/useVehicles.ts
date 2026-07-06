import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { VehicleRate } from '@/types/booking';

export function useVehicleRates(originId: string | null, destinationId: string | null) {
  return useQuery({
    queryKey: ['vehicles', originId, destinationId],
    queryFn: async () => {
      const { data } = await api.get<VehicleRate[]>('/vehicles', {
        params: { originId, destinationId },
      });
      return data;
    },
    enabled: Boolean(originId && destinationId),
    staleTime: 60 * 1000,
  });
}

export function bestPrice(rate: VehicleRate): number {
  return rate.pricePromo ?? rate.priceNormal;
}
