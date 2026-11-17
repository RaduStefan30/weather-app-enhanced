import WeatherBackground from '../../components/Backgrounds/WeatherBackground';
import { useContext } from 'react';
import LocalWeather from '../../components/LocalWeather/LocalWeather';
import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import GlobalWeather from '../../components/GlobalWeather/GlobalWeather';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { data } = useContext(WeatherStateContext);
  const { t } = useTranslation();

  return (
    <div className="home page">
      <WeatherBackground code={data?.current.condition.code} isDay={data?.current.is_day ?? true} />
      <main className="home__shell">
        <section className="home__intro" aria-labelledby="home-title">
          <div className="home__intro-copy">
            <p className="home__eyebrow">{t('localForecast')}</p>
            <h1 id="home-title">{t('homeTitle')}</h1>
            <p className="home__lede">{t('homeLede')}</p>
          </div>
          <Search />
        </section>
        <Recent />
        <LocalWeather />
        <GlobalWeather />
      </main>
    </div>
  );
};

export default Home;
