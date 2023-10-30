import LocalWeather from '../../components/LocalWeather/LocalWeather';
import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  return (
    <div className="home page">
      <Search />
      <Recent />
      <LocalWeather />
    </div>
  );
};

export default Home;
