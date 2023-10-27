import { WeatherData } from '../types';

export const weatherDataMock: WeatherData = {
  location: { name: 'London', country: 'United Kingdom' },
  current: {
    temp_c: 12,
    temp_f: 12,
    condition: {
      icon: '',
      text: '',
    },
  },
  forecast: {
    forecastday: [
      {
        date: '2023-10-11',
        astro: {},
        hour: [
          {
            condition: {
              icon: '',
              text: '',
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
          },
          avgtemp_c: 12,
          avgtemp_f: 30,
        },
      },
    ],
  },
};
