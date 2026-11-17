import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';
import { fetchSuggestions } from '../../api/api';
import { updateSearchesFromLocalStorage } from '../../utils/utils';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));
jest.mock('../../api/api');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        search: 'Search',
        searchCity: 'Search for a city',
        clearSearch: 'Clear search',
        searchSuggestions: 'Search suggestions',
      })[key] ?? key,
  }),
}));
jest.mock('../../utils/utils', () => ({
  updateSearchesFromLocalStorage: jest.fn(),
}));

const mockFetchSuggestions = fetchSuggestions as jest.MockedFunction<
  typeof fetchSuggestions
>;
const mockUpdateSearches =
  updateSearchesFromLocalStorage as jest.MockedFunction<
    typeof updateSearchesFromLocalStorage
  >;

describe('Search', () => {
  beforeEach(() => {
    mockFetchSuggestions.mockResolvedValue([
      {
        id: 1,
        name: 'Cluj-Napoca',
        region: 'Cluj',
        country: 'Romania',
        url: 'cluj-napoca',
      },
    ]);
  });

  afterEach(() => jest.clearAllMocks());

  it('searches from the keyboard and clears the field', async () => {
    render(<Search />);
    const input = screen.getByRole('textbox', { name: 'Search for a city' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Cluj' } });
    await waitFor(() => expect(mockFetchSuggestions).toHaveBeenCalledWith('Cluj'));
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockUpdateSearches).toHaveBeenCalledWith('Cluj');
    expect(navigate).toHaveBeenCalledWith('details/Cluj');

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
  });

  it('navigates to a selected suggestion and ignores an empty search', async () => {
    render(<Search />);
    const input = screen.getByRole('textbox', { name: 'Search for a city' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Cluj' } });
    fireEvent.click(await screen.findByRole('button', { name: /Cluj-Napoca/ }));

    expect(navigate).toHaveBeenCalledWith('details/cluj-napoca');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
