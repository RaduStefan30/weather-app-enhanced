import { render, screen } from '@testing-library/react';
import Night from './Night';
import '@testing-library/jest-dom';

describe('Night component', () => {
  it('should render the night image', () => {
    render(<Night />);
    expect(screen.getByAltText('night landscape')).toBeInTheDocument();
  });

  it('should have the correct classes', () => {
    render(<Night />);
    const nightBackground = screen.getByTestId('night');
    expect(nightBackground).toHaveClass('night');
    expect(nightBackground).toHaveClass('background');
  });
});
