import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  const highlights = [
    { icon: '🛡️', label: t('about.certified') },
    { icon: '🚐', label: t('about.fleet') },
    { icon: '✈️', label: t('about.monitoring') },
    { icon: '💳', label: t('about.insurance') },
  ];

  return (
    <div className="max-w-[800px] mx-auto px-6 py-20">
      <div className="text-xs font-bold tracking-[2px] uppercase text-teal mb-3">
        {t('about.title')}
      </div>
      <h1 className="font-serif font-normal text-[clamp(28px,4vw,42px)] leading-[1.08] tracking-tight m-0 mb-6 text-navy">
        {t('about.subtitle')}
      </h1>
      <p className="text-[16.5px] leading-[1.75] text-text-body mb-10">
        {t('about.history')}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {highlights.map((h) => (
          <div
            key={h.label}
            className="bg-white border border-border rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-3">{h.icon}</div>
            <div className="font-bold text-sm text-navy">{h.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
