import './WeatherCard.scss';
import { useEffect, useState } from 'react';
import { fetchWeather } from '../../api/api';
import { WeatherData } from '../../types';
import Spinner from '../Spinner/Spinner';
import RecentCard from '../RecentSearches/RecentCard/RecentCard';
import { useTranslation } from 'react-i18next';

const WeatherCard = ({ search }: { search: string }) => {
  const [data, setData] = useState<WeatherData>();
  const { i18n } = useTranslation();
  const weatherLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en')
    .split('-')[0];

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchData = async () => {
      const weather = await fetchWeather(search, weatherLanguage);
      if (isCurrentRequest) setData(weather);
    };

    fetchData();

    return () => {
      isCurrentRequest = false;
    };
  }, [search, weatherLanguage]);

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
