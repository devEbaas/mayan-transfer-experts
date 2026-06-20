import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { PLACE_KEYS } from '@/data/places';

const selectStyle: React.CSSProperties = {
  width: '100%',
  appearance: 'none' as const,
  border: '1.5px solid #D8E1EC',
  borderRadius: 15,
  padding: '16px 46px 16px 16px',
  fontSize: 16,
  color: '#14223A',
  backgroundColor: '#F6F9FD',
  cursor: 'pointer',
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" stroke="%23B8AB99" stroke-width="1.7" fill="none"/></svg>')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 17px center',
};

export default function RouteStep() {
  const { t } = useTranslation();
  const { form, setField, swap } = useBookingStore();
  const places = t('places', { returnObjects: true }) as Record<string, string>;
  const trustPills = t('trustPills', { returnObjects: true }) as string[];
  const showReturn = form.tripType === 'round';

  const tripDefs = [
    { v: 'round' as const, label: t('roundTrip'), icon: '⇄' },
    { v: 'oneway' as const, label: t('oneWay'), icon: '→' },
  ];

  return (
    <section className="relative max-w-[1080px] mx-auto px-6 pt-[50px] pb-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-[60px] -right-[40px] w-[230px] h-[230px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%,rgba(255,197,61,.5),rgba(255,197,61,0) 70%)' }} />
      <div className="absolute -bottom-[90px] -left-[60px] w-[220px] h-[220px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%,rgba(20,184,166,.42),rgba(20,184,166,0) 70%)' }} />

      {/* Heading */}
      <div className="text-center max-w-[700px] mx-auto mb-[30px] relative" style={{ animation: 'ctfade .7s cubic-bezier(.16,1,.3,1) both' }}>
        <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3.5">{t('r_eyebrow')}</div>
        <h1 className="font-display font-extrabold leading-[1.02] m-0 mb-4" style={{ fontSize: 'clamp(34px,5.4vw,56px)', letterSpacing: '-1px' }}>{t('r_title')}</h1>
        <p className="text-lg leading-relaxed text-text-secondary max-w-[520px] mx-auto m-0">{t('r_sub')}</p>
      </div>

      {/* Form card */}
      <div className="relative bg-white rounded-3xl border border-border p-[26px] max-w-[720px] mx-auto" style={{ boxShadow: '0 30px 70px -28px rgba(17,34,64,.28)', animation: 'ctfade .7s cubic-bezier(.16,1,.3,1) .15s both' }}>
        <div className="relative">
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">📍 {t('fFrom')}</label>
            <select
              value={form.from}
              onChange={(e) => setField('from', e.target.value)}
              style={selectStyle}
            >
              {PLACE_KEYS.map((key) => (
                <option key={key} value={key}>{places[key]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🏝️ {t('fTo')}</label>
            <select
              value={form.to}
              onChange={(e) => setField('to', e.target.value)}
              style={selectStyle}
            >
              {PLACE_KEYS.map((key) => (
                <option key={key} value={key}>{places[key]}</option>
              ))}
            </select>
          </div>
          <button
            onClick={swap}
            title={t('fSwap')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-navy-dark border-[3px] border-white text-white cursor-pointer text-base flex items-center justify-center hover:bg-[#082248] transition-colors"
            style={{ boxShadow: '0 6px 14px rgba(11,46,94,.4)' }}
          >
            ⇅
          </button>
        </div>

        <div className="text-[13px] text-text-muted mt-3.5 mx-0.5">
          {t('fNotFound')}{' '}
          <span className="text-primary font-bold cursor-pointer underline">{t('fContactUs')}</span>
        </div>

        {/* Popular destinations */}
        <div className="h-px bg-border my-[22px]" />
        <div className="text-[12px] font-extrabold tracking-[1.4px] uppercase text-text-light mb-3">{t('popular')}</div>
        <div className="flex flex-wrap gap-2.5">
          {PLACE_KEYS.filter((k) => k !== 'cun').map((key) => {
            const on = form.to === key;
            return (
              <button
                key={key}
                onClick={() => setField('to', key)}
                className="rounded-full px-[17px] py-2.5 text-sm font-bold cursor-pointer transition-colors hover:border-teal-hover hover:text-teal-hover"
                style={{
                  background: on ? '#E9F1FC' : '#EDF3FC',
                  border: `1.5px solid ${on ? '#1F5FC0' : '#D4E1F4'}`,
                  color: on ? '#1A4F9E' : '#465064',
                }}
              >
                {places[key]}
              </button>
            );
          })}
        </div>

        {/* Trip type */}
        <div className="h-px bg-border my-[22px]" />
        <label className="block text-[12px] font-extrabold tracking-[1.4px] uppercase text-text-light mb-3">{t('fTripType')}</label>
        <div className="flex gap-2.5 mb-[18px]">
          {tripDefs.map((o) => {
            const on = form.tripType === o.v;
            return (
              <button
                key={o.v}
                onClick={() => setField('tripType', o.v)}
                className="flex-1 rounded-[14px] px-3.5 py-[15px] text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-colors hover:border-teal-hover"
                style={{
                  background: on ? '#E9F1FC' : '#fff',
                  border: `1.5px solid ${on ? '#1F5FC0' : '#D8E1EC'}`,
                  color: on ? '#1A4F9E' : '#465064',
                }}
              >
                {o.icon} {o.label}
              </button>
            );
          })}
        </div>

        {/* Dates */}
        <div className="flex flex-wrap gap-3.5">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🛬 {t('fArrival')}</label>
            <input
              type="date"
              value={form.arrival}
              onChange={(e) => setField('arrival', e.target.value)}
              className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
              style={{ boxShadow: 'none' }}
            />
          </div>
          {showReturn && (
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🛫 {t('fDeparture')}</label>
              <input
                type="date"
                value={form.departure}
                onChange={(e) => setField('departure', e.target.value)}
                className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
                style={{ boxShadow: 'none' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Trust pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mt-[26px] mx-auto max-w-[720px]" style={{ animation: 'ctfade .7s cubic-bezier(.16,1,.3,1) .3s both' }}>
        {trustPills.map((p) => (
          <span key={p} className="flex items-center gap-2 bg-info-bg border border-info-border rounded-full px-4 py-2.5 text-[13.5px] font-bold text-info-text">
            <span className="text-primary">✓</span> {p}
          </span>
        ))}
      </div>
    </section>
  );
}
