import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherCard from './WeatherCard';
import { fetchWeather } from '../../api/api';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';

jest.mock('../../api/api');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { resolvedLanguage: 'en', language: 'en' },
  }),
}));
jest.mock('../Spinner/Spinner', () => () => <div>Loading</div>);
jest.mock('../RecentSearches/RecentCard/RecentCard', () => ({
  location,
}: {
  location: { name: string };
}) => <div>{location.name}</div>);

const mockFetchWeather = fetchWeather as jest.MockedFunction<
  typeof fetchWeather
>;

describe('WeatherCard', () => {
  beforeEach(() => {
    mockFetchWeather.mockResolvedValue(weatherDataMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches once per search instead of refetching after data is stored', async () => {
    const { rerender } = render(<WeatherCard search="London" />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    await screen.findByText('London');
    expect(mockFetchWeather).toHaveBeenCalledTimes(1);
    expect(mockFetchWeather).toHaveBeenLastCalledWith('London', 'en');

    rerender(<WeatherCard search="London" />);
    await waitFor(() => expect(mockFetchWeather).toHaveBeenCalledTimes(1));

    rerender(<WeatherCard search="Paris" />);
    await waitFor(() => expect(mockFetchWeather).toHaveBeenCalledTimes(2));
    expect(mockFetchWeather).toHaveBeenLastCalledWith('Paris', 'en');
  });
});
