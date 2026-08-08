'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CloudBackground } from '@/components/ui';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#FFF5F5] via-[#FFF9F6] to-[#FDFAF6] overflow-hidden pt-24 pb-16">
      {/* Animated Soft Floating Clouds */}
      <CloudBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-playfair font-bold text-[#8B1A1A] leading-[1.15] mb-6"
          >
            Publishing Made Easy
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#4A4A5A] mb-10 max-w-3xl mx-auto font-inter leading-relaxed"
          >
            Realise your dream of becoming a published author with Page Craft, India’s most trusted Self-Publishing Platform.
            Publish in paperback and eBook, sell across India and earn 100% royalty.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center mb-16"
          >
            <Link href="/packages?source=publish">
              <button
                className="bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold px-9 py-4 text-base shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 h-[52px] cursor-pointer"
              >
                Publish My Book
                <ExternalLink className="w-4 h-4 opacity-80" />
              </button>
            </Link>
          </motion.div>

          {/* Key Metrics Strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-rose-100/80 bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#8B1A1A] font-playfair">100+</h3>
              <p className="text-[#6B7280] text-sm font-medium mt-1">Authors Published</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#8B1A1A] font-playfair">50+</h3>
              <p className="text-[#6B7280] text-sm font-medium mt-1">Books Released</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#8B1A1A] font-playfair">Pan India</h3>
              <p className="text-[#6B7280] text-sm font-medium mt-1">Distribution Reach</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#8B1A1A] font-playfair">100%</h3>
              <p className="text-[#6B7280] text-sm font-medium mt-1">Royalty Earned</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
