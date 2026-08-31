import { Metadata } from 'next';
import React, { Suspense } from 'react';
import BookstoreClient from './BookstoreClient';

export const metadata: Metadata = {
  title: 'Bookstore | Page Craft',
  description: 'Browse our collection of premium books across various genres.',
};

export default function BookstorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFAF6] py-24 flex items-center justify-center text-sm font-medium text-gray-500">Loading bookstore catalog...</div>}>
      <BookstoreClient />
    </Suspense>
  );
}
