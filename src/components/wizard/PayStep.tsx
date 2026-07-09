import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useRoutes } from '@/hooks/useRoutes';
import { api, extractApiErrorMessage } from '@/lib/api';
import type { BookingResponse, CheckoutSessionResponse, CreateBookingPayload } from '@/types/booking';

type ReturnState = 'idle' | 'confirming';

function initialReturnState(): ReturnState {
  const params = new URLSearchParams(window.location.search);
  if (params.get('booking') === 'success' && params.get('session_id')) return 'confirming';
  return 'idle';
}

export default function PayStep() {
  const { t } = useTranslation();
  const {
    trip, vehicleId, extras, customer, flight, contactPref,
    termsAccepted, setTermsAccepted, bookingId, setBookingId, setScreen, setPaymentOutcome, setErrors, errors,
  } = useBookingStore();
  const { data: places = [] } = useRoutes();

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
  const showReturn = trip.tripType === 'round';

  // Strip Stripe's return query string once, right after reading it above.
  useEffect(() => {
    const { bookingParam } = returnParamsRef.current!;
    if (bookingParam === 'success' || bookingParam === 'cancel') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // User backed out of Stripe Checkout — send them to the dedicated result screen.
  useEffect(() => {
    if (returnParamsRef.current!.bookingParam === 'cancel') {
      setPaymentOutcome('cancelled');
      setScreen('payment-result');
    }
  }, [setScreen, setPaymentOutcome]);

  // Poll for the payment outcome once we're back from Stripe Checkout. This re-runs when
  // `bookingId` changes because zustand's persist middleware rehydrates from localStorage
  // asynchronously — on the very first render `bookingId` can still be null even though the
  // booking was already created before the redirect. If it's still null after a short grace
  // period (e.g. the user opened the success link on another device, or cleared storage),
  // we can't poll — show the "unknown" result instead of hanging on "confirming" forever.
  useEffect(() => {
    const { bookingParam, sessionId } = returnParamsRef.current!;
    if (bookingParam !== 'success' || !sessionId) return;

    if (!bookingId) {
      const grace = setTimeout(() => {
        if (!useBookingStore.getState().bookingId) {
          setPaymentOutcome('unknown');
          setScreen('payment-result');
        }
      }, 2000);
      return () => clearTimeout(grace);
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
            if (!cancelled) {
              setPaymentOutcome('failed');
              setScreen('payment-result');
            }
            return;
          }
        } catch {
          // transient network/API error — keep polling until attempts run out
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (!cancelled) {
        setPaymentOutcome('failed');
        setScreen('payment-result');
      }
    };

    void poll();
    return () => {
      cancelled = true;
    };
  }, [bookingId, setScreen, setPaymentOutcome]);

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
    <section className="pt-1 pb-6" style={{ animation: 'ctview .45s cubic-bezier(.16,1,.3,1) both' }}>
      <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3">{t('pay_eyebrow')}</div>
      <h1 className="font-display leading-[1.04] m-0 mb-[26px]" style={{ fontSize: 'clamp(28px,4.2vw,42px)', letterSpacing: '-.6px' }}>
        {t('pay_title')}
      </h1>

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
            <label className="flex items-center gap-2.5 text-sm text-text-body cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-[18px] h-[18px]"
                style={{ accentColor: '#0E8C82' }}
              />
              {t('coAccept')} <span className="text-primary font-bold underline">{t('coTerms')}</span>
            </label>
            {errors.terms && <p className="text-red-600 text-sm font-semibold mt-2">{t(errors.terms)}</p>}
            {payError && <p className="text-red-600 text-sm font-semibold mt-2">{payError}</p>}
            <button
              onClick={handleStartPayment}
              disabled={submitting}
              className="w-full mt-5 bg-primary text-white border-none rounded-[14px] px-8 py-4 text-base font-bold cursor-pointer hover:bg-teal-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 14px 30px -10px rgba(14,140,130,.5)' }}
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
