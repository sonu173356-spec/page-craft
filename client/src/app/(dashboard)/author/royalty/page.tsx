'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function RoyaltyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Royalty</h1>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-600">Royalty content coming soon...</p>
      </div>
    </motion.div>
  );
}
