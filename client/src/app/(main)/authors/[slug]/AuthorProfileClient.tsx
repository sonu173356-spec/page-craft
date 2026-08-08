'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Globe,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  BookMarked,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { Author } from '@/types';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { toast } from 'react-hot-toast';

interface AuthorProfileClientProps {
  author?: Author;
  slug: string;
}

export default function AuthorProfileClient({ author, slug }: AuthorProfileClientProps) {
  // If author doesn't exist, show clean 404 message
  if (!author) {
    return (
      <div className="bg-[#FBF8F2] min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-[#171717]">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DED3] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center mx-auto mb-4 text-[#8B1A1A]">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-[#171717] mb-2">
            Author not found
          </h1>
          <p className="text-sm text-[#666666] mb-6">
            We couldn&apos;t find an author profile matching &ldquo;{slug}&rdquo;. The author may have been updated or moved.
          </p>
          <Link
            href="/authors"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B1A1A] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#722F37] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      toast.success('Author profile link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#171717]">
      {/* 1. TOP NAVIGATION & BREADCRUMB */}
      <div className="bg-[#F7F1E8] border-b border-[#E5DED3] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/authors"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B1A1A] hover:text-[#722F37] hover:-translate-x-0.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Authors
            </Link>
            <span className="text-[#E5DED3]">|</span>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Authors', href: '/authors' },
                { label: author.name },
              ]}
              className="text-xs text-[#666666]"
            />
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#E5DED3] rounded-lg text-xs font-semibold text-[#171717] hover:bg-[#F7F1E8] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8B1A1A]" />
            Share Profile
          </button>
        </div>
      </div>

      {/* 2. AUTHOR HERO & INTRO CARD (Editorial Publishing House Style) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5DED3] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Author Avatar / Initials Photo */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`w-36 h-36 sm:w-44 sm:h-44 rounded-3xl flex items-center justify-center font-bold text-4xl sm:text-5xl font-playfair border-2 shadow-sm ${author.color || 'bg-rose-100 text-rose-800 border-rose-200'} mb-6`}
              >
                {author.initials || author.name.slice(0, 2).toUpperCase()}
              </motion.div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-semibold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Page Craft Author
              </div>

              {/* Social / External Links */}
              {author.social && (
                <div className="flex items-center gap-2.5 pt-2">
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center text-[#666666] hover:text-[#8B1A1A] hover:bg-white hover:border-[#8B1A1A] transition-all"
                      aria-label="Author Website"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center text-[#666666] hover:text-[#8B1A1A] hover:bg-white hover:border-[#8B1A1A] transition-all"
                      aria-label="Twitter Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {author.social.instagram && (
                    <a
                      href={author.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center text-[#666666] hover:text-[#8B1A1A] hover:bg-white hover:border-[#8B1A1A] transition-all"
                      aria-label="Instagram Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center text-[#666666] hover:text-[#8B1A1A] hover:bg-white hover:border-[#8B1A1A] transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right: Author Name, Title, Quote & Key Info */}
            <div className="lg:col-span-8 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Author Title (New Feature) */}
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8B1A1A] block mb-1">
                  {author.title || 'Published Author'}
                </span>

                {/* Author Name */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#171717] tracking-tight mb-3">
                  {author.name}
                </h1>

                {/* Genre Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {author.genres.map((g) => (
                    <span
                      key={g}
                      className="text-xs font-semibold bg-[#F7F1E8] text-[#171717] px-3 py-1 rounded-md border border-[#E5DED3]"
                    >
                      {g}
                    </span>
                  ))}
                  <span className="text-xs text-[#666666] ml-2 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8B1A1A]" />
                    Author Since {author.authorSince || '2024'}
                  </span>
                </div>

                {/* Short Bio Quote in Warm Editorial Callout */}
                <div className="p-5 sm:p-6 bg-[#F7F1E8] rounded-2xl border-l-4 border-[#8B1A1A] border-[#E5DED3] mb-6">
                  <blockquote className="font-playfair text-base sm:text-lg italic text-[#2C1810] leading-relaxed">
                    &ldquo;{author.bio}&rdquo;
                  </blockquote>
                </div>

                {/* KPI Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#FBF8F2] border border-[#E5DED3] p-3.5 rounded-xl">
                    <span className="text-[11px] font-semibold text-[#666666] uppercase block">
                      Published Books
                    </span>
                    <span className="text-xl font-bold font-playfair text-[#8B1A1A]">
                      {author.bookCount || author.booksPublished || author.books?.length || 1} Titles
                    </span>
                  </div>

                  <div className="bg-[#FBF8F2] border border-[#E5DED3] p-3.5 rounded-xl">
                    <span className="text-[11px] font-semibold text-[#666666] uppercase block">
                      Distribution Reach
                    </span>
                    <span className="text-xl font-bold font-playfair text-[#171717]">
                      Pan India & Global
                    </span>
                  </div>

                  <div className="bg-[#FBF8F2] border border-[#E5DED3] p-3.5 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-semibold text-[#666666] uppercase block">
                      Publishing Rights
                    </span>
                    <span className="text-xl font-bold font-playfair text-[#171717]">
                      100% Retained
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE AUTHOR (Long-form Biography) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E5DED3] p-8 sm:p-12 shadow-2xs">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#8B1A1A]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8B1A1A]">
                About the Author
              </h2>
            </div>

            <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#171717] mb-6 leading-snug">
              Behind the Words of {author.name}
            </h3>

            <div className="prose prose-lg max-w-none text-[#444444] leading-relaxed text-sm sm:text-base space-y-4">
              <p>
                {author.longBio ||
                  `${author.name} is an esteemed voice in contemporary literature, having published multiple celebrated works in ${author.genres.join(' and ')}. With a passion for storytelling that bridges compelling narrative craft with rich character dimensions, ${author.name} continues to connect deeply with readers across physical bookstores and digital platforms.`}
              </p>
              <p>
                Through their partnership with Page Craft, {author.name} maintains complete creative autonomy and 100% intellectual property ownership, ensuring that every published edition preserves the pristine vision of the original manuscript.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOOKS BY [AUTHOR NAME] */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F1E8] border-y border-[#E5DED3]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookMarked className="w-5 h-5 text-[#8B1A1A]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B1A1A]">
                  Published Bibliography
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-[#171717]">
                Books by {author.name}
              </h2>
            </div>

            <Link
              href="/bookstore"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B1A1A] hover:underline self-start sm:self-auto"
            >
              Explore Bookstore
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(author.books && author.books.length > 0 ? author.books : [
              {
                id: `book-${author.id}-1`,
                title: `Selected Works of ${author.name}`,
                category: author.genres[0] || 'Fiction',
                description: `A celebrated collection of published stories, essays, and chapters authored by ${author.name}.`,
                price: 399,
                format: 'Paperback & eBook',
                publishDate: '2024',
                pages: 320,
                isbn: '978-93-88214-99-9',
                color: 'bg-rose-50 border-rose-200 text-rose-900',
              }
            ]).map((book, idx) => (
              <motion.div
                key={book.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-[#E5DED3] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#8B1A1A] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Book Spine / Cover Mock Representation */}
                  <div
                    className={`h-48 rounded-xl flex flex-col items-center justify-center p-6 text-center border mb-6 relative overflow-hidden ${
                      book.color || 'bg-[#F7F1E8] border-[#E5DED3] text-[#171717]'
                    }`}
                  >
                    <BookOpen className="w-10 h-10 mb-2 opacity-30 text-[#8B1A1A]" />
                    <h4 className="font-playfair font-bold text-base line-clamp-2 px-2">
                      {book.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#8B1A1A] uppercase tracking-wider mt-1">
                      {book.category}
                    </span>
                  </div>

                  {/* Book Info */}
                  <div className="flex items-center justify-between text-xs text-[#666666] mb-2">
                    <span className="font-medium">{book.format || 'Paperback & eBook'}</span>
                    <span>{book.publishDate || 'Published'}</span>
                  </div>

                  <h3 className="text-xl font-playfair font-bold text-[#171717] mb-2 leading-tight">
                    {book.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed mb-6">
                    {book.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DED3] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#888888] block">Price</span>
                    <span className="text-lg font-bold text-[#8B1A1A]">₹{book.price || 399}</span>
                  </div>

                  <Link
                    href="/bookstore"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B1A1A] text-white text-xs font-bold rounded-xl hover:bg-[#722F37] transition-colors cursor-pointer shadow-2xs"
                  >
                    View Book
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AUTHOR INFORMATION SUMMARY TABLE */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E5DED3] p-8 sm:p-10 shadow-2xs">
            <h3 className="text-xl font-playfair font-bold text-[#171717] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8B1A1A]" />
              Author Information & Publishing Records
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm divide-y sm:divide-y-0 sm:divide-x divide-[#E5DED3]">
              <div className="pt-4 sm:pt-0 sm:pr-6">
                <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Author Name</p>
                <p className="font-bold text-[#171717] text-base">{author.name}</p>
                <p className="text-xs text-[#8B1A1A] font-medium mt-0.5">{author.title || 'Published Author'}</p>
              </div>

              <div className="pt-4 sm:pt-0 sm:px-6">
                <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Published Books</p>
                <p className="font-bold text-[#171717] text-base">
                  {author.bookCount || author.booksPublished || 1} Titles in Print
                </p>
                <p className="text-xs text-[#666666] mt-0.5">Paperback & Global eBooks</p>
              </div>

              <div className="pt-4 sm:pt-0 sm:px-6">
                <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Primary Genres</p>
                <p className="font-bold text-[#171717] text-base">{author.genres.join(', ')}</p>
                <p className="text-xs text-[#666666] mt-0.5">Editorial Curated</p>
              </div>

              <div className="pt-4 sm:pt-0 sm:pl-6">
                <p className="text-xs font-semibold text-[#888888] uppercase mb-1">Author Since</p>
                <p className="font-bold text-[#171717] text-base">{author.authorSince || '2024'}</p>
                <p className="text-xs text-green-700 font-medium mt-0.5">Active Publishing Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
