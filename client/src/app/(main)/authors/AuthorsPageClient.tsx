'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ArrowRight, Sparkles, Filter, X } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ALL_AUTHORS, ALL_GENRES } from '@/lib/authorsData';

const ITEMS_PER_PAGE = 8;

export default function AuthorsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic filter by name, title, bio, longBio, genres
  const filteredAuthors = useMemo(() => {
    const trimmed = searchQuery.toLowerCase().trim();
    return ALL_AUTHORS.filter((author) => {
      const matchesSearch =
        !trimmed ||
        author.name.toLowerCase().includes(trimmed) ||
        (author.title && author.title.toLowerCase().includes(trimmed)) ||
        author.bio.toLowerCase().includes(trimmed) ||
        (author.longBio && author.longBio.toLowerCase().includes(trimmed)) ||
        author.genres.some((g) => g.toLowerCase().includes(trimmed));

      const matchesGenre = activeGenre === 'All' || author.genres.includes(activeGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, activeGenre]);

  const totalPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);
  const currentAuthors = filteredAuthors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeGenre]);

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#171717]">
      {/* 1. AUTHORS HERO SECTION (Cream Editorial Aesthetic) */}
      <section className="bg-[#F7F1E8] border-b border-[#E5DED3] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Breadcrumb
              items={[{ label: 'Home', href: '/' }, { label: 'Authors' }]}
              className="text-[#666666]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E5DED3] text-[#8B1A1A] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              Published Voices
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-[#171717] tracking-tight mb-4">
              Authors
            </h1>

            <p className="text-lg sm:text-xl text-[#666666] max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Discover the talented individuals who have trusted The Page Craft to bring their stories to the world.
            </p>

            {/* Author Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666] w-5 h-5" />
              <input
                type="text"
                placeholder="Search authors by name, title, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#E5DED3] rounded-2xl text-[#171717] placeholder:text-[#888888] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:border-transparent transition-all text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#171717] p-1 rounded-full hover:bg-[#F7F1E8] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN SECTION: GENRE FILTERS & AUTHOR CARDS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Genre Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {ALL_GENRES.map((genre) => {
              const isActive = activeGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1A1A] text-white shadow-xs scale-105'
                      : 'bg-white text-[#171717] border border-[#E5DED3] hover:border-[#8B1A1A] hover:bg-[#F7F1E8]'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5DED3] text-sm text-[#666666]">
            <span>
              Showing <strong className="text-[#171717]">{filteredAuthors.length}</strong> published {filteredAuthors.length === 1 ? 'author' : 'authors'}
            </span>
            {(searchQuery || activeGenre !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveGenre('All');
                }}
                className="text-[#8B1A1A] hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Author Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {currentAuthors.map((author) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={author.id}
                  className="group"
                >
                  <Link
                    href={`/authors/${author.slug}`}
                    className="h-full bg-white rounded-2xl border border-[#E5DED3] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#8B1A1A] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Top Row: Avatar Initials + Books Count */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg font-playfair border shadow-2xs group-hover:scale-105 transition-transform duration-300 ${author.color}`}
                        >
                          {author.initials || author.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="flex items-center text-xs font-semibold text-[#666666] bg-[#F7F1E8] border border-[#E5DED3] px-2.5 py-1 rounded-lg">
                          <BookOpen className="w-3.5 h-3.5 mr-1 text-[#8B1A1A]" />
                          {author.bookCount || author.booksPublished}{' '}
                          {(author.bookCount || author.booksPublished) === 1 ? 'Book' : 'Books'}
                        </div>
                      </div>

                      {/* Author Name */}
                      <h3 className="font-playfair font-bold text-xl text-[#171717] group-hover:text-[#8B1A1A] transition-colors leading-tight mb-1">
                        {author.name}
                      </h3>

                      {/* Author Title (New Feature) */}
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B1A1A] mb-3">
                        {author.title || 'Published Author'}
                      </p>

                      {/* Genre Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {author.genres.map((g) => (
                          <span
                            key={g}
                            className="text-[11px] font-medium bg-[#F7F1E8] text-[#555555] px-2.5 py-0.5 rounded-md border border-[#E5DED3]"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      {/* Short Bio */}
                      <p className="text-[#666666] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6">
                        {author.bio}
                      </p>
                    </div>

                    {/* Card Footer: View Profile CTA */}
                    <div className="pt-3 border-t border-[#F7F1E8] flex items-center justify-between text-xs font-bold text-[#8B1A1A] group-hover:text-[#722F37]">
                      <span>View Profile</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 3. NO RESULTS MESSAGE */}
          {filteredAuthors.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E5DED3] p-8 max-w-lg mx-auto shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center mx-auto mb-4 text-[#8B1A1A]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#171717] mb-2">
                No authors found.
              </h3>
              <p className="text-sm text-[#666666] mb-6">
                We couldn&apos;t find any published authors matching &ldquo;{searchQuery}&rdquo; in the selected genre.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveGenre('All');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B1A1A] text-white text-xs font-bold rounded-xl hover:bg-[#722F37] transition-colors cursor-pointer shadow-xs"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* 4. PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-14">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-[#E5DED3] bg-white text-[#171717] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F7F1E8] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Previous
              </button>

              <div className="flex space-x-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-[#8B1A1A] text-white shadow-xs'
                        : 'bg-white border border-[#E5DED3] text-[#171717] hover:bg-[#F7F1E8]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl border border-[#E5DED3] bg-white text-[#171717] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F7F1E8] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
