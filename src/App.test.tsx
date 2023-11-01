import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchWeather, getIP } from './api/api';
import { weatherDataMock } from './__mocks__/weatherDataMock';

jest.mock('./api/api');
jest.mock('swiper/bundle');
jest.mock('swiper/css/bundle');

const mockFetchWeatherData = fetchWeather as jest.MockedFunction<
  typeof fetchWeather
>;

const mockGetIP = getIP as jest.MockedFunction<typeof getIP>;

describe('App Component', () => {
  beforeEach(() => {
    mockFetchWeatherData.mockResolvedValue(weatherDataMock);
    mockGetIP.mockResolvedValue('103.14.104.0');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders App component with Header and Footer', async () => {
    render(<App />);
    const headerElement = await screen.findByRole('banner');
    const footerElement = screen.getByText(/weather data provided by/i);
    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  test('fetches weather data based on IP location', async () => {
    render(<App />);
    const weatherElement = await screen.findByText(/weather/i);
    expect(weatherElement).toBeInTheDocument();
  });
});
