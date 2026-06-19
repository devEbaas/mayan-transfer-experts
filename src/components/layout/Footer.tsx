import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const links = t('footer.links', { returnObjects: true }) as string[];

  return (
    <footer className="bg-navy-dark text-[#aebccb]">
      <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-7 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.1fr] gap-11">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-navy-mid flex items-center justify-center">
              <span className="text-teal-glow font-extrabold text-[15px]">CT</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-white text-[15px]">Cancún Transfer</div>
              <div className="text-[10px] tracking-[2.5px] text-teal-glow font-semibold">
                HOTELS
              </div>
            </div>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#90a1b3] max-w-[300px] mb-4">
            {t('footer.blurb')}
          </p>
          <div className="flex gap-2.5">
            {['Fb', 'Ig', 'Yt'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-[34px] h-[34px] rounded-[9px] bg-navy-mid flex items-center justify-center text-[13px] text-[#aebccb] hover:bg-teal hover:text-white transition-colors no-underline"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Transfer links */}
        <div>
          <div className="text-xs font-extrabold tracking-[1.5px] uppercase text-white mb-4">
            {t('footer.transfers')}
          </div>
          <div className="flex flex-col gap-2.5 text-[13.5px]">
            {links.map((link) => (
              <span
                key={link}
                className="cursor-pointer text-[#90a1b3] hover:text-teal-glow transition-colors"
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs font-extrabold tracking-[1.5px] uppercase text-white mb-4">
            {t('footer.contact')}
          </div>
          <div className="text-[13.5px] leading-loose text-[#90a1b3]">
            <div>📞 +1 346 420 5083</div>
            <div>Toll Free 1 (800) 905-5513</div>
            <div>✉ reservaweb@cancuntransferhotels.com</div>
          </div>
          <div className="flex gap-2.5 mt-4 flex-wrap">
            <span className="bg-navy-mid rounded-lg px-3 py-2 text-[11.5px] font-bold text-[#cdd7e2]">
              🔒 SSL Secure
            </span>
            <span className="bg-navy-mid rounded-lg px-3 py-2 text-[11.5px] font-bold text-[#cdd7e2]">
              Secured by PayPal
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#16344e]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap text-[12.5px] text-[#6f8398]">
          <span>© 2026 Cancún Transfer Hotels. {t('footer.rights')}</span>
          <Link to="#" className="text-[#6f8398] no-underline hover:text-[#90a1b3]">
            {t('footer.terms')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
