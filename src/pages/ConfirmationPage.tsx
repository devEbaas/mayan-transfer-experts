import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-6">✅</div>
      <h1 className="font-serif font-normal text-[36px] text-navy m-0 mb-3">
        {t('confirmation.title')}
      </h1>
      <p className="text-text-muted text-lg mb-8">{t('confirmation.subtitle')}</p>

      <div className="bg-white rounded-2xl border border-border p-8 mb-8">
        <div className="text-sm text-text-light font-bold uppercase tracking-wider mb-2">
          {t('confirmation.bookingNumber')}
        </div>
        <div className="text-3xl font-extrabold text-navy tracking-tight">
          {id || 'CTH-000000'}
        </div>
      </div>

      <Link to="/">
        <Button variant="primary">{t('confirmation.backHome')}</Button>
      </Link>
    </div>
  );
}
