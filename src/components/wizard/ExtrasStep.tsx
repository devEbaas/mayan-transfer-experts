import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useExtras } from '@/hooks/useExtras';

export default function ExtrasStep() {
  const { t, i18n } = useTranslation();
  const { extras, setExtraQty } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const { data: catalog = [] } = useExtras();
  const label = (item: { labelEs: string; labelEn: string }) =>
    i18n.language === 'es' ? item.labelEs : item.labelEn;

  return (
    <section className="max-w-[720px] mx-auto px-6 pt-[46px] pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('e_eyebrow')}</div>
      <h1 className="font-display font-extrabold leading-[1.04] m-0 mb-3" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('e_title')}
      </h1>
      <p className="text-sm text-text-muted mb-[26px]">{t('extrasSkip')}</p>

      <div className="flex flex-col gap-3.5">
        {catalog.map((item) => {
          const qty = extras[item.id] ?? 0;
          const subtotal = item.price * qty;
          return (
            <div key={item.id} className="bg-white border border-border rounded-[18px] px-6 py-[20px] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-extrabold text-[17px] text-navy">{label(item)}</div>
                <div className="text-[13px] font-bold text-primary mt-1">{formatPrice(item.price, item.currency)}</div>
              </div>
              <div className="flex items-center gap-3.5 flex-none">
                <button
                  onClick={() => setExtraQty(item.id, Math.max(0, qty - 1))}
                  className="w-[38px] h-[38px] rounded-full border-[1.5px] border-border-input bg-white text-navy text-xl font-bold cursor-pointer leading-none hover:border-teal-hover hover:text-teal-hover transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="min-w-6 text-center text-lg font-extrabold text-navy">{qty}</span>
                <button
                  onClick={() => setExtraQty(item.id, Math.min(item.maxQty, qty + 1))}
                  className="w-[38px] h-[38px] rounded-full border-none bg-primary text-white text-xl font-bold cursor-pointer leading-none hover:bg-teal-hover transition-colors flex items-center justify-center"
                  style={{ boxShadow: '0 8px 18px -8px rgba(31,95,192,.55)' }}
                >
                  +
                </button>
                <span className="min-w-[70px] text-right text-sm font-bold text-navy">
                  {qty > 0 ? formatPrice(subtotal, item.currency) : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-[11px] bg-info-bg border border-info-border rounded-[14px] px-[18px] py-3.5 mt-5 text-sm text-info-text font-semibold leading-relaxed">
        ℹ️ {t('extrasNote')}
      </div>
    </section>
  );
}
