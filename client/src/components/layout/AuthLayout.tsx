'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { Quote } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-[#FAF6F0] border-r border-[#EDE4DB] relative overflow-hidden flex-col justify-between p-12 text-[#2C1810]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="book-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M20 20 L80 20 L80 80 L20 80 Z" fill="none" stroke="#8B1A1A" strokeWidth="1" />
                <path d="M30 30 L70 30 L70 70 L30 70 Z" fill="none" stroke="#8B1A1A" strokeWidth="0.5" />
                <path d="M20 50 L80 50" fill="none" stroke="#8B1A1A" strokeWidth="0.5" />
                <path d="M50 20 L50 80" fill="none" stroke="#8B1A1A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#book-pattern)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="relative z-10 mt-auto pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Quote className="w-12 h-12 text-[#8B1A1A] opacity-60" />
            <blockquote className="text-2xl font-playfair font-medium text-[#2C1810] leading-snug">
              "Page Craft made my publishing dream a reality. The process was seamless, professional, and truly brought my story to life."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#8B1A1A] rounded-full flex items-center justify-center text-white font-bold shadow-xs">
                AS
              </div>
              <div>
                <p className="text-gray-900 font-bold">Arundhati S.</p>
                <p className="text-[#8B1A1A] text-sm font-medium">Bestselling Author</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center px-6 py-12 lg:px-24 xl:px-32 relative">
        <div className="md:hidden mb-8">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto md:mx-0"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
              {title}
            </h1>
            <p className="text-gray-500">
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
