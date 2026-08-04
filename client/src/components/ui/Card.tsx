'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  imageUrl?: string;
  imageAlt?: string;
}

export function Card({
  className,
  variant = 'default',
  imageUrl,
  imageAlt = 'Card image',
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white shadow-sm border border-black/5',
    elevated: 'bg-white shadow-md hover:shadow-lg transition-shadow',
    outlined: 'bg-transparent border-2 border-black/10',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-sm',
  };

  return (
    <motion.div
      whileHover={variant === 'elevated' ? { y: -5 } : {}}
      className={cn('rounded-xl overflow-hidden', variants[variant], className)}
      {...(props as any)}
    >
      {imageUrl && (
        <div className="relative w-full h-48 sm:h-56">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
        </div>
      )}
      {children}
    </motion.div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pt-0 flex items-center', className)} {...props}>
      {children}
    </div>
  );
}
