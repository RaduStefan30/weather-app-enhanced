import { ForecastDay } from '../../../types';
import './WeatherDetail.scss';

const WeatherDetail = ({ details }: { details: ForecastDay }) => {
  const condition = details.day.condition;
  return (
    <div className="weather-detail-card">
      <img
        className="weather-detail-card__image"
        src={condition.icon}
        alt="large weather icon"
      />
      <p className="weather-detail-card__text">{condition.text}</p>
      <h2 className="weather-detail-card__temp">
        {Math.floor(details.day.avgtemp_c)} &#176;C
      </h2>
    </div>
  );
};

export default WeatherDetail;
