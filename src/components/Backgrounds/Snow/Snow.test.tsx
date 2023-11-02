import { render, screen, act } from '@testing-library/react';
import Snow from './Snow';
import '@testing-library/jest-dom';

Date.now = jest.fn(() => 1234567890);

jest.useFakeTimers();

describe('Snow component', () => {
  it('should render the snow image', () => {
    render(<Snow />);
    expect(screen.getByAltText('snowy landscape')).toBeInTheDocument();
  });

  it('should add snowflakes over time', () => {
    render(<Snow />);
    expect(screen.queryAllByTestId('snowflake')).toHaveLength(0);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getAllByTestId('snowflake').length).toBeGreaterThan(0);
  });

  it('should apply the correct styles to the snowflakes', () => {
    render(<Snow />);
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const snowflake = screen.getByTestId('snowflake');
    expect(snowflake).toHaveStyle(`left: ${snowflake.style.left}`);
    expect(snowflake).toHaveStyle(`top: ${snowflake.style.top}`);
    expect(snowflake).toHaveStyle(`width: ${snowflake.style.width}`);
    expect(snowflake).toHaveStyle(`height: ${snowflake.style.height}`);
    expect(snowflake).toHaveStyle(
      `animation-duration: ${snowflake.style.animationDuration}`
    );
  });

  it('should remove raindrops that move out of the viewport', () => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 100,
    });

    render(<Snow />);
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const snowflakes = screen.queryAllByTestId('snowflake');

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    snowflakes.forEach((snowflake) => {
      expect(parseFloat(snowflake.style.top)).toBeLessThanOrEqual(100);
    });
  });
});
