import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import * as api from './api/api';
import { weatherDataMock } from './__mocks__/weatherDataMock';
import { GENERIC_IP } from './utils/constants';

jest.mock('./api/api');
jest.mock('swiper/bundle');
jest.mock('swiper/css/bundle');

const mockFetchWeatherData = api.fetchWeather as jest.MockedFunction<
  typeof api.fetchWeather
>;
const mockGetIP = api.getIP as jest.MockedFunction<typeof api.getIP>;

describe('App Component', () => {
  beforeEach(() => {
    mockGetIP.mockResolvedValue(GENERIC_IP);
    mockFetchWeatherData.mockResolvedValue(weatherDataMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the main header on initial load', async () => {
    render(<App />);
    const headerElement = await screen.findByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('should render the footer when weather data is available', async () => {
    render(<App />);
    const footerElement = await screen.findByText(/weather data provided by/i);
    expect(footerElement).toBeInTheDocument();
  });

  test('should hide the footer when no weather data is available', async () => {
    mockFetchWeatherData.mockResolvedValue(null!);

    render(<App />);
    const headerElement = await screen.findByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.queryByText(/weather data provided by/i);
    expect(footerElement).not.toBeInTheDocument();
  });
});
