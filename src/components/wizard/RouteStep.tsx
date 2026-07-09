import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useRoutes } from '@/hooks/useRoutes';
import type { Place } from '@/types/booking';
import heroImg from '@/assets/hero.png';

const selectStyle: React.CSSProperties = {
  width: '100%',
  appearance: 'none' as const,
  border: '1.5px solid #dfe4ea',
  borderRadius: 15,
  padding: '16px 46px 16px 16px',
  fontSize: 16,
  color: '#14181F',
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" stroke="%235a6b7a" stroke-width="1.7" fill="none"/></svg>')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 17px center',
};

function placeLabel(place: Place, lang: string) {
  return lang === 'es' ? place.labelEs : place.labelEn;
}

type Tab = 'transport' | 'multi' | 'airbnb';
const TABS: Tab[] = ['transport', 'multi', 'airbnb'];

export default function RouteStep() {
  const { t, i18n } = useTranslation();
  const { trip, setTripField, swap, errors } = useBookingStore();
  const { data: places = [], isLoading, isError } = useRoutes();
  const trustPills = t('trustPills', { returnObjects: true }) as string[];
  const showReturn = trip.tripType === 'round';
  const [tab, setTab] = useState<Tab>('transport');

  const origin = places.find((p) => p.id === trip.originId);
  const destinationOptions = origin
    ? places.filter((p) => p.isAirport !== origin.isAirport)
    : places;
  const popularPlaces = places.filter((p) => p.isPopular && p.id !== trip.originId);

  const tripDefs = [
    { v: 'round' as const, label: t('roundTrip'), icon: '⇄' },
    { v: 'oneway' as const, label: t('oneWay'), icon: '→' },
  ];

  const tabLabel = (k: Tab) => (k === 'transport' ? t('tabTransport') : k === 'multi' ? t('tabMulti') : t('tabAirbnb'));

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[640px] flex items-center">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg,rgba(6,7,9,.94) 0%,rgba(6,7,9,.76) 42%,rgba(6,7,9,.3) 100%)' }}
        />

        <div className="relative max-w-[1180px] mx-auto px-6 py-[70px] flex flex-wrap gap-12 items-center w-full">
          {/* Copy */}
          <div className="text-white flex-1 min-w-[320px]" style={{ animation: 'ctfade .7s cubic-bezier(.16,1,.3,1) both' }}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-[7px] text-[12.5px] font-semibold mb-[22px]"
              style={{ background: 'rgba(63,208,192,.15)', border: '1px solid rgba(63,208,192,.4)', color: '#bff3ec' }}
            >
              ★ {t('heroBadge')}
            </div>
            <h1 className="font-display leading-[1.02] m-0 mb-5" style={{ fontSize: 'clamp(36px,5.6vw,60px)', letterSpacing: '-1px' }}>
              {t('r_title')}
            </h1>
            <p className="text-lg leading-relaxed max-w-[480px] m-0 mb-[26px]" style={{ color: '#d4dde6' }}>
              {t('r_sub')}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3.5">
              {trustPills.map((p) => (
                <div key={p} className="flex items-center gap-2 text-[14.5px] font-medium" style={{ color: '#eaf0f5' }}>
                  <span
                    className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[12px] font-extrabold flex-none"
                    style={{ background: 'rgba(63,208,192,.18)', color: '#3FD0C0' }}
                  >
                    ✓
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Booking card */}
          <div
            className="relative bg-white rounded-[18px] overflow-hidden flex-1 min-w-[320px] max-w-[480px]"
            style={{ boxShadow: '0 30px 70px -20px rgba(8,24,42,.5)', animation: 'ctfade .7s cubic-bezier(.16,1,.3,1) .15s both' }}
          >
            <div className="flex border-b border-border">
              {TABS.map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className="flex-1 bg-transparent border-none py-3.5 px-2 text-[13.5px] font-bold cursor-pointer"
                  style={{
                    color: tab === k ? '#0E8C82' : '#9aa7b4',
                    borderBottom: tab === k ? '3px solid #0E8C82' : '3px solid transparent',
                  }}
                >
                  {tabLabel(k)}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab !== 'transport' ? (
                <div className="py-[34px] px-2 text-center">
                  <div className="text-[34px] mb-3">🗺️</div>
                  <div className="font-bold text-[17px] mb-2 text-navy">{t('otherTabTitle')}</div>
                  <p className="text-sm text-text-muted leading-relaxed mx-auto mb-[18px] max-w-[300px]">{t('otherTabBody')}</p>
                  <button
                    onClick={() => setTab('transport')}
                    className="bg-navy-dark text-white border-none rounded-[11px] px-[22px] py-3.5 text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    {t('otherTabBtn')}
                  </button>
                </div>
              ) : (
                <>
                  {isError && (
                    <div className="mb-3.5 text-sm font-semibold text-red-600">{t('err_routesLoadFailed')}</div>
                  )}
                  <div className="relative">
                    <div className="mb-3.5">
                      <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">📍 {t('fFrom')}</label>
                      <select
                        value={trip.originId}
                        disabled={isLoading}
                        onChange={(e) => setTripField('originId', e.target.value)}
                        style={selectStyle}
                      >
                        <option value="">—</option>
                        {places.map((p) => (
                          <option key={p.id} value={p.id}>{placeLabel(p, i18n.language)}</option>
                        ))}
                      </select>
                      {errors.originId && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.originId)}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🏝️ {t('fTo')}</label>
                      <select
                        value={trip.destinationId}
                        disabled={isLoading}
                        onChange={(e) => setTripField('destinationId', e.target.value)}
                        style={selectStyle}
                      >
                        <option value="">—</option>
                        {destinationOptions.map((p) => (
                          <option key={p.id} value={p.id}>{placeLabel(p, i18n.language)}</option>
                        ))}
                      </select>
                      {(errors.destinationId) && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.destinationId)}</p>}
                    </div>
                    <button
                      onClick={swap}
                      title={t('fSwap')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-primary border-[3px] border-white text-white cursor-pointer text-base flex items-center justify-center hover:bg-primary-hover transition-colors"
                      style={{ boxShadow: '0 6px 14px rgba(14,140,130,.4)' }}
                    >
                      ⇅
                    </button>
                  </div>

                  <div className="text-[13px] text-text-muted mt-3.5 mx-0.5">
                    {t('fNotFound')}{' '}
                    <span className="text-primary font-bold cursor-pointer underline">{t('fContactUs')}</span>
                  </div>

                  {popularPlaces.length > 0 && (
                    <>
                      <div className="h-px bg-border my-[22px]" />
                      <div className="text-[12px] font-extrabold tracking-[1.4px] uppercase text-text-light mb-3">{t('popular')}</div>
                      <div className="flex flex-wrap gap-2.5">
                        {popularPlaces.map((p) => {
                          const on = trip.destinationId === p.id;
                          const disabled = origin ? p.isAirport === origin.isAirport : false;
                          return (
                            <button
                              key={p.id}
                              disabled={disabled}
                              onClick={() => setTripField('destinationId', p.id)}
                              className="rounded-full px-[17px] py-2.5 text-sm font-bold cursor-pointer transition-colors hover:border-teal-hover hover:text-teal-hover disabled:opacity-40 disabled:cursor-not-allowed"
                              style={{
                                background: on ? '#eef7f5' : '#f5f7f9',
                                border: `1.5px solid ${on ? '#0E8C82' : '#dfe4ea'}`,
                                color: on ? '#0E8C82' : '#475563',
                              }}
                            >
                              {placeLabel(p, i18n.language)}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <div className="h-px bg-border my-[22px]" />
                  <label className="block text-[12px] font-extrabold tracking-[1.4px] uppercase text-text-light mb-3">{t('fTripType')}</label>
                  <div className="flex gap-2.5 mb-[18px]">
                    {tripDefs.map((o) => {
                      const on = trip.tripType === o.v;
                      return (
                        <button
                          key={o.v}
                          onClick={() => setTripField('tripType', o.v)}
                          className="flex-1 rounded-[14px] px-3.5 py-[15px] text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2.5 transition-colors hover:border-teal-hover"
                          style={{
                            background: on ? '#eef7f5' : '#fff',
                            border: `1.5px solid ${on ? '#0E8C82' : '#dfe4ea'}`,
                            color: on ? '#0E8C82' : '#475563',
                          }}
                        >
                          {o.icon} {o.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-3.5">
                    <div className="flex-1 min-w-[160px]">
                      <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🛬 {t('fArrival')}</label>
                      <input
                        type="date"
                        min={todayIso}
                        value={trip.arrivalDate}
                        onChange={(e) => setTripField('arrivalDate', e.target.value)}
                        className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
                      />
                      {errors.arrivalDate && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.arrivalDate)}</p>}
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🕐 {t('fArrivalTime')}</label>
                      <input
                        type="time"
                        value={trip.arrivalTime}
                        onChange={(e) => setTripField('arrivalTime', e.target.value)}
                        className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
                      />
                      {errors.arrivalTime && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.arrivalTime)}</p>}
                    </div>
                    {showReturn && (
                      <>
                        <div className="flex-1 min-w-[160px]">
                          <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🛫 {t('fDeparture')}</label>
                          <input
                            type="date"
                            min={trip.arrivalDate || todayIso}
                            value={trip.departureDate}
                            onChange={(e) => setTripField('departureDate', e.target.value)}
                            className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {errors.departureDate && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.departureDate)}</p>}
                        </div>
                        <div className="flex-1 min-w-[140px]">
                          <label className="block text-[13px] font-bold text-text-muted tracking-[.3px] mb-2">🕐 {t('fDepartureTime')}</label>
                          <input
                            type="time"
                            value={trip.departureTime}
                            onChange={(e) => setTripField('departureTime', e.target.value)}
                            className="w-full border-[1.5px] border-border-input rounded-[15px] px-3.5 py-[15px] text-[15px] text-navy bg-bg-card focus:outline-none focus:border-primary focus:bg-white"
                          />
                          {errors.departureTime && <p className="text-red-600 text-[12.5px] font-semibold mt-1.5">{t(errors.departureTime)}</p>}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
