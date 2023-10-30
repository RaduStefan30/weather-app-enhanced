const getIconPath = (code: number, timeOfDay: string): string => {
  const mapping: { [key: number]: string } = {
    1000: `/${timeOfDay}/clear.svg`,
    1003: `/${timeOfDay}/partially_cloudy.svg`,
    1006: `/${timeOfDay}/cloudy.svg`,
    1009: `/${timeOfDay}/cloudy.svg`,
    1030: `/${timeOfDay}/cloudy.svg`,
    1063: `/${timeOfDay}/patchy-rain.svg`,
    1066: `/${timeOfDay}/patchy-snow.svg`,
    1069: `/${timeOfDay}/patchy-snow.svg`,
    1072: `/${timeOfDay}/patchy-snow.svg`,
    1087: `/${timeOfDay}/thunder.svg`,
    1114: `/${timeOfDay}/snow.svg`,
    1117: `/${timeOfDay}/snow.svg`,
    1135: `/${timeOfDay}/cloudy.svg`,
    1147: `/${timeOfDay}/cloudy.svg`,
    1150: `/${timeOfDay}/patchy-rain.svg`,
    1153: `/${timeOfDay}/patchy-rain.svg`,
    1168: `/${timeOfDay}/rain.svg`,
    1171: `/${timeOfDay}/snow.svg`,
    1180: `/${timeOfDay}/patchy-rain.svg`,
    1183: `/${timeOfDay}/patchy-rain.svg`,
    1186: `/${timeOfDay}/patchy-rain.svg`,
    1189: `/${timeOfDay}/rain.svg`,
    1192: `/${timeOfDay}/patchy-rain.svg`,
    1195: `/${timeOfDay}/rain.svg`,
    1198: `/${timeOfDay}/snow.svg`,
    1201: `/${timeOfDay}/snow.svg`,
    1204: `/${timeOfDay}/snow.svg`,
    1207: `/${timeOfDay}/snow.svg`,
    1210: `/${timeOfDay}/patchy-snow.svg`,
    1213: `/${timeOfDay}/patchy-snow.svg`,
    1216: `/${timeOfDay}/patchy-snow.svg`,
    1219: `/${timeOfDay}/patchy-snow.svg`,
    1222: `/${timeOfDay}/patchy-snow.svg`,
    1225: `/${timeOfDay}/patchy-snow.svg`,
    1237: `/${timeOfDay}/patchy-snow.svg`,
    1240: `/${timeOfDay}/patchy-rain.svg`,
    1243: `/${timeOfDay}/patchy-rain.svg`,
    1246: `/${timeOfDay}/patchy-rain.svg`,
    1249: `/${timeOfDay}/patchy-snow.svg`,
    1252: `/${timeOfDay}/patchy-snow.svg`,
    1255: `/${timeOfDay}/patchy-snow.svg`,
    1258: `/${timeOfDay}/patchy-snow.svg`,
    1261: `/${timeOfDay}/patchy-snow.svg`,
    1264: `/${timeOfDay}/patchy-snow.svg`,
    1273: `/${timeOfDay}/thunder.svg`,
    1276: `/${timeOfDay}/thunder.svg`,
    1279: `/${timeOfDay}/thunder.svg`,
    1282: `/${timeOfDay}/thunder.svg`,
  };

  return mapping[code] || `/${timeOfDay}/clear.png`;
};

export const getIconPathByCode = (code: number, isDay: boolean): string => {
  const timeOfDay = isDay ? 'day' : 'night';
  return getIconPath(code, timeOfDay);
};
