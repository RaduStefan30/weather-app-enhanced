import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  getWeatherBackground,
  WeatherBackgroundData,
} from '../../utils/weatherBackground';

type PendingBackground = {
  background: WeatherBackgroundData;
  id: number;
};

const WeatherBackground = ({ code, isDay = true }: { code?: number; isDay?: boolean | number }) => {
  const target = useMemo(
    () => getWeatherBackground(code, isDay),
    [code, isDay]
  );
  const [current, setCurrent] = useState(target);
  const [previous, setPrevious] = useState<WeatherBackgroundData | null>(null);
  const [pending, setPending] = useState<PendingBackground | null>(null);
  const [transitionId, setTransitionId] = useState(0);
  const requestId = useRef(0);

  useEffect(() => {
    if (target.image === current.image && target.tintNight === current.tintNight) {
      requestId.current += 1;
      setPending(null);
      return;
    }

    requestId.current += 1;
    setPending({ background: target, id: requestId.current });
  }, [current.image, current.tintNight, target]);

  useEffect(() => {
    if (!transitionId) return;

    const timeout = window.setTimeout(() => {
      setPrevious(null);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [transitionId]);

  const finishLoading = async (
    event: SyntheticEvent<HTMLImageElement>,
    loaded: WeatherBackgroundData,
    id: number
  ) => {
    try {
      await event.currentTarget.decode?.();
    } catch {
      // A completed load is still safe to show when decode() is unavailable.
    }

    if (id !== requestId.current) return;

    setPrevious(current);
    setCurrent(loaded);
    setPending(null);
    setTransitionId((value) => value + 1);
  };

  const renderLayer = (
    background: WeatherBackgroundData,
    className: string
  ) => (
    <div
      className={`weather-background__layer ${className}${
        background.tintNight ? ' weather-background__layer--night' : ''
      }`}
    >
      <img src={background.image} alt="" decoding="async" />
    </div>
  );

  return (
    <div
      className="background weather-background"
      data-testid="weather-background"
      data-scene={current.scene}
      data-period={current.night ? 'night' : 'day'}
      aria-hidden="true"
    >
      {previous &&
        renderLayer(previous, 'weather-background__layer--previous')}
      {renderLayer(
        current,
        `weather-background__layer--current${
          previous ? ' weather-background__layer--entering' : ''
        }`
      )}
      {pending && (
        <div className="weather-background__layer weather-background__layer--pending">
          <img
            src={pending.background.image}
            alt=""
            decoding="async"
            onLoad={(event) =>
              void finishLoading(event, pending.background, pending.id)
            }
            onError={() => {
              if (pending.id === requestId.current) setPending(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
