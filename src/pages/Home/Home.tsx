import WeatherBackground from '../../components/Backgrounds/WeatherBackground';
import { useContext } from 'react';
import LocalWeather from '../../components/LocalWeather/LocalWeather';
import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import GlobalWeather from '../../components/GlobalWeather/GlobalWeather';

const Home = () => {
  const { data } = useContext(WeatherStateContext);

  return (
    <div className="home page">
      <WeatherBackground code={data?.current.condition.code} isDay={data?.current.is_day ?? true} />
      <Search />
      <Recent />
      <LocalWeather />
      <GlobalWeather />
    </div>
  );
};

export default Home;
