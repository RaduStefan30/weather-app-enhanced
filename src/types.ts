export type WeatherData = {
  current: {
    temp_c: number;
    temp_f: number;
    condition: Condition;
  };
  forecast: {
    forecastday: [ForecastDay];
  };
  location: { name: string; country: string };
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
  icon: string;
  text: string;
};

export type Hour = {
  condition: Condition;
  time: string;
  temp_c: number;
  temp_f: number;
};

export type ForecastDay = {
  date: string;
  astro: object;
  hour: [Hour];
  day: {
    condition: Condition;
    avgtemp_c: number;
    avgtemp_f: number;
  };
};
