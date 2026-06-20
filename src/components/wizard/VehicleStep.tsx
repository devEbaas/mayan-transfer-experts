import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicles } from '@/hooks/useVehicles';

export default function VehicleStep() {
  const { t } = useTranslation();
  const { vehicleId, setVehicle } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const vehicles = useVehicles();
  const features = t('features', { returnObjects: true }) as string[];

  return (
    <section className="max-w-[840px] mx-auto px-6 pt-[46px] pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('v_eyebrow')}</div>
      <h1 className="font-display font-extrabold leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('v_title')}
      </h1>

      <div className="grid gap-[18px]">
        {vehicles.map((v) => {
          const sel = v.id === vehicleId;
          return (
            <div
              key={v.id}
              onClick={() => setVehicle(v.id)}
              className="bg-white rounded-[20px] overflow-hidden cursor-pointer transition-[border-color]"
              style={{
                border: `2px solid ${sel ? '#1F5FC0' : '#E2E9F2'}`,
                boxShadow: sel
                  ? '0 20px 44px -22px rgba(31,95,192,.45)'
                  : '0 10px 26px -20px rgba(17,34,64,.28)',
              }}
            >
              <div className="p-[22px] flex flex-wrap gap-[22px] items-center">
                <div className="flex-[1_1_180px] max-w-[230px] min-w-0">
                  <div className="rounded-[14px] h-[120px] flex items-center justify-center font-mono text-[11px] text-text-light text-center p-2.5" style={{ background: 'repeating-linear-gradient(135deg,#EAF1F9,#EAF1F9 11px,#DBE5F1 11px,#DBE5F1 22px)' }}>
                    {v.imgNote}
                  </div>
                </div>
                <div className="flex-[3_1_280px] min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <div className="font-display text-[23px] font-extrabold text-navy" style={{ letterSpacing: '-.4px' }}>{v.name}</div>
                        {sel && (
                          <span className="bg-primary text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                            ✓ {t('selectedTag')}
                          </span>
                        )}
                      </div>
                      <div className="text-[13.5px] text-text-muted mt-1">{v.cap}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-extrabold tracking-[.5px] uppercase text-text-light">{t('price')}</div>
                      <div className="font-display text-[30px] font-extrabold text-primary" style={{ letterSpacing: '-.6px' }}>
                        {formatPrice(v.price)}
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
