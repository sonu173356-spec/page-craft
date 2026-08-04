'use client';

import React from 'react';
import Image from 'next/image';

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
 * Page Craft Exact PNG Logo Component
 * Renders the official exact PNG image uploaded by the user
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
      <span className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo-icon.png"
          alt="Page Craft Icon"
          style={{ height: dim.iconHeight, width: 'auto' }}
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-full.png"
        alt="the page craft"
        style={{ height: dim.height, width: 'auto' }}
        className={`object-contain transition-all ${
          darkBg ? 'brightness-0 invert opacity-95' : ''
        }`}
      />
    </span>
  );
}
