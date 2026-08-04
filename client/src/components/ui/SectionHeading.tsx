'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  showAccent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  showAccent = true,
}: SectionHeadingProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {subtitle && (
        <motion.span
          variants={itemVariants}
          className="text-sm font-semibold tracking-wider text-[#C5A55A] uppercase mb-2"
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A2E] mb-4"
      >
        {title}
      </motion.h2>

      {showAccent && (
        <motion.div
          variants={itemVariants}
          className={cn(
            'w-16 h-1 bg-[#8B1A1A] mb-6 rounded-full',
            align === 'center' ? 'mx-auto' : 'mr-auto'
          )}
        />
      )}

      {description && (
        <motion.p
          variants={itemVariants}
          className="text-[#4A4A5A] max-w-2xl text-base md:text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
