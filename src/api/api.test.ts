import axios from 'axios';
import { fetchWeather } from './api';
import { weatherDataMock } from '../__mocks__/weatherDataMock';

jest.mock('axios');

const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;

it('requests localized forecasts with alerts and air quality', async () => {
  mockGet.mockResolvedValue({ data: weatherDataMock });

  await fetchWeather('New York', 'ro');

  expect(mockGet).toHaveBeenCalledWith(
    expect.stringContaining(
      'q=New%20York&days=3&aqi=yes&alerts=yes&lang=ro'
    )
  );
});
