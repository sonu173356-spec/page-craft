'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, BookOpen, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useWishlistStore } from '@/store';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(book, book.format[0] || 'paperback');
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(book.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden"
    >
      <Link href={`/bookstore/${book.id}`} className="block relative aspect-[2/3] overflow-hidden bg-gray-100">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] to-[#722F37] flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white/50" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.category && (
            <span className="bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-full text-[#1A1A2E] shadow-sm">
              {book.category}
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-[#8B1A1A] transition-colors shadow-sm z-10"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#8B1A1A] text-[#8B1A1A]' : ''}`} />
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-[#C5A55A] text-[#C5A55A]" />
          <span className="text-sm font-medium text-gray-700">{book.rating}</span>
          <span className="text-xs text-gray-500">({book.reviewCount})</span>
        </div>

        <Link href={`/bookstore/${book.id}`} className="group-hover:text-[#8B1A1A] transition-colors">
          <h3 className="font-playfair text-lg font-bold text-[#1A1A2E] line-clamp-2 mb-1">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4">{book.author.name}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#1A1A2E]">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${book.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center p-2.5 rounded-full bg-gray-50 hover:bg-[#8B1A1A] text-[#1A1A2E] hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
