import { useContext } from 'react';
import './LocalWeather.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Spinner from '../Spinner/Spinner';
import Temperature from '../Temperature/Temperature';
const LocalWeather = () => {
  const { data } = useContext(WeatherStateContext);
  if (!data) return <Spinner />;
  return (
    <div className="local-weather__section">
      <div className="local-weather__header">
        <h2 className="local-weather__title">
          {data.location.name} Weather Conditions
        </h2>
      </div>
      <div className="local-weather__content">
        {data.current.condition.text}
        <Temperature
          classNames={'weather-detail-card__temp'}
          tempC={data.current.temp_c}
          tempF={data.current.temp_f}
        />
      </div>
    </div>
  );
};

export default LocalWeather;
