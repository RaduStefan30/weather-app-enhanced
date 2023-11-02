import { render, screen, act } from '@testing-library/react';
import Rain from './Rain';
import '@testing-library/jest-dom';

Date.now = jest.fn(() => 1234567890);

jest.useFakeTimers();

describe('Rain component', () => {
  it('should render the rain image', () => {
    render(<Rain />);
    expect(screen.getByAltText('cloudy landscape')).toBeInTheDocument();
  });

  it('should add raindrops over time', () => {
    render(<Rain />);
    expect(screen.queryAllByTestId('raindrop')).toHaveLength(0);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getAllByTestId('raindrop').length).toBeGreaterThan(0);
  });

  it('should apply the correct styles to the raindrops', () => {
    render(<Rain />);
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const raindrop = screen.getByTestId('raindrop');
    expect(raindrop).toHaveStyle(`left: ${raindrop.style.left}`);
    expect(raindrop).toHaveStyle(`top: ${raindrop.style.top}`);
    expect(raindrop).toHaveStyle(`height: ${raindrop.style.height}`);
    expect(raindrop).toHaveStyle(
      `animation-duration: ${raindrop.style.animationDuration}`
    );
  });
});
