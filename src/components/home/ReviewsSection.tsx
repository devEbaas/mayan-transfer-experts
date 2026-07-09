import { useTranslation } from 'react-i18next';

export default function ReviewsSection() {
  const { t } = useTranslation();
  const testimonials = t('home_testimonials', { returnObjects: true }) as { quote: string; name: string; trip: string }[];

  return (
    <section className="bg-white border-t border-border">
      <div className="max-w-[1080px] mx-auto px-6 py-[74px]">
        <div data-reveal className="text-center max-w-[640px] mx-auto mb-11">
          <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-primary mb-3.5">{t('home_testiKicker')}</div>
          <h2 className="font-display leading-[1.06] m-0 text-navy" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.6px' }}>
            {t('home_testiTitle')}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px]">
          {testimonials.map((r) => (
            <div
              key={r.name}
              data-reveal
              className="bg-bg border border-border rounded-[18px] p-[26px] flex flex-col gap-3.5 transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px]"
            >
              <div className="text-teal text-base" style={{ letterSpacing: '2px' }}>★★★★★</div>
              <p className="text-[15px] leading-[1.65] m-0 flex-1" style={{ color: '#475563' }}>"{r.quote}"</p>
              <div className="flex items-center gap-3 border-t pt-3.5" style={{ borderColor: '#ece6da' }}>
                <div className="w-10 h-10 rounded-full bg-info-bg text-primary flex items-center justify-center text-lg flex-none">👤</div>
                <div>
                  <div className="font-extrabold text-[14.5px] text-navy">{r.name}</div>
                  <div className="text-[13px] text-text-muted font-semibold">{r.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
