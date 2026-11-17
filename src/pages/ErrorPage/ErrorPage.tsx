import './ErrorPage.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <main className="error-page page">
      <p className="error-eyebrow">{t('pageNotFound')}</p>
      <div className="error-number">404</div>
      <h1 className="error-message">{t('pageNotFoundMessage')}</h1>
      <Link className="error-home-link" to={'/'}>
        {t('goHome')}
      </Link>
    </main>
  );
};

export default ErrorPage;
