import { useEffect, useState } from 'react';
import './Rain.scss';

interface Raindrop {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
}

const Rain = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const drop: Raindrop = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
      };
      setRaindrops((prevDrops) => [...prevDrops, drop]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRaindrops((prevDrops) =>
        prevDrops
          .map((drop) => ({ ...drop, y: drop.y + drop.speed }))
          .filter((drop) => drop.y - drop.length < window.innerHeight)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background rain" data-testid="rain">
      <img src="/rain.png" alt="cloudy landscape" />
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          data-testid="raindrop"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            height: `${drop.length}px`,
            animationDuration: `${drop.speed}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Rain;
