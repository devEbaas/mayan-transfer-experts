import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-dark text-footer-text mt-6">
      <div className="max-w-[1100px] mx-auto px-6 py-10 flex flex-wrap gap-7 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-full bg-primary flex items-center justify-center flex-none">
            <div className="w-[15px] h-[15px] rounded-full bg-gold" />
          </div>
          <div className="leading-[1.25]">
            <div className="font-display font-extrabold text-white text-[15px]">Cancún Transfer Hotels</div>
            <div className="text-[12.5px] text-footer-link mt-1">{t('footBlurb')}</div>
          </div>
        </div>
        <div className="text-[13.5px] leading-[1.8] text-footer-text">
          <div>📞 +1 346 420 5083 · Toll Free 1 (800) 905-5513</div>
          <div>✉ reservaweb@cancuntransferhotels.com</div>
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
