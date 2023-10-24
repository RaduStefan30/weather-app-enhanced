import { useEffect, useState, ReactElement } from 'react';
import { fetchWeatherData } from '../../api/fetchWeather';
import './RecentSearches.scss';
import RecentCard from './RecentCard/RecentCard';

const Recent = () => {
  const [recentSearches, setRecentSearches] = useState<ReactElement[]>([]);
  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('searches') || '[]');

    const fetchData = async () => {
      const searchResults = await Promise.all(
        searches.map(async (search: string) => {
          const data = await fetchWeatherData(search);
          return (
            <RecentCard
              key={search}
              current={data.current}
              location={data.location}
              forecast={data.forecast}
            />
          );
        })
      );
      setRecentSearches(searchResults);
    };

    fetchData();
  }, []);

  return <div className="recent-container">{recentSearches}</div>;
};

export default Recent;
