import { MAX_SEARCHES } from './constants';

export const getSearchesFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('searches') ?? '[]');

export const updateSearchesFromLocalStorage = (searchTerm: string) => {
  const maxItems = MAX_SEARCHES;
  const searches = getSearchesFromLocalStorage();
  if (!searches.includes(searchTerm)) {
    searches.unshift(searchTerm);
    if (searches.length > maxItems) {
      searches.pop();
    }
    localStorage.setItem('searches', JSON.stringify(searches));
  }
};

export const formatDate = (
  dateString: string,
  format: string,
  monthFormat: 'long' | 'short' = 'long'
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(format, {
    weekday: 'short',
    day: 'numeric',
    month: monthFormat,
  });
};
