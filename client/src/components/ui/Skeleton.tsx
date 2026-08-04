'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    card: 'rounded-xl h-48 w-full',
  };

  return (
    <motion.div
      className={cn(
        'bg-[#E5E7EB] overflow-hidden relative',
        variants[variant],
        className
      )}
      style={{ width, height, ...style }}
      {...(props as any)}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        }}
        animate={{
          translateX: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}
