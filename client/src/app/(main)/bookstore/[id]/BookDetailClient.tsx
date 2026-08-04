'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, BookOpen, ChevronRight, Share2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useWishlistStore } from '@/store';
import { Book } from '@/types';
import CartDrawer from '@/components/bookstore/CartDrawer';
import BookCard from '@/components/bookstore/BookCard';

// Mock Book Detail
const MOCK_BOOK: Book = {
  id: 'book-1',
  title: 'The Art of Typography',
  slug: 'the-art-of-typography',
  author: {
    id: 'a1', name: 'Elena Rostova', slug: 'elena-rostova', bio: '', shortBio: '', avatar: '', email: '', booksPublished: 1, joinDate: '', genres: []
  },
  authorId: 'a1',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  shortDescription: 'Modern typography guide',
  coverImage: '',
  price: 29.99,
  originalPrice: 39.99,
  isbn: '978-3-16-148410-0',
  pages: 320,
  language: 'English',
  category: 'Design',
  genre: ['Design', 'Art'],
  format: ['paperback', 'ebook'],
  publishDate: '2023-10-15',
  rating: 4.8,
  reviewCount: 156,
  stock: 50,
  tags: []
};

const RELATED_BOOKS: Book[] = Array.from({ length: 4 }).map((_, i) => ({
    ...MOCK_BOOK,
    id: `related-${i}`,
    title: `Related Book ${i + 1}`
}));

export default function BookDetailClient({ bookId }: { bookId: string }) {
  const [selectedFormat, setSelectedFormat] = useState(MOCK_BOOK.format[0] || 'paperback');
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const handleAddToCart = () => {
    addItem(MOCK_BOOK, selectedFormat, quantity);
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8B1A1A]">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/bookstore" className="hover:text-[#8B1A1A]">Bookstore</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#1A1A2E] font-medium">{MOCK_BOOK.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Cover */}
          <div className="relative aspect-[2/3] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
            {MOCK_BOOK.coverImage ? (
              <Image src={MOCK_BOOK.coverImage} alt={MOCK_BOOK.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A1A] to-[#722F37] flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-white/50" />
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-8 flex flex-col">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-gray-100 text-[#1A1A2E] text-xs font-semibold px-3 py-1 rounded-full">
                  {MOCK_BOOK.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#C5A55A] text-[#C5A55A]" />
                  <span className="font-medium text-[#1A1A2E]">{MOCK_BOOK.rating}</span>
                  <span className="text-gray-500 text-sm">({MOCK_BOOK.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-2">
                {MOCK_BOOK.title}
              </h1>
              <p className="text-lg text-gray-600">
                by <Link href={`/author/${MOCK_BOOK.author.slug}`} className="text-[#8B1A1A] hover:underline font-medium">{MOCK_BOOK.author.name}</Link>
              </p>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-[#1A1A2E]">${MOCK_BOOK.price.toFixed(2)}</span>
              {MOCK_BOOK.originalPrice && (
                <span className="text-xl text-gray-500 line-through mb-1">${MOCK_BOOK.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-[#1A1A2E]">Select Format</h3>
              <div className="flex gap-4">
                {MOCK_BOOK.format.map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all ${selectedFormat === fmt ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 text-[#8B1A1A]' : 'border-gray-200 hover:border-[#8B1A1A]/50 text-gray-600'}`}
                  >
                    <span className="capitalize font-medium block">{fmt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-l-xl">-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-50 text-gray-600 rounded-r-xl">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#8B1A1A] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#722F37] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleItem(MOCK_BOOK.id)}
                className={`p-4 rounded-xl border border-gray-200 transition-colors ${isInWishlist(MOCK_BOOK.id) ? 'bg-[#8B1A1A]/5 border-[#8B1A1A] text-[#8B1A1A]' : 'hover:bg-gray-50 text-gray-400'}`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist(MOCK_BOOK.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Description */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="font-playfair text-2xl font-bold text-[#1A1A2E] mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {MOCK_BOOK.description}
              </p>
            </div>
            
            {/* Table */}
            <div className="pt-8">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" /> Product Details
              </h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm bg-white p-6 rounded-xl border border-gray-100">
                <div className="text-gray-500">ISBN</div><div className="font-medium text-[#1A1A2E]">{MOCK_BOOK.isbn}</div>
                <div className="text-gray-500">Publisher</div><div className="font-medium text-[#1A1A2E]">Page Craft</div>
                <div className="text-gray-500">Language</div><div className="font-medium text-[#1A1A2E]">{MOCK_BOOK.language}</div>
                <div className="text-gray-500">Pages</div><div className="font-medium text-[#1A1A2E]">{MOCK_BOOK.pages}</div>
                <div className="text-gray-500">Published</div><div className="font-medium text-[#1A1A2E]">{MOCK_BOOK.publishDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="pt-16 border-t border-gray-100">
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A2E] mb-8">Related Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_BOOKS.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  );
}
