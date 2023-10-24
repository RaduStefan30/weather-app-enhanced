import { useContext, useEffect } from 'react';
import {
  WeatherStateContext,
  WeatherDispatchContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { useParams } from 'react-router-dom';
import './WeatherDetails.scss';
import WeatherDetail from './WeatherDetail/WeatherDetail';

const WeatherDetails = () => {
  const { data, loading, error } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);
  const { city } = useParams();

  useEffect(() => {
    if (city && dispatch) dispatch({ type: 'UPDATE_LOCATION', payload: city });
  }, [city, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No weather data available</div>;

  return (
    <swiper-container>
      {data.forecast.forecastday.map((day) => {
        return (
          <swiper-slide key={day.date}>
            <WeatherDetail />
            <div className="weather-details">{day.date}</div>
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
};

export default WeatherDetails;
