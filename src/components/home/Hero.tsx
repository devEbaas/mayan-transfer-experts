import { useTranslation } from 'react-i18next';
import BookingWidget from './BookingWidget';

export default function Hero() {
  const { t } = useTranslation();
  const points = t('hero.points', { returnObjects: true }) as string[];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#123a5c,#123a5c_16px,#0f3350_16px,#0f3350_32px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(11,32,54,0.92)_0%,rgba(11,32,54,0.72)_42%,rgba(11,32,54,0.28)_100%)]" />

      <div className="relative max-w-[1200px] mx-auto px-6 py-[72px] pb-[92px] flex flex-wrap gap-12 items-center">
        {/* Left content */}
        <div className="text-white flex-1 min-w-0" style={{ flexBasis: '380px' }}>
          <div className="inline-flex items-center gap-2 bg-teal-glow/15 border border-teal-glow/40 text-[#bff3ec] px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold tracking-wide mb-5">
            ★ {t('hero.badge')}
          </div>
          <h1 className="font-serif font-normal text-[clamp(38px,6vw,64px)] leading-[1.02] tracking-tight m-0 mb-5">
            {t('hero.title')}
          </h1>
          <p className="text-lg leading-relaxed text-[#d4dde6] max-w-[480px] m-0 mb-7">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-3.5 gap-x-6">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-[14.5px] text-[#eaf0f5] font-medium"
              >
                <span className="w-[22px] h-[22px] rounded-full bg-teal-glow/18 text-teal-glow flex items-center justify-center text-xs font-extrabold flex-none">
                  ✓
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Right booking widget */}
        <BookingWidget />
      </div>
    </section>
  );
}
