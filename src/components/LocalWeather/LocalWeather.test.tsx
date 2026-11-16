import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalWeather from './LocalWeather';
import {
  initialState,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';
import { WeatherData } from '../../types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        format: 'en-GB',
        conditions: 'London Weather Conditions',
        rightNow: 'Right now',
        feelsLike: 'Feels like',
        wind: 'Wind',
        rainfall: 'Rainfall',
        humidity: 'Humidity',
        pressure: 'Pressure',
        todaysOutlook: 'Today’s outlook',
      })[key] ?? key,
  }),
}));

describe('LocalWeather', () => {
  it('shows a loading state while current weather is unavailable', () => {
    render(
      <WeatherStateContext.Provider value={initialState}>
        <LocalWeather />
      </WeatherStateContext.Provider>
    );

    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  it('presents current conditions, details, and today’s outlook', () => {
    const data: WeatherData = {
      ...weatherDataMock,
      location: {
        ...weatherDataMock.location,
        localtime: '2026-11-16 10:30',
      },
      current: {
        ...weatherDataMock.current,
        humidity: 83,
        pressure_mb: 1011,
        pressure_in: 29.85,
        condition: { code: 1003, text: 'Partly cloudy', icon: '' },
      },
      forecast: {
        forecastday: [
          {
            ...weatherDataMock.forecast.forecastday[0],
            day: {
              ...weatherDataMock.forecast.forecastday[0].day,
              condition: { code: 1009, text: 'Overcast', icon: '' },
            },
          },
        ],
      },
    };

    render(
      <WeatherStateContext.Provider value={{ ...initialState, data }}>
        <LocalWeather />
      </WeatherStateContext.Provider>
    );

    expect(screen.getByRole('heading', { name: 'London Weather Conditions' })).toBeInTheDocument();
    expect(screen.getByText('London, United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('1011 mb')).toBeInTheDocument();
    expect(screen.getByText('Today’s outlook')).toBeInTheDocument();
    expect(screen.getByText('Overcast')).toBeInTheDocument();
  });
});
