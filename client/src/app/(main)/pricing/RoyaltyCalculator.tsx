'use client';
import React, { useState } from 'react';
export function RoyaltyCalculator() {
  const [price, setPrice] = useState('300');
  return (
    <div className="bg-[#1A1A2E] text-white p-8 rounded-2xl">
      <h3 className="text-2xl font-playfair font-bold text-[#C5A55A] mb-4">Royalty Calculator</h3>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded-md p-3 text-white mb-4" />
      <div>Your Net Royalty: ₹{Math.max(0, Number(price) - 100 - (Number(price) * 0.4)).toFixed(2)}</div>
    </div>
  );
}