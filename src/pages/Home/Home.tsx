import { useContext } from 'react';
import LocalWeather from '../../components/LocalWeather/LocalWeather';
import Rain from '../../components/Backgrounds/Rain/Rain';
import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';
import Snow from '../../components/Backgrounds/Snow/Snow';
import GlobalWeather from '../../components/GlobalWeather/GlobalWeather';
import Day from '../../components/Backgrounds/Day/Day';
import Night from '../../components/Backgrounds/Night/Night';

const Home = () => {
  const { data } = useContext(WeatherStateContext);
  const conditionText = data?.current.condition.text;
  const isDay = data?.current.is_day;
  const isRaining = conditionText?.includes('rain');
  const isSnowing = conditionText?.includes('snow');

  return (
    <div className="home page">
      {isRaining && <Rain />}
      {isSnowing && <Snow />}
      {!isRaining && !isSnowing && (isDay ? <Day /> : <Night />)}
      <Search />
      <Recent />
      <LocalWeather />
      <GlobalWeather />
    </div>
  );
};

export default Home;
