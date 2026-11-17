import './Spinner.scss';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();
  return (
    <div
      className="spinner-container"
      role="status"
      aria-live="polite"
      aria-label={t('loadingWeather')}
    >
      <div className="spinner" aria-hidden="true">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
