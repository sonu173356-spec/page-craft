'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  value?: number;
  target?: number;
  end?: number;
  duration?: number; // in seconds
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  target,
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const numericValue = value ?? target ?? end ?? 0;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio);
      
      const currentCount = Math.floor(easeProgress * numericValue);
      
      setCount(currentCount);

      if (progressRatio < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [numericValue, duration, isInView]);

  // Format number with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span ref={ref} className={cn('font-serif font-bold', className)}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}
