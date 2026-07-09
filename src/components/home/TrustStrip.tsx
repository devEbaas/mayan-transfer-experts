import { useTranslation } from 'react-i18next';

const PRESS_LOGOS = ['ATTA', 'AMAV', 'SECTUR', 'TripAdvisor', 'ASTA'];

export default function TrustStrip() {
  const { t } = useTranslation();

  return (
    <section className="bg-navy-dark" style={{ borderBottom: '1px solid #1B1F26' }}>
      <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-[34px]">
        <span className="text-[11px] font-extrabold tracking-[1.6px] uppercase text-text-muted whitespace-nowrap">
          {t('pressKicker')}
        </span>
        {PRESS_LOGOS.map((p) => (
          <div
            key={p}
            className="font-mono text-[11px] tracking-[.4px] rounded-lg px-[18px] py-2 whitespace-nowrap"
            style={{ color: '#697585', border: '1px dashed #262b33' }}
          >
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}
