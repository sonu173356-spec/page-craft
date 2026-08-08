'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface BookIllustrationProps {
  className?: string;
  priority?: boolean;
}

/**
 * Animated Book Stack Illustration Component
 * Renders the colorful collection of books with gentle, premium floating animation
 */
export function BookIllustration({
  className = '',
  priority = true,
}: BookIllustrationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft warm editorial ambient glow underneath */}
      <div 
        className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#8B1A1A]/10 via-[#F7EBE0]/60 to-transparent blur-2xl opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Animated Book Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: 1,
          y: shouldReduceMotion ? 0 : [-4, 4, -4],
        }}
        transition={{
          opacity: { duration: 0.8, ease: 'easeOut' },
          y: shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
        }}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.02,
                y: -6,
                transition: { duration: 0.4, ease: 'easeOut' },
              }
        }
        className="relative z-10 w-full max-w-[480px] lg:max-w-[540px] drop-shadow-[0_12px_24px_rgba(139,26,26,0.08)] cursor-pointer"
      >
        <Image
          src="/book-stack.png"
          alt="Illustration of a collection of colorful published books"
          width={636}
          height={435}
          priority={priority}
          className="w-full h-auto object-contain pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
        />
      </motion.div>
    </div>
  );
}

export default BookIllustration;
