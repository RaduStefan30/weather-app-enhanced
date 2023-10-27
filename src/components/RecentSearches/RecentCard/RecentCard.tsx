import './RecentCard.scss';
import { WeatherData } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { WeatherStateContext } from '../../../contexts/WeatherContext/WeatherContext';
import Temperature from '../../Temperature/Temperature';

const RecentCard = (props: WeatherData) => {
  const { location, current } = props;
  const navigate = useNavigate();
  const { units } = useContext(WeatherStateContext);
  const { temp } = units;
  return (
    <div
      className="recent-card"
      onClick={() => navigate(`details/${location.name}`)}
    >
      <div className="recent-card__location">
        {location.name}, {location.country}
      </div>
      <div className="recent-card__temperature">
        <img
          className="recent-card__temperature-icon"
          alt="weather icon"
          src={current.condition.icon}
        />
        <Temperature
          classNames={'recent-card__temperature-value'}
          temp={temp}
          tempC={current.temp_c}
          tempF={current.temp_f}
        />
      </div>
    </div>
  );
};

export default RecentCard;
