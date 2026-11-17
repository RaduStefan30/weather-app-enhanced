import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherBackground from './WeatherBackground';

it('keeps the current art visible until the next image is ready', async () => {
  const { rerender } = render(<WeatherBackground code={1000} isDay={true} />);
  const background = screen.getByTestId('weather-background');

  rerender(<WeatherBackground code={1117} isDay={true} />);

  expect(
    background.querySelector('.weather-background__layer--current img')
  ).toHaveAttribute('src', '/backgrounds/clear.webp');
  const pending = background.querySelector(
    '.weather-background__layer--pending img'
  );
  expect(pending).toHaveAttribute('src', '/backgrounds/blizzard.webp');

  fireEvent.load(pending!);

  await waitFor(() => {
    expect(background).toHaveAttribute('data-scene', 'blizzard');
    expect(
      background.querySelector('.weather-background__layer--current')
    ).toHaveClass('weather-background__layer--entering');
  });
});

it('keeps the current background when the next image fails', () => {
  const { rerender } = render(<WeatherBackground code={1000} isDay={true} />);
  const background = screen.getByTestId('weather-background');
  rerender(<WeatherBackground code={1117} isDay={true} />);

  fireEvent.error(
    background.querySelector('.weather-background__layer--pending img')!
  );

  expect(background).toHaveAttribute('data-scene', 'clear');
  expect(
    background.querySelector('.weather-background__layer--pending')
  ).not.toBeInTheDocument();
});
