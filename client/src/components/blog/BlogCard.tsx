'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full ${featured ? 'md:flex-row md:h-auto' : ''}`}
    >
      <Link href={`/blog/${post.slug}`} className={`relative block overflow-hidden bg-gray-100 ${featured ? 'md:w-1/2 aspect-[4/3] md:aspect-auto' : 'aspect-[16/9]'}`}>
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-white/20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full text-[#1A1A2E] shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      <div className={`p-6 md:p-8 flex flex-col flex-grow ${featured ? 'md:w-1/2 justify-center' : ''}`}>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.publishDate}</div>
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} min read</div>
        </div>

        <Link href={`/blog/${post.slug}`} className="group-hover:text-[#8B1A1A] transition-colors">
          <h3 className={`font-playfair font-bold text-[#1A1A2E] mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'} line-clamp-2`}>
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
              {post.author.avatar ? (
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-[#8B1A1A] flex items-center justify-center text-white text-xs font-bold">
                  {post.author.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="text-[#8B1A1A] flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all">
            Read <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
