import type { ReactNode } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import RouteStep from '@/components/wizard/RouteStep';
import PaxStep from '@/components/wizard/PaxStep';
import VehicleStep from '@/components/wizard/VehicleStep';
import ExtrasStep from '@/components/wizard/ExtrasStep';
import DetailsStep from '@/components/wizard/DetailsStep';
import PayStep from '@/components/wizard/PayStep';
import DoneStep from '@/components/wizard/DoneStep';
import PaymentResultStep from '@/components/wizard/PaymentResultStep';
import TripSummaryAside from '@/components/wizard/TripSummaryAside';
import TrustStrip from '@/components/home/TrustStrip';
import AboutSection from '@/components/home/AboutSection';
import AmenitiesSection from '@/components/home/AmenitiesSection';
import PaymentSection from '@/components/home/PaymentSection';
import ReviewsSection from '@/components/home/ReviewsSection';

function WithTripSummary({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-6 pb-6 flex flex-wrap gap-6 items-start">
      <TripSummaryAside />
      <section className="flex-[999_1_460px] min-w-0">{children}</section>
    </div>
  );
}

export default function HomePage() {
  const screen = useBookingStore((s) => s.screen);

  return (
    <>
      {screen === 'route' && (
        <>
          <RouteStep />
          <TrustStrip />
          <AboutSection />
          <AmenitiesSection />
          <PaymentSection />
          <ReviewsSection />
        </>
      )}
      {screen === 'pax' && <PaxStep />}
      {screen === 'vehicle' && <WithTripSummary><VehicleStep /></WithTripSummary>}
      {screen === 'extras' && <WithTripSummary><ExtrasStep /></WithTripSummary>}
      {screen === 'details' && <WithTripSummary><DetailsStep /></WithTripSummary>}
      {screen === 'pay' && <WithTripSummary><PayStep /></WithTripSummary>}
      {screen === 'done' && <DoneStep />}
      {screen === 'payment-result' && <PaymentResultStep />}
    </>
  );
}
