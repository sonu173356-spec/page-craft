'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, ChevronRight, Share2, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useWishlistStore } from '@/store';
import { Book } from '@/types';
import CartDrawer from '@/components/bookstore/CartDrawer';
import BookCard from '@/components/bookstore/BookCard';
import RealisticBookCover from '@/components/ui/RealisticBookCover';
import { getStoredPublishedBooks } from '@/lib/bookService';
import { PublishedBook } from '@/lib/bookCovers';
import { toast } from 'react-hot-toast';

export default function BookDetailClient({ bookId }: { bookId: string }) {
  const [currentBook, setCurrentBook] = useState<PublishedBook | null>(null);
  const [relatedList, setRelatedList] = useState<Book[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('paperback');
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const all = getStoredPublishedBooks();
    const found = all.find((b) => b.id === bookId || b.id === `book-${bookId}` || b.title.toLowerCase().includes(bookId.replace(/-/g, ' ').toLowerCase()));
    
    const active = found || all[0];
    setCurrentBook(active);

    // Filter related books
    const related = all
      .filter((b) => b.id !== active.id)
      .slice(0, 4)
      .map((b) => ({
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
      }));
    setRelatedList(related);
  }, [bookId]);

  if (!currentBook) {
    return (
      <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B1A1A]" />
      </div>
    );
  }

  const inWishlist = isInWishlist(currentBook.id);

  const handleAddToCart = () => {
    const storeBook: any = {
      id: currentBook.id,
      title: currentBook.title,
      slug: currentBook.id,
      author: { name: currentBook.author, slug: currentBook.authorSlug || 'author' },
      price: currentBook.numericPrice || 399,
      coverImage: currentBook.cover_image_url || '',
      category: currentBook.category,
      format: [selectedFormat],
      rating: currentBook.rating,
      reviewCount: currentBook.reviewCount,
    };

    addItem(storeBook, selectedFormat, quantity);
    toast.success(`Added ${quantity} copy of "${currentBook.title}" to cart.`);
    openCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8B1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <Link href="/bookstore" className="hover:text-[#8B1A1A] transition-colors">Bookstore</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-[#1A1A2E] font-semibold truncate max-w-xs">{currentBook.title}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Realistic Physical Book Front Cover Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#FBF8F3] border border-[#EBE4D8] rounded-3xl p-8 sm:p-12 flex items-center justify-center shadow-xs">
              <RealisticBookCover book={currentBook} size="xl" showBadge />
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Genuine Print
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Global Dispatch
              </span>
            </div>
          </div>

          {/* Right Column: Book Details & Actions */}
          <div className="lg:col-span-7 space-y-8 flex flex-col">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#8B1A1A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {currentBook.category}
                </span>
                <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-2xs">
                  <Star className="w-4 h-4 fill-[#C5A55A] text-[#C5A55A]" />
                  <span className="font-bold text-xs text-[#1A1A2E]">{currentBook.rating}</span>
                  <span className="text-gray-400 text-xs">({currentBook.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] leading-tight mb-2">
                {currentBook.title}
              </h1>

              {currentBook.subtitle && (
                <p className="text-base text-[#8B1A1A] font-medium italic mb-2">
                  {currentBook.subtitle}
                </p>
              )}

              <p className="text-sm text-gray-600">
                Published by <strong className="text-gray-900">Page Craft Publishing</strong> • Written by{' '}
                <Link
                  href={`/authors/${currentBook.authorSlug || 'eleanor-vance'}`}
                  className="text-[#8B1A1A] hover:underline font-bold"
                >
                  {currentBook.author}
                </Link>
              </p>
            </div>

            {/* Price block */}
            <div className="p-5 bg-white border border-[#EBE4D8] rounded-2xl flex items-baseline gap-4 shadow-2xs">
              <span className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
                {currentBook.price}
              </span>
              {currentBook.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {currentBook.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full ml-auto">
                In Stock & Typeset Ready
              </span>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Select Edition Format
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'paperback', name: 'Paperback Edition', sub: 'Standard 5x8 Trim' },
                  { id: 'hardcover', name: 'Deluxe Hardcover', sub: 'Foil Case Laminate' },
                  { id: 'ebook', name: 'eBook (EPUB/PDF)', sub: 'Instant Download' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`px-5 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedFormat === fmt.id
                        ? 'border-[#8B1A1A] bg-rose-50/50 text-[#8B1A1A] font-bold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <span className="block text-xs">{fmt.name}</span>
                    <span className="block text-[10px] text-gray-400 font-normal">{fmt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center border border-gray-300 rounded-2xl bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 text-gray-600 rounded-l-2xl text-sm font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 text-gray-600 rounded-r-2xl text-sm font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] bg-[#8B1A1A] text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-[#722F37] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => toggleItem(currentBook.id)}
                className={`p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                  inWishlist
                    ? 'bg-rose-50 border-[#8B1A1A] text-[#8B1A1A]'
                    : 'border-gray-300 hover:bg-white text-gray-500'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Synopsis / Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-playfair text-2xl font-bold text-[#1A1A2E] mb-3">
                About This Edition
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {currentBook.description}
              </p>
            </div>

            {/* Product Specifications Table */}
            <div className="pt-4">
              <h3 className="font-playfair text-lg font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#8B1A1A]" /> Bibliographic Data
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-5 rounded-2xl border border-[#EBE4D8]">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">ISBN</span>
                  <span className="font-mono font-medium text-gray-800">{currentBook.isbn}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Trim Size</span>
                  <span className="font-medium text-gray-800">5 × 8 in (Standard)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Length</span>
                  <span className="font-medium text-gray-800">{currentBook.pages} Pages</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Language</span>
                  <span className="font-medium text-gray-800">English (Original)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Imprint</span>
                  <span className="font-medium text-gray-800">Page Craft</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Published</span>
                  <span className="font-medium text-gray-800">{currentBook.created_at.split('T')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Titles */}
        {relatedList.length > 0 && (
          <div className="pt-16 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A2E]">
                  Related Releases in {currentBook.category}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Discover matching front covers from authors in our publishing imprint.
                </p>
              </div>
              <Link href="/bookstore" className="text-xs font-bold text-[#8B1A1A] hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedList.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CartDrawer />
    </div>
  );
}
