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

describe('<HeaderMenu />', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />);
  });

  it('sets overflow to hidden when menu is open and resets on close', () => {
    const { rerender } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );
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

  it('calls changeLanguage when language button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const englishButton = getByAltText('uk flag');
    fireEvent.click(englishButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });
  it('calls changeLanguage when English button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const englishButton = getByAltText('uk flag');
    fireEvent.click(englishButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });

  it('calls changeLanguage when Romanian button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const romanianButton = getByAltText('romanian flag');
    fireEvent.click(romanianButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('ro');
  });

  it('calls changeLanguage when Spanish button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const spanishButton = getByAltText('spanish flag');
    fireEvent.click(spanishButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('es');
  });

  it('calls changeLanguage when French button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const frenchButton = getByAltText('french flag');
    fireEvent.click(frenchButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('fr');
  });

  it('calls changeLanguage when German button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const germanButton = getByAltText('german flag');
    fireEvent.click(germanButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('de');
  });

  it('calls changeLanguage when Dutch button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const dutchButton = getByAltText('netherlands flag');
    fireEvent.click(dutchButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('nl');
  });

  it('calls changeLanguage when Italian button is clicked', () => {
    const { getByAltText } = render(
      <HeaderMenu isFirstRender={{ current: true }} isMenuOpen={false} />
    );

    const italianButton = getByAltText('italian flag');
    fireEvent.click(italianButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('it');
  });
});
