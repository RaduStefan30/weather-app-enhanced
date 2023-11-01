import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Logo from './Logo';
import '@testing-library/jest-dom';

const MockComponent = () => {
  return <div data-testid="mock-component">Mock Component</div>;
};

describe('Logo Component', () => {
  const mockToggleMenu = jest.fn();

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/initial']}>
        <Routes>
          <Route path="/" element={<MockComponent />} />
          <Route
            path="/initial"
            element={<Logo toggleMenu={mockToggleMenu} />}
          />
        </Routes>
      </MemoryRouter>
    );
  });

  it('should render logo button', () => {
    const logoButton = screen.getByTestId('logo');
    expect(logoButton).toBeInTheDocument();
    expect(logoButton).toHaveClass('no-styles-button logo-button');
    expect(logoButton).toHaveAttribute('aria-label', 'Logo');
  });

  it('should render logo image', () => {
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('logo');
    expect(logoImage).toHaveAttribute('src', '/logo.png');
  });

  it('should call toggleMenu with true on button click', () => {
    const logoButton = screen.getByTestId('logo');
    fireEvent.click(logoButton);
    expect(mockToggleMenu).toHaveBeenCalledWith(true);
  });

  it('navigates to home on button click', () => {
    expect(screen.queryByTestId('mock-component')).not.toBeInTheDocument();
    const logoButton = screen.getByTestId('logo');
    fireEvent.click(logoButton);
    expect(mockToggleMenu).toHaveBeenCalledWith(true);
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });
});
