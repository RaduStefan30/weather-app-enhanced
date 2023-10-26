import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchWeather } from './api/api';
import { weatherDataMock } from './__mocks__/weatherDataMock';

jest.mock('./api/fetchWeather');
const mockFetchWeatherData = fetchWeather as jest.MockedFunction<
  typeof fetchWeather
>;

describe('App Component', () => {
  beforeEach(() => {
    mockFetchWeatherData.mockResolvedValue(weatherDataMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders App component and fetches weather data', async () => {
    render(<App />);
    const headerElement = await screen.findByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });
});
