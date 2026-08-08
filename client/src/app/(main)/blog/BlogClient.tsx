'use client';

import React, { useState, useMemo } from 'react';
import { Search, Mail } from 'lucide-react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/blog/BlogCard';

const MOCK_POSTS: BlogPost[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `post-${i + 1}`,
  title: ['How to Build an Author Platform', 'The Future of Indie Publishing', 'Marketing Your First Book', 'Overcoming Writer\'s Block', 'Understanding Royalties'][i % 5] + ` ${i + 1}`,
  slug: `post-${i + 1}`,
  excerpt: 'Learn the essential strategies and tools needed to succeed in today\'s competitive publishing landscape. We cover everything from social media presence to email lists.',
  content: '',
  coverImage: '',
  category: ['Writing Tips', 'Publishing Guides', 'Author Interviews', 'Marketing', 'Book Reviews'][i % 5],
  tags: [],
  author: {
    name: 'Sarah Jenkins',
    avatar: ''
  },
  publishDate: 'Oct 15, 2023',
  readTime: 5 + (i % 3) * 2,
  isFeatured: i === 0
}));

const CATEGORIES = ['All', 'Writing Tips', 'Publishing Guides', 'Author Interviews', 'Marketing', 'Book Reviews'];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = MOCK_POSTS.find(p => p.isFeatured);
  
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && !post.isFeatured;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <section className="bg-[#FAF6F0] text-[#2C1810] border-b border-[#EDE4DB] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#8B1A1A] mb-6">
            Publishing Insights & Author Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice, industry news, and practical guides to help you navigate your publishing journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && !searchQuery && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Featured Article</h2>
            <BlogCard post={featuredPost} featured />
          </section>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-2xl shadow-xs border border-[#EDE4DB]">
          <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[#8B1A1A] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72 flex-shrink-0">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-[#EDE4DB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3" />
          </div>
        </div>

        {/* Grid Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </main>
          
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-[#FAF6F0] border border-[#EDE4DB] rounded-2xl p-8 text-[#2C1810] text-center shadow-xs">
              <Mail className="w-8 h-8 mx-auto mb-4 text-[#8B1A1A]" />
              <h3 className="font-playfair text-xl font-bold text-[#8B1A1A] mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-6">Get the latest publishing tips delivered straight to your inbox.</p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-xl bg-white border border-[#EDE4DB] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] text-gray-900 placeholder-gray-400 text-sm" required />
                <button type="submit" className="w-full bg-[#8B1A1A] text-white font-bold py-3 rounded-xl hover:bg-[#722F37] transition-colors cursor-pointer">
                  Subscribe Now
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-playfair text-lg font-bold text-[#1A1A2E] mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Writing', 'Self-Publishing', 'Marketing', 'KDP', 'Formatting', 'Cover Design', 'Editing'].map(tag => (
                  <span key={tag} className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
