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
  const today = data.forecast.forecastday[0];
  return (
    <section className="local-weather__section section">
      <div className="local-weather__header">
        <p className="local-weather__eyebrow">{t('rightNow')}</p>
        <h2 className="local-weather__title no-wrap">
          {t('conditions', { city: data.location.name })}
        </h2>
      </div>
      <div className="local-weather__content section-content">
        <div className="local-weather__summary">
          <LocationName
            name={data.location.name}
            region=""
            country={data.location.country}
            classNames="local-weather__location no-wrap"
          />
          <p className="local-weather__date">
            {formatDate(data.location.localtime, t('format'))}
          </p>
          <div className="local-weather__reading">
            <WeatherIcon
              className="local-weather__icon big"
              code={data.current.condition.code}
              alt={data.current.condition.text}
              isDay={data.current.is_day}
            />
            <Measurement
              className={'local-weather__temp big'}
              metricValue={data.current.temp_c}
              imperialValue={data.current.temp_f}
              unitType="temperature"
            />
          </div>
          <p className="local-weather__condition">
            {data.current.condition.text}
          </p>
          <Measurement
            className={'local-weather__temp'}
            metricValue={data.current.feelslike_c}
            imperialValue={data.current.feelslike_f}
            unitType="temperature"
          >
            {`${t('feelsLike')}: `}
          </Measurement>
        </div>
        <div className="local-weather__details">
          <div className="local-weather__details-item">
            <BiWind aria-hidden="true" />
            <span>{t('wind')}</span>
            <div className="local-weather__detail-value">
              <Measurement
                className={''}
                metricValue={data.current.wind_kph}
                imperialValue={data.current.wind_mph}
                unitType="distance"
              />
              <span>/h</span>
            </div>
          </div>{' '}
          <div className="local-weather__details-item">
            <BsCloudRain aria-hidden="true" />
            <span>{t('rainfall')}</span>
            <Measurement
              className={''}
              metricValue={data.current.precip_mm}
              imperialValue={data.current.precip_in}
              unitType="quantity"
            />
          </div>
          <div className="local-weather__details-item">
            <BiDroplet aria-hidden="true" />
            <span>{t('humidity')}</span>
            <p>{data.current.humidity} %</p>
          </div>
          <div className="local-weather__details-item">
            <WiBarometer aria-hidden="true" />
            <span>{t('pressure')}</span>
            <Measurement
              className={''}
              metricValue={data.current.pressure_mb}
              imperialValue={data.current.pressure_in}
              unitType="pressure"
            />
          </div>
        </div>
        {today && (
          <div className="local-weather__forecast">
            <div>
              <p className="local-weather__forecast-label">
                {t('todaysOutlook')}
              </p>
              <p>{today.day.condition.text}</p>
            </div>
            <div className="local-weather__forecast-reading">
              <WeatherIcon
                className="local-weather__forecast-icon"
                code={today.day.condition.code}
                alt=""
                isDay={true}
              />
              <Measurement
                className="local-weather__forecast-temp"
                metricValue={today.day.avgtemp_c}
                imperialValue={today.day.avgtemp_f}
                unitType="temperature"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalWeather;
