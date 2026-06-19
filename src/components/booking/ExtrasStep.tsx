import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicleById } from '@/hooks/useVehicles';
import { useExtras, useExtrasTotal } from '@/hooks/useExtras';
import Counter from '@/components/ui/Counter';
import Button from '@/components/ui/Button';

export default function ExtrasStep() {
  const { t } = useTranslation();
  const { vehicleId, extras, incExtra, decExtra, twoTerminals, nextStep } =
    useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const vehicle = useVehicleById(vehicleId);
  const extrasList = useExtras();
  const total = useExtrasTotal(extras, twoTerminals, vehicle.price);

  return (
    <div>
      {/* Selected vehicle mini card */}
      <div className="bg-white rounded-[18px] border border-border p-5 flex items-center gap-5 mb-5 shadow-[0_10px_30px_-20px_rgba(8,24,42,0.4)]">
        <div className="w-[150px] flex-none bg-[repeating-linear-gradient(135deg,#eef1f4,#eef1f4_10px,#e7ebef_10px,#e7ebef_20px)] rounded-[11px] h-[84px] flex items-center justify-center font-mono text-[10px] text-text-light text-center p-2">
          {vehicle.imgNote}
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold tracking-wider uppercase text-teal">
            {t('results.private')}
          </div>
          <div className="text-[19px] font-extrabold text-navy">{vehicle.name}</div>
          <div className="text-[13px] text-text-muted">{vehicle.capacity}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-text-light uppercase font-bold">
            {t('results.price')}
          </div>
          <div className="text-2xl font-extrabold text-navy">
            {formatPrice(vehicle.price)}
          </div>
        </div>
      </div>

      {/* Extras header */}
      <div className="flex items-baseline justify-between mx-0.5 mt-6 mb-3.5">
        <h2 className="font-serif font-normal text-[30px] m-0 text-navy">
          {t('extras.title')}
        </h2>
        <span className="text-[13.5px] text-text-muted">{t('extras.subtitle')}</span>
      </div>

      {/* Extras grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {extrasList.map((e) => {
          const qty = extras[e.id] || 0;
          return (
            <div
              key={e.id}
              className={`bg-white border rounded-[14px] p-4 px-4.5 flex flex-col gap-2.5 ${
                qty > 0 ? 'border-teal' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div>
                  <div className="font-bold text-[15px] text-navy">{e.name}</div>
                  <div className="text-[12.5px] text-text-light mt-0.5">{e.description}</div>
                </div>
                <div className="text-2xl flex-none">{e.icon}</div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="font-extrabold text-[15px] text-teal">
                  {e.price === 0 ? t('extras.free') : formatPrice(e.price)}
                </div>
                <Counter
                  value={qty}
                  onIncrement={() => incExtra(e.id)}
                  onDecrement={() => decExtra(e.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky total bar */}
      <div className="sticky bottom-0 mt-5 bg-white border border-border rounded-2xl p-4 px-5 flex items-center justify-between gap-5 shadow-[0_-8px_30px_-16px_rgba(8,24,42,0.25)]">
        <div>
          <div className="text-xs text-text-light font-bold uppercase tracking-wider">
            {t('extras.total')}
          </div>
          <div className="text-[28px] font-extrabold text-navy tracking-tight">
            {formatPrice(total)}
          </div>
        </div>
        <Button variant="primary" onClick={nextStep}>
          {t('extras.continue')} →
        </Button>
      </div>
    </div>
  );
}
