import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundPreview from './BackgroundPreview';

it('previews scenes and preserves the selected time of day across weather changes', async () => {
  render(<BackgroundPreview />);
  const background = screen.getByTestId('weather-background');
  const currentImage = () =>
    background.querySelector('.weather-background__layer--current img');
  const finishPendingImage = async (src: string) => {
    const image = background.querySelector(
      '.weather-background__layer--pending img'
    );
    expect(image).toHaveAttribute('src', src);
    fireEvent.load(image!);
    await waitFor(() => expect(currentImage()).toHaveAttribute('src', src));
  };

  expect(currentImage()).toHaveAttribute('src', '/backgrounds/clear.webp');
  expect(background).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByRole('link', { name: /back to weather/i })).toHaveAttribute('href', '/');

  fireEvent.click(screen.getByRole('button', { name: /switch to night/i }));
  await finishPendingImage('/backgrounds/clear-night.webp');
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');

  fireEvent.change(screen.getByLabelText('Weather'), { target: { value: 'partly-cloudy' } });
  await finishPendingImage('/backgrounds/partly-cloudy-night.webp');
  expect(background).toHaveAttribute('data-period', 'night');

  fireEvent.change(screen.getByLabelText('Weather'), { target: { value: 'snow' } });
  await finishPendingImage('/backgrounds/snow.webp');
  expect(
    background.querySelector('.weather-background__layer--current')
  ).toHaveClass('weather-background__layer--night');

  fireEvent.click(screen.getByRole('button', { name: /switch to day/i }));
  await finishPendingImage('/backgrounds/snow.webp');
  expect(
    background.querySelector('.weather-background__layer--current')
  ).not.toHaveClass('weather-background__layer--night');
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
});
