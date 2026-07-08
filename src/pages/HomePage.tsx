import { useBookingStore } from '@/store/bookingStore';
import RouteStep from '@/components/wizard/RouteStep';
import PaxStep from '@/components/wizard/PaxStep';
import VehicleStep from '@/components/wizard/VehicleStep';
import ExtrasStep from '@/components/wizard/ExtrasStep';
import DetailsStep from '@/components/wizard/DetailsStep';
import PayStep from '@/components/wizard/PayStep';
import DoneStep from '@/components/wizard/DoneStep';
import PaymentResultStep from '@/components/wizard/PaymentResultStep';
import AboutSection from '@/components/home/AboutSection';
import AmenitiesSection from '@/components/home/AmenitiesSection';
import PaymentSection from '@/components/home/PaymentSection';
import ReviewsSection from '@/components/home/ReviewsSection';

export default function HomePage() {
  const screen = useBookingStore((s) => s.screen);

  return (
    <>
      {screen === 'route' && (
        <>
          <RouteStep />
          <AboutSection />
          <AmenitiesSection />
          <PaymentSection />
          <ReviewsSection />
        </>
      )}
      {screen === 'pax' && <PaxStep />}
      {screen === 'vehicle' && <VehicleStep />}
      {screen === 'extras' && <ExtrasStep />}
      {screen === 'details' && <DetailsStep />}
      {screen === 'pay' && <PayStep />}
      {screen === 'done' && <DoneStep />}
      {screen === 'payment-result' && <PaymentResultStep />}
    </>
  );
}
