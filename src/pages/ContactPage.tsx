import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
  });

  const onSubmit = (data: ContactForm) => {
    console.log('Contact submitted:', data);
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-20">
      <h1 className="font-serif font-normal text-[36px] text-navy m-0 mb-8">
        {t('contact.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label={t('contact.name')}
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            type="email"
            label={t('contact.email')}
            {...register('email')}
            error={errors.email?.message}
          />
          <div>
            <label className="block text-xs font-bold text-text-secondary tracking-wide uppercase mb-1.5">
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              {...register('message')}
              className="w-full border border-border-input rounded-[11px] px-3.5 py-3 text-[15px] text-navy resize-y focus:outline-none focus:border-teal focus:shadow-[0_0_0_3px_rgba(14,140,130,0.12)]"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" variant="primary">
            {t('contact.send')}
          </Button>
        </form>

        <div>
          <h2 className="text-lg font-bold text-navy mb-4">{t('contact.info')}</h2>
          <div className="text-[15px] text-text-body leading-loose">
            <div>📞 +1 346 420 5083</div>
            <div>Toll Free 1 (800) 905-5513</div>
            <div>✉ reservaweb@cancuntransferhotels.com</div>
            <div className="mt-2">💬 WhatsApp: +1 346 420 5083</div>
            <div className="mt-2 text-text-muted">{t('contact.schedule')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
