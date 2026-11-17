import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Spinner', () => {
  it('announces the loading state', () => {
    render(<Spinner />);

    expect(screen.getByRole('status', { name: 'loadingWeather' })).toBeVisible();
  });

  it('renders three animated rings', () => {
    const { container } = render(<Spinner />);

    expect(container.querySelectorAll('.spinner > div')).toHaveLength(3);
  });
});
