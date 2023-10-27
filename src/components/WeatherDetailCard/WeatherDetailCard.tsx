import { useContext } from 'react';
import { ForecastDay } from '../../types';
import './WeatherDetailCard.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Temperature from '../Temperature/Temperature';

const WeatherDetail = ({ details }: { details: ForecastDay }) => {
  const condition = details.day.condition;
  const { units } = useContext(WeatherStateContext);
  const { temp } = units;
  return (
    <div className="weather-detail-card">
      <img
        className="weather-detail-card__image"
        src={condition.icon}
        alt="large weather icon"
      />
      <p className="weather-detail-card__text">{condition.text}</p>
      <Temperature
        classNames={'weather-detail-card__temp'}
        temp={temp}
        tempC={details.day.avgtemp_c}
        tempF={details.day.avgtemp_f}
      />
    </div>
  );
};

export default WeatherDetail;