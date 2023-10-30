import { ForecastDay } from '../../types';
import './WeatherDetailCard.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const WeatherDetail = ({ details }: { details: ForecastDay }) => {
  const condition = details.day.condition;
  return (
    <div className="weather-detail-card">
      <WeatherIcon
        className="weather-detail-card__image"
        src={condition.icon}
        alt="large weather icon"
      />
      <p className="weather-detail-card__text">{condition.text}</p>
      <Measurement
        className={'weather-detail-card__temp'}
        metricValue={details.day.avgtemp_c}
        imperialValue={details.day.avgtemp_f}
        unitType="temperature"
      />
    </div>
  );
};

export default WeatherDetail;
