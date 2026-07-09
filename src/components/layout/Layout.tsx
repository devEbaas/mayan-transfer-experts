import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ActionBar from './ActionBar';
import Stepper from './Stepper';
import { useBookingStore, type Screen } from '@/store/bookingStore';
import { useReveal } from '@/hooks/useReveal';

const STEPPER_SCREENS: Screen[] = ['pax', 'vehicle', 'extras', 'details', 'pay'];

export default function Layout({ children }: { children: ReactNode }) {
  const screen = useBookingStore((s) => s.screen);

  useReveal();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-navy" style={{ fontFamily: "'Hanken Grotesk',system-ui,-apple-system,sans-serif" }}>
      <Header />
      {STEPPER_SCREENS.includes(screen) && <Stepper />}
      <main className="flex-1 w-full">{children}</main>
      {screen !== 'done' && <ActionBar />}
      {screen === 'route' && <Footer />}
    </div>
  );
}
