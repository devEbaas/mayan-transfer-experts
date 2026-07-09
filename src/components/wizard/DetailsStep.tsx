import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useRoutes } from '@/hooks/useRoutes';

const inputClass = 'w-full border-[1.5px] border-border-input rounded-[13px] px-3.5 py-3.5 text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white';
const smallInputClass = 'w-full border-[1.5px] border-border-input rounded-[11px] p-3 text-sm text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white';
const errClass = 'text-red-600 text-[12px] font-semibold mt-1';

export default function DetailsStep() {
  const { t } = useTranslation();
  const { trip, customer, setCustomerField, flight, setFlightField, contactPref, setContactPref, errors } = useBookingStore();
  const { data: places = [] } = useRoutes();
  const origin = places.find((p) => p.id === trip.originId);
  const destination = places.find((p) => p.id === trip.destinationId);
  const showArrivalFlight = origin?.isAirport ?? false;
  const showDepartureFlight = trip.tripType === 'round' && (destination?.isAirport ?? false);

  return (
    <section className="pt-1 pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('d_eyebrow')}</div>
      <h1 className="font-display leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('d_title')}
      </h1>

      {/* Passenger info */}
      <div className="bg-white border border-border rounded-[20px] p-[26px] mb-[18px]">
        <div className="font-sans font-bold text-[17px] text-navy mb-[18px]">👤 {t('coPassenger')}</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coName')}</label>
            <input
              placeholder={t('coNamePh')}
              value={customer.firstName}
              onChange={(e) => setCustomerField('firstName', e.target.value)}
              className={inputClass}
            />
            {errors.firstName && <p className={errClass}>{t(errors.firstName)}</p>}
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coLast')}</label>
            <input
              placeholder={t('coLastPh')}
              value={customer.lastName}
              onChange={(e) => setCustomerField('lastName', e.target.value)}
              className={inputClass}
            />
            {errors.lastName && <p className={errClass}>{t(errors.lastName)}</p>}
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coEmail')}</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={customer.email}
              onChange={(e) => setCustomerField('email', e.target.value)}
              className={inputClass}
            />
            {errors.email && <p className={errClass}>{t(errors.email)}</p>}
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coEmailConfirm')}</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={customer.confirmEmail}
              onChange={(e) => setCustomerField('confirmEmail', e.target.value)}
              className={inputClass}
            />
            {errors.confirmEmail && <p className={errClass}>{t(errors.confirmEmail)}</p>}
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coCell')}</label>
            <input
              placeholder="+52 998 123 4567"
              value={customer.phone}
              onChange={(e) => setCustomerField('phone', e.target.value)}
              className={inputClass}
            />
            {errors.phone && <p className={errClass}>{t(errors.phone)}</p>}
          </div>
          <div>
            <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coCountry')}</label>
            <input
              placeholder={t('coCountryPh')}
              value={customer.country}
              onChange={(e) => setCustomerField('country', e.target.value)}
              className={inputClass}
            />
            {errors.country && <p className={errClass}>{t(errors.country)}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coHotel')}</label>
          <input
            placeholder={t('coHotelPh')}
            value={customer.hotel}
            onChange={(e) => setCustomerField('hotel', e.target.value)}
            className={inputClass}
          />
          {errors.hotel && <p className={errClass}>{t(errors.hotel)}</p>}
        </div>
        <div>
          <label className="block text-[13px] font-bold text-text-muted mb-2.5">{t('coContactPref')}</label>
          <div className="flex gap-2.5 max-w-[340px]">
            <button
              onClick={() => setContactPref('whatsapp')}
              className="flex-1 rounded-xl px-3 py-3.5 text-sm font-bold cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${contactPref === 'whatsapp' ? '#0E8C82' : '#dfe4ea'}`,
                background: contactPref === 'whatsapp' ? '#eef7f5' : '#fff',
                color: contactPref === 'whatsapp' ? '#0E8C82' : '#475563',
              }}
            >
              💬 {t('coWhatsapp')}
            </button>
            <button
              onClick={() => setContactPref('email')}
              className="flex-1 rounded-xl px-3 py-3.5 text-sm font-bold cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${contactPref === 'email' ? '#0E8C82' : '#dfe4ea'}`,
                background: contactPref === 'email' ? '#eef7f5' : '#fff',
                color: contactPref === 'email' ? '#0E8C82' : '#475563',
              }}
            >
              ✉ {t('coEmailPref')}
            </button>
          </div>
        </div>
      </div>

      {/* Flight info — only for legs that actually touch the airport */}
      {(showArrivalFlight || showDepartureFlight) && (
        <div className="bg-white border border-border rounded-[20px] p-[26px] mb-[18px]">
          <div className="font-sans font-bold text-[17px] text-navy mb-1.5">✈️ {t('flightTitle')}</div>
          <div className="text-[13.5px] text-text-muted mb-[18px] leading-relaxed">{t('flightSub')}</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
            {showArrivalFlight && (
              <div>
                <div className="font-extrabold text-[13px] text-primary tracking-[.4px] uppercase mb-3">{t('coArrivalFlight')}</div>
                <div className="mb-[11px]">
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coAirline')}</label>
                  <input
                    value={flight.arrivalAirline}
                    onChange={(e) => setFlightField('arrivalAirline', e.target.value)}
                    className={smallInputClass}
                  />
                  {errors.arrivalAirline && <p className={errClass}>{t(errors.arrivalAirline)}</p>}
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coFlightNo')}</label>
                  <input
                    value={flight.arrivalFlightNo}
                    onChange={(e) => setFlightField('arrivalFlightNo', e.target.value)}
                    className={smallInputClass}
                  />
                  {errors.arrivalFlightNo && <p className={errClass}>{t(errors.arrivalFlightNo)}</p>}
                </div>
              </div>
            )}
            {showDepartureFlight && (
              <div>
                <div className="font-extrabold text-[13px] text-primary tracking-[.4px] uppercase mb-3">{t('coDepFlight')}</div>
                <div className="mb-[11px]">
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coAirline')}</label>
                  <input
                    value={flight.departureAirline}
                    onChange={(e) => setFlightField('departureAirline', e.target.value)}
                    className={smallInputClass}
                  />
                  {errors.departureAirline && <p className={errClass}>{t(errors.departureAirline)}</p>}
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-text-muted mb-1.5">{t('coFlightNo')}</label>
                  <input
                    value={flight.departureFlightNo}
                    onChange={(e) => setFlightField('departureFlightNo', e.target.value)}
                    className={smallInputClass}
                  />
                  {errors.departureFlightNo && <p className={errClass}>{t(errors.departureFlightNo)}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white border border-border rounded-[20px] p-[26px]">
        <label className="block text-[13px] font-bold text-text-muted mb-[7px]">{t('coComments')}</label>
        <textarea
          rows={3}
          placeholder={t('coCommentsPh')}
          value={customer.comments}
          onChange={(e) => setCustomerField('comments', e.target.value)}
          className="w-full border-[1.5px] border-border-input rounded-[13px] p-3.5 text-sm text-navy resize-y bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
        />
      </div>
    </section>
  );
}
