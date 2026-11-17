import axios from 'axios';
import { Suggestion, WeatherData } from '../types';
import { GENERIC_IP } from '../utils/constants';

const url = 'https://api.weatherapi.com/v1';
const apiKey = import.meta.env?.VITE_SECRET_KEY ?? '';

export const fetchSuggestions = async (
  location: string
): Promise<Array<Suggestion>> => {
  const response = await axios.get(`${url}/search.json`, {
    params: { key: apiKey, q: location },
  });
  return response.data;
};

export const fetchWeather = async (
  location: string,
  language = 'en'
): Promise<WeatherData> => {
  const response = await axios.get(`${url}/forecast.json`, {
    params: {
      key: apiKey,
      q: location,
      days: 3,
      aqi: 'yes',
      alerts: 'yes',
      lang: language,
    },
  });
  return response.data;
};

export const getIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    return GENERIC_IP;
  }
};
