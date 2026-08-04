import { Metadata } from 'next';
import React from 'react';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog - Publishing Insights & Author Tips | Page Craft',
  description: 'Expert advice, publishing guides, and author interviews to help you succeed in your writing journey.',
};

export default function BlogPage() {
  return <BlogClient />;
}
