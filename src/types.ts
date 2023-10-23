export type WeatherData = {
  current: object;
  forecast: object;
  location: object;
};

export type WeatherState = {
  data: WeatherData | null;
  loading: boolean;
  location: string;
  error: string | null;
};

export type WeatherAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: WeatherData }
  | { type: 'FETCH_FAILURE'; payload: string };
