/**
 * Animated Counter Component
 * Counts up to a target number with easing
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
}) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    updateCount();
  }, [isVisible, target, duration]);

  return (
    <span ref={elementRef} className="text-neon font-bold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
