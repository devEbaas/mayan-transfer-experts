import { useTranslation } from 'react-i18next';

export default function PaymentSection() {
  const { t } = useTranslation();
  const methods = t('home_payMethods', { returnObjects: true }) as { label: string; color: string }[];
  const trust = t('home_payTrust', { returnObjects: true }) as { icon: string; title: string; desc: string }[];

  return (
    <section className="bg-navy-dark text-white">
      <div className="max-w-[1080px] mx-auto px-6 py-[74px]">
        <div data-reveal className="text-center max-w-[640px] mx-auto mb-[38px]">
          <div className="text-[13px] font-extrabold tracking-[3px] uppercase text-teal mb-3.5">{t('home_payKicker')}</div>
          <h2 className="font-display leading-[1.06] m-0 mb-3 text-white" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-.6px' }}>
            {t('home_payTitle')}
          </h2>
          <p className="text-[16.5px] leading-[1.65] text-footer-text m-0">{t('home_payBody')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3.5 mb-[42px]">
          {methods.map((m) => (
            <div
              key={m.label}
              data-reveal
              className="bg-white rounded-[14px] px-[30px] py-[18px] min-w-[120px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: '0 10px 26px -16px rgba(0,0,0,.5)' }}
            >
              <span className="font-sans font-extrabold text-[19px]" style={{ letterSpacing: '-.3px', color: m.color }}>{m.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 max-w-[920px] mx-auto">
          {trust.map((p) => (
            <div key={p.title} data-reveal className="flex gap-3.5 items-start rounded-2xl px-[22px] py-5" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>
              <span className="text-[22px] flex-none leading-[1.1]">{p.icon}</span>
              <div>
                <div className="font-extrabold text-[15.5px] text-white mb-1.5">{p.title}</div>
                <div className="text-[13.5px] leading-relaxed text-footer-text">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
