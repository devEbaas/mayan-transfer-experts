import { useTranslation } from 'react-i18next';
import { useAppStore, type Currency } from '@/store/appStore';
import { useBookingStore, type Screen } from '@/store/bookingStore';

const SCREENS: Screen[] = ['route', 'pax', 'vehicle', 'details', 'pay'];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, lang, toggleLang } = useAppStore();
  const { screen, goHome } = useBookingStore();

  const handleToggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    toggleLang();
  };

  const stepLabels = t('stepLabels', { returnObjects: true }) as string[];
  const showProgress = screen !== 'done';
  const stepIdx = screen === 'done' ? SCREENS.length : SCREENS.indexOf(screen);

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(239,243,249,.9)', backdropFilter: 'saturate(150%) blur(10px)' }}>
      <div className="max-w-[1100px] mx-auto px-6 pt-4 pb-3.5 flex items-center justify-between gap-4">
        <div onClick={goHome} className="flex items-center gap-3 cursor-pointer flex-none">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center relative flex-none" style={{ boxShadow: '0 6px 16px -6px rgba(31,95,192,.55)' }}>
            <div className="w-[18px] h-[18px] rounded-full bg-gold" />
          </div>
          <div className="leading-[1.05] whitespace-nowrap">
            <div className="font-display font-extrabold text-lg tracking-tight text-navy" style={{ letterSpacing: '-.4px' }}>Cancún Transfer</div>
            <div className="text-[10.5px] tracking-[3px] text-primary font-extrabold">HOTELS</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="appearance-none border-[1.5px] border-border-input bg-white rounded-[11px] px-3.5 pr-[30px] py-2.5 text-[13.5px] font-bold text-navy cursor-pointer"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" stroke="%23B8AB99" stroke-width="1.6" fill="none"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
          <button
            onClick={handleToggleLang}
            className="border-[1.5px] border-border-input bg-white rounded-[11px] px-3.5 py-2.5 text-[13.5px] font-extrabold text-navy cursor-pointer flex items-center gap-[7px] hover:border-teal-hover hover:text-teal-hover transition-colors"
          >
            🌐 {lang === 'en' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>

      {showProgress && (
        <div className="border-t border-border" style={{ background: 'rgba(255,255,255,.55)' }}>
          <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center gap-1">
            {stepLabels.map((label, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <div key={i} className="flex items-center gap-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-none">
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-extrabold flex-none"
                      style={{
                        background: active ? '#1F5FC0' : done ? '#0B2E5E' : '#fff',
                        color: active || done ? '#fff' : '#98A4B7',
                        border: `2px solid ${active ? '#1F5FC0' : done ? '#0B2E5E' : '#D8E1EC'}`,
                      }}
                    >
                      {done ? '✓' : i + 1}
                    </div>
                    <span
                      className="text-[13px] font-bold whitespace-nowrap"
                      style={{ color: active || done ? '#14223A' : '#98A4B7' }}
                    >
                      {label}
                    </span>
                  </div>
                  <div
                    className="flex-1 h-0.5 rounded-sm min-w-3"
                    style={{ background: i < stepIdx ? '#0B2E5E' : '#D8E1EC' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
