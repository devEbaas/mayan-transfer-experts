import { useTranslation } from 'react-i18next';
import { useBookingStore, type Screen } from '@/store/bookingStore';

const SCREENS: Screen[] = ['route', 'pax', 'vehicle', 'extras', 'details', 'pay'];

export default function Stepper() {
  const { t } = useTranslation();
  const screen = useBookingStore((s) => s.screen);

  const stepLabels = t('stepLabels', { returnObjects: true }) as string[];
  const stepIdx = SCREENS.indexOf(screen);

  return (
    <div className="flex items-center justify-center gap-1.5 mx-auto max-w-[820px] px-6 pt-5 pb-2">
      {stepLabels.map((label, i) => {
        const done = i < stepIdx;
        const active = i === stepIdx;
        return (
          <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-none">
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[13px] font-extrabold flex-none"
                style={{
                  background: active ? '#0E8C82' : done ? '#0A0B0D' : '#fff',
                  color: active || done ? '#fff' : '#9aa7b4',
                  border: `2px solid ${active ? '#0E8C82' : done ? '#0A0B0D' : '#dfe4ea'}`,
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className="text-[13px] font-bold whitespace-nowrap hidden sm:inline"
                style={{ color: active || done ? '#14181F' : '#9aa7b4' }}
              >
                {label}
              </span>
            </div>
            <div
              className="flex-1 h-0.5 rounded-sm min-w-3"
              style={{ background: i < stepIdx ? '#0A0B0D' : '#dfe4ea' }}
            />
          </div>
        );
      })}
    </div>
  );
}
