import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentSearches from './RecentSearches';
import { fetchWeather } from '../../api/api';
import { getSearchesFromLocalStorage } from '../../utils/utils';
import { weatherDataMock } from '../../__mocks__/weatherDataMock';

jest.mock('../../api/api');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({ savedPlaces: 'Saved places', recentlyViewed: 'Recently viewed' })[
        key
      ] ?? key,
    i18n: { resolvedLanguage: 'en', language: 'en' },
  }),
}));
jest.mock('../../utils/utils');
jest.mock('./RecentCard/RecentCard', () => ({ location }: { location: { name: string } }) => (
  <div>{location.name}</div>
));

const mockFetchWeather = fetchWeather as jest.MockedFunction<typeof fetchWeather>;
const mockGetSearches =
  getSearchesFromLocalStorage as jest.MockedFunction<
    typeof getSearchesFromLocalStorage
  >;

describe('RecentSearches', () => {
  afterEach(() => jest.clearAllMocks());

  it('stays out of the layout when there are no saved places', () => {
    mockGetSearches.mockReturnValue([]);
    render(<RecentSearches />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('loads and labels saved places', async () => {
    mockGetSearches.mockReturnValue(['London']);
    mockFetchWeather.mockResolvedValue(weatherDataMock);
    render(<RecentSearches />);

    expect(await screen.findByText('London')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recently viewed' })).toBeInTheDocument();
    expect(mockFetchWeather).toHaveBeenCalledWith('London', 'en');
  });
});
