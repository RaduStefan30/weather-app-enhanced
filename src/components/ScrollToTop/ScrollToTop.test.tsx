import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const ChangeRoute = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/details/London')}>Open</button>;
};

it('moves to the top whenever the route changes', () => {
  const scrollTo = jest.fn();
  window.scrollTo = scrollTo;

  const { getByRole } = render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <ChangeRoute />
    </MemoryRouter>
  );

  expect(scrollTo).toHaveBeenLastCalledWith({
    top: 0,
    left: 0,
    behavior: 'auto',
  });

  fireEvent.click(getByRole('button', { name: 'Open' }));

  expect(scrollTo).toHaveBeenCalledTimes(2);
});
