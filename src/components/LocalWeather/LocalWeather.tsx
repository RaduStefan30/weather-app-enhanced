import { useContext } from 'react';
import { BiWind, BiDroplet } from 'react-icons/bi';
import { WiBarometer } from 'react-icons/wi';
import { BsCloudRain } from 'react-icons/bs';
import './LocalWeather.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Spinner from '../Spinner/Spinner';
import Measurement from '../Measurement/Measurement';
import LocationName from '../LocationName/LocationName';
import { formatDate } from '../../utils/utils';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { useTranslation } from 'react-i18next';

const LocalWeather = () => {
  const { data } = useContext(WeatherStateContext);
  const { t } = useTranslation();
  if (!data) return <Spinner />;
  return (
    <div className="local-weather__section section">
      <div className="local-weather__header">
        <h2 className="local-weather__title title no-wrap">
          {t('conditions', { city: data.location.name })}
        </h2>
      </div>
      <div className="local-weather__content section-content">
        <LocationName
          name={data.location.name}
          region=""
          country={data.location.country}
          classNames="local-weather__location no-wrap"
        />
        <p className="local-weather__date">
          {formatDate(data.location.localtime, t('format'))}
        </p>
        <WeatherIcon
          className="local-weather__icon big"
          code={data.current.condition.code}
          alt="large weather icon"
          isDay={data.current.is_day}
        />
        <Measurement
          className={'local-weather__temp big'}
          metricValue={data.current.temp_c}
          imperialValue={data.current.temp_f}
          unitType="temperature"
        />
        <Measurement
          className={'local-weather__temp'}
          metricValue={data.current.feelslike_c}
          imperialValue={data.current.feelslike_f}
          unitType="temperature"
        >
          Feels like: &nbsp;
        </Measurement>
        <div className="local-weather__details">
          <div className="local-weather__details-item">
            <BiWind />
            <Measurement
              className={''}
              metricValue={data.current.wind_kph}
              imperialValue={data.current.wind_mph}
              unitType="distance"
            />
            /h
          </div>{' '}
          <div className="local-weather__details-item">
            <BsCloudRain />
            <Measurement
              className={''}
              metricValue={data.current.precip_mm}
              imperialValue={data.current.precip_in}
              unitType="quantity"
            />
          </div>
          <div className="local-weather__details-item">
            <BiDroplet />
            <p>{data.current.humidity}</p>
            &nbsp; %
          </div>
          <div className="local-weather__details-item">
            <WiBarometer />
            <Measurement
              className={''}
              metricValue={data.current.wind_kph}
              imperialValue={data.current.wind_mph}
              unitType="pressure"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalWeather;
