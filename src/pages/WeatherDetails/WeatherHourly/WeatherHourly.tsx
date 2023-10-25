import { Hour } from '../../../types';
import './WeatherHourly.scss';

export const WeatherHourly = ({ hour }: { hour: Hour }) => {
  const date = new Date(hour.time);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  return (
    <div className="weather-hourly">
      <div className="weather-hourly__time">{formattedTime}</div>
      <img
        className="weather-hourly__icon"
        src={hour.condition.icon}
        alt="weather icon"
      />
      <h2 className="weather-hourly__temp">
        {Math.floor(hour.temp_c)} &#176;C
      </h2>
    </div>
  );
};
