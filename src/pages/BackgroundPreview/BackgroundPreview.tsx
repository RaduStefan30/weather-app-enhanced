import { useState } from 'react';
import WeatherBackground from '../../components/Backgrounds/WeatherBackground';
import { WEATHER_CODES, WEATHER_SCENES, WeatherScene } from '../../utils/weatherBackground';
import './BackgroundPreview.scss';

const BackgroundPreview = () => {
  const [scene, setScene] = useState<WeatherScene>('clear');
  const [isDay, setIsDay] = useState(true);
  return (
    <main className="background-preview">
      <WeatherBackground code={WEATHER_CODES[scene][0]} isDay={isDay} />
      <section className="background-preview__panel">
        <a href="/">← Back to weather</a>
        <h1>A change in the weather</h1>
        <p>Explore the illustrated landscapes, from clear skies to winter storms.</p>
        <label htmlFor="scene">Weather</label>
        <select id="scene" value={scene} onChange={(event) => setScene(event.target.value as WeatherScene)}>
          {WEATHER_SCENES.map((value) => <option key={value} value={value}>{value.replace('-', ' ')}</option>)}
        </select>
        <button type="button" aria-pressed={!isDay} onClick={() => setIsDay(!isDay)}>
          {isDay ? 'Switch to night' : 'Switch to day'}
        </button>
        <small>Artwork preview · no live weather data</small>
      </section>
    </main>
  );
};
export default BackgroundPreview;
