import axios from 'axios';
import { WeatherData } from '../types';

const url = 'https://api.weatherapi.com/v1';

export const fetchSuggestions = async (
  location: string
): Promise<Array<object>> => {
  const response = await axios.get(
    `${url}/search.json?key=${import.meta.env.VITE_SECRET_KEY}&q=${location}`
  );
  return response.data;
};

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const response = await axios.get(
    `${url}/forecast.json?key=${
      import.meta.env.VITE_SECRET_KEY
    }&q=${location}&days=3&aqi=yes&alerts=no`
  );
  return response.data;
};
