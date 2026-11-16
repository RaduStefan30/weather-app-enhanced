import { render, screen } from '@testing-library/react';
import Day from './Day';
import '@testing-library/jest-dom';

describe('Day component', () => {
  it('should render a decorative day background', () => {
    render(<Day />);
    expect(screen.getByTestId('day')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have the correct class', () => {
    render(<Day />);
    const dayBackground = screen.getByTestId('day');
    expect(dayBackground).toHaveClass('day');
    expect(dayBackground).toHaveClass('background');
  });
});
