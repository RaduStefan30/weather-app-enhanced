import WeatherCard from '../WeatherCard/WeatherCard';
import './GlobalWeather.scss';

const GlobalWeather = () => {
  return (
    <div className="global-weather__section section">
      <div className="global-weather__header">
        <h2 className="global-weather__title title">
          Weather Around the globe
        </h2>
      </div>
      <div className="global-weather__content section-content">
        <WeatherCard key={'London'} search={'London'} />
        <WeatherCard key={'New York'} search={'New York'} />
        <WeatherCard key={'Tokyo'} search={'Tokyo'} />
        <WeatherCard key={'Bucharest'} search={'Bucharest'} />
        <WeatherCard key={'Beijing'} search={'Beijing'} />
        <WeatherCard key={'Sydney'} search={'Sydney'} />
      </div>
    </div>
  );
};

export default GlobalWeather;
