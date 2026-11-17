export type WeatherData = {
  current: {
    feelslike_c: number;
    feelslike_f: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    wind_mph: number;
    pressure_mb: number;
    pressure_in: number;
    uv?: number;
    vis_km?: number;
    vis_miles?: number;
    gust_kph?: number;
    gust_mph?: number;
    air_quality?: AirQuality;
    condition: Condition;
    is_day: boolean;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  alerts?: {
    alert: WeatherAlert[];
  };
};

export type AirQuality = {
  co?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  pm2_5?: number;
  pm10?: number;
  'us-epa-index'?: number;
  'gb-defra-index'?: number;
};

export type WeatherAlert = {
  headline: string;
  severity?: string;
  urgency?: string;
  areas?: string;
  event?: string;
  effective?: string;
  expires?: string;
  desc?: string;
  instruction?: string;
};

export type WeatherState = {
  data: WeatherData | null;
  loading: boolean;
  location: string;
  error: string | null;
  units: {
    temp: string;
    distance: string;
    quantity: string;
  };
};

export type WeatherAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherData }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'UPDATE_LOCATION'; payload: string }
  | {
      type: 'UPDATE_UNITS';
      payload: { temp: string; distance: string; quantity: string };
    };

export type Condition = {
  code: number;
  icon: string;
  text: string;
};

export type Hour = {
  is_day: boolean;
  condition: Condition;
  time: string;
  temp_c: number;
  temp_f: number;
  feelslike_c?: number;
  feelslike_f?: number;
  chance_of_rain?: number;
  chance_of_snow?: number;
  wind_kph?: number;
  wind_mph?: number;
  gust_kph?: number;
  gust_mph?: number;
  humidity?: number;
  uv?: number;
};

export type ForecastDay = {
  date: string;
  astro: {
    sunrise?: string;
    sunset?: string;
    moonrise?: string;
    moonset?: string;
    moon_phase?: string;
  };
  hour: Hour[];
  day: {
    condition: Condition;
    maxtemp_c?: number;
    maxtemp_f?: number;
    mintemp_c?: number;
    mintemp_f?: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_kph?: number;
    maxwind_mph?: number;
    totalprecip_mm?: number;
    totalprecip_in?: number;
    avghumidity?: number;
    uv?: number;
    daily_chance_of_rain?: number;
    daily_chance_of_snow?: number;
  };
};

export type Suggestion = {
  id: number;
  name: string;
  region: string;
  country: string;
  url: string;
};
