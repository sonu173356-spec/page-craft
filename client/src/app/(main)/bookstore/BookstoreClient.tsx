'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import BookFilters from '@/components/bookstore/BookFilters';
import BookGrid from '@/components/bookstore/BookGrid';
import CartDrawer from '@/components/bookstore/CartDrawer';
import { Book } from '@/types';
import { getStoredPublishedBooks, BOOKS_UPDATED_EVENT } from '@/lib/bookService';
import { PublishedBook, SAMPLE_PUBLISHED_BOOKS } from '@/lib/bookCovers';

const CATEGORIES = ['All', 'Fiction', 'Mystery', 'Adventure', 'Historical', 'Sci-Fi', 'Cookbook', 'Business', 'Poetry', 'Non-Fiction'];

function mapPublishedToBook(b: PublishedBook): Book {
  return {
    id: b.id,
    title: b.title,
    slug: b.id,
    author: {
      id: b.authorId || 'a1',
      name: b.author,
      slug: b.authorSlug || 'author',
      bio: '',
      shortBio: '',
      avatar: '',
      email: '',
      booksPublished: 1,
      joinDate: '2026',
      genres: [b.genre],
    },
    authorId: b.authorId || 'a1',
    description: b.description,
    shortDescription: b.subtitle || '',
    coverImage: b.cover_image_url || '',
    price: b.numericPrice,
    originalPrice: b.originalPrice ? Number(b.originalPrice.replace(/[^\d]/g, '')) : undefined,
    isbn: b.isbn,
    pages: b.pages,
    language: 'English',
    category: b.category,
    genre: [b.genre],
    format: ['paperback', 'ebook'] as any,
    publishDate: b.created_at.split('T')[0],
    rating: b.rating,
    reviewCount: b.reviewCount,
    stock: 50,
    tags: [b.category],
  };
}

export default function BookstoreClient() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryParam && CATEGORIES.some(c => c.toLowerCase() === initialCategoryParam.toLowerCase())
      ? CATEGORIES.find(c => c.toLowerCase() === initialCategoryParam.toLowerCase()) || 'All'
      : 'All'
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [catalogBooks, setCatalogBooks] = useState<Book[]>(() => {
    return SAMPLE_PUBLISHED_BOOKS.map(mapPublishedToBook);
  });

  const loadBooks = () => {
    const published: PublishedBook[] = getStoredPublishedBooks();
    setCatalogBooks(published.map(mapPublishedToBook));
  };

  useEffect(() => {
    loadBooks();

    const handleUpdate = () => {
      loadBooks();
    };

    window.addEventListener(BOOKS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(BOOKS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredBooks = useMemo(() => {
    return catalogBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // newest/default
    });
  }, [catalogBooks, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Physical Bookstore
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-3">
            Official Book Catalog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover verified front-cover releases and independent author titles published across Page Craft.
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
                placeholder="Search by book title, author name, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#EBE4D8] bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 text-sm font-medium"
              />
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            </div>

            <div className="text-xs text-gray-500 font-medium px-1">
              Showing <strong className="text-gray-900">{filteredBooks.length}</strong> published works
            </div>

            <BookGrid books={filteredBooks} />
          </main>
        </div>
      </div>
      
      <CartDrawer />
    </div>
  );
}
