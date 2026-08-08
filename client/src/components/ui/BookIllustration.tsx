'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import Image from 'next/image';

interface BookIllustrationProps {
  className?: string;
  priority?: boolean;
}

/**
 * Animated Book Stack Illustration Component
 * 
 * Premium editorial floating animation with:
 * - Smooth fade-in entrance
 * - Gentle vertical floating motion (4–8px, 5s cycle)
 * - Extremely subtle rotation (-0.8deg to +0.8deg)
 * - Soft hover lift + scale
 * - Subtle scroll-based parallax on desktop
 * - Respects prefers-reduced-motion
 */
export function BookIllustration({
  className = '',
  priority = true,
}: BookIllustrationProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [parallaxY, setParallaxY] = useState(0);

  // Subtle scroll-based parallax (desktop only)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // Only apply when the element is in or near the viewport
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        // Map 0–1 progress to -10px to +10px
        const offset = (progress - 0.5) * 20;
        // Clamp to ±12px
        setParallaxY(Math.max(-12, Math.min(12, offset)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Soft warm editorial ambient glow underneath */}
      <div
        className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#8B1A1A]/8 via-[#F7EBE0]/50 to-transparent blur-3xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Animated Book Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: shouldReduceMotion ? 0 : undefined,
              }
            : { opacity: 0, y: 24 }
        }
        transition={{
          opacity: { duration: 0.85, ease: 'easeOut' },
          y: { duration: 0.85, ease: 'easeOut' },
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.02,
                y: -8,
                transition: { duration: 0.45, ease: 'easeOut' },
              }
        }
        style={{
          y: shouldReduceMotion ? 0 : parallaxY,
        }}
        className="relative z-10 w-full max-w-[400px] md:max-w-[460px] lg:max-w-[520px] cursor-pointer"
      >
        {/* Inner floating + rotation animation layer */}
        <motion.div
          animate={
            isInView && !shouldReduceMotion
              ? {
                  y: [0, -6, 0, 6, 0],
                  rotate: [0, -0.8, 0, 0.8, 0],
                }
              : {}
          }
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="drop-shadow-[0_16px_32px_rgba(139,26,26,0.10)] hover:drop-shadow-[0_20px_40px_rgba(139,26,26,0.14)] transition-[filter] duration-500"
        >
          <Image
            src="/book-stack.png"
            alt="Illustration of a collection of colorful published books arranged in a warm editorial style"
            width={636}
            height={435}
            priority={priority}
            className="w-full h-auto object-contain pointer-events-none"
            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 520px"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BookIllustration;
