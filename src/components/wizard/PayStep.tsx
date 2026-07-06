import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useRoutes } from '@/hooks/useRoutes';
import { useVehicleRates, bestPrice } from '@/hooks/useVehicles';
import { useExtras } from '@/hooks/useExtras';
import { api, extractApiErrorMessage } from '@/lib/api';
import type { BookingResponse, CheckoutSessionResponse, CreateBookingPayload } from '@/types/booking';

type ReturnState = 'idle' | 'confirming' | 'failed' | 'cancelled';

function initialReturnState(): ReturnState {
  const params = new URLSearchParams(window.location.search);
  const bookingParam = params.get('booking');
  if (bookingParam === 'success' && params.get('session_id')) return 'confirming';
  if (bookingParam === 'cancel') return 'cancelled';
  return 'idle';
}

export default function PayStep() {
  const { t, i18n } = useTranslation();
  const {
    trip, vehicleId, extras, customer, flight, contactPref,
    termsAccepted, setTermsAccepted, bookingId, setBookingId, setScreen, setErrors, errors,
  } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const { data: places = [] } = useRoutes();
  const { data: vehicleRates = [] } = useVehicleRates(trip.originId || null, trip.destinationId || null);
  const { data: extrasCatalog = [] } = useExtras();

  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [returnState, setReturnState] = useState<ReturnState>(initialReturnState);

  // Captured once on first render, before the URL query string gets stripped below —
  // re-reading window.location.search later (e.g. once bookingId rehydrates) would find nothing.
  const returnParamsRef = useRef<{ bookingParam: string | null; sessionId: string | null } | null>(null);
  if (returnParamsRef.current === null) {
    const params = new URLSearchParams(window.location.search);
    returnParamsRef.current = {
      bookingParam: params.get('booking'),
      sessionId: params.get('session_id'),
    };
  }

  const origin = places.find((p) => p.id === trip.originId);
  const destination = places.find((p) => p.id === trip.destinationId);
  const vehicle = vehicleRates.find((v) => v.vehicleId === vehicleId);
  const showReturn = trip.tripType === 'round';

  const placeLabel = (id: string) => {
    const place = places.find((p) => p.id === id);
    if (!place) return '—';
    return i18n.language === 'es' ? place.labelEs : place.labelEn;
  };

  const fmtDate = (iso: string) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-').map(Number);
    const months = i18n.language === 'es'
      ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[m - 1]} ${d}, ${y}`;
  };

  const paxLabel = `${t('fAdults')} ${trip.adults} · ${t('fChildren')} ${trip.children}`;

  const extrasLines = Object.entries(extras)
    .map(([id, qty]) => {
      const item = extrasCatalog.find((e) => e.id === id);
      return item && qty > 0 ? { item, qty } : null;
    })
    .filter((line): line is { item: (typeof extrasCatalog)[number]; qty: number } => line !== null);
  const extrasSubtotal = extrasLines.reduce((sum, { item, qty }) => sum + item.price * qty, 0);
  const grandTotal = vehicle ? bestPrice(vehicle) + extrasSubtotal : null;

  // Strip Stripe's return query string once, right after reading it above.
  useEffect(() => {
    const { bookingParam } = returnParamsRef.current!;
    if (bookingParam === 'success' || bookingParam === 'cancel') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Poll for the payment outcome once we're back from Stripe Checkout. This re-runs when
  // `bookingId` changes because zustand's persist middleware rehydrates from localStorage
  // asynchronously — on the very first render `bookingId` can still be null even though the
  // booking was already created before the redirect.
  useEffect(() => {
    const { bookingParam, sessionId } = returnParamsRef.current!;
    if (bookingParam !== 'success' || !sessionId || !bookingId) {
      return;
    }
    let cancelled = false;

    const poll = async () => {
      for (let attempt = 0; attempt < 15; attempt++) {
        try {
          const { data } = await api.get<BookingResponse>(`/bookings/${bookingId}`);
          if (data.paymentStatus === 'succeeded') {
            if (!cancelled) setScreen('done');
            return;
          }
          if (data.paymentStatus === 'failed') {
            if (!cancelled) setReturnState('failed');
            return;
          }
        } catch {
          // transient network/API error — keep polling until attempts run out
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (!cancelled) setReturnState('failed');
    };

    void poll();
    return () => {
      cancelled = true;
    };
  }, [bookingId, setScreen]);

  const buildPayload = (): CreateBookingPayload | null => {
    if (!origin || !destination || !vehicleId) return null;
    const showArrivalFlight = origin.isAirport;
    const showDepartureFlight = showReturn && destination.isAirport;
    const notes = [customer.comments, `${t('coCountry')}: ${customer.country}`, `${t('coHotel')}: ${customer.hotel}`]
      .filter(Boolean)
      .join(' — ');

    return {
      tripType: trip.tripType,
      originId: trip.originId,
      destinationId: trip.destinationId,
      vehicleId,
      arrivalDate: trip.arrivalDate,
      departureDate: showReturn ? trip.departureDate : undefined,
      adults: trip.adults,
      children: trip.children,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      contactPref,
      arrivalAirline: showArrivalFlight ? flight.arrivalAirline : undefined,
      arrivalFlightNo: showArrivalFlight ? flight.arrivalFlightNo : undefined,
      arrivalTime: trip.arrivalTime || undefined,
      departureAirline: showDepartureFlight ? flight.departureAirline : undefined,
      departureFlightNo: showDepartureFlight ? flight.departureFlightNo : undefined,
      departureTime: showReturn ? (trip.departureTime || undefined) : undefined,
      comments: notes || undefined,
      payMethod: 'card',
      extras: Object.entries(extras)
        .filter(([, qty]) => qty > 0)
        .map(([extraId, qty]) => ({ extraId, qty })),
    };
  };

  const handleStartPayment = async () => {
    if (!termsAccepted) {
      setErrors({ terms: 'err_terms' });
      return;
    }
    setErrors({});
    setPayError(null);
    setReturnState('idle');
    setSubmitting(true);
    try {
      let id = bookingId;
      if (!id) {
        const payload = buildPayload();
        if (!payload) throw new Error('Incomplete booking data');
        const { data } = await api.post<BookingResponse>('/bookings', payload);
        id = data.id;
        setBookingId(data.id, data.folio);
      }
      const { data: session } = await api.post<CheckoutSessionResponse>('/payments/stripe/checkout-session', {
        bookingId: id,
      });
      window.location.href = session.url;
    } catch (error) {
      setPayError(extractApiErrorMessage(error, t('payError')));
    } finally {
      setSubmitting(false);
    }
  };

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
            <div className="text-[15px] font-bold leading-snug">{placeLabel(trip.originId)}</div>
            <div className="text-gold text-[13px] my-0.5">↓</div>
            <div className="text-[15px] font-bold leading-snug">{placeLabel(trip.destinationId)}</div>
          </div>
          <span className="flex-none text-[12px] font-extrabold px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(255,197,61,.18)', color: '#FFD675' }}>
            {showReturn ? t('roundTrip') : t('oneWay')}
          </span>
        </div>
        <div className="h-px my-4" style={{ background: 'rgba(255,255,255,.14)' }} />
        <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumArrival')}</span><span className="font-bold">{fmtDate(trip.arrivalDate)}</span></div>
        {showReturn && <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumReturn')}</span><span className="font-bold">{fmtDate(trip.departureDate)}</span></div>}
        <div className="flex justify-between text-sm mb-2.5"><span className="text-footer-text">{t('sumPassengers')}</span><span className="font-bold">{paxLabel}</span></div>
        <div className="flex justify-between text-sm"><span className="text-footer-text">{t('sumVehicle')}</span><span className="font-bold">{vehicle?.name ?? '—'}</span></div>
        {extrasLines.length > 0 && (
          <>
            <div className="h-px my-4" style={{ background: 'rgba(255,255,255,.14)' }} />
            <div className="text-[11.5px] text-footer-text uppercase tracking-[.5px] font-bold mb-2">{t('sumExtras')}</div>
            {extrasLines.map(({ item, qty }) => (
              <div key={item.id} className="flex justify-between text-sm mb-1.5">
                <span className="text-footer-text">{qty}× {i18n.language === 'es' ? item.labelEs : item.labelEn}</span>
                <span className="font-bold">{formatPrice(item.price * qty, item.currency)}</span>
              </div>
            ))}
          </>
        )}
        <div className="h-px my-4" style={{ background: 'rgba(255,255,255,.14)' }} />
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-bold">{t('total')}</span>
          <span className="font-display text-[30px] font-extrabold text-gold" style={{ letterSpacing: '-.5px' }}>
            {grandTotal !== null && vehicle ? formatPrice(grandTotal, vehicle.currency) : '—'}
          </span>
        </div>
      </div>

      {/* Payment card */}
      <div className="bg-white border border-border rounded-[20px] p-[26px]">
        <div className="flex items-start gap-[11px] bg-info-bg border border-info-border rounded-[13px] px-4 py-3.5 text-[13.5px] text-info-text leading-relaxed mb-5 font-semibold">
          <span>ℹ️</span>{t('coPayNote')}
        </div>

        {returnState === 'confirming' && (
          <p className="text-sm font-semibold text-text-body">{t('payConfirming')}</p>
        )}

        {returnState !== 'confirming' && (
          <>
            {returnState === 'failed' && (
              <p className="text-red-600 text-sm font-semibold mb-3">{t('payError')}</p>
            )}
            {returnState === 'cancelled' && (
              <p className="text-red-600 text-sm font-semibold mb-3">{t('payCancelled')}</p>
            )}
            <label className="flex items-center gap-2.5 text-sm text-text-body cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-[18px] h-[18px]"
                style={{ accentColor: '#1F5FC0' }}
              />
              {t('coAccept')} <span className="text-primary font-bold underline">{t('coTerms')}</span>
            </label>
            {errors.terms && <p className="text-red-600 text-sm font-semibold mt-2">{t(errors.terms)}</p>}
            {payError && <p className="text-red-600 text-sm font-semibold mt-2">{payError}</p>}
            <button
              onClick={handleStartPayment}
              disabled={submitting}
              className="w-full mt-5 bg-primary text-white border-none rounded-[14px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 14px 30px -10px rgba(31,95,192,.5)' }}
            >
              {submitting ? t('payProcessing') : `${t('payNow')} →`}
            </button>
          </>
        )}

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
