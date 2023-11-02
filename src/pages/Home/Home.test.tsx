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

  it('should render the Rain component when the condition text includes "rain"', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'rain',
          },
        },
      },
    });

    render(<Home />);
    const rainComponent = screen.queryByTestId('rain');
    expect(rainComponent).toBeInTheDocument();
  });

  it('should render the Snow component when the condition text includes "snow"', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'snow',
          },
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('snow');
    expect(snowComponent).toBeInTheDocument();
  });

  it('should render the Day component when all conditions are met', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'clear',
          },
          is_day: 1,
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('day');
    expect(snowComponent).toBeInTheDocument();
  });

  it('should render the Night component when all conditions are met', () => {
    (useContext as jest.Mock).mockReturnValue({
      data: {
        current: {
          condition: {
            text: 'clear',
          },
          is_day: 0,
        },
      },
    });

    render(<Home />);
    const snowComponent = screen.queryByTestId('night');
    expect(snowComponent).toBeInTheDocument();
  });
});
