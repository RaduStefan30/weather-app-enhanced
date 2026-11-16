import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundPreview from './BackgroundPreview';

it('previews scenes and preserves the selected time of day across weather changes', () => {
  render(<BackgroundPreview />);
  const background = screen.getByTestId('weather-background');
  const image = background.querySelector('img');

  expect(image).toHaveAttribute('src', '/backgrounds/clear.webp');
  expect(background).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByRole('link', { name: /back to weather/i })).toHaveAttribute('href', '/');

  fireEvent.click(screen.getByRole('button', { name: /switch to night/i }));
  expect(image).toHaveAttribute('src', '/backgrounds/clear-night.webp');
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');

  fireEvent.change(screen.getByLabelText('Weather'), { target: { value: 'partly-cloudy' } });
  expect(image).toHaveAttribute('src', '/backgrounds/partly-cloudy-night.webp');
  expect(background).not.toHaveClass('weather-background--night');

  fireEvent.change(screen.getByLabelText('Weather'), { target: { value: 'snow' } });
  expect(image).toHaveAttribute('src', '/backgrounds/snow.webp');
  expect(background).toHaveClass('weather-background--night');

  fireEvent.click(screen.getByRole('button', { name: /switch to day/i }));
  expect(image).toHaveAttribute('src', '/backgrounds/snow.webp');
  expect(background).not.toHaveClass('weather-background--night');
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
});
