import { useEffect, useState } from 'react';
import './Snow.scss';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const Snow = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const flake: Snowflake = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: -20,
        size: Math.random() * 5 + 1,
        speed: Math.random() * 5 + 2,
      };
      setSnowflakes((prevFlakes) => [...prevFlakes, flake]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes((prevFlakes) =>
        prevFlakes
          .map((flake) => ({ ...flake, y: flake.y + flake.speed }))
          .filter((flake) => flake.y - flake.size < window.innerHeight)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background snow" data-testid="snow">
      <img src="/snow.png" alt="snowy landscape" loading="lazy" />
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          data-testid="snowflake"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.speed}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Snow;
