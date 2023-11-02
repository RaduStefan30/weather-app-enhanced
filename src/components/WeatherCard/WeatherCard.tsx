import './WeatherCard.scss';
import { useEffect, useState } from 'react';
import { fetchWeather } from '../../api/api';
import { WeatherData } from '../../types';
import Spinner from '../Spinner/Spinner';
import RecentCard from '../RecentSearches/RecentCard/RecentCard';

const WeatherCard = ({ search }: { search: string }) => {
  const [data, setData] = useState<WeatherData>();
  useEffect(() => {
    const fetchData = async () => {
      const weather = await fetchWeather(search);
      setData(weather);
    };
    fetchData();
  }, [data, search]);
  if (!data) return <Spinner />;
  return (
    <RecentCard
      key={search}
      current={data.current}
      location={data.location}
      classNames={''}
    />
  );
};

export default WeatherCard;
