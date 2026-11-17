import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherAlerts from './WeatherAlerts';
import {
  initialState,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', resolvedLanguage: 'en' },
  }),
}));

it('shows the first active weather alert and stays out of the layout otherwise', () => {
  const { rerender } = render(<WeatherAlerts />);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  rerender(
    <WeatherStateContext.Provider
      value={{
        ...initialState,
        data: {
          ...weatherDataMock,
          alerts: {
            alert: [
              {
                event: 'Strong wind warning',
                headline: 'Strong wind warning for Cluj',
                expires: '2026-11-17 18:00',
              },
            ],
          },
        },
      }}
    >
      <WeatherAlerts />
    </WeatherStateContext.Provider>
  );

  expect(screen.getByRole('alert')).toHaveTextContent('Strong wind warning');
  expect(screen.getByText(/Nov 17, 2026, 6:00 PM/)).toBeInTheDocument();
});

it('hides provider alert codes when a readable headline is available', () => {
  render(
    <WeatherStateContext.Provider
      value={{
        ...initialState,
        data: {
          ...weatherDataMock,
          alerts: {
            alert: [
              {
                event: 'awareness_type=1, awareness_level=2',
                headline: 'Vânt puternic în zonele expuse',
                desc: 'Strong winds in exposed areas',
              },
            ],
          },
        },
      }}
    >
      <WeatherAlerts />
    </WeatherStateContext.Provider>
  );

  expect(screen.getByRole('heading')).toHaveTextContent('weatherAlert');
  expect(screen.getByText('Strong winds in exposed areas')).toBeInTheDocument();
  expect(screen.queryByText(/Vânt puternic/)).not.toBeInTheDocument();
  expect(screen.queryByText(/awareness_type/)).not.toBeInTheDocument();
});
