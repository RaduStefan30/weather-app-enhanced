import './RecentCard.scss';
import { WeatherData } from '../../../types';
import { useNavigate } from 'react-router-dom';
import Temperature from '../../Temperature/Temperature';

const RecentCard = ({
  location,
  current,
  classNames,
}: {
  location: WeatherData['location'];
  current: WeatherData['current'];
  classNames: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`recent-card ${classNames}`}
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
          tempC={current.temp_c}
          tempF={current.temp_f}
        />
      </div>
    </div>
  );
};

export default RecentCard;
