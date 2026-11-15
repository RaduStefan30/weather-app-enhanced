import { getWeatherBackground } from '../../utils/weatherBackground';

const WeatherBackground = ({ code, isDay = true }: { code?: number; isDay?: boolean | number }) => {
  const { scene, night, tintNight, image } = getWeatherBackground(code, isDay);
  return (
    <div
      className={`background weather-background${tintNight ? ' weather-background--night' : ''}`}
      data-testid="weather-background"
      data-scene={scene}
      data-period={night ? 'night' : 'day'}
      aria-hidden="true"
    >
      <img src={image} alt="" />
    </div>
  );
};

export default WeatherBackground;
