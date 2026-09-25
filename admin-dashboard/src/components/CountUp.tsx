import React, { useEffect, useState } from 'react';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 400
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easedProgress * (value - startValue) + startValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
