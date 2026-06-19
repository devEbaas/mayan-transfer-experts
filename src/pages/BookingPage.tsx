import { useBookingStore } from '@/store/bookingStore';
import StepIndicator from '@/components/booking/StepIndicator';
import TripSummary from '@/components/booking/TripSummary';
import VehicleResults from '@/components/booking/VehicleResults';
import ExtrasStep from '@/components/booking/ExtrasStep';
import CheckoutStep from '@/components/booking/CheckoutStep';

export default function BookingPage() {
  const currentStep = useBookingStore((s) => s.currentStep);

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-[70px]">
      <StepIndicator currentStep={currentStep} />

      <div className="flex flex-wrap gap-6 items-start">
        <TripSummary />

        <section className="min-w-0" style={{ flex: '999 1 460px' }}>
          {currentStep === 1 && <VehicleResults />}
          {currentStep === 2 && <ExtrasStep />}
          {currentStep === 3 && <CheckoutStep />}
        </section>
      </div>
    </div>
  );
}
