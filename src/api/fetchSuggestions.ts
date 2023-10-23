import axios from 'axios';

export const fetchSuggestions = async (
  location: string
): Promise<Array<object>> => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/search.json?key=${
      import.meta.env.VITE_SECRET_KEY
    }&q=${location}`
  );
  return response.data;
};
