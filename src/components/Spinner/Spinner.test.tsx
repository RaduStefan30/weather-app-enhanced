import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render without crashing', () => {
    render(<Spinner />);
  });

  it('should have the correct class names', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('spinner-container');
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

  it('should render three div elements inside the spinner', () => {
    const { container } = render(<Spinner />);
    const divs = container.querySelectorAll('.spinner > div');
    expect(divs).toHaveLength(3);
  });
});
