import type { ReactNode } from 'react';

type Variant = 'teal' | 'navy' | 'outline';

const styles: Record<Variant, string> = {
  teal: 'bg-teal-light text-teal',
  navy: 'bg-navy text-white',
  outline: 'bg-white border border-border text-text-heading',
};

export default function Badge({
  variant = 'teal',
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-bold ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
