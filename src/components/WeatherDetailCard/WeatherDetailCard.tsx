import { ForecastDay } from '../../types';
import './WeatherDetailCard.scss';
import Measurement from '../Measurement/Measurement';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
const WeatherDetail = ({
  details,
  isDay,
}: {
  details: ForecastDay;
  isDay: boolean;
}) => {
  const condition = details.day.condition;
  return (
    <div className="weather-detail-card">
      <WeatherIcon
        className="weather-detail-card__image"
        code={condition.code}
        isDay={isDay}
        alt="large weather icon"
      />
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
