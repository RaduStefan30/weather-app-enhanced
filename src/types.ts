export type WeatherData = {
  current: {
    temp_c: string;
    condition: {
      icon: string;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      astro: object;
      day: object;
    }>;
  };
  location: { name: string; country: string };
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
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'UPDATE_LOCATION'; payload: string };
