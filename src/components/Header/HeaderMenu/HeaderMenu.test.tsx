import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderMenu from './HeaderMenu';

const changeLanguageMock = jest.fn();
const onCloseMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: changeLanguageMock,
      resolvedLanguage: 'en',
    },
    t: (key: string) => key,
  }),
}));

const renderHeaderMenu = (isMenuOpen = false) =>
  render(<HeaderMenu isMenuOpen={isMenuOpen} onClose={onCloseMock} />);

const languages = [
  ['English', 'en'],
  ['Română', 'ro'],
  ['Español', 'es'],
  ['Français', 'fr'],
  ['Deutsch', 'de'],
  ['Nederlands', 'nl'],
  ['Italiano', 'it'],
  ['中文', 'zh'],
] as const;

describe('<HeaderMenu />', () => {
  beforeEach(() => {
    document.body.style.overflow = 'auto';
    changeLanguageMock.mockClear();
    onCloseMock.mockClear();
  });

  afterEach(cleanup);

  it('renders the settings dialog when open', () => {
    renderHeaderMenu(true);

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByRole('heading', { name: 'units' })).toBeInTheDocument();
  });

  it('locks body scrolling while open and restores the previous value', () => {
    const { rerender } = renderHeaderMenu();
    expect(document.body.style.overflow).toBe('auto');

    rerender(<HeaderMenu isMenuOpen onClose={onCloseMock} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<HeaderMenu isMenuOpen={false} onClose={onCloseMock} />);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('closes from the backdrop and Escape key', () => {
    renderHeaderMenu(true);

    fireEvent.click(screen.getByTestId('header-menu'));
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });

  it('marks the current language as selected', () => {
    renderHeaderMenu(true);

    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it.each(languages)(
    'changes the language when %s is selected',
    (label, language) => {
      renderHeaderMenu(true);

      fireEvent.click(screen.getByRole('button', { name: label }));

      expect(changeLanguageMock).toHaveBeenCalledWith(language);
    }
  );
});
