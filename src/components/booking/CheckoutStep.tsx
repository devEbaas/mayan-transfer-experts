import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '@/store/bookingStore';
import { useAppStore } from '@/store/appStore';
import { useVehicleById } from '@/hooks/useVehicles';
import { useExtrasTotal } from '@/hooks/useExtras';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  contactPref: 'whatsapp' | 'email';
  phone: string;
  arrivalAirline?: string;
  arrivalFlightNo?: string;
  arrivalTime?: string;
  departureAirline?: string;
  departureFlightNo?: string;
  departureTime?: string;
  comments?: string;
  terminals: 'one' | 'two';
  acceptTerms: boolean;
}

export default function CheckoutStep() {
  const { t } = useTranslation();
  const { vehicleId, extras, twoTerminals, setTwoTerminals } = useBookingStore();
  const formatPrice = useAppStore((s) => s.formatPrice);
  const vehicle = useVehicleById(vehicleId);
  const total = useExtrasTotal(extras, twoTerminals, vehicle.price);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: {
      contactPref: 'whatsapp',
      terminals: 'one',
      acceptTerms: false,
    },
  });

  const contactPref = watch('contactPref');
  const terminals = watch('terminals');

  const onSubmit = (data: CheckoutForm) => {
    console.log('Checkout submitted:', data, 'Total:', total);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {/* Passenger details */}
      <div className="bg-white rounded-[18px] border border-border overflow-hidden shadow-[0_10px_30px_-20px_rgba(8,24,42,0.4)]">
        <div className="bg-navy text-white px-5 py-4 font-bold text-base">
          {t('checkout.passenger')}
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input
              label={t('checkout.firstName')}
              placeholder={t('checkout.firstNamePh')}
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              label={t('checkout.lastName')}
              placeholder={t('checkout.lastNamePh')}
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input
              type="email"
              label={t('checkout.email')}
              placeholder="you@email.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="email"
              label={t('checkout.confirmEmail')}
              placeholder="you@email.com"
              {...register('confirmEmail')}
              error={
                errors.confirmEmail?.message === 'emailMatch'
                  ? t('validation.emailMatch')
                  : errors.confirmEmail?.message
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-text-secondary tracking-wide uppercase mb-2">
                {t('checkout.contactPref')}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setValue('contactPref', 'whatsapp')}
                  className={`flex-1 border-[1.5px] rounded-[10px] py-2.5 text-[13.5px] font-bold cursor-pointer transition-colors ${
                    contactPref === 'whatsapp'
                      ? 'border-teal bg-teal-light text-teal'
                      : 'border-border-input bg-white text-text-secondary'
                  }`}
                >
                  💬 {t('checkout.whatsapp')}
                </button>
                <button
                  type="button"
                  onClick={() => setValue('contactPref', 'email')}
                  className={`flex-1 border-[1.5px] rounded-[10px] py-2.5 text-[13.5px] font-bold cursor-pointer transition-colors ${
                    contactPref === 'email'
                      ? 'border-teal bg-teal-light text-teal'
                      : 'border-border-input bg-white text-text-secondary'
                  }`}
                >
                  ✉ {t('checkout.emailPref')}
                </button>
              </div>
            </div>
            <Input
              label={t('checkout.cellphone')}
              placeholder="+52 222 123 4567"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div className="h-px bg-[#eef1f4] my-6" />

          {/* Flights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Arrival flight */}
            <div>
              <div className="font-extrabold text-sm text-navy mb-3 flex items-center gap-2">
                ✈ {t('checkout.arrivalFlight')}
              </div>
              <div className="mb-3">
                <Input
                  label={t('checkout.airline')}
                  {...register('arrivalAirline')}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Input
                  label={t('checkout.flightNo')}
                  {...register('arrivalFlightNo')}
                />
                <Input
                  type="time"
                  label={t('checkout.arrTime')}
                  {...register('arrivalTime')}
                />
              </div>
            </div>
            {/* Departure flight */}
            <div>
              <div className="font-extrabold text-sm text-navy mb-3 flex items-center gap-2">
                ✈ {t('checkout.depFlight')}
              </div>
              <div className="mb-3">
                <Input
                  label={t('checkout.airline')}
                  {...register('departureAirline')}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Input
                  label={t('checkout.flightNo')}
                  {...register('departureFlightNo')}
                />
                <Input
                  type="time"
                  label={t('checkout.depTime')}
                  {...register('departureTime')}
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-4">
            <label className="block text-xs font-bold text-text-secondary tracking-wide uppercase mb-1.5">
              {t('checkout.comments')}
            </label>
            <textarea
              rows={3}
              placeholder={t('checkout.commentsPh')}
              {...register('comments')}
              className="w-full border border-border-input rounded-[11px] px-3.5 py-3 text-sm text-navy resize-y focus:outline-none focus:border-teal focus:shadow-[0_0_0_3px_rgba(14,140,130,0.12)]"
            />
          </div>

          {/* Terminals */}
          <div className="mt-4 flex flex-col gap-2.5">
            <label className="flex items-center gap-2.5 text-[13.5px] text-text-dark cursor-pointer">
              <input
                type="radio"
                value="one"
                {...register('terminals')}
                onChange={() => {
                  setValue('terminals', 'one');
                  setTwoTerminals(false);
                }}
                checked={terminals === 'one'}
                className="w-[17px] h-[17px] accent-teal"
              />
              {t('checkout.oneTerminal')}
            </label>
            <label className="flex items-center gap-2.5 text-[13.5px] text-text-dark cursor-pointer">
              <input
                type="radio"
                value="two"
                {...register('terminals')}
                onChange={() => {
                  setValue('terminals', 'two');
                  setTwoTerminals(true);
                }}
                checked={terminals === 'two'}
                className="w-[17px] h-[17px] accent-teal"
              />
              {t('checkout.twoTerminals')}{' '}
              <span className="text-text-light">(+{formatPrice(18.8)})</span>
            </label>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-[18px] border border-border overflow-hidden shadow-[0_10px_30px_-20px_rgba(8,24,42,0.4)]">
        <div className="bg-navy text-white px-5 py-4 font-bold text-base">
          {t('checkout.payment')}
        </div>
        <div className="p-6">
          <div className="bg-info-bg border border-info-border rounded-xl p-3.5 px-4 text-[13.5px] text-info-text leading-relaxed mb-5 flex gap-2.5">
            <span>ℹ️</span>
            {t('checkout.payNote')}
          </div>

          <div className="flex flex-col gap-3 max-w-[460px]">
            <label className="flex items-center gap-2.5 text-[13.5px] text-text-dark cursor-pointer">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="w-[17px] h-[17px] accent-teal"
              />
              {t('checkout.accept')}{' '}
              <span className="text-teal font-bold underline">{t('checkout.terms')}</span>
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs">{t('validation.acceptTerms')}</p>
            )}

            <Button type="submit" variant="paypal" fullWidth>
              <span className="italic">Pay</span>Pal
            </Button>
            <Button type="submit" variant="card" fullWidth>
              💳 {t('checkout.card')}
            </Button>

            <div className="flex items-center justify-center gap-2.5 mt-1">
              <span className="text-[11px] text-text-light">{t('checkout.secure')}</span>
              <span className="border border-[#e1e6ea] rounded-[5px] px-1.5 py-0.5 text-[10px] font-extrabold text-[#1a1f71]">
                VISA
              </span>
              <span className="border border-[#e1e6ea] rounded-[5px] px-1.5 py-0.5 text-[10px] font-extrabold text-[#eb001b]">
                MC
              </span>
              <span className="border border-[#e1e6ea] rounded-[5px] px-1.5 py-0.5 text-[10px] font-extrabold text-[#006fcf]">
                AMEX
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
