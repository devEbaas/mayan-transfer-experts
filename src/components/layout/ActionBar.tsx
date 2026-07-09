import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useRoutes } from '@/hooks/useRoutes';
import { useVehicleRates, bestPrice } from '@/hooks/useVehicles';
import { useExtras } from '@/hooks/useExtras';
import { useAppStore } from '@/store/appStore';
import { createTripSchema, customerSchema, createFlightSchema, firstIssueByPath } from '@/schemas/booking';

export default function ActionBar() {
  const { t } = useTranslation();
  const { screen, trip, vehicleId, extras, customer, flight, next, back, setErrors } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const { data: places = [] } = useRoutes();
  const { data: vehicleRates = [] } = useVehicleRates(trip.originId || null, trip.destinationId || null);
  const { data: extrasCatalog = [] } = useExtras();

  const origin = places.find((p) => p.id === trip.originId);
  const destination = places.find((p) => p.id === trip.destinationId);
  const selectedVehicle = vehicleRates.find((v) => v.vehicleId === vehicleId);
  const extrasTotal = Object.entries(extras).reduce((sum, [id, qty]) => {
    const item = extrasCatalog.find((e) => e.id === id);
    return item ? sum + item.price * qty : sum;
  }, 0);

  const showBack = screen !== 'route';
  const showPrice = (screen === 'vehicle' || screen === 'extras' || screen === 'details' || screen === 'pay') && Boolean(selectedVehicle);
  const isPay = screen === 'pay';

  const validateAndAdvance = () => {
    if (screen === 'route' || screen === 'pax') {
      const result = createTripSchema(places).safeParse(trip);
      if (!result.success) {
        setErrors(firstIssueByPath(result));
        return;
      }
      setErrors({});
      next();
      return;
    }

    if (screen === 'vehicle') {
      if (!vehicleId) {
        setErrors({ vehicleId: 'err_required' });
        return;
      }
      setErrors({});
      next();
      return;
    }

    if (screen === 'extras') {
      next();
      return;
    }

    if (screen === 'details') {
      const customerResult = customerSchema.safeParse(customer);
      const requireArrival = origin?.isAirport ?? false;
      const requireDeparture = trip.tripType === 'round' && (destination?.isAirport ?? false);
      const flightResult = createFlightSchema(requireArrival, requireDeparture).safeParse(flight);
      const errors = { ...firstIssueByPath(customerResult), ...firstIssueByPath(flightResult) };
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      setErrors({});
      next();
      return;
    }

    next();
  };

  if (screen === 'done' || screen === 'payment-result') return null;

  return (
    <div
      className="sticky bottom-0 z-40 border-t border-border"
      style={{ background: 'rgba(245,242,236,.92)', backdropFilter: 'saturate(150%) blur(10px)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {showBack ? (
          <button
            onClick={back}
            className="bg-white border-[1.5px] border-border-input text-navy rounded-[14px] px-6 py-[15px] text-[15px] font-bold cursor-pointer hover:border-teal-hover hover:text-teal-hover transition-colors"
          >
            ← {t('back')}
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-5">
          {showPrice && selectedVehicle && (
            <div className="text-right">
              <div className="text-[11px] font-extrabold uppercase tracking-[.5px] text-text-light">{t('total')}</div>
              <div className="font-sans text-2xl font-extrabold text-navy tracking-tight leading-none" style={{ letterSpacing: '-.5px' }}>
                {formatPrice(bestPrice(selectedVehicle) + extrasTotal, selectedVehicle.currency)}
              </div>
            </div>
          )}
          {!isPay && (
            <button
              onClick={validateAndAdvance}
              className="bg-primary text-white border-none rounded-[14px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors"
              style={{ boxShadow: '0 14px 30px -10px rgba(14,140,130,.5)' }}
            >
              {t('continue')} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
