'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight, Share2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/blog/BlogCard';

const MOCK_POST: BlogPost = {
  id: 'post-1',
  title: 'How to Build an Engaging Author Platform from Scratch',
  slug: 'how-to-build-author-platform',
  excerpt: 'Learn the essential strategies and tools needed to succeed in today\'s competitive publishing landscape.',
  content: `
    <p>In today's digital age, writing a great book is only half the battle. To ensure your work reaches its intended audience, you need a strong author platform. But what exactly is an author platform, and how do you build one if you're starting from zero?</p>
    
    <h2>What is an Author Platform?</h2>
    <p>Simply put, your author platform is your ability to reach readers. It encompasses everything from your website and social media presence to your email list and professional network. It's the foundation upon which your publishing career is built.</p>
    
    <blockquote>"Your author platform isn't just about selling books; it's about building meaningful connections with your readers." - Sarah Jenkins</blockquote>
    
    <h2>1. Start with a Professional Website</h2>
    <p>Your website is your home base on the internet. Unlike social media platforms, you own and control your website. It should include:</p>
    <ul>
      <li>A professional author bio</li>
      <li>Information about your books</li>
      <li>A contact page</li>
      <li>An email newsletter sign-up form</li>
    </ul>

    <h2>2. Build Your Email List Early</h2>
    <p>If you only focus on one aspect of your platform, make it your email list. Social media algorithms change constantly, but your email list belongs to you. Offer a "lead magnet" — a free short story, a character guide, or a helpful checklist — to encourage readers to subscribe.</p>

    <h2>3. Choose 1-2 Social Media Platforms</h2>
    <p>Don't spread yourself too thin by trying to be everywhere at once. Pick one or two platforms where your target audience hangs out and where you enjoy spending time. For fiction authors, Instagram and TikTok are currently very popular. For non-fiction, LinkedIn or Twitter might be better.</p>
  `,
  coverImage: '',
  category: 'Marketing',
  tags: ['Author Platform', 'Marketing', 'Social Media'],
  author: {
    name: 'Sarah Jenkins',
    avatar: ''
  },
  publishDate: 'Oct 15, 2023',
  readTime: 8
};

const RELATED_POSTS = Array.from({length: 3}).map((_, i) => ({
  ...MOCK_POST,
  id: `related-${i}`,
  title: `Related Post ${i + 1}`
}));

export default function BlogPostClient({ slug }: { slug: string }) {
  return (
    <div className="bg-[#FDFAF6] min-h-screen pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/blog" className="hover:text-[#8B1A1A]">Blog</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#1A1A2E]">{MOCK_POST.category}</span>
        </nav>
        
        <span className="bg-[#8B1A1A]/10 text-[#8B1A1A] text-sm font-bold px-3 py-1 rounded-full mb-6 inline-block">
          {MOCK_POST.category}
        </span>
        
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight mb-6">
          {MOCK_POST.title}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-500 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold">
              {MOCK_POST.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-[#1A1A2E]">{MOCK_POST.author.name}</p>
              <p className="text-sm">Author & Marketing Expert</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm ml-auto">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {MOCK_POST.publishDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {MOCK_POST.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full aspect-[21/9] bg-gray-200 rounded-3xl overflow-hidden relative shadow-lg">
          {MOCK_POST.coverImage ? (
            <Image src={MOCK_POST.coverImage} alt={MOCK_POST.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-white/20" />
            </div>
          )}
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        {/* Social Share Sidebar */}
        <aside className="w-full md:w-16 flex md:flex-col gap-4 items-center md:items-start py-4 md:sticky md:top-24 h-fit">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider md:mb-2 hidden md:block">Share</span>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#8B1A1A] hover:border-[#8B1A1A] transition-colors"><Share2 className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#8B1A1A] hover:border-[#8B1A1A] transition-colors"><LinkIcon className="w-4 h-4" /></button>
        </aside>

        {/* Article Body */}
        <article className="flex-1">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-[#1A1A2E] prose-p:text-gray-600 prose-a:text-[#8B1A1A] prose-blockquote:border-l-[#8B1A1A] prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:font-playfair prose-blockquote:text-xl prose-blockquote:text-[#1A1A2E] mb-12"
            dangerouslySetInnerHTML={{ __html: MOCK_POST.content }}
          />

          {/* Tags */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <span className="font-medium text-[#1A1A2E]">Tags:</span>
            {MOCK_POST.tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${tag}`} className="text-sm text-gray-500 hover:text-[#8B1A1A] bg-white px-3 py-1 rounded-full border border-gray-200 hover:border-[#8B1A1A] transition-colors">
                {tag}
              </Link>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center font-bold text-3xl flex-shrink-0">
              {MOCK_POST.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#1A1A2E] mb-2">About {MOCK_POST.author.name}</h3>
              <p className="text-gray-600 mb-4">Sarah is a bestselling author and marketing consultant who helps indie authors build their platforms and reach more readers. She has been featured in major publishing magazines.</p>
              <Link href="#" className="text-[#8B1A1A] font-medium hover:underline">View all posts by Sarah →</Link>
            </div>
          </div>
        </article>
      </div>

      {/* Related Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="font-playfair text-3xl font-bold text-[#1A1A2E] mb-8 text-center">More Articles Like This</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RELATED_POSTS.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
