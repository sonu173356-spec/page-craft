'use client';
import React, { useState } from 'react';

export function RoyaltyCalculator() {
  const [price, setPrice] = useState('300');
  const netRoyalty = Math.max(0, Number(price) - 100 - (Number(price) * 0.4)).toFixed(2);

  return (
    <div className="bg-[#FAF6F0] border border-[#EDE4DB] text-[#2C1810] p-8 rounded-2xl shadow-xs">
      <h3 className="text-2xl font-playfair font-bold text-[#8B1A1A] mb-4">Royalty Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">Enter your book selling price to calculate your estimated author royalty.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Book Retail Price (₹)</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="w-full bg-white border border-[#E2D9D2] rounded-lg p-3 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]" 
          />
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#EDE4DB] flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Your Net Royalty:</span>
          <span className="text-2xl font-bold text-[#8B1A1A]">₹{netRoyalty}</span>
        </div>
      </div>
    </div>
  );
}