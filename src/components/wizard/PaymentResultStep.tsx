import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';

const ICON_BY_OUTCOME = {
  cancelled: { glyph: '✕', bg: 'bg-text-muted' },
  failed: { glyph: '!', bg: 'bg-red-600' },
  unknown: { glyph: '?', bg: 'bg-text-muted' },
} as const;

export default function PaymentResultStep() {
  const { t } = useTranslation();
  const outcome = useBookingStore((s) => s.lastPaymentOutcome) ?? 'failed';
  const setScreen = useBookingStore((s) => s.setScreen);
  const reset = useBookingStore((s) => s.reset);
  const folio = useBookingStore((s) => s.folio);
  const bookingId = useBookingStore((s) => s.bookingId);

  const icon = ICON_BY_OUTCOME[outcome];

  const handleRetry = () => setScreen('pay');

  return (
    <section className="max-w-[620px] mx-auto px-6 pt-[70px] pb-10 text-center" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div
        className={`w-24 h-24 rounded-full ${icon.bg} text-white flex items-center justify-center text-[46px] mx-auto mb-[26px]`}
        style={{ boxShadow: '0 18px 40px -14px rgba(0,0,0,.35)' }}
      >
        {icon.glyph}
      </div>
      <h1 className="font-display leading-[1.05] m-0 mb-3.5" style={{ fontSize: 'clamp(30px,4.6vw,46px)', letterSpacing: '-.8px' }}>
        {t(`result_${outcome}_title`)}
      </h1>
      <p className="text-[17px] leading-relaxed text-text-secondary max-w-[440px] mx-auto m-0 mb-[26px]">
        {t(`result_${outcome}_body`)}
      </p>
      {folio && (
        <div className="inline-flex items-center gap-2.5 bg-white border border-border rounded-[14px] px-[22px] py-3.5 mb-[30px]">
          <span className="text-[12px] font-bold text-text-muted uppercase tracking-[.5px]">{t('done_ref')}</span>
          <span className="font-sans text-xl font-extrabold text-primary tracking-[.5px]">{folio}</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {bookingId && outcome !== 'unknown' && (
          <button
            onClick={handleRetry}
            className="bg-primary text-white border-none rounded-[15px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors"
            style={{ boxShadow: '0 14px 30px -10px rgba(14,140,130,.5)' }}
          >
            {t('result_retry_btn')}
          </button>
        )}
        <button
          onClick={reset}
          className="bg-white text-text-body border border-border rounded-[15px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-page-bg transition-colors"
        >
          {t('result_home_btn')}
        </button>
      </div>
    </section>
  );
}
