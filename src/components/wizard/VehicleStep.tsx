import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicleRates, bestPrice } from '@/hooks/useVehicles';
import { getVehicleFeatures } from '@/data/vehicleFeatures';

export default function VehicleStep() {
  const { t } = useTranslation();
  const { trip, vehicleId, setVehicle, errors } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const { data: rates = [], isLoading } = useVehicleRates(trip.originId || null, trip.destinationId || null);

  const totalPax = trip.adults + trip.children;
  const vehicles = rates.filter((v) => v.capacityPassengers >= totalPax);

  return (
    <section className="pt-1 pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('v_eyebrow')}</div>
      <h1 className="font-display leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('v_title')}
      </h1>

      {errors.vehicleId && (
        <p className="text-red-600 text-sm font-semibold mb-4">{t(errors.vehicleId)}</p>
      )}

      {!isLoading && vehicles.length === 0 && (
        <p className="text-text-secondary text-sm font-semibold">{t('noVehicles')}</p>
      )}

      <div className="grid gap-[18px]">
        {vehicles.map((v) => {
          const sel = v.vehicleId === vehicleId;
          const features = getVehicleFeatures(v, t);
          return (
            <div
              key={v.vehicleId}
              onClick={() => setVehicle(v.vehicleId)}
              className="bg-white rounded-[20px] overflow-hidden cursor-pointer transition-[border-color]"
              style={{
                border: `2px solid ${sel ? '#0E8C82' : '#ece6da'}`,
                boxShadow: sel
                  ? '0 20px 44px -22px rgba(14,140,130,.45)'
                  : '0 10px 26px -20px rgba(8,24,42,.28)',
              }}
            >
              <div className="p-[22px] flex flex-wrap gap-[22px] items-center">
                <div className="flex-[1_1_180px] max-w-[230px] min-w-0">
                  <div className="rounded-[14px] h-[120px] flex items-center justify-center font-mono text-[11px] text-text-light text-center p-2.5 overflow-hidden" style={{ background: 'repeating-linear-gradient(135deg,#efe9de,#efe9de 11px,#e7e1d4 11px,#e7e1d4 22px)' }}>
                    {v.imageUrl ? (
                      <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover rounded-[14px]" />
                    ) : (
                      `PHOTO · ${v.name}`
                    )}
                  </div>
                </div>
                <div className="flex-[3_1_280px] min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="font-sans text-[23px] font-extrabold text-navy" style={{ letterSpacing: '-.4px' }}>{v.name}</div>
                        {sel && (
                          <span className="bg-primary text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                            ✓ {t('selectedTag')}
                          </span>
                        )}
                      </div>
                      <div className="text-[13.5px] text-text-muted mt-1">
                        {v.capacityPassengers} pax · {v.capacityLuggage} luggage
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-extrabold tracking-[.5px] uppercase text-text-light">{t('price')}</div>
                      <div className="font-sans text-[30px] font-extrabold text-primary" style={{ letterSpacing: '-.6px' }}>
                        {formatPrice(bestPrice(v), v.currency)}
                      </div>
                      <div className="text-[11.5px] text-text-light">{t('taxIncl')}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-[7px_18px] mt-4">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-[13.5px] text-text-body">
                        <span className="text-teal font-extrabold">✓</span>{f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
