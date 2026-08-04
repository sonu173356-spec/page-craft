import { Metadata } from 'next';
import React from 'react';
import BookstoreClient from './BookstoreClient';

export const metadata: Metadata = {
  title: 'Bookstore | Page Craft',
  description: 'Browse our collection of premium books across various genres.',
};

export default function BookstorePage() {
  return <BookstoreClient />;
}
