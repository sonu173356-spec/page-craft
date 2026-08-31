'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Star, Eye, ShoppingCart, Sparkles } from 'lucide-react';
import { Button, SectionHeading, RealisticBookCover } from '@/components/ui';
import Link from 'next/link';
import { getStoredPublishedBooks, BOOKS_UPDATED_EVENT } from '@/lib/bookService';
import { PublishedBook, SAMPLE_PUBLISHED_BOOKS } from '@/lib/bookCovers';
import { useCartStore } from '@/store';
import { toast } from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FeaturedBooks() {
  const [books, setBooks] = useState<PublishedBook[]>(() => {
    return SAMPLE_PUBLISHED_BOOKS.filter((b) => b.featured);
  });
  const { addItem, openCart } = useCartStore();

  const loadBooks = () => {
    const all = getStoredPublishedBooks();
    const featured = all.filter((b) => b.featured && b.status === 'published');
    setBooks(featured.length > 0 ? featured : all.slice(0, 6));
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

  const handleQuickAdd = (book: PublishedBook, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Map to store item format
    const storeBook: any = {
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

    addItem(storeBook, 'paperback', 1);
    toast.success(`"${book.title}" added to your reading cart.`);
    openCart();
  };

  return (
    <section className="py-24 bg-[#FDFAF6] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-[#8B1A1A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A55A]" />
              Curated Masterpieces
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
              Featured Books
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Discover celebrated front-cover works and award-worthy stories published across our international catalog.
            </p>
          </div>

          <Link href="/bookstore" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              className="border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-all text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Explore Full Bookstore
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative px-2 sm:px-4"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="!pb-14"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <div className="group h-full bg-white rounded-2xl border border-[#EBE4D8] shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col p-5">
                  {/* Physical Realistic Book Cover Showcase */}
                  <Link
                    href={`/bookstore/${book.id}`}
                    className="relative w-full py-6 px-4 bg-[#FBF8F3] rounded-xl flex items-center justify-center overflow-hidden border border-[#F0EAE1] group-hover:border-amber-200 transition-colors"
                  >
                    <RealisticBookCover book={book} size="lg" />
                  </Link>

                  {/* Book Metadata & Purchase Details */}
                  <div className="pt-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-[#8B1A1A] uppercase tracking-wider truncate">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#C5A55A] text-[#C5A55A]" />
                        <span className="text-xs font-bold text-[#1A1A2E]">{book.rating}</span>
                        <span className="text-[10px] text-gray-400">({book.reviewCount})</span>
                      </div>
                    </div>

                    <Link href={`/bookstore/${book.id}`}>
                      <h3 className="font-playfair font-bold text-lg sm:text-xl text-[#1A1A2E] line-clamp-1 group-hover:text-[#8B1A1A] transition-colors">
                        {book.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 mt-0.5 mb-2 truncate">
                      by <span className="font-medium text-gray-700">{book.author}</span>
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {book.description}
                    </p>

                    {/* Price & Action Buttons */}
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-base sm:text-lg text-[#1A1A2E]">
                            {book.price}
                          </span>
                          {book.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {book.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {book.format}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(book, e)}
                          className="p-2.5 rounded-xl bg-amber-50 hover:bg-[#8B1A1A] text-[#8B1A1A] hover:text-white transition-colors cursor-pointer"
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <Link href={`/bookstore/${book.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs font-bold px-3.5 h-9 border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors cursor-pointer rounded-xl"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="mt-4 text-center sm:hidden">
          <Link href="/bookstore">
            <Button className="w-full bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl text-xs font-bold py-3">
              Explore Full Bookstore
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
