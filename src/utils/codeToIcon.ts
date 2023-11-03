const getIconPath = (code: number, timeOfDay: string): string => {
  const mapping: { [key: number]: string } = {
    1000: `/${timeOfDay}/clear.svg`,
    1003: `/${timeOfDay}/partlyCloudy.svg`,
    1006: `/${timeOfDay}/cloudy.svg`,
    1009: `/${timeOfDay}/cloudy.svg`,
    1030: `/${timeOfDay}/mist.svg`,
    1063: `/${timeOfDay}/patchyRain.svg`,
    1066: `/${timeOfDay}/patchySnow.svg`,
    1069: `/${timeOfDay}/sleet.svg`,
    1072: `/${timeOfDay}/hail.svg`,
    1087: `/${timeOfDay}/patchyThunder.svg`,
    1114: `/${timeOfDay}/snow.svg`,
    1117: `/${timeOfDay}/snow.svg`,
    1135: `/${timeOfDay}/mist.svg`,
    1147: `/${timeOfDay}/mist.svg`,
    1150: `/${timeOfDay}/patchyDrizzle.svg`,
    1153: `/${timeOfDay}/patchyDrizzle.svg`,
    1168: `/${timeOfDay}/hail.svg`,
    1171: `/${timeOfDay}/hail.svg`,
    1180: `/${timeOfDay}/patchyRain.svg`,
    1183: `/${timeOfDay}/lightRain.svg`,
    1186: `/${timeOfDay}/lightRain.svg`,
    1189: `/${timeOfDay}/rain.svg`,
    1192: `/${timeOfDay}/lightRain.svg`,
    1195: `/${timeOfDay}/rain.svg`,
    1198: `/${timeOfDay}/snow.svg`,
    1201: `/${timeOfDay}/snow.svg`,
    1204: `/${timeOfDay}/sleet.svg`,
    1207: `/${timeOfDay}/hail.svg`,
    1210: `/${timeOfDay}/patchySnow.svg`,
    1213: `/${timeOfDay}/patchySnow.svg`,
    1216: `/${timeOfDay}/patchySnow.svg`,
    1219: `/${timeOfDay}/snow.svg`,
    1222: `/${timeOfDay}/patchySnow.svg`,
    1225: `/${timeOfDay}/snow.svg`,
    1237: `/${timeOfDay}/snow.svg`,
    1240: `/${timeOfDay}/lightRain.svg`,
    1243: `/${timeOfDay}/lightRain.svg`,
    1246: `/${timeOfDay}/lightRain.svg`,
    1249: `/${timeOfDay}/lightHail.svg`,
    1252: `/${timeOfDay}/lightHail.svg`,
    1255: `/${timeOfDay}/patchySnow.svg`,
    1258: `/${timeOfDay}/patchySnow.svg`,
    1261: `/${timeOfDay}/patchySnow.svg`,
    1264: `/${timeOfDay}/patchySnow.svg`,
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
