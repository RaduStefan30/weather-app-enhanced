export type Weather = {
  current: object;
  forecast: object;
  location: object;
};

export type WeatherState = {
  data: Weather | null;
  loading: boolean;
  location: string;
  error: string | null;
};

export type WeatherAction =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Weather }
  | { type: 'FETCH_FAILURE'; payload: string };
