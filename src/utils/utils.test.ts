import {
  getSearchesFromLocalStorage,
  updateSearchesFromLocalStorage,
  formatDate,
} from './utils';
import { MAX_SEARCHES } from './constants';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('localStorage utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should retrieve items correctly', () => {
    const initialSearches = ['search1', 'search2'];
    window.localStorage.setItem('searches', JSON.stringify(initialSearches));

    const searches = getSearchesFromLocalStorage();

    expect(searches).toEqual(initialSearches);
  });

  it('should update items correctly', () => {
    const searchTerm = 'newSearch';
    updateSearchesFromLocalStorage(searchTerm);

    const searches = getSearchesFromLocalStorage();

    expect(searches).toContain(searchTerm);
    expect(searches[0]).toBe(searchTerm);
    expect(searches.length).toBeLessThanOrEqual(MAX_SEARCHES);
  });

  it('should format dates correctly', () => {
    const date = '2020-01-01T00:00:00Z';
    const expectedFormat = 'Wed, 1 Jan';

    const formattedDate = formatDate(date, 'en-GB', 'short');

    expect(formattedDate).toBe(expectedFormat);
  });

  it('should not add a duplicate search term', () => {
    const searchTerm = 'existingSearch';
    updateSearchesFromLocalStorage(searchTerm);
    updateSearchesFromLocalStorage(searchTerm);

    const searches = getSearchesFromLocalStorage();
    expect(searches).toEqual([searchTerm]);
  });

  it('should remove the oldest search term when exceeding MAX_SEARCHES', () => {
    const maxSearches = MAX_SEARCHES;
    for (let i = 0; i < maxSearches; i++) {
      updateSearchesFromLocalStorage(`search${i}`);
    }

    const newSearchTerm = 'newSearch';
    updateSearchesFromLocalStorage(newSearchTerm);

    const searches = getSearchesFromLocalStorage();

    expect(searches).toContain(newSearchTerm);
    expect(searches).not.toContain('search0');
    expect(searches.length).toBe(maxSearches);
  });

  it('should format dates with long month format', () => {
    const date = '2020-01-01T00:00:00Z';
    const expectedFormatLong = 'Wed, 1 January';

    const formattedDateLong = formatDate(date, 'en-GB', 'long');

    expect(formattedDateLong).toBe(expectedFormatLong);
  });
});
