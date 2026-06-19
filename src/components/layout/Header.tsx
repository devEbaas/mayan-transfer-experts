import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/appStore';
import type { Currency } from '@/store/appStore';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { currency, setCurrency, lang, toggleLang } = useAppStore();

  const handleToggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    toggleLang();
  };

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <div className="bg-white/92 backdrop-blur-md backdrop-saturate-[140%] border-b border-[#e9e3d7]">
      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
        <Link to="/" className="flex items-center gap-3 no-underline flex-none">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-navy flex items-center justify-center relative flex-none">
            <div className="absolute inset-0 rounded-[11px] border border-teal-glow/35" />
            <span className="text-teal-glow font-extrabold text-[17px] tracking-tight">
              CT
            </span>
          </div>
          <div className="leading-tight whitespace-nowrap">
            <div className="font-extrabold text-base tracking-tight text-navy">
              Cancún Transfer
            </div>
            <div className="text-[10.5px] tracking-[2.5px] text-teal font-bold">
              HOTELS
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-7 text-[14.5px] font-semibold">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`no-underline pb-[3px] transition-colors ${
                  isActive
                    ? 'text-navy border-b-2 border-teal'
                    : 'text-text-secondary hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="appearance-none border border-border-input bg-white rounded-[9px] px-3 pr-7 py-2 text-[13px] font-semibold text-navy cursor-pointer focus:outline-none focus:border-teal"
          >
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
          <button
            onClick={handleToggleLang}
            className="border border-border-input bg-white rounded-[9px] px-3 py-2 text-[13px] font-bold text-navy cursor-pointer flex items-center gap-1.5 hover:border-teal hover:text-teal transition-colors"
          >
            🌐 {lang === 'en' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
    </div>
  );
}
