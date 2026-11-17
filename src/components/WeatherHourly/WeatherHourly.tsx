import { Hour } from '../../types';
import './WeatherHourly.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { BiDroplet } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

export const WeatherHourly = ({ hour }: { hour: Hour }) => {
  const { t } = useTranslation();
  const date = new Date(hour.time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  return (
    <div className="weather-hourly">
      <div className="weather-hourly__time">{formattedTime}</div>
      <WeatherIcon
        className="weather-hourly__icon"
        code={hour.condition.code}
        isDay={hour.is_day}
        alt=""
      />
      <p className="weather-hourly__condition">{hour.condition.text}</p>
      <Measurement
        className={'weather-hourly__temp'}
        metricValue={hour.temp_c}
        imperialValue={hour.temp_f}
        unitType="temperature"
      />
      {hour.chance_of_rain !== undefined && (
        <p className="weather-hourly__rain" aria-label={t('rainChance')}>
          <BiDroplet aria-hidden="true" />
          {hour.chance_of_rain}%
        </p>
      )}
    </div>
  );
};
