'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { SectionHeading, Button, RealisticBookCover } from '@/components/ui';
import Link from 'next/link';
import { getStoredPublishedBooks, BOOKS_UPDATED_EVENT } from '@/lib/bookService';
import { PublishedBook, SAMPLE_PUBLISHED_BOOKS } from '@/lib/bookCovers';
import { useCartStore } from '@/store';
import { toast } from 'react-hot-toast';

export default function LatestBooks() {
  const [latestBooks, setLatestBooks] = useState<PublishedBook[]>(() => {
    return [...SAMPLE_PUBLISHED_BOOKS]
      .filter((b) => b.status === 'published')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);
  });
  const { addItem, openCart } = useCartStore();

  const loadLatest = () => {
    const all = getStoredPublishedBooks();
    // Sort published books by created_at DESC
    const sorted = [...all]
      .filter((b) => b.status === 'published')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setLatestBooks(sorted.slice(0, 6));
  };

  useEffect(() => {
    loadLatest();

    const handleUpdate = () => {
      loadLatest();
    };

    window.addEventListener(BOOKS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(BOOKS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleAddToCart = (book: PublishedBook, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storeItem: any = {
      id: book.id,
      title: book.title,
      slug: book.id,
      author: { name: book.author, slug: book.authorSlug || 'author' },
      price: book.numericPrice || 399,
      coverImage: book.cover_image_url || '',
      category: book.category,
      format: ['paperback'],
      rating: book.rating,
      reviewCount: book.reviewCount,
    };

    addItem(storeItem, 'paperback', 1);
    toast.success(`Added "${book.title}" to cart!`);
    openCart();
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Fresh from the Press
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
              Latest Releases
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Explore the newest published additions to our growing catalog, sorted chronologically from editorial release.
            </p>
          </div>

          <Link href="/bookstore" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              className="border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-all text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              View All Releases
            </Button>
          </Link>
        </div>

        {/* 3 Columns x 2 Rows Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-row items-center bg-[#FDFAF6] border border-[#EBE4D8] rounded-2xl p-4 sm:p-5 hover:border-amber-200 hover:shadow-xl transition-all duration-300 gap-4"
            >
              {/* Left Side: Realistic Front Cover Presentation with Spine Depth */}
              <Link
                href={`/bookstore/${book.id}`}
                className="shrink-0 flex items-center justify-center p-2 rounded-xl bg-white/70 border border-gray-100 group-hover:bg-white transition-colors"
              >
                <RealisticBookCover book={book} size="md" />
              </Link>

              {/* Right Side: Metadata & Add to Cart */}
              <div className="flex-1 flex flex-col justify-between h-full min-w-0 py-1">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#8B1A1A] uppercase tracking-wider block truncate mb-1">
                    {book.category}
                  </span>

                  <Link href={`/bookstore/${book.id}`}>
                    <h4 className="font-playfair font-bold text-base sm:text-lg text-[#1A1A2E] leading-snug line-clamp-2 group-hover:text-[#8B1A1A] transition-colors mb-1">
                      {book.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-gray-500 truncate mb-2">
                    by <span className="font-medium text-gray-700">{book.author}</span>
                  </p>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-200/60 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-[#1A1A2E]">
                      {book.price}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {String(Array.isArray(book.format) ? book.format[0] : book.format || 'Paperback').split('•')[0]}
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={(e) => handleAddToCart(book, e)}
                    className="text-xs font-bold px-3 sm:px-3.5 h-8 sm:h-9 bg-white border border-[#C5A55A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white hover:border-[#8B1A1A] rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/bookstore">
            <Button
              size="lg"
              className="bg-[#8B1A1A] hover:bg-[#722F37] text-white shadow-md rounded-xl text-xs sm:text-sm font-bold px-8 py-3.5 cursor-pointer inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Explore Entire Catalog ({latestBooks.length}+ Titles)
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
