import { useContext } from 'react';
import LocalWeather from '../../components/LocalWeather/LocalWeather';
import Rain from '../../components/Rain/Rain';
import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Snow from '../../components/Snow/Snow';

const Home = () => {
  const { data } = useContext(WeatherStateContext);
  return (
    <div className="home page">
      {data?.current.condition.text.includes('rain') && <Rain />}
      {data?.current.condition.text.includes('snow') && <Snow />}
      <Search />
      <Recent />
      <LocalWeather />
    </div>
  );
};

export default Home;
