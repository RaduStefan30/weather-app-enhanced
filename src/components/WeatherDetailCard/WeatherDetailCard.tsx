import { ForecastDay } from '../../types';
import './WeatherDetailCard.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { useTranslation } from 'react-i18next';
const WeatherDetail = ({
  details,
  isDay,
}: {
  details: ForecastDay;
  isDay: boolean;
}) => {
  const condition = details.day.condition;
  const { t } = useTranslation();
  return (
    <div className="weather-detail-card">
      <div className="weather-detail-card__visual">
        <WeatherIcon
          className="weather-detail-card__image"
          code={condition.code}
          isDay={isDay}
          alt={condition.text}
        />
      </div>
      <div className="weather-detail-card__reading">
        <p className="weather-detail-card__label">{t('averageTemperature')}</p>
        <Measurement
          className={'weather-detail-card__temp'}
          metricValue={details.day.avgtemp_c}
          imperialValue={details.day.avgtemp_f}
          unitType="temperature"
        />
        <p className="weather-detail-card__condition">{condition.text}</p>
      </div>
    </div>
  );
};

export default WeatherDetail;
