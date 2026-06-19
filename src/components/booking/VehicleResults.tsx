import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicles } from '@/hooks/useVehicles';
import Button from '@/components/ui/Button';

export default function VehicleResults() {
  const { t } = useTranslation();
  const { setVehicle, nextStep } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const vehicles = useVehicles();
  const features = t('results.features', { returnObjects: true }) as string[];

  const handleSelect = (id: string) => {
    setVehicle(id);
    nextStep();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-normal text-[32px] m-0 text-navy">
          {t('results.title')}
        </h2>
        <span className="bg-navy text-white text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full flex-none whitespace-nowrap">
          {t('results.private')}
        </span>
      </div>

      <div className="grid gap-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-[18px] border border-border overflow-hidden shadow-[0_10px_30px_-20px_rgba(8,24,42,0.4)] animate-[ctfade_0.4s_ease_both]"
          >
            <div className="p-6 flex flex-wrap gap-6 items-center">
              {/* Image placeholder */}
              <div className="flex-1 max-w-[240px] min-w-0" style={{ flexBasis: '190px' }}>
                <div className="bg-[repeating-linear-gradient(135deg,#eef1f4,#eef1f4_10px,#e7ebef_10px,#e7ebef_20px)] rounded-xl h-[130px] flex items-center justify-center font-mono text-[11px] text-text-light text-center px-2.5">
                  {v.imgNote}
                </div>
                <div className="text-[11px] text-text-light italic mt-1.5 text-center">
                  {t('results.illustrative')}
                </div>
              </div>

              {/* Details */}
              <div className="flex-[3_1_280px] min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[21px] font-extrabold text-navy tracking-tight">
                      {v.name}
                    </div>
                    <div className="text-[13.5px] text-text-muted mt-0.5">{v.capacity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold tracking-wider uppercase text-text-light">
                      {t('results.price')}
                    </div>
                    <div className="text-[28px] font-extrabold text-navy tracking-tight">
                      {formatPrice(v.price)}
                    </div>
                    <div className="text-[11.5px] text-text-light italic">
                      {t('results.taxIncl')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 gap-x-4 my-4">
                  {features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-[13px] text-text-dark"
                    >
                      <span className="text-teal font-extrabold">✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleSelect(v.id)}
                >
                  {t('results.select')} →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
