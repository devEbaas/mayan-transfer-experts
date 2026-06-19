import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();
  const areas = t('services.areas', { returnObjects: true }) as string[];
  const props = t('services.props', { returnObjects: true }) as {
    icon: string;
    title: string;
    body: string;
  }[];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[74px] flex flex-wrap gap-14 items-start">
      {/* Left text */}
      <div className="flex-1 min-w-0" style={{ flexBasis: '420px' }}>
        <div className="text-xs font-bold tracking-[2px] uppercase text-teal mb-3.5">
          {t('services.kicker')}
        </div>
        <h2 className="font-serif font-normal text-[clamp(28px,4vw,42px)] leading-[1.08] tracking-tight m-0 mb-5 text-navy">
          {t('services.title')}
        </h2>
        <p className="text-[16.5px] leading-[1.75] text-text-body m-0 mb-4">
          {t('services.body')}
        </p>
        <div className="text-[13px] font-bold tracking-[1px] uppercase text-navy mt-7 mb-3.5">
          {t('services.areasTitle')}
        </div>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <span
              key={area}
              className="bg-white border border-border rounded-full px-4 py-2 text-[13.5px] font-semibold text-text-heading"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Right value props */}
      <div className="grid gap-4 flex-1 min-w-0" style={{ flexBasis: '320px' }}>
        {props.map((v) => (
          <div
            key={v.title}
            className="bg-white border border-border rounded-2xl p-5 px-6 flex gap-4 items-start"
          >
            <div className="w-[46px] h-[46px] rounded-xl bg-teal-light text-teal flex items-center justify-center text-xl flex-none">
              {v.icon}
            </div>
            <div>
              <div className="font-bold text-base text-navy mb-1">{v.title}</div>
              <div className="text-sm text-text-muted leading-relaxed">{v.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
