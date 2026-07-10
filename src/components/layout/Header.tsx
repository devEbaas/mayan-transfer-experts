import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/appStore';
import { useBookingStore } from '@/store/bookingStore';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { lang, toggleLang } = useAppStore();
  const { screen, goHome } = useBookingStore();

  const handleToggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    toggleLang();
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-dark text-[#cdd7e2] text-[12.5px] tracking-[.2px] hidden sm:block">
        <div className="max-w-[1100px] mx-auto px-6 py-2 flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-[22px] flex-wrap">
            <span className="flex items-center gap-[7px]"><span className="text-teal">●</span> Cancún +1 346 420 5083</span>
            <span className="flex items-center gap-[7px]">✉ reservaweb@mayantransferexperts.com</span>
          </div>
          <div className="flex items-center gap-[18px] flex-wrap">
            <span className="text-[#9fb0c0]">USA/Canada Toll Free 1 (800) 905-5513</span>
            <span className="flex gap-2.5 text-[#9fb0c0]">
              <span className="cursor-pointer hover:text-teal transition-colors">Fb</span>
              <span className="cursor-pointer hover:text-teal transition-colors">Ig</span>
              <span className="cursor-pointer hover:text-teal transition-colors">Yt</span>
            </span>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(245,242,236,.92)', backdropFilter: 'saturate(150%) blur(10px)' }} className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div onClick={goHome} className="flex items-center gap-3 cursor-pointer flex-none">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center relative flex-none" style={{ boxShadow: '0 6px 16px -6px rgba(14,140,130,.55)' }}>
              <div className="w-[18px] h-[18px] rounded-full bg-teal" />
            </div>
            <div className="leading-[1.05] whitespace-nowrap">
              <div className="font-sans font-extrabold text-lg tracking-tight text-navy" style={{ letterSpacing: '-.4px' }}>Cancún Transfer</div>
              <div className="text-[10.5px] tracking-[3px] text-primary font-extrabold">HOTELS</div>
            </div>
          </div>

          <nav className="flex items-center gap-[26px] text-[14px] font-semibold">
            <span
              onClick={goHome}
              className="cursor-pointer pb-[3px]"
              style={{
                color: '#14181F',
                borderBottom: screen === 'route' ? '2px solid #0E8C82' : '2px solid transparent',
              }}
            >
              {t('navHome')}
            </span>
            <span className="cursor-pointer text-text-secondary hover:text-navy transition-colors">{t('navAbout')}</span>
            <span className="cursor-pointer text-text-secondary hover:text-navy transition-colors hidden md:inline">{t('navFind')}</span>
            <span className="cursor-pointer text-text-secondary hover:text-navy transition-colors">{t('navContact')}</span>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleToggleLang}
              className="border-[1.5px] border-border-input bg-white rounded-[11px] px-3.5 py-2.5 text-[13.5px] font-extrabold text-navy cursor-pointer flex items-center gap-[7px] hover:border-teal-hover hover:text-teal-hover transition-colors"
            >
              🌐 {lang === 'en' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
