import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetail from './WeatherDetailCard';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';
import {
  initialState,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        highLow: 'High / low',
        rainChance: 'Chance of rain',
        maxWind: 'Maximum wind',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        uvIndex: 'UV index',
        airQuality: 'Air quality',
        airQualityGood: 'Good',
      })[key] ?? key,
  }),
}));

it('presents a useful daily overview from the forecast response', () => {
  const details = {
    ...weatherDataMock.forecast.forecastday[0],
    day: {
      ...weatherDataMock.forecast.forecastday[0].day,
      condition: { code: 1003, text: 'Partly cloudy', icon: '' },
      maxtemp_c: 16,
      mintemp_c: 7,
      daily_chance_of_rain: 45,
    },
  };

  render(
    <WeatherStateContext.Provider value={initialState}>
      <WeatherDetail
        details={details}
        isDay={true}
        airQuality={{ 'us-epa-index': 1 }}
      />
    </WeatherStateContext.Provider>
  );

  expect(screen.getByText('High / low')).toBeInTheDocument();
  expect(screen.getByText('16°C')).toBeInTheDocument();
  expect(screen.getByText('7°C')).toBeInTheDocument();
  expect(screen.getByText('45%')).toBeInTheDocument();
  expect(screen.getByText('Good')).toBeInTheDocument();
  expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Partly cloudy' })).toBeInTheDocument();
});
