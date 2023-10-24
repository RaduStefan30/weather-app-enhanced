import { useContext, useEffect } from 'react';
import {
  WeatherStateContext,
  WeatherDispatchContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { useParams } from 'react-router-dom';

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

  return <div>{data.location.name}</div>;
};

export default WeatherDetails;
