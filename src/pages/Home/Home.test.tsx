import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useContext: jest.fn(),
  };
});

jest.mock('../../components/LocalWeather/LocalWeather', () => () => (
  <div data-testid="local-weather" />
));
jest.mock('../../components/RecentSearches/RecentSearches', () => () => (
  <div data-testid="recent-searches" />
));
jest.mock('../../components/Search/Search', () => () => (
  <div data-testid="search" />
));
jest.mock('../../components/GlobalWeather/GlobalWeather', () => () => (
  <div data-testid="global-weather" />
));

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Rain component for a rain condition code regardless of language', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'Pluie', code: 1183,
          },
        },
      },
    });

    render(<Home />);
    const rainComponent = screen.queryByTestId('weather-background');
    expect(rainComponent).toHaveAttribute('data-scene', 'rain');
  });

  it('should render the Snow component for a snow condition code regardless of language', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'Neige', code: 1213,
          },
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('weather-background');
    expect(snowComponent).toHaveAttribute('data-scene', 'snow');
  });

  it('should render the Day component when all conditions are met', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'Clear', code: 1000,
          },
          is_day: 1,
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('weather-background');
    expect(snowComponent).toHaveAttribute('data-period', 'day');
  });

  it('should render the Night component when all conditions are met', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'Clear', code: 1000,
          },
          is_day: 0,
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('weather-background');
    expect(snowComponent).toHaveAttribute('data-period', 'night');
  });
});
