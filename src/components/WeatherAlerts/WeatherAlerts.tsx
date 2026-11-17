import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import './WeatherAlerts.scss';

const isProviderCode = (value?: string) =>
  Boolean(value?.match(/awareness_(?:type|level)\s*=/i));

const WeatherAlerts = () => {
  const { data } = useContext(WeatherStateContext);
  const { t, i18n } = useTranslation();
  const alert = data?.alerts?.alert?.[0];

  if (!alert) return null;

  const hasCodedEvent = isProviderCode(alert.event);
  const title = hasCodedEvent
    ? t('weatherAlert')
    : [alert.event, alert.headline].find(
        (value) => value && !isProviderCode(value)
      ) ?? t('weatherAlert');
  const description = (hasCodedEvent
    ? [alert.desc, alert.headline]
    : [alert.headline, alert.desc]
  ).find(
    (value) => value && value !== title && !isProviderCode(value)
  );
  const expiry = alert.expires
    ? new Intl.DateTimeFormat(i18n.resolvedLanguage ?? i18n.language ?? 'en', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(alert.expires))
    : null;

  return (
    <aside className="weather-alert" role="alert" aria-labelledby="weather-alert-title">
      <p className="weather-alert__eyebrow">{t('weatherAlert')}</p>
      <div className="weather-alert__content">
        <h2 id="weather-alert-title">{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {expiry && (
        <p className="weather-alert__expires">
          {t('expires')} {expiry}
        </p>
      )}
    </aside>
  );
};

export default WeatherAlerts;
