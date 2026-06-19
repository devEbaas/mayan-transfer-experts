import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import type { TripType } from '@/types/booking';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

function formatDate(iso: string, lang: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  const en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const es = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const month = (lang === 'es' ? es : en)[m - 1];
  return `${month} ${d}, ${y}`;
}

export default function TripSummary() {
  const { t } = useTranslation();
  const { search, editSummary, toggleEditSummary, closeEditSummary, setSearch } =
    useBookingStore();
  const lang = useAppStore((s) => s.lang);

  const tripTypeLabels: Record<TripType, string> = {
    round: t('tripTypes.round'),
    oneway: t('tripTypes.oneway'),
    arrival: t('tripTypes.arrival'),
    departure: t('tripTypes.departure'),
  };

  const tripOptions = Object.entries(tripTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));

  const adultOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  const childOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: String(i),
  }));

  const handleFieldChange = (field: string, value: string | number) => {
    setSearch({ ...search, [field]: value });
  };

  return (
    <aside className="sticky top-[108px] flex-1 max-w-[360px] min-w-0" style={{ flexBasis: '300px' }}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-18px_rgba(8,24,42,0.35)] border border-border">
        <div className="bg-navy text-white px-5 py-4 font-bold text-base flex items-center gap-2 whitespace-nowrap">
          <span className="text-teal-glow">●</span> {t('summary.title')}
        </div>
        <div className="p-5">
          {!editSummary ? (
            <>
              <div className="text-[11px] font-bold tracking-wider uppercase text-text-light mb-1.5">
                {t('summary.transfer')}
              </div>
              <div className="text-[14.5px] font-bold text-navy leading-snug mb-0.5">
                {search.from || '—'}
              </div>
              <div className="text-xs text-teal my-0.5">↓</div>
              <div className="text-[14.5px] font-bold text-navy leading-snug">
                {search.to || '—'}
              </div>
              <div className="inline-block mt-2.5 bg-teal-light text-teal text-[11.5px] font-bold px-3 py-1 rounded-full">
                {tripTypeLabels[search.tripType]}
              </div>

              <div className="h-px bg-[#eef1f4] my-4" />
              <div className="flex justify-between text-[13.5px] mb-2.5">
                <span className="text-text-muted">{t('summary.arrival')}</span>
                <span className="font-bold text-navy whitespace-nowrap">
                  {formatDate(search.arrival, lang)}
                </span>
              </div>
              <div className="flex justify-between text-[13.5px] mb-2.5">
                <span className="text-text-muted">{t('summary.return')}</span>
                <span className="font-bold text-navy whitespace-nowrap">
                  {formatDate(search.departure, lang)}
                </span>
              </div>
              <div className="flex justify-between text-[13.5px]">
                <span className="text-text-muted">{t('summary.passengers')}</span>
                <span className="font-bold text-navy">
                  {t('summary.adultsLabel')} {search.adults} · {t('summary.childrenLabel')}{' '}
                  {search.children}
                </span>
              </div>

              <button
                onClick={toggleEditSummary}
                className="w-full mt-4 bg-white border-[1.5px] border-border-input rounded-[11px] py-2.5 text-[13.5px] font-bold text-navy cursor-pointer flex items-center justify-center gap-1.5 hover:border-teal hover:text-teal transition-colors"
              >
                ✎ {t('summary.edit')}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 animate-[ctfade_0.25s_ease_both]">
              <Select
                label={t('form.tripType')}
                options={tripOptions}
                value={search.tripType}
                onChange={(e) => handleFieldChange('tripType', e.target.value)}
              />
              <Input
                label={t('form.from')}
                value={search.from}
                onChange={(e) => handleFieldChange('from', e.target.value)}
              />
              <Input
                label={t('form.to')}
                value={search.to}
                onChange={(e) => handleFieldChange('to', e.target.value)}
              />
              <div className="flex gap-2.5">
                <div className="flex-1 min-w-0">
                  <Input
                    type="date"
                    label={t('form.arrival')}
                    value={search.arrival}
                    onChange={(e) => handleFieldChange('arrival', e.target.value)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    type="date"
                    label={t('form.departure')}
                    value={search.departure}
                    onChange={(e) => handleFieldChange('departure', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1 min-w-0">
                  <Select
                    label={t('form.adults')}
                    options={adultOptions}
                    value={search.adults}
                    onChange={(e) =>
                      handleFieldChange('adults', parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Select
                    label={t('form.children')}
                    options={childOptions}
                    value={search.children}
                    onChange={(e) =>
                      handleFieldChange('children', parseInt(e.target.value, 10))
                    }
                  />
                </div>
              </div>
              <Button variant="primary" fullWidth onClick={closeEditSummary} className="mt-1">
                ✓ {t('summary.update')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp assistance */}
      <div className="bg-white rounded-2xl p-4 px-5 mt-4 border border-border">
        <div className="text-[13px] font-bold text-navy mb-2.5">{t('assist.title')}</div>
        <div className="text-[13px] text-[#6b7886] leading-relaxed mb-3">
          {t('assist.body')}
        </div>
        <a
          href="#"
          className="flex items-center gap-2 bg-whatsapp text-white rounded-[10px] py-2.5 text-[13.5px] font-bold no-underline justify-center hover:brightness-95 transition"
        >
          💬 {t('assist.chat')}
        </a>
      </div>
    </aside>
  );
}
