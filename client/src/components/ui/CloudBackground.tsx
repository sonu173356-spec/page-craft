'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * CloudBackground Component
 * Renders soft, dreamy pink/crimson clouds with gentle drifting animations
 * Inspired by modern premium publishing website hero sections
 */
export function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Cloud Cluster */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-12 -left-16 opacity-30 md:opacity-40"
      >
        <svg width="420" height="260" viewBox="0 0 420 260" fill="none">
          <ellipse cx="120" cy="160" rx="110" ry="80" fill="#FFD6D6" />
          <ellipse cx="220" cy="140" rx="120" ry="90" fill="#FFE5E5" />
          <ellipse cx="320" cy="170" rx="90" ry="70" fill="#FFC2C2" />
        </svg>
      </motion.div>

      {/* Top Right Cloud Cluster */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-16 -right-20 opacity-35 md:opacity-45"
      >
        <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
          <ellipse cx="180" cy="150" rx="140" ry="100" fill="#FFE5E5" />
          <ellipse cx="320" cy="130" rx="130" ry="90" fill="#FFD6D6" />
          <ellipse cx="420" cy="170" rx="95" ry="75" fill="#FFC8C8" />
        </svg>
      </motion.div>

      {/* Middle Floating Cloud Left */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 12, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -left-28 opacity-25 md:opacity-35"
      >
        <svg width="360" height="220" viewBox="0 0 360 220" fill="none">
          <ellipse cx="100" cy="120" rx="90" ry="65" fill="#FFD6D6" />
          <ellipse cx="200" cy="110" rx="110" ry="80" fill="#FFEAEB" />
          <ellipse cx="280" cy="135" rx="75" ry="55" fill="#FFC8C8" />
        </svg>
      </motion.div>

      {/* Middle Floating Cloud Right */}
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -right-24 opacity-30 md:opacity-40"
      >
        <svg width="450" height="280" viewBox="0 0 450 280" fill="none">
          <ellipse cx="150" cy="140" rx="120" ry="85" fill="#FFE5E5" />
          <ellipse cx="280" cy="120" rx="130" ry="95" fill="#FFD1D1" />
          <ellipse cx="380" cy="160" rx="80" ry="60" fill="#FFC2C2" />
        </svg>
      </motion.div>

      {/* Bottom Soft Cloud Wave Landscape */}
      <div className="absolute bottom-0 left-0 right-0 opacity-40">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto min-w-[1000px]"
        >
          <path
            d="M0 120 C180 80 340 160 520 110 C700 60 880 150 1060 100 C1240 50 1380 110 1440 90 V220 H0 Z"
            fill="#FFE8E8"
          />
          <path
            d="M0 150 C240 110 400 180 620 130 C840 80 1020 170 1260 120 C1380 95 1420 115 1440 110 V220 H0 Z"
            fill="#FFDADA"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
