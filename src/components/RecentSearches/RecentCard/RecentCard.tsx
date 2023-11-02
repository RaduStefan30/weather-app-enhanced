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
      className={`no-styles-button card ${classNames}`}
      onClick={() => navigate(`details/${location.name}`)}
    >
      <LocationName
        name={location.name}
        region={location.region}
        country={location.country}
        classNames="card__location no-wrap"
      />
      <div className="card__temperature">
        <WeatherIcon
          className="card__temperature-icon"
          alt="weather icon"
          code={current.condition.code}
          isDay={current.is_day}
        />
        <Measurement
          className={'card__temperature-value'}
          metricValue={current.temp_c}
          imperialValue={current.temp_f}
          unitType="temperature"
        />
      </div>
    </button>
  );
};

export default RecentCard;
