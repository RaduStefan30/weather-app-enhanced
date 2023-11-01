import './RecentCard.scss';
import { WeatherData } from '../../../types';
import { useNavigate } from 'react-router-dom';
import Measurement from '../../Measurement/Measurement';
import LocationName from '../../LocationName/LocationName';
import WeatherIcon from '../../WeatherIcon/WeatherIcon';

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
    <button
      className={`no-styles-button recent-card ${classNames}`}
      onClick={() => navigate(`details/${location.name}`)}
    >
      <div className="recent-card__location">
        <LocationName
          name={location.name}
          region={location.region}
          country={location.country}
        />
      </div>
      <div className="recent-card__temperature">
        <WeatherIcon
          className="recent-card__temperature-icon"
          alt="weather icon"
          code={current.condition.code}
          isDay={current.is_day}
        />
        <Measurement
          className={'recent-card__temperature-value'}
          metricValue={current.temp_c}
          imperialValue={current.temp_f}
          unitType="temperature"
        />
      </div>
    </button>
  );
};

export default RecentCard;
