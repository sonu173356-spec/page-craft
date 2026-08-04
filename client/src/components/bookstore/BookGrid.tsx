'use client';

import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Book } from '@/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  if (books.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <h3 className="font-playfair text-xl font-bold text-[#1A1A2E] mb-2">No books found</h3>
        <p className="text-gray-600">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-[#1A1A2E]">{books.length}</span> results
        </p>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-gray-100 text-[#8B1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-gray-100 text-[#8B1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
