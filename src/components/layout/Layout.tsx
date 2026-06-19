import type { ReactNode } from 'react';
import UtilityBar from './UtilityBar';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <UtilityBar />
        <Header />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
