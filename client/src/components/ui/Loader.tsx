'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  text?: string;
  className?: string;
}

export function Loader({
  size = 'md',
  fullPage = false,
  text,
  className,
}: LoaderProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-[#8B1A1A]', sizes[size])} />
      {text && (
        <span className="text-sm font-medium text-[#4A4A5A] animate-pulse">
          {text}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
