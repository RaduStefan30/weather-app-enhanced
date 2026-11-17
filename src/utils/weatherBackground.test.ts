import { existsSync } from 'fs';
import {
  getWeatherBackground,
  getWeatherScene,
  preloadWeatherBackgrounds,
  WEATHER_CODES,
  WEATHER_SCENES,
} from './weatherBackground';

describe('weather backgrounds', () => {
  it.each([
    [1117, 'blizzard'], [1153, 'drizzle'], [1204, 'ice'], [1198, 'ice'],
    [1087, 'storm'], [1279, 'storm'], [1135, 'fog'], [1009, 'overcast'],
    [1033, 'haze'], [1024, 'haze'], [1003, 'partly-cloudy'],
  ])('maps condition %s to %s', (code, scene) => {
    expect(getWeatherScene(Number(code))).toBe(scene);
  });

  it('has no duplicate condition codes', () => {
    const codes = Object.values(WEATHER_CODES).flat();
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('falls back safely for unknown or unavailable weather', () => {
    expect(getWeatherScene(9999)).toBe('clear');
    expect(getWeatherBackground().image).toBe('/backgrounds/clear.webp');
  });

  it.each(WEATHER_SCENES)('provides day and night assets for %s', (scene) => {
    for (const isDay of [0, 1]) {
      const background = getWeatherBackground(WEATHER_CODES[scene][0], isDay);
      expect(existsSync(`public${background.image}`)).toBe(true);
      expect(background.night).toBe(!isDay);
      expect(background.tintNight).toBe(!isDay && !['clear', 'partly-cloudy'].includes(scene));
    }
  });

  it('preloads each forecast background only once', () => {
    const OriginalImage = global.Image;
    const decode = jest.fn().mockResolvedValue(undefined);
    const ImageMock = jest.fn(() => ({
      decoding: 'auto',
      src: '',
      decode,
    })) as unknown as typeof Image;
    global.Image = ImageMock;

    preloadWeatherBackgrounds([
      { code: 1117, isDay: true },
      { code: 1117, isDay: true },
    ]);

    expect(ImageMock).toHaveBeenCalledTimes(1);
    expect(decode).toHaveBeenCalledTimes(1);
    global.Image = OriginalImage;
  });
});
