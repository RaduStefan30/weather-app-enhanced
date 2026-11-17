import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherDetails from './WeatherDetails';
import {
  WeatherStateContext,
  initialState,
} from '../../contexts/WeatherContext/WeatherContext';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';
import { WeatherData } from '../../types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        format: 'en-GB',
        forecastFor: 'Forecast for',
        chooseDay: 'Choose forecast day',
        dailyOutlook: 'Daily outlook',
        dayAtGlance: 'The day at a glance',
        hourlyForecast: 'Hourly forecast',
      })[key] ?? key,
  }),
}));
jest.mock('../../components/WeatherDetailCard/WeatherDetailCard', () => ({
  details,
}: {
  details: WeatherData['forecast']['forecastday'][number];
}) => <div>{details.day.condition.text}</div>);
jest.mock('../../components/WeatherHourly/WeatherHourly', () => ({
  WeatherHourly: ({ hour }: { hour: { time: string } }) => (
    <div>{hour.time}</div>
  ),
}));

it('uses nighttime for today and daytime for future forecasts, updating weather when the date changes', () => {
  const today = {
    ...weatherDataMock.forecast.forecastday[0],
    date: '2026-11-15',
    day: { ...weatherDataMock.forecast.forecastday[0].day, condition: { code: 1000, text: 'Clear', icon: '' } },
  };
  const tomorrow = {
    ...today,
    date: '2026-11-16',
    day: { ...today.day, condition: { code: 1117, text: 'Blizzard', icon: '' } },
  };
  const data: WeatherData = {
    ...weatherDataMock,
    location: { ...weatherDataMock.location, localtime: '2026-11-15 23:00' },
    current: { ...weatherDataMock.current, is_day: false },
    forecast: { forecastday: [today] },
  };
  data.forecast.forecastday.push(tomorrow);
  render(
    <WeatherStateContext.Provider value={{ ...initialState, data }}>
      <WeatherDetails />
    </WeatherStateContext.Provider>
  );
  const image = screen.getByTestId('weather-background').querySelector('img');
  expect(image).toHaveAttribute('src', '/backgrounds/clear-night.webp');

  expect(screen.getByRole('tab', { name: /15 Nov/ })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(screen.getByText('Clear')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /16 Nov/ }));
  expect(image).toHaveAttribute('src', '/backgrounds/blizzard.webp');
  expect(screen.getByTestId('weather-background')).toHaveAttribute('data-period', 'day');
  expect(screen.getByText('Blizzard')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /15 Nov/ }));
  expect(image).toHaveAttribute('src', '/backgrounds/clear-night.webp');
});

it('renders loading, error, and empty states', () => {
  const { rerender } = render(
    <WeatherStateContext.Provider value={{ ...initialState, loading: true }}>
      <WeatherDetails />
    </WeatherStateContext.Provider>
  );
  expect(document.querySelector('.spinner')).toBeInTheDocument();

  rerender(
    <WeatherStateContext.Provider value={{ ...initialState, error: 'Offline' }}>
      <WeatherDetails />
    </WeatherStateContext.Provider>
  );
  expect(screen.getByText('Error: Offline')).toBeInTheDocument();

  rerender(
    <WeatherStateContext.Provider value={initialState}>
      <WeatherDetails />
    </WeatherStateContext.Provider>
  );
  expect(screen.getByText('No weather data available')).toBeInTheDocument();
});
