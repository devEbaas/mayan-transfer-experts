import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBookingStore, BOOKING_TTL_MS } from '@/store/bookingStore';

export default function ResumeBookingPrompt() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => {
    const { savedAt, screen } = useBookingStore.getState();
    const expired = Date.now() - savedAt > BOOKING_TTL_MS;
    // Returning from a Stripe Checkout redirect is a deliberate continuation, not a stale
    // session — don't cover PayStep's confirmation UI or the payment-result screen with this.
    const returningFromStripe = new URLSearchParams(window.location.search).has('booking');
    return !expired && screen !== 'route' && !returningFromStripe;
  });

  useEffect(() => {
    const { savedAt, reset } = useBookingStore.getState();
    const expired = Date.now() - savedAt > BOOKING_TTL_MS;
    if (expired) reset();
  }, []);

  if (!visible) return null;

  const handleRestart = () => {
    useBookingStore.getState().reset();
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 px-4 pb-4 sm:pb-0">
      <div className="bg-white rounded-[20px] p-6 max-w-[420px] w-full shadow-xl">
        <h2 className="font-display font-extrabold text-xl text-navy mb-2">{t('resumeTitle')}</h2>
        <p className="text-sm text-text-secondary mb-5">{t('resumeBody')}</p>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 rounded-[13px] border-[1.5px] border-border-input py-3 text-sm font-bold text-navy cursor-pointer hover:border-teal-hover hover:text-teal-hover transition-colors"
          >
            {t('resumeRestart')}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="flex-1 rounded-[13px] bg-primary text-white py-3 text-sm font-bold cursor-pointer hover:bg-teal-hover transition-colors"
          >
            {t('resumeContinue')}
          </button>
        </div>
      </div>
    </div>
  );
}
