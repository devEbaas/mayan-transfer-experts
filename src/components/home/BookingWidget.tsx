import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '@/store/bookingStore';
import type { TripType } from '@/types/booking';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface BookingSearchForm {
  tripType: 'round' | 'oneway' | 'arrival' | 'departure';
  from: string;
  to: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

export default function BookingWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setSearch = useBookingStore((s) => s.setSearch);
  const [activeTab, setActiveTab] = useState<'transport' | 'multi' | 'airbnb'>('transport');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingSearchForm>({
    defaultValues: {
      tripType: 'round',
      from: 'Cancún Airport (CUN)',
      to: '',
      arrival: '',
      departure: '',
      adults: 1,
      children: 0,
    },
  });

  const fromVal = watch('from');
  const toVal = watch('to');

  const handleSwap = () => {
    setValue('from', toVal);
    setValue('to', fromVal);
  };

  const onSubmit = (data: BookingSearchForm) => {
    setSearch({
      tripType: data.tripType as TripType,
      from: data.from,
      to: data.to,
      arrival: data.arrival,
      departure: data.departure || '',
      adults: data.adults,
      children: data.children,
    });
    navigate('/booking');
  };

  const tabs = [
    { id: 'transport' as const, label: t('tabs.transport') },
    { id: 'multi' as const, label: t('tabs.multi') },
    { id: 'airbnb' as const, label: t('tabs.airbnb') },
  ];

  const tripOptions = [
    { value: 'round', label: t('tripTypes.round') },
    { value: 'oneway', label: t('tripTypes.oneway') },
    { value: 'arrival', label: t('tripTypes.arrival') },
    { value: 'departure', label: t('tripTypes.departure') },
  ];

  const adultOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  const childOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: String(i),
  }));

  return (
    <div className="bg-white rounded-[18px] shadow-[0_30px_70px_-20px_rgba(8,24,42,0.5)] overflow-hidden flex-1 max-w-[480px] min-w-0">
      {/* Tabs */}
      <div className="flex border-b border-[#eef1f4]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 bg-transparent border-none py-4 px-2 pb-3 cursor-pointer text-[13.5px] font-bold border-b-[3px] transition-colors ${
              activeTab === tab.id
                ? 'text-navy border-teal'
                : 'text-text-light border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'transport' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Select
                label={t('form.tripType')}
                options={tripOptions}
                {...register('tripType')}
                error={errors.tripType?.message}
              />
            </div>

            <div className="mb-1.5 relative">
              <div className="mb-3.5">
                <Input
                  label={t('form.from')}
                  {...register('from')}
                  error={errors.from?.message}
                />
              </div>
              <div>
                <Input
                  label={t('form.to')}
                  {...register('to')}
                  error={errors.to?.message}
                />
              </div>
              <button
                type="button"
                onClick={handleSwap}
                title={t('form.swap')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-[38px] h-[38px] rounded-full bg-teal border-[3px] border-white text-white cursor-pointer text-[15px] shadow-[0_4px_12px_rgba(14,140,130,0.35)] hover:bg-teal-dark transition-colors flex items-center justify-center"
              >
                ⇅
              </button>
            </div>
            <div className="text-[12.5px] text-text-muted my-2.5 mb-4">
              {t('form.notFound')}{' '}
              <span className="text-teal font-semibold cursor-pointer underline">
                {t('form.contactUs')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3.5">
              <Input
                type="date"
                label={t('form.arrival')}
                {...register('arrival')}
                error={errors.arrival?.message}
              />
              <Input
                type="date"
                label={t('form.departure')}
                {...register('departure')}
                error={errors.departure?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <Select
                label={t('form.adults')}
                options={adultOptions}
                {...register('adults')}
                error={errors.adults?.message}
              />
              <Select
                label={t('form.children')}
                options={childOptions}
                {...register('children')}
                error={errors.children?.message}
              />
            </div>

            <Button type="submit" variant="primary" fullWidth>
              {t('form.search')} →
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="text-[34px] mb-3">🗺️</div>
            <div className="font-bold text-[17px] mb-2 text-navy">
              {t('otherTab.title')}
            </div>
            <p className="text-sm text-text-muted leading-relaxed mx-auto mb-4 max-w-[300px]">
              {t('otherTab.body')}
            </p>
            <Button variant="secondary" onClick={() => setActiveTab('transport')}>
              {t('otherTab.btn')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
