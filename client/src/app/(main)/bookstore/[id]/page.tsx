import { Metadata } from 'next';
import React from 'react';
import BookDetailClient from './BookDetailClient';

export const metadata: Metadata = {
  title: 'Book Details | Page Craft',
  description: 'View detailed information about this book.',
};

export default function BookDetailPage({ params }: { params: { id: string } }) {
  return <BookDetailClient bookId={params.id} />;
}
