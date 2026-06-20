import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicleById } from '@/hooks/useVehicles';

export default function PayStep() {
  const { t } = useTranslation();
  const { form, vehicleId, payMethod, setPayMethod } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const { lang } = useAppStore();
  const vehicle = useVehicleById(vehicleId);
  const showReturn = form.tripType === 'round';

  const places = t('places', { returnObjects: true }) as Record<string, string>;
  const fromLabel = places[form.from] || form.from;
  const toLabel = places[form.to] || form.to;

  const tripLabels: Record<string, string> = {
    round: t('roundTrip'),
    oneway: t('oneWay'),
  };

  const fmtDate = (iso: string) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-').map(Number);
    const months = lang === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[m - 1]} ${d}, ${y}`;
  };

  const paxLabel = `${lang === 'es' ? 'Adultos' : 'Adults'} ${form.adults} · ${lang === 'es' ? 'Niños' : 'Children'} ${form.children}`;

  return (
    <section className="max-w-[760px] mx-auto px-6 pt-[46px] pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('pay_eyebrow')}</div>
      <h1 className="font-display font-extrabold leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('pay_title')}
      </h1>

      {/* Trip summary */}
      <div className="bg-navy-dark text-white rounded-[20px] p-[26px] mb-[18px]">
        <div className="font-display font-bold text-[17px] mb-[18px] flex items-center gap-2.5">
          <span className="text-gold">●</span> {t('sumTitle')}
        </div>
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="text-[11.5px] text-footer-text uppercase tracking-[.5px] font-bold mb-1">{t('sumTransfer')}</div>
            <div className="text-[15px] font-bold leading-snug">{fromLabel}</div>
            <div className="text-gold text-[13px] my-0.5">↓</div>
            <div className="text-[15px] font-bold leading-snug">{toLabel}</div>
          </div>
          <span className="flex-none text-[12px] font-extrabold px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(255,197,61,.18)', color: '#FFD675' }}>
            {tripLabels[form.tripType] || t('roundTrip')}
          </span>
        </div>
        <div className="h-px my-4" style={{ background: 'rgba(255,255,255,.14)' }} />
        <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumArrival')}</span><span className="font-bold">{fmtDate(form.arrival)}</span></div>
        {showReturn && <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumReturn')}</span><span className="font-bold">{fmtDate(form.departure)}</span></div>}
        <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumPassengers')}</span><span className="font-bold">{paxLabel}</span></div>
        <div className="flex justify-between text-sm"><span className="text-footer-text">{t('sumVehicle')}</span><span className="font-bold">{vehicle.name}</span></div>
        <div className="h-px my-4" style={{ background: 'rgba(255,255,255,.14)' }} />
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-bold">{t('total')}</span>
          <span className="font-display text-[30px] font-extrabold text-gold" style={{ letterSpacing: '-.5px' }}>{formatPrice(vehicle.price)}</span>
        </div>
      </div>

      {/* Payment card */}
      <div className="bg-white border border-border rounded-[20px] p-[26px]">
        <div className="flex items-start gap-[11px] bg-info-bg border border-info-border rounded-[13px] px-4 py-3.5 text-[13.5px] text-info-text leading-relaxed mb-5 font-semibold">
          <span>ℹ️</span>{t('coPayNote')}
        </div>
        <div className="text-[13px] font-bold text-text-muted mb-[11px]">{t('payMethod')}</div>
        <div className="flex gap-2.5 mb-[18px]">
          <button
            onClick={() => setPayMethod('card')}
            className="flex-1 rounded-[13px] px-[15px] py-[15px] text-[14.5px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-colors"
            style={{
              border: `1.5px solid ${payMethod === 'card' ? '#1F5FC0' : '#D8E1EC'}`,
              background: payMethod === 'card' ? '#E9F1FC' : '#fff',
              color: payMethod === 'card' ? '#1A4F9E' : '#465064',
            }}
          >
            💳 {t('coCard')}
          </button>
          <button
            onClick={() => setPayMethod('paypal')}
            className="flex-1 rounded-[13px] px-[15px] py-[15px] text-[14.5px] font-bold cursor-pointer transition-colors"
            style={{
              border: `1.5px solid ${payMethod === 'paypal' ? '#1F5FC0' : '#D8E1EC'}`,
              background: payMethod === 'paypal' ? '#E9F1FC' : '#fff',
              color: payMethod === 'paypal' ? '#1A4F9E' : '#465064',
            }}
          >
            {t('payWith')} PayPal
          </button>
        </div>
        <label className="flex items-center gap-2.5 text-sm text-text-body cursor-pointer">
          <input type="checkbox" className="w-[18px] h-[18px]" style={{ accentColor: '#1F5FC0' }} />
          {t('coAccept')} <span className="text-primary font-bold underline">{t('coTerms')}</span>
        </label>
        <div className="flex items-center justify-center gap-2.5 mt-[18px]">
          <span className="text-[11.5px] text-text-light">🔒 {t('coSecure')}</span>
          <span className="border border-border-input rounded-md px-2 py-0.5 text-[10px] font-extrabold" style={{ color: '#1a1f71' }}>VISA</span>
          <span className="border border-border-input rounded-md px-2 py-0.5 text-[10px] font-extrabold" style={{ color: '#eb001b' }}>MC</span>
          <span className="border border-border-input rounded-md px-2 py-0.5 text-[10px] font-extrabold" style={{ color: '#006fcf' }}>AMEX</span>
        </div>
      </div>
    </section>
  );
}
