'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CloudBackground } from '@/components/ui';
import { Star, ExternalLink } from 'lucide-react';
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

          {/* CTA Buttons + Reviews Badge Stack - Aligned & Crimson Logo Color */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mb-16"
          >
            <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer">
              <button
                className="bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold px-8 py-3.5 text-base shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 h-[52px] cursor-pointer"
              >
                Publish My Book
                <ExternalLink className="w-4 h-4 opacity-80" />
              </button>
            </Link>

            {/* Author Avatars Stack + Rating Badge */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 h-[52px] rounded-full shadow-sm border border-rose-100">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                  AK
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                  SR
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                  PM
                </div>
                <div className="w-8 h-8 rounded-full bg-[#8B1A1A] text-white border-2 border-white flex items-center justify-center text-[9px] font-bold">
                  +100
                </div>
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#1A1A2E] text-sm leading-none">
                    5,100+
                  </span>
                  <div className="flex text-amber-400 ml-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">
                  google reviews
                </span>
              </div>
            </div>
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
