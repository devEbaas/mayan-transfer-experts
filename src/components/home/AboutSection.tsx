import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();
  const stats = t('home_aboutStats', { returnObjects: true }) as { n: string; l: string }[];

  return (
    <section className="bg-white border-t border-border">
      <div className="max-w-[1080px] mx-auto px-6 py-[74px] flex flex-wrap gap-[54px] items-center">
        <div data-reveal className="flex-[1_1_380px] min-w-0">
          <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3.5">{t('home_aboutKicker')}</div>
          <h2 className="font-display font-extrabold leading-[1.06] m-0 mb-[18px] text-navy" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.6px' }}>
            {t('home_aboutTitle')}
          </h2>
          <p className="text-[16.5px] leading-[1.72] text-text-secondary m-0 mb-7 max-w-[520px]">{t('home_aboutBody')}</p>
          <div className="grid grid-cols-2 gap-[24px_30px] max-w-[460px]">
            {stats.map((s) => (
              <div key={s.n} data-reveal>
                <div className="font-display font-extrabold text-[34px] text-primary leading-none" style={{ letterSpacing: '-1px' }}>{s.n}</div>
                <div className="text-sm text-text-secondary font-semibold mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal className="flex-[1_1_320px] min-w-0">
          <div className="rounded-[22px] min-h-[340px] flex items-center justify-center font-mono text-xs text-text-light text-center p-5 border border-border" style={{ background: 'repeating-linear-gradient(135deg,#EAF1F9,#EAF1F9 12px,#DBE5F1 12px,#DBE5F1 24px)' }}>
            PHOTO · Driver greeting guests at CUN airport
          </div>
        </div>
      </div>
    </section>
  );
}
