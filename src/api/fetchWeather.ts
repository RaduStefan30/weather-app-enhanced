import axios from 'axios';
import { Weather } from '../types';

export const fetchWeatherData = async (location: string): Promise<Weather> => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_SECRET_KEY
    }&q=${location}&days=7&aqi=yes&alerts=no`
  );
  return response.data;
};
