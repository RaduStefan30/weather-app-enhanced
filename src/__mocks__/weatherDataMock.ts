import { WeatherData } from '../types';

export const weatherDataMock: WeatherData = {
  location: {
    name: 'London',
    country: 'United Kingdom',
    region: '',
    localtime: '',
  },
  current: {
    temp_c: 12,
    temp_f: 12,
    condition: {
      icon: '',
      text: '',
      code: 0,
    },
    feelslike_c: 0,
    feelslike_f: 0,
    precip_mm: 0,
    precip_in: 0,
    humidity: 0,
    wind_kph: 0,
    wind_mph: 0,
    is_day: false,
  },
  forecast: {
    forecastday: [
      {
        date: '2023-10-11',
        astro: {},
        hour: [
          {
            is_day: true,
            condition: {
              icon: '',
              text: '',
              code: 0,
            },
            time: '00:00',
            temp_c: 12,
            temp_f: 12,
          },
        ],
        day: {
          condition: {
            icon: '',
            text: '',
            code: 0,
          },
          avgtemp_c: 12,
          avgtemp_f: 30,
        },
      },
    ],
  },
};
