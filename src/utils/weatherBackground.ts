export const WEATHER_SCENES = [
  'clear', 'partly-cloudy', 'overcast', 'fog', 'drizzle', 'rain',
  'storm', 'snow', 'blizzard', 'ice', 'haze',
] as const;

export type WeatherScene = typeof WEATHER_SCENES[number];

export type WeatherBackgroundData = ReturnType<typeof getWeatherBackground>;

type WeatherBackgroundRequest = {
  code?: number;
  isDay?: boolean | number;
};

const preloadedBackgrounds = new Set<string>();

// WeatherAPI condition codes: https://www.weatherapi.com/docs/weather_conditions.json
export const WEATHER_CODES: Record<WeatherScene, readonly number[]> = {
  clear: [1000],
  'partly-cloudy': [1003],
  overcast: [1006, 1009],
  fog: [1030, 1135, 1147],
  drizzle: [1150, 1153],
  rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246],
  storm: [1087, 1273, 1276, 1279, 1282],
  snow: [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258],
  blizzard: [1114, 1117],
  ice: [1069, 1072, 1168, 1171, 1198, 1201, 1204, 1207, 1237, 1249, 1252, 1261, 1264],
  haze: [1012, 1015, 1018, 1021, 1024, 1027, 1033, 1036, 1039, 1042, 1045, 1048],
};

export function getWeatherScene(code?: number): WeatherScene {
  return WEATHER_SCENES.find((scene) => WEATHER_CODES[scene].includes(code ?? -1)) ?? 'clear';
}

export function getWeatherBackground(code?: number, isDay: boolean | number = true) {
  const scene = getWeatherScene(code);
  const night = !isDay;
  const hasNightArt = scene === 'clear' || scene === 'partly-cloudy';
  return {
    scene,
    night,
    tintNight: night && !hasNightArt,
    image: `/backgrounds/${scene}${night && hasNightArt ? '-night' : ''}.webp`,
  };
}

export function preloadWeatherBackgrounds(
  backgrounds: WeatherBackgroundRequest[]
) {
  if (typeof Image === 'undefined') return;

  backgrounds.forEach(({ code, isDay }) => {
    const { image: src } = getWeatherBackground(code, isDay);
    if (preloadedBackgrounds.has(src)) return;

    preloadedBackgrounds.add(src);
    const image = new Image();
    image.decoding = 'async';
    image.src = src;

    if (image.decode) void image.decode().catch(() => undefined);
  });
}
