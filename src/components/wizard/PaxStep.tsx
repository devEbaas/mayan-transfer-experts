import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';

export default function PaxStep() {
  const { t } = useTranslation();
  const { trip, bumpAdults, bumpChildren } = useBookingStore();

  return (
    <section className="max-w-[640px] mx-auto px-6 pt-[46px] pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('p_eyebrow')}</div>
      <h1 className="font-display font-extrabold leading-[1.04] m-0 mb-[30px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('p_title')}
      </h1>

      <div className="flex flex-col gap-3.5">
        {/* Adults */}
        <div className="bg-white border border-border rounded-[18px] px-6 py-[22px] flex items-center justify-between gap-4">
          <div>
            <div className="font-extrabold text-lg text-navy">{t('fAdults')}</div>
            <div className="text-[13.5px] text-text-muted">{t('adultsNote')}</div>
          </div>
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => bumpAdults(-1)}
              className="w-[46px] h-[46px] rounded-full border-[1.5px] border-border-input bg-white text-navy text-2xl font-bold cursor-pointer leading-none hover:border-teal-hover hover:text-teal-hover transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="min-w-8 text-center text-2xl font-extrabold text-navy">{trip.adults}</span>
            <button
              onClick={() => bumpAdults(1)}
              className="w-[46px] h-[46px] rounded-full border-none bg-primary text-white text-2xl font-bold cursor-pointer leading-none hover:bg-teal-hover transition-colors flex items-center justify-center"
              style={{ boxShadow: '0 8px 18px -8px rgba(31,95,192,.55)' }}
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="bg-white border border-border rounded-[18px] px-6 py-[22px] flex items-center justify-between gap-4">
          <div>
            <div className="font-extrabold text-lg text-navy">{t('fChildren')}</div>
            <div className="text-[13.5px] text-text-muted">{t('childrenNote')}</div>
          </div>
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => bumpChildren(-1)}
              className="w-[46px] h-[46px] rounded-full border-[1.5px] border-border-input bg-white text-navy text-2xl font-bold cursor-pointer leading-none hover:border-teal-hover hover:text-teal-hover transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="min-w-8 text-center text-2xl font-extrabold text-navy">{trip.children}</span>
            <button
              onClick={() => bumpChildren(1)}
              className="w-[46px] h-[46px] rounded-full border-none bg-primary text-white text-2xl font-bold cursor-pointer leading-none hover:bg-teal-hover transition-colors flex items-center justify-center"
              style={{ boxShadow: '0 8px 18px -8px rgba(31,95,192,.55)' }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[11px] bg-info-bg border border-info-border rounded-[14px] px-[18px] py-3.5 mt-5 text-sm text-info-text font-semibold leading-relaxed">
        🧒 {t('seatNote')}
      </div>
    </section>
  );
}
