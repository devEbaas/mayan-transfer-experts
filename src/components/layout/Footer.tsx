import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const footLinks = t('footLinks', { returnObjects: true }) as string[];

  return (
    <footer className="bg-navy-dark text-footer-text mt-6">
      <div className="max-w-[1100px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.1fr] gap-11">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-[38px] h-[38px] rounded-full bg-primary flex items-center justify-center flex-none">
              <div className="w-[15px] h-[15px] rounded-full bg-teal" />
            </div>
            <div className="leading-[1.1]">
              <div className="font-sans font-extrabold text-white text-[15px]">Cancún Transfer Hotels</div>
            </div>
          </div>
          <p className="text-[13.5px] leading-[1.7] text-footer-link max-w-[300px] m-0 mb-[18px]">{t('footBlurb')}</p>
          <div className="flex gap-2.5">
            {['Fb', 'Ig', 'Yt'].map((s) => (
              <span
                key={s}
                className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[13px] text-footer-text cursor-pointer hover:bg-primary hover:text-white transition-colors"
                style={{ background: '#1B1F26' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-extrabold tracking-[1.5px] uppercase text-white mb-4">{t('footTransfers')}</div>
          <div className="flex flex-col gap-2.5 text-[13.5px]">
            {footLinks.map((l) => (
              <span key={l} className="cursor-pointer text-footer-text hover:text-teal transition-colors">{l}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-extrabold tracking-[1.5px] uppercase text-white mb-4">{t('footContact')}</div>
          <div className="text-[13.5px] leading-[1.9] text-footer-text">
            <div>📞 +1 346 420 5083</div>
            <div>Toll Free 1 (800) 905-5513</div>
            <div>✉ reservaweb@cancuntransferhotels.com</div>
          </div>
          <div className="flex gap-2.5 mt-[18px] flex-wrap">
            <span className="rounded-lg px-3 py-2 text-[11.5px] font-bold text-[#cdd7e2]" style={{ background: '#1B1F26' }}>{t('footBadgeSsl')}</span>
            <span className="rounded-lg px-3 py-2 text-[11.5px] font-bold text-[#cdd7e2]" style={{ background: '#1B1F26' }}>{t('footBadgePaypal')}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-footer-border">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex flex-wrap gap-3 justify-between text-[12.5px] text-footer-muted">
          <span>© 2026 Cancún Transfer Hotels. {t('footRights')}</span>
          <span>{t('footTerms')}</span>
        </div>
      </div>
    </footer>
  );
}
