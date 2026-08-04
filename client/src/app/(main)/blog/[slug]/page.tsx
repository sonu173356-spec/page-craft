import { Metadata } from 'next';
import React from 'react';
import BlogPostClient from './BlogPostClient';

export const metadata: Metadata = {
  title: 'Blog Post | Page Craft',
  description: 'Read our latest article.',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
