'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import BookFilters from '@/components/bookstore/BookFilters';
import BookGrid from '@/components/bookstore/BookGrid';
import CartDrawer from '@/components/bookstore/CartDrawer';
import { Book } from '@/types';

// Mock Data
const MOCK_BOOKS: Book[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `book-${i + 1}`,
  title: `The Art of Typography ${i + 1}`,
  slug: `the-art-of-typography-${i + 1}`,
  author: {
    id: 'a1', name: 'Elena Rostova', slug: 'elena-rostova', bio: '', shortBio: '', avatar: '', email: '', booksPublished: 1, joinDate: '', genres: []
  },
  authorId: 'a1',
  description: 'A comprehensive guide to modern typography...',
  shortDescription: 'Modern typography guide',
  coverImage: '',
  price: 24.99 + (i % 5) * 5,
  originalPrice: i % 3 === 0 ? 34.99 + (i % 5) * 5 : undefined,
  isbn: `978-3-16-148410-${i}`,
  pages: 320,
  language: 'English',
  category: ['Fiction', 'Non-Fiction', 'Poetry', 'Self-Help', 'Design'][i % 5],
  genre: ['Design'],
  format: ['paperback', 'ebook'],
  publishDate: '2023-10-15',
  rating: 4.0 + (i % 5) * 0.2,
  reviewCount: 120 + i * 10,
  stock: 50,
  tags: []
}));

const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Poetry', 'Self-Help', 'Design'];

export default function BookstoreClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState('newest');

  const filteredBooks = useMemo(() => {
    return MOCK_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // newest/default
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 100]);
    setSortBy('newest');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">
            Curated Bookstore
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully selected collection of premium books, designed to inspire and educate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <BookFilters
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={handleClearFilters}
            />
          </aside>

          <main className="flex-1 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>

            <BookGrid books={filteredBooks} />
          </main>
        </div>
      </div>
      
      <CartDrawer />
    </div>
  );
}
