import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useRoutes } from '@/hooks/useRoutes';
import { useVehicleRates } from '@/hooks/useVehicles';
import { fmtDate } from '@/lib/format';

export default function TripSummaryAside() {
  const { t, i18n } = useTranslation();
  const { trip, vehicleId, setScreen } = useBookingStore();
  const { data: places = [] } = useRoutes();
  const { data: vehicleRates = [] } = useVehicleRates(trip.originId || null, trip.destinationId || null);

  const vehicle = vehicleRates.find((v) => v.vehicleId === vehicleId);
  const showReturn = trip.tripType === 'round';

  const placeLabel = (id: string) => {
    const place = places.find((p) => p.id === id);
    if (!place) return '—';
    return i18n.language === 'es' ? place.labelEs : place.labelEn;
  };

  const paxLabel = `${t('fAdults')} ${trip.adults} · ${t('fChildren')} ${trip.children}`;

  return (
    <aside className="sticky top-[108px] flex-1 min-w-0 max-w-[360px]" style={{ flexBasis: '300px' }}>
      <div className="bg-white rounded-2xl overflow-hidden border border-border" style={{ boxShadow: '0 10px 30px -18px rgba(8,24,42,.35)' }}>
        <div className="bg-navy-dark text-white px-5 py-4 font-sans font-bold text-base flex items-center gap-2.5 whitespace-nowrap">
          <span className="text-teal">●</span> {t('sumTitle')}
        </div>
        <div className="p-5">
          <div className="text-[11px] font-bold tracking-[.6px] uppercase text-text-light mb-1.5">{t('sumTransfer')}</div>
          <div className="text-[14.5px] font-bold text-navy leading-[1.45] mb-0.5">{placeLabel(trip.originId)}</div>
          <div className="text-primary text-xs my-0.5">↓</div>
          <div className="text-[14.5px] font-bold text-navy leading-[1.45]">{placeLabel(trip.destinationId)}</div>
          <div className="inline-block mt-2.5 bg-info-bg text-primary text-[11.5px] font-bold px-2.5 py-1 rounded-full">
            {showReturn ? t('roundTrip') : t('oneWay')}
          </div>

          <div className="h-px bg-border my-[18px]" />
          <div className="flex justify-between text-[13.5px] mb-2.5"><span className="text-text-muted">{t('sumArrival')}</span><span className="font-bold text-navy whitespace-nowrap">{fmtDate(trip.arrivalDate, i18n.language)}</span></div>
          {showReturn && <div className="flex justify-between text-[13.5px] mb-2.5"><span className="text-text-muted">{t('sumReturn')}</span><span className="font-bold text-navy whitespace-nowrap">{fmtDate(trip.departureDate, i18n.language)}</span></div>}
          <div className="flex justify-between text-[13.5px]"><span className="text-text-muted">{t('sumPassengers')}</span><span className="font-bold text-navy">{paxLabel}</span></div>
          {vehicle && (
            <div className="flex justify-between text-[13.5px] mt-2.5"><span className="text-text-muted">{t('sumVehicle')}</span><span className="font-bold text-navy">{vehicle.name}</span></div>
          )}

          <button
            onClick={() => setScreen('route')}
            className="w-full mt-[18px] bg-white border-[1.5px] border-border-input rounded-[11px] py-2.5 text-[13.5px] font-bold text-navy cursor-pointer flex items-center justify-center gap-[7px] hover:border-teal-hover hover:text-teal-hover transition-colors"
          >
            ✎ {t('sumEdit')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border px-5 py-[18px] mt-4">
        <div className="text-[13px] font-bold text-navy mb-2.5">{t('assistTitle')}</div>
        <div className="text-[13px] text-text-muted leading-[1.55] mb-3">{t('assistBody')}</div>
        <div className="flex items-center justify-center gap-2 rounded-[10px] py-[11px] text-[13.5px] font-bold text-white" style={{ background: '#25D366' }}>
          💬 {t('assistChat')}
        </div>
      </div>
    </aside>
  );
}
