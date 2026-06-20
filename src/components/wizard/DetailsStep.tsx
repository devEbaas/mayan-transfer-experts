import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';

const inputClass = 'w-full border-[1.5px] border-border-input rounded-[13px] px-3.5 py-3.5 text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white';
const smallInputClass = 'w-full border-[1.5px] border-border-input rounded-[11px] p-3 text-sm text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white';

export default function DetailsStep() {
  const { t } = useTranslation();
  const { form, contactPref, setContactPref } = useBookingStore();
  const showReturn = form.tripType === 'round';

  return (
    <section className="max-w-[760px] mx-auto px-6 pt-[46px] pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('d_eyebrow')}</div>
      <h1 className="font-display font-extrabold leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('d_title')}
      </h1>

      {/* Passenger info */}
      <div className="bg-white border border-border rounded-[20px] p-[26px] mb-[18px]">
        <div className="font-display font-bold text-[17px] text-navy mb-[18px]">👤 {t('coPassenger')}</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coName')}</label>
            <input placeholder={t('coNamePh')} className={inputClass} />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coLast')}</label>
            <input placeholder={t('coLastPh')} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coEmail')}</label>
            <input type="email" placeholder="you@email.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coCell')}</label>
            <input placeholder="+52 998 123 4567" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-bold text-text-muted mb-2.5">{t('coContactPref')}</label>
          <div className="flex gap-2.5 max-w-[340px]">
            <button
              onClick={() => setContactPref('whatsapp')}
              className="flex-1 rounded-xl px-3 py-3.5 text-sm font-bold cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${contactPref === 'whatsapp' ? '#1F5FC0' : '#D8E1EC'}`,
                background: contactPref === 'whatsapp' ? '#E9F1FC' : '#fff',
                color: contactPref === 'whatsapp' ? '#1A4F9E' : '#465064',
              }}
            >
              💬 {t('coWhatsapp')}
            </button>
            <button
              onClick={() => setContactPref('email')}
              className="flex-1 rounded-xl px-3 py-3.5 text-sm font-bold cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${contactPref === 'email' ? '#1F5FC0' : '#D8E1EC'}`,
                background: contactPref === 'email' ? '#E9F1FC' : '#fff',
                color: contactPref === 'email' ? '#1A4F9E' : '#465064',
              }}
            >
              ✉ {t('coEmailPref')}
            </button>
          </div>
        </div>
      </div>

      {/* Flight info */}
      <div className="bg-white border border-border rounded-[20px] p-[26px]">
        <div className="font-display font-bold text-[17px] text-navy mb-1.5">✈️ {t('flightTitle')}</div>
        <div className="text-[13.5px] text-text-muted mb-[18px] leading-relaxed">{t('flightSub')}</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
          {/* Arrival flight */}
          <div>
            <div className="font-extrabold text-[13px] text-primary tracking-[.4px] uppercase mb-3">{t('coArrivalFlight')}</div>
            <div className="mb-[11px]">
              <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coAirline')}</label>
              <input className={smallInputClass} />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coFlightNo')}</label>
                <input className={smallInputClass} />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coArrTime')}</label>
                <input type="time" className={smallInputClass} />
              </div>
            </div>
          </div>
          {/* Departure flight */}
          {showReturn && (
            <div>
              <div className="font-extrabold text-[13px] text-primary tracking-[.4px] uppercase mb-3">{t('coDepFlight')}</div>
              <div className="mb-[11px]">
                <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coAirline')}</label>
                <input className={smallInputClass} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coFlightNo')}</label>
                  <input className={smallInputClass} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coDepTime')}</label>
                  <input type="time" className={smallInputClass} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-[18px]">
          <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coComments')}</label>
          <textarea rows={3} placeholder={t('coCommentsPh')} className="w-full border-[1.5px] border-border-input rounded-[13px] p-3.5 text-sm text-navy resize-y bg-bg-card focus:outline-none focus:border-primary focus:bg-white" />
        </div>
      </div>
    </section>
  );
}
