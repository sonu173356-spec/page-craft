'use client';

import React from 'react';
import Image from 'next/image';
import { resolveBookCover, PublishedBook } from '@/lib/bookCovers';

interface RealisticBookCoverProps {
  book: Partial<PublishedBook> | any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export default function RealisticBookCover({
  book,
  size = 'lg',
  className = '',
  showBadge = false,
}: RealisticBookCoverProps) {
  const { url: coverUrl, hasCustomUpload, altText } = resolveBookCover(book);

  const title = book?.title || 'Untitled Work';
  const author = book?.author || book?.authorName || book?.penName || 'Page Craft Author';
  const genre = book?.genre || book?.category || 'Literary Work';
  const moodBadge = book?.coverStyle?.moodBadge || book?.category || 'Fiction';
  const bgGradient = book?.coverStyle?.bgGradient || 'from-[#1A1A2E] via-[#2D1B2D] to-[#8B1A1A]';
  const accentColor = book?.coverStyle?.accentColor || '#C5A55A';
  const textColor = book?.coverStyle?.textColor || '#FDFAF6';
  const fontFamily = book?.coverStyle?.fontFamily || 'Playfair Display, serif';
  const textureImage = book?.coverStyle?.textureImage || coverUrl;

  // Size styling maps
  const sizeStyles = {
    sm: 'w-16 h-24 sm:w-20 sm:h-28 text-[9px] rounded-r-md',
    md: 'w-24 h-36 sm:w-32 sm:h-48 text-[11px] rounded-r-lg',
    lg: 'w-full aspect-[2/3] max-w-[260px] sm:max-w-[280px] text-xs rounded-r-xl',
    xl: 'w-full aspect-[2/3] max-w-sm sm:max-w-md text-sm rounded-r-2xl',
  };

  return (
    <div
      className={`relative select-none flex-shrink-0 group/cover transition-transform duration-300 hover:-translate-y-1.5 ${sizeStyles[size]} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Outer Physical Book Shadow & Right-Side Page Edge Depth */}
      <div className="absolute inset-0 rounded-r-xl bg-black/10 translate-x-1.5 translate-y-1.5 blur-xs -z-10" />
      <div className="absolute inset-y-0.5 right-0 w-2.5 bg-gradient-to-l from-[#F5EFE6] via-[#E8DEC8] to-transparent rounded-r-md -z-5 opacity-90" />

      {/* Main Front Cover Canvas */}
      <div
        className="relative w-full h-full overflow-hidden rounded-r-xl shadow-md group-hover/cover:shadow-xl transition-shadow duration-300 border-y border-r border-black/15 bg-[#171717]"
        style={{
          boxShadow: '2px 4px 14px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* CASE A: Author has uploaded a custom front cover PNG/JPG/WebP */}
        {coverUrl ? (
          <div className="relative w-full h-full bg-[#111827]">
            <Image
              src={coverUrl}
              alt={altText}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover/cover:scale-102"
              priority={size === 'xl' || size === 'lg'}
            />
          </div>
        ) : (
          /* CASE B: Genre-specific Publication Fallback Cover */
          <div
            className={`relative w-full h-full bg-gradient-to-br ${bgGradient} p-3 sm:p-5 flex flex-col justify-between overflow-hidden`}
            style={{ color: textColor }}
          >
            {/* Subtle atmospheric background texture image if present */}
            {textureImage && (
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-luminosity">
                <Image
                  src={textureImage}
                  alt="Atmospheric book texture"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Vintage Ornamental Framing */}
            <div
              className="absolute inset-2 sm:inset-3 border border-current opacity-25 rounded pointer-events-none"
              style={{ borderColor: accentColor }}
            />

            {/* Top Category & Imprint */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase opacity-85 truncate"
                style={{ color: accentColor }}
              >
                {genre.split('/')[0] || genre}
              </span>
              <span className="text-[7px] tracking-widest uppercase opacity-60">
                Page Craft
              </span>
            </div>

            {/* Center Book Title & Subtitle */}
            <div className="relative z-10 my-auto text-center px-1">
              <h3
                className="font-bold leading-tight line-clamp-3 tracking-wide drop-shadow-sm"
                style={{
                  fontFamily,
                  fontSize: size === 'sm' ? '11px' : size === 'md' ? '14px' : size === 'lg' ? '18px' : '24px',
                }}
              >
                {title}
              </h3>
              {book?.subtitle && size !== 'sm' && (
                <p
                  className="text-[9px] sm:text-[10px] italic opacity-85 mt-1 line-clamp-1"
                  style={{ color: accentColor }}
                >
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Bottom Author Byline */}
            <div className="relative z-10 text-center border-t border-white/20 pt-2">
              <span className="text-[8px] uppercase tracking-widest block opacity-70 mb-0.5">
                Written By
              </span>
              <span
                className="font-bold tracking-wider block truncate text-[10px] sm:text-xs"
                style={{ color: accentColor }}
              >
                {author}
              </span>
            </div>
          </div>
        )}

        {/* Physical Spine Crease & Natural Book Fold Gradient */}
        <div className="absolute top-0 bottom-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 left-[3px] sm:left-[4px] w-[1px] bg-white/20 pointer-events-none z-20" />

        {/* Subtle Silk/Linen Matte Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none z-10 mix-blend-overlay" />

        {/* Optional Custom/Author Upload Badge */}
        {showBadge && hasCustomUpload && (
          <div className="absolute top-2 right-2 z-30 bg-[#8B1A1A] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
            Verified Cover
          </div>
        )}
      </div>
    </div>
  );
}
