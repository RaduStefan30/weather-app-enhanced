import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherHourly } from './WeatherHourly';
import {
  initialState,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

it('formats and presents an hourly forecast', () => {
  render(
    <WeatherStateContext.Provider value={initialState}>
      <WeatherHourly
        hour={{
          time: '2026-11-17 07:05',
          temp_c: 8,
          temp_f: 46,
          is_day: true,
          condition: { code: 1003, text: 'Partly cloudy', icon: '' },
          chance_of_rain: 40,
        }}
      />
    </WeatherStateContext.Provider>
  );

  expect(screen.getByText('07:05')).toBeInTheDocument();
  expect(screen.getByText('8°C')).toBeInTheDocument();
  expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
  expect(screen.getByText('40%')).toHaveAccessibleName('rainChance');
});
