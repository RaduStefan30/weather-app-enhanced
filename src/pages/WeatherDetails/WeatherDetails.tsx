import { useContext, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {
  WeatherStateContext,
  WeatherDispatchContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { useParams } from 'react-router-dom';
import './WeatherDetails.scss';
import WeatherDetail from './WeatherDetail/WeatherDetail';
import { ForecastDay } from '../../types';
import { WeatherHourly } from './WeatherHourly/WeatherHourly';
import { formatDate } from '../../utils/utils';

const WeatherDetails = () => {
  const { data, loading, error, location } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);
  const { city } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No weather data available</div>;

  return (
    <div className="weather-details-container">
      <h1 className="weather-details-title">{data.location.name}</h1>
      <div className="swiper1">
        <div className="swiper-wrapper">
          {data.forecast.forecastday.map((day) => (
            <div className="swiper-slide" key={day.date}>
              <WeatherDetail details={day as ForecastDay} />
            </div>
          ))}
        </div>
      </div>
      <div className="weather-details-date__container">
        {data.forecast.forecastday.map((day, index) => (
          <div
            className={
              activeIndex === index
                ? 'weather-details-date active'
                : 'weather-details-date'
            }
            onClick={() => setActiveIndex(index)}
            key={day.date}
          >
            {formatDate(day.date)}
          </div>
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
  );
};

export default WeatherDetails;
