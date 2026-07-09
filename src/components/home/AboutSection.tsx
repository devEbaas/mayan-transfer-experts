import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();
  const areas = t('areas', { returnObjects: true }) as string[];
  const valueProps = t('valueProps', { returnObjects: true }) as { icon: string; title: string; body: string }[];

  return (
    <section className="bg-white border-t border-border">
      <div className="max-w-[1080px] mx-auto px-6 py-[74px] flex flex-wrap gap-[54px] items-start">
        <div data-reveal className="flex-[1_1_420px] min-w-0">
          <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3.5">{t('home_aboutKicker')}</div>
          <h2 className="font-display leading-[1.06] m-0 mb-5 text-navy" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.6px' }}>
            {t('home_aboutTitle')}
          </h2>
          <p className="text-[16.5px] leading-[1.72] text-text-secondary m-0 mb-7 max-w-[520px]">{t('home_aboutBody')}</p>
          <div className="text-[13px] font-extrabold tracking-[1px] uppercase text-navy mb-3.5">{t('svcAreas')}</div>
          <div className="flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <span key={a} className="bg-white border border-border rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-navy">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div data-reveal className="grid gap-4 flex-[1_1_360px] min-w-0">
          {valueProps.map((v) => (
            <div key={v.title} className="bg-white border border-border rounded-2xl px-6 py-[22px] flex gap-4 items-start">
              <div className="w-[46px] h-[46px] rounded-xl bg-info-bg text-primary flex items-center justify-center text-xl flex-none">{v.icon}</div>
              <div>
                <div className="font-bold text-base text-navy mb-1">{v.title}</div>
                <div className="text-sm text-text-muted leading-[1.55]">{v.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
