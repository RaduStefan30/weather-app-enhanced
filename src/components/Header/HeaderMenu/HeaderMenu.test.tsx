import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderMenu from './HeaderMenu';

const changeLanguageMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: changeLanguageMock,
    },
    t: (key: string) => key,
  }),
}));

const renderHeaderMenu = (isMenuOpen = false) => {
  return render(
    <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={isMenuOpen} />
  );
};

const testChangeLanguage = (altText: string, expectedLang: string) => {
  it(`should call changeLanguage when ${altText} button is clicked`, () => {
    const { getByAltText } = renderHeaderMenu();
    const button = getByAltText(altText);
    fireEvent.click(button);
    expect(changeLanguageMock).toHaveBeenCalledWith(expectedLang);
  });
};

describe('<HeaderMenu />', () => {
  afterEach(cleanup);

  it('should render without crashing', () => {
    renderHeaderMenu();
  });

  it('should set overflow to hidden when menu is open and resets on close', () => {
    const { rerender } = renderHeaderMenu();
    expect(document.body.style.overflow).toBe('auto');

    rerender(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={true} />
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );
    expect(document.body.style.overflow).toBe('auto');
  });

  testChangeLanguage('uk flag', 'en');
  testChangeLanguage('romanian flag', 'ro');
  testChangeLanguage('spanish flag', 'es');
  testChangeLanguage('french flag', 'fr');
  testChangeLanguage('german flag', 'de');
  testChangeLanguage('netherlands flag', 'nl');
  testChangeLanguage('italian flag', 'it');
});
