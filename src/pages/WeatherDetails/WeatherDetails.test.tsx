import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        nextHours: 'Next hours',
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

it('uses nighttime for today and daytime for future forecasts, updating weather when the date changes', async () => {
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
  const background = screen.getByTestId('weather-background');
  expect(
    background.querySelector('.weather-background__layer--current img')
  ).toHaveAttribute('src', '/backgrounds/clear-night.webp');

  expect(screen.getByRole('tab', { name: /15 Nov/ })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  expect(screen.getByText('Clear')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /16 Nov/ }));
  const pendingBlizzard = background.querySelector(
    '.weather-background__layer--pending img'
  );
  expect(pendingBlizzard).toHaveAttribute('src', '/backgrounds/blizzard.webp');
  fireEvent.load(pendingBlizzard!);
  await waitFor(() =>
    expect(background).toHaveAttribute('data-period', 'day')
  );
  expect(screen.getByText('Blizzard')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /15 Nov/ }));
  const pendingClear = background.querySelector(
    '.weather-background__layer--pending img'
  );
  expect(pendingClear).toHaveAttribute('src', '/backgrounds/clear-night.webp');
  fireEvent.load(pendingClear!);
  await waitFor(() =>
    expect(
      background.querySelector('.weather-background__layer--current img')
    ).toHaveAttribute('src', '/backgrounds/clear-night.webp')
  );
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
