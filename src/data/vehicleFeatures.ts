import type { VehicleRate } from '@/types/booking';

/**
 * The catalog API has no amenities field yet, so this is a static, cosmetic-only
 * feature list keyed off vehicle capacity — not sourced from the backend.
 */
export function getVehicleFeatures(vehicle: VehicleRate, t: (key: string) => string): string[] {
  const base = [t('feat_gps'), t('feat_private'), t('feat_cancel')];
  if (vehicle.capacityPassengers >= 6) {
    return [...base, t('feat_ac'), t('feat_luggage'), t('feat_flightTracking')];
  }
  return [...base, t('feat_ac'), t('feat_comfort')];
}
