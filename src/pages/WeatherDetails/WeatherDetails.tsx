import { useContext, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
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
import Rain from '../../components/Backgrounds/Rain/Rain';
import Snow from '../../components/Backgrounds/Snow/Snow';
import Day from '../../components/Backgrounds/Day/Day';
import { useTranslation } from 'react-i18next';

const WeatherDetails = () => {
  const { data, loading, error, location } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);
  const { city } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const { t } = useTranslation();

  const conditionText =
    data?.forecast.forecastday[activeIndex].day.condition.text ?? '';
  const isRaining = conditionText.includes('rain');
  const isSnowing = conditionText.includes('snow');

  const swiperRef1 = useRef<Swiper | null>(null);
  const swiperRef2 = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperRef2.current && data) {
      setAnimationTrigger(true);

      setTimeout(() => {
        swiperRef2.current!.slideTo(0);
        swiperRef2.current!.update();
        setAnimationTrigger(false);
      }, 400);
    }

    swiperRef1.current = new Swiper('.swiper1', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: (swiper) => {
          setActiveIndex(swiper.activeIndex);
        },
      },
    });

    swiperRef2.current = new Swiper('.swiper2', {
      slidesPerView: 3,
      slidesOffsetBefore: 25,
      slidesOffsetAfter: 25,
      spaceBetween: 20,
      breakpoints: {
        425: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1440: {
          slidesPerView: 6,
        },
        3840: {
          slidesPerView: 8,
        },
      },
      on: {
        init(swiper) {
          swiper.slideTo(0);
          swiper.update();
        },
      },
    });
  }, [data, activeIndex]);

  useEffect(() => {
    if (city && dispatch) dispatch({ type: 'UPDATE_LOCATION', payload: city });
  }, [city, dispatch, location]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No weather data available</div>;

  return (
    <>
      {isRaining && <Rain />}
      {isSnowing && <Snow />}
      {!isRaining && !isSnowing && <Day />}
      <div className="weather-details-container slide-in page">
        <h1 className="weather-details-title">{data.location.name}</h1>
        <div className="swiper1">
          <div className="swiper-wrapper">
            {data.forecast.forecastday.map((day) => (
              <div className="swiper-slide" key={day.date}>
                <WeatherDetail details={day} isDay={data.current.is_day} />
              </div>
            ))}
          </div>
        </div>
        <div className="weather-details-date__container">
          {data.forecast.forecastday.map((day, index) => (
            <button
              className={`no-styles-button 
             ${
               activeIndex === index
                 ? 'weather-details-date active'
                 : 'weather-details-date'
             }`}
              onClick={() => setActiveIndex(index)}
              key={day.date}
            >
              {formatDate(day.date, t('format'), 'short')}
            </button>
          ))}
        </div>

        <div className="swiper2">
          <div
            className={`swiper-wrapper weather-details-hourly ${
              animationTrigger ? 'animate-out' : 'animate-in'
            }`}
          >
            {data.forecast.forecastday.flatMap((day, index) => {
              if (activeIndex === index)
                return day.hour.map((hour) => (
                  <div
                    className="swiper-slide weather-details-hourly-card"
                    key={hour.time}
                  >
                    <WeatherHourly key={hour.time} hour={hour} />
                  </div>
                ));
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
