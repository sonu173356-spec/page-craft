import { Metadata } from 'next';
import React from 'react';
import BookDetailClient from './BookDetailClient';

export const metadata: Metadata = {
  title: 'Book Details | Page Craft',
  description: 'View detailed information about this book.',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <BookDetailClient bookId={id} />;
}
