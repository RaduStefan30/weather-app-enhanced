import { useContext } from 'react';
import { Hour } from '../../types';
import './WeatherHourly.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Temperature from '../Temperature/Temperature';

export const WeatherHourly = ({ hour }: { hour: Hour }) => {
  const date = new Date(hour.time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  const { units } = useContext(WeatherStateContext);
  const { temp } = units;
  return (
    <div className="weather-hourly">
      <div className="weather-hourly__time">{formattedTime}</div>
      <img
        className="weather-hourly__icon"
        src={hour.condition.icon}
        alt="weather icon"
      />
      <Temperature
        classNames={'weather-hourly__temp'}
        temp={temp}
        tempC={hour.temp_c}
        tempF={hour.temp_f}
      />
    </div>
  );
};
