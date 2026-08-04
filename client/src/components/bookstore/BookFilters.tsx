'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface BookFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onClear: () => void;
}

export default function BookFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClear
}: BookFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-playfair text-lg font-bold text-[#1A1A2E] flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h3>
        <button onClick={onClear} className="text-sm text-gray-500 hover:text-[#8B1A1A]">
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-[#1A1A2E]">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="w-4 h-4 text-[#8B1A1A] border-gray-300 focus:ring-[#8B1A1A]"
              />
              <span className={`text-sm ${selectedCategory === cat ? 'text-[#8B1A1A] font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-[#1A1A2E]">Price Range</h4>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
            placeholder="Min"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min="0"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-[#1A1A2E]">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="popular">Popularity</option>
        </select>
      </div>
    </div>
  );
}
