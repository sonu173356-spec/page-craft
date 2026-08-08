'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useWishlistStore } from '@/store';
import { Book } from '@/types';
import RealisticBookCover from '@/components/ui/RealisticBookCover';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book, book.format[0] || 'paperback');
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(book.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EBE4D8] flex flex-col h-full overflow-hidden p-4"
    >
      {/* Front Cover Showcase Area */}
      <Link
        href={`/bookstore/${book.id}`}
        className="block relative w-full py-5 px-3 bg-[#FBF8F3] rounded-xl overflow-hidden border border-[#F0EAE1] group-hover:border-amber-200 transition-colors flex items-center justify-center"
      >
        <RealisticBookCover book={book} size="lg" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
          {book.category && (
            <span className="bg-[#8B1A1A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              {book.category}
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-[#8B1A1A] transition-colors shadow-xs z-20 cursor-pointer"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#8B1A1A] text-[#8B1A1A]' : ''}`} />
        </button>
      </Link>

      <div className="pt-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-[#C5A55A] text-[#C5A55A]" />
          <span className="text-xs font-bold text-gray-700">{book.rating}</span>
          <span className="text-[10px] text-gray-400">({book.reviewCount || 10})</span>
        </div>

        <Link href={`/bookstore/${book.id}`} className="group-hover:text-[#8B1A1A] transition-colors">
          <h3 className="font-playfair text-base sm:text-lg font-bold text-[#1A1A2E] line-clamp-2 mb-0.5">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-3 truncate">
          by <span className="font-medium text-gray-700">{book.author.name}</span>
        </p>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#1A1A2E]">
              ₹{Math.round(book.price * (book.price < 100 ? 25 : 1))}
            </span>
            {book.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ₹{Math.round(book.originalPrice * (book.originalPrice < 100 ? 25 : 1))}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 hover:bg-[#8B1A1A] text-[#8B1A1A] hover:text-white transition-all cursor-pointer shadow-2xs"
            title="Add to Reading Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
