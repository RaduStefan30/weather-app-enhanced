import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ErrorPage from './ErrorPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('<ErrorPage />', () => {
  it('renders a translated not-found message and a home link', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'pageNotFoundMessage' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'goHome' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
