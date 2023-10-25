import { Hour } from '../../../types';
import './WeatherHourly.scss';

export const WeatherHourly = ({ hour }: { hour: Hour }) => {
  return (
    <div className="weather-hourly">
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
