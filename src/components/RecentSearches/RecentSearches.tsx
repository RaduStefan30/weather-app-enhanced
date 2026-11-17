import { useEffect, useState, ReactElement } from 'react';
import { fetchWeather } from '../../api/api';
import './RecentSearches.scss';
import RecentCard from './RecentCard/RecentCard';
import { getSearchesFromLocalStorage } from '../../utils/utils';
import { useTranslation } from 'react-i18next';

const Recent = () => {
  const { t } = useTranslation();
  const [recentSearches, setRecentSearches] = useState<ReactElement[]>([]);
  useEffect(() => {
    const searches = getSearchesFromLocalStorage();
    if (!searches.length) return;

    const fetchData = async () => {
      const searchResults = await Promise.all(
        searches.map(async (search: string, index: number) => {
          const data = await fetchWeather(search);
          return (
            <RecentCard
              key={search}
              current={data.current}
              location={data.location}
              classNames={index % 2 === 0 ? 'slide-left' : 'slide-right'}
            />
          );
        })
      );
      setRecentSearches(searchResults);
    };

    fetchData();
  }, []);

  if (!recentSearches.length) return null;

  return (
    <section className="recent-section" aria-labelledby="recent-title">
      <div className="recent-section__heading">
        <p>{t('savedPlaces')}</p>
        <h2 id="recent-title">{t('recentlyViewed')}</h2>
      </div>
      <div className={`recent-container grid-${recentSearches.length}`}>
        {recentSearches}
      </div>
    </section>
  );
};

export default Recent;
