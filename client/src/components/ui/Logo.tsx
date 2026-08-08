'use client';

import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkBg?: boolean;
}

const dimensions = {
  sm: { width: 110, height: 38, iconWidth: 24, iconHeight: 38 },
  md: { width: 145, height: 50, iconWidth: 32, iconHeight: 50 },
  lg: { width: 185, height: 64, iconWidth: 42, iconHeight: 64 },
};

/**
 * Page Craft Transparent PNG Logo Component
 * Renders the official publishing house logo with transparent background
 */
export function Logo({
  variant = 'full',
  className = '',
  size = 'md',
  darkBg = false,
}: LogoProps) {
  const dim = dimensions[size];

  if (variant === 'icon') {
    return (
      <span className={`inline-flex items-center select-none bg-transparent ${className}`}>
        <img
          src="/logo-icon.png"
          alt="The Page Craft Icon"
          style={{ height: dim.iconHeight, width: 'auto' }}
          className={`object-contain bg-transparent transition-all ${
            darkBg ? 'brightness-0 invert opacity-95' : 'mix-blend-multiply'
          }`}
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center select-none bg-transparent ${className}`}>
      <img
        src="/logo-full.png"
        alt="The Page Craft"
        style={{ height: dim.height, width: 'auto' }}
        className={`object-contain bg-transparent transition-all ${
          darkBg ? 'brightness-0 invert opacity-95' : 'mix-blend-multiply'
        }`}
      />
    </span>
  );
}
