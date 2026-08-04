'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen, Search, ArrowLeft } from 'lucide-react';

// ============================================================
// Page Craft — 404 Page
// A beautiful, on-brand "Page Not Found" experience
// ============================================================

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating book pages */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5 + i * 3, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            <BookOpen
              size={40 + i * 10}
              className="text-primary"
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Large 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <h1
            className="text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background:
                'linear-gradient(135deg, #8B1A1A 0%, #C5A55A 50%, #8B1A1A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-charcoal mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            This Page Has Gone Missing
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Like a bookmark that slipped out, the page you&apos;re looking for
            seems to have wandered off. Let&apos;s get you back to a story
            worth reading.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/bookstore"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Search size={18} />
            Browse Bookstore
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-text-muted text-sm mb-4">Popular destinations:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Publishing Plans', href: '/publishing-plans' },
              { label: 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQs', href: '/faq' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-4 py-2 rounded-full bg-white border border-border-light text-text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.history.back();
            }}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors text-sm cursor-pointer"
          >
            <ArrowLeft size={14} />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  );
}
