import WeatherBackground from '../../components/Backgrounds/WeatherBackground';
import { useContext, useEffect, useState } from 'react';
import {
  WeatherStateContext,
  WeatherDispatchContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { useParams } from 'react-router-dom';
import './WeatherDetails.scss';
import WeatherDetail from '../../components/WeatherDetailCard/WeatherDetailCard';
import { WeatherHourly } from '../../components/WeatherHourly/WeatherHourly';
import { formatDate } from '../../utils/utils';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const WeatherDetails = () => {
  const { data, loading, error } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);
  const { city } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (city && dispatch) dispatch({ type: 'UPDATE_LOCATION', payload: city });
  }, [city, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No weather data available</div>;

  const activeDay = data.forecast.forecastday[activeIndex];
  const isCurrentDay =
    activeDay?.date === data.location.localtime.split(' ')[0];
  const isDay = isCurrentDay ? data.current.is_day : true;
  const currentHour = Number(
    data.location.localtime.split(' ')[1]?.split(':')[0] ?? 0
  );
  const upcomingHours = isCurrentDay
    ? activeDay.hour.filter((hour) => {
        const hourValue = Number(hour.time.split(' ')[1]?.split(':')[0] ?? 0);
        return hourValue >= currentHour;
      })
    : activeDay.hour;
  const displayedHours = upcomingHours.length ? upcomingHours : activeDay.hour;

  return (
    <>
      <WeatherBackground code={activeDay?.day.condition.code} isDay={isDay} />
      <main className="weather-details-container slide-in page">
        <header className="weather-details-header">
          <p className="weather-details-eyebrow">{t('forecastFor')}</p>
          <h1 className="weather-details-title">{data.location.name}</h1>
          <p className="weather-details-location">
            {[data.location.region, data.location.country]
              .filter(Boolean)
              .join(', ')}
          </p>
        </header>

        <nav
          className="weather-details-date__container"
          aria-label={t('chooseDay')}
          role="tablist"
        >
          {data.forecast.forecastday.map((day, index) => (
            <button
              className={`weather-details-date ${
                activeIndex === index ? 'active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              key={day.date}
              role="tab"
              aria-selected={activeIndex === index}
            >
              {formatDate(day.date, t('format'), 'short')}
            </button>
          ))}
        </nav>

        {activeDay && (
          <section
            className="weather-details-forecast"
            key={activeDay.date}
            aria-label={t('dailyOutlook')}
          >
            <div className="weather-details-summary">
              <WeatherDetail
                details={activeDay}
                isDay={isDay}
                airQuality={isCurrentDay ? data.current.air_quality : undefined}
              />
            </div>
            <div className="weather-details-hourly-pane">
              <div className="weather-details-section-heading">
                <p>{t('nextHours')}</p>
                <h2>{t('hourlyForecast')}</h2>
              </div>
              <div className="weather-details-hourly">
                {displayedHours.map((hour) => (
                  <div className="weather-details-hourly-card" key={hour.time}>
                    <WeatherHourly hour={hour} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default WeatherDetails;
