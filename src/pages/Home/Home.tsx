import Recent from '../../components/RecentSearches/RecentSearches';
import Search from '../../components/Search/Search';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <Search />
      <Recent />
    </div>
  );
};

export default Home;
