import { Metadata } from 'next';
import React from 'react';
import BlogPostClient from './BlogPostClient';

export const metadata: Metadata = {
  title: 'Blog Post | Page Craft',
  description: 'Read our latest article.',
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
