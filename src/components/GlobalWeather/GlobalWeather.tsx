import { useTranslation } from 'react-i18next';
import WeatherCard from '../WeatherCard/WeatherCard';
import './GlobalWeather.scss';

const GlobalWeather = () => {
  const { t } = useTranslation();
  return (
    <div className="global-weather__section section">
      <div className="global-weather__header">
        <h2 className="global-weather__title title">{t('global')}</h2>
      </div>
      <div className="global-weather__content section-content grid-6">
        <WeatherCard key={'London'} search={'London'} />
        <WeatherCard key={'New York'} search={'New York'} />
        <WeatherCard key={'Tokyo'} search={'Tokyo'} />
        <WeatherCard key={'Bucharest'} search={'Bucharest'} />
        <WeatherCard key={'Beijing'} search={'Beijing'} />
        <WeatherCard key={'Sydney'} search={'Sydney'} />
      </div>
    </div>
  );
};

export default GlobalWeather;
