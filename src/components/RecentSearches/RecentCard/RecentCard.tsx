import './RecentCard.scss';
import { WeatherData } from '../../../types';
import { useNavigate } from 'react-router-dom';

const RecentCard = (props: WeatherData) => {
  const { location, current } = props;
  const navigate = useNavigate();
  return (
    <div
      className="recent-card"
      onClick={() => navigate(`forecast/${location.name}`)}
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
        <p className="recent-card__temperature-value">
          {current.temp_c}&#176;C
        </p>
      </div>
    </div>
  );
};

export default RecentCard;
