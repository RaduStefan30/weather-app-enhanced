import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetail from './WeatherDetailCard';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';
import {
  initialState,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => 'Average temperature' }),
}));

it('presents the daily condition and average temperature', () => {
  const details = {
    ...weatherDataMock.forecast.forecastday[0],
    day: {
      ...weatherDataMock.forecast.forecastday[0].day,
      condition: { code: 1003, text: 'Partly cloudy', icon: '' },
      avgtemp_c: 14,
    },
  };

  render(
    <WeatherStateContext.Provider value={initialState}>
      <WeatherDetail details={details} isDay={true} />
    </WeatherStateContext.Provider>
  );

  expect(screen.getByText('Average temperature')).toBeInTheDocument();
  expect(screen.getByText('14°C')).toBeInTheDocument();
  expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Partly cloudy' })).toBeInTheDocument();
});
