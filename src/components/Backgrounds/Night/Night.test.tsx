import { render, screen } from '@testing-library/react';
import Night from './Night';
import '@testing-library/jest-dom';

describe('Night component', () => {
  it('should render a decorative night background', () => {
    render(<Night />);
    expect(screen.getByTestId('night')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have the correct classes', () => {
    render(<Night />);
    const nightBackground = screen.getByTestId('night');
    expect(nightBackground).toHaveClass('night');
    expect(nightBackground).toHaveClass('background');
  });
});
