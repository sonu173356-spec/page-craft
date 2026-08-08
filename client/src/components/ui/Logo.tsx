'use client';

import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkBg?: boolean;
}

const dimensions = {
  sm: { height: 36, iconHeight: 36 },
  md: { height: 48, iconHeight: 48 },
  lg: { height: 62, iconHeight: 62 },
};

/**
 * Page Craft Transparent Logo Component
 * Renders the brand mark with 100% alpha transparency (no white box)
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
      <span className={`inline-flex items-center justify-center bg-transparent select-none ${className}`}>
        <img
          src="/logo-icon.png"
          alt="The Page Craft Icon"
          style={{ height: `${dim.iconHeight}px`, width: 'auto' }}
          className={`object-contain bg-transparent ${
            darkBg ? 'brightness-0 invert' : 'mix-blend-multiply'
          }`}
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center bg-transparent select-none ${className}`}>
      <img
        src="/logo-full.png"
        alt="The Page Craft"
        style={{ height: `${dim.height}px`, width: 'auto' }}
        className={`object-contain bg-transparent ${
          darkBg ? 'brightness-0 invert' : 'mix-blend-multiply'
        }`}
      />
    </span>
  );
}
