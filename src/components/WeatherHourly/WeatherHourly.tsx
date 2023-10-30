import { Hour } from '../../types';
import './WeatherHourly.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

export const WeatherHourly = ({ hour }: { hour: Hour }) => {
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
        alt="weather icon"
      />
      <Measurement
        className={'weather-hourly__temp'}
        metricValue={hour.temp_c}
        imperialValue={hour.temp_f}
        unitType="temperature"
      />
    </div>
  );
};
