import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalWeather from './GlobalWeather';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: () => 'Weather Around the globe' }),
}));
jest.mock('../WeatherCard/WeatherCard', () => ({ search }: { search: string }) => (
  <div>{search}</div>
));

it('presents the global city collection', () => {
  render(<GlobalWeather />);

  expect(screen.getByRole('heading', { name: 'Weather Around the globe' })).toBeInTheDocument();
  expect(screen.getByText('London')).toBeInTheDocument();
  expect(screen.getByText('Bucharest')).toBeInTheDocument();
  expect(screen.getByText('Sydney')).toBeInTheDocument();
});
