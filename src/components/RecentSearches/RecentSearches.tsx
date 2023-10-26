import { useEffect, useState, ReactElement } from 'react';
import { fetchWeather } from '../../api/api';
import './RecentSearches.scss';
import RecentCard from './RecentCard/RecentCard';
import { getSearchesFromLocalStorage } from '../../utils/utils';

const Recent = () => {
  const [recentSearches, setRecentSearches] = useState<ReactElement[]>([]);
  useEffect(() => {
    const searches = getSearchesFromLocalStorage();

    const fetchData = async () => {
      const searchResults = await Promise.all(
        searches.map(async (search: string) => {
          const data = await fetchWeather(search);
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
