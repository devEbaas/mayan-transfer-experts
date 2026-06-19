import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-[500px] mx-auto px-6 py-24 text-center">
      <div className="text-6xl font-extrabold text-navy mb-4">404</div>
      <h1 className="font-serif font-normal text-[28px] text-navy m-0 mb-3">
        {t('notFound.title')}
      </h1>
      <p className="text-text-muted mb-8">{t('notFound.body')}</p>
      <Link to="/">
        <Button variant="primary">{t('notFound.back')}</Button>
      </Link>
    </div>
  );
}
