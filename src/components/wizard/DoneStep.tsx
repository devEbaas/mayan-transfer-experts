import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';

export default function DoneStep() {
  const { t } = useTranslation();
  const reset = useBookingStore((s) => s.reset);

  return (
    <section className="max-w-[620px] mx-auto px-6 pt-[70px] pb-10 text-center" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div
        className="w-24 h-24 rounded-full bg-teal text-white flex items-center justify-center text-[46px] mx-auto mb-[26px]"
        style={{ boxShadow: '0 18px 40px -14px rgba(20,184,166,.55)' }}
      >
        ✓
      </div>
      <h1 className="font-display font-extrabold leading-[1.05] m-0 mb-3.5" style={{ fontSize: 'clamp(30px,4.6vw,46px)', letterSpacing: '-.8px' }}>
        {t('done_title')}
      </h1>
      <p className="text-[17px] leading-relaxed text-text-secondary max-w-[440px] mx-auto m-0 mb-[26px]">
        {t('done_body')}
      </p>
      <div className="inline-flex items-center gap-2.5 bg-white border border-border rounded-[14px] px-[22px] py-3.5 mb-[30px]">
        <span className="text-[12px] font-bold text-text-muted uppercase tracking-[.5px]">{t('done_ref')}</span>
        <span className="font-display text-xl font-extrabold text-primary tracking-[.5px]">CTH-7K2940</span>
      </div>
      <div>
        <button
          onClick={reset}
          className="bg-primary text-white border-none rounded-[15px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors"
          style={{ boxShadow: '0 14px 30px -10px rgba(31,95,192,.5)' }}
        >
          {t('done_btn')}
        </button>
      </div>
    </section>
  );
}
