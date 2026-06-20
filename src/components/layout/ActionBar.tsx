import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicleById } from '@/hooks/useVehicles';

export default function ActionBar() {
  const { t } = useTranslation();
  const { screen, vehicleId, next, back } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const vehicle = useVehicleById(vehicleId);

  const showBack = screen !== 'route';
  const showPrice = screen === 'vehicle' || screen === 'details' || screen === 'pay';
  const isPay = screen === 'pay';

  const handlePrimary = () => {
    if (isPay) {
      useBookingStore.getState().setScreen('done');
    } else {
      next();
    }
  };

  return (
    <div
      className="sticky bottom-0 z-40 border-t border-border"
      style={{ background: 'rgba(247,243,232,.92)', backdropFilter: 'saturate(150%) blur(10px)' }}
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
          {showPrice && (
            <div className="text-right">
              <div className="text-[11px] font-extrabold uppercase tracking-[.5px] text-text-light">{t('total')}</div>
              <div className="font-display text-2xl font-extrabold text-navy tracking-tight leading-none" style={{ letterSpacing: '-.5px' }}>
                {formatPrice(vehicle.price)}
              </div>
            </div>
          )}
          <button
            onClick={handlePrimary}
            className="bg-primary text-white border-none rounded-[14px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors"
            style={{ boxShadow: '0 14px 30px -10px rgba(31,95,192,.5)' }}
          >
            {isPay ? t('payNow') : t('continue')} →
          </button>
        </div>
      </div>
    </div>
  );
}
