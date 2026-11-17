import { AirQuality, ForecastDay } from '../../types';
import './WeatherDetailCard.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { useTranslation } from 'react-i18next';
const WeatherDetail = ({
  details,
  isDay,
  airQuality,
}: {
  details: ForecastDay;
  isDay: boolean;
  airQuality?: AirQuality;
}) => {
  const condition = details.day.condition;
  const { t } = useTranslation();
  const highC = details.day.maxtemp_c ?? details.day.avgtemp_c;
  const highF = details.day.maxtemp_f ?? details.day.avgtemp_f;
  const lowC = details.day.mintemp_c ?? details.day.avgtemp_c;
  const lowF = details.day.mintemp_f ?? details.day.avgtemp_f;
  const aqi = airQuality?.['us-epa-index'];
  const aqiLabels = [
    'airQualityGood',
    'airQualityModerate',
    'airQualitySensitive',
    'airQualityUnhealthy',
    'airQualityVeryUnhealthy',
    'airQualityHazardous',
  ];

  return (
    <div className="weather-detail-card">
      <div className="weather-detail-card__overview">
        <WeatherIcon
          className="weather-detail-card__image"
          code={condition.code}
          isDay={isDay}
          alt={condition.text}
        />
        <div className="weather-detail-card__reading">
          <p className="weather-detail-card__label">{t('highLow')}</p>
          <div className="weather-detail-card__temperature-range">
            <Measurement
              className="weather-detail-card__temp weather-detail-card__temp--high"
              metricValue={highC}
              imperialValue={highF}
              unitType="temperature"
            />
            <span aria-hidden="true">/</span>
            <Measurement
              className="weather-detail-card__temp weather-detail-card__temp--low"
              metricValue={lowC}
              imperialValue={lowF}
              unitType="temperature"
            />
          </div>
          <p className="weather-detail-card__condition">{condition.text}</p>
        </div>
      </div>
      <dl className="weather-detail-card__metrics">
        <div>
          <dt>{t('rainChance')}</dt>
          <dd>{details.day.daily_chance_of_rain ?? 0}%</dd>
        </div>
        <div>
          <dt>{t('maxWind')}</dt>
          <dd>
            <Measurement
              className=""
              metricValue={details.day.maxwind_kph ?? 0}
              imperialValue={details.day.maxwind_mph ?? 0}
              unitType="distance"
            />
            <span>/h</span>
          </dd>
        </div>
        <div>
          <dt>{t('sunrise')}</dt>
          <dd>{details.astro.sunrise || '—'}</dd>
        </div>
        <div>
          <dt>{t('sunset')}</dt>
          <dd>{details.astro.sunset || '—'}</dd>
        </div>
        {details.day.uv !== undefined && (
          <div>
            <dt>{t('uvIndex')}</dt>
            <dd>{details.day.uv}</dd>
          </div>
        )}
        {aqi !== undefined && (
          <div>
            <dt>{t('airQuality')}</dt>
            <dd>{t(aqiLabels[Math.max(0, Math.min(5, aqi - 1))])}</dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default WeatherDetail;
