import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hamburger from './Hamburger';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Hamburger', () => {
  it.each([
    [false, 'openSettings'],
    [true, 'closeSettings'],
  ])('describes the menu state when open is %s', (isMenuOpen, label) => {
    const toggleMenu = jest.fn();
    render(
      <Hamburger
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        isAnimating={false}
      />
    );

    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveAttribute('aria-expanded', String(isMenuOpen));
    expect(button).toHaveAttribute('aria-controls', 'header-settings');
    fireEvent.click(button);
    expect(toggleMenu).toHaveBeenCalledWith(false);
  });
});
