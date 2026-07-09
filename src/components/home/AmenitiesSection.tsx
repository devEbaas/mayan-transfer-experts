import { useTranslation } from 'react-i18next';

export default function AmenitiesSection() {
  const { t } = useTranslation();
  const amenities = t('home_amenities', { returnObjects: true }) as { icon: string; title: string; desc: string }[];

  return (
    <section className="bg-bg">
      <div className="max-w-[1080px] mx-auto px-6 py-[74px]">
        <div data-reveal className="text-center max-w-[640px] mx-auto mb-11">
          <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3.5">{t('home_amenKicker')}</div>
          <h2 className="font-display leading-[1.06] m-0 mb-3 text-navy" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.6px' }}>
            {t('home_amenTitle')}
          </h2>
          <p className="text-[16.5px] leading-[1.65] text-text-secondary m-0">{t('home_amenSub')}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px]">
          {amenities.map((a) => (
            <div
              key={a.title}
              data-reveal
              className="bg-white border border-border rounded-[18px] px-[26px] py-[26px] pb-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px]"
              style={{ cursor: 'default' }}
            >
              <div className="w-[52px] h-[52px] rounded-[14px] bg-info-bg flex items-center justify-center text-2xl mb-4">{a.icon}</div>
              <div className="font-sans font-bold text-lg text-navy mb-[7px]" style={{ letterSpacing: '-.2px' }}>{a.title}</div>
              <div className="text-[14.5px] leading-relaxed text-text-secondary">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
