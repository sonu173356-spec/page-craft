'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit, Eye, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';

const books = [
  { id: 1, title: 'The Silent Echo', status: 'Published', sales: 1245, price: '?399', date: '2024-01-15', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop' },
  { id: 2, title: 'Midnight Dreams', status: 'Under Review', sales: 0, price: '?299', date: '-', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop' },
  { id: 3, title: 'Journey to the Unknown', status: 'Draft', sales: 0, price: '?499', date: '-', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop' },
];

export default function AuthorBooksPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">My Books</h1>
        <Link href="/author/upload-book" className="flex items-center gap-2 px-4 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-red-800 transition-colors">
          <Plus size={18} />
          Upload New Book
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search books..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 w-full sm:w-auto">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-48 bg-gray-100 relative overflow-hidden flex justify-center items-center">
              <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                  book.status === 'Published' ? 'bg-green-100 text-green-700' : book.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {book.status}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#1A1A2E] text-xl mb-2 font-playfair">{book.title}</h3>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <span>Sales: <strong className="text-[#1A1A2E]">{book.sales}</strong></span>
                <span>Price: <strong className="text-[#1A1A2E]">{book.price}</strong></span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xs text-gray-400">Published: {book.date}</p>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-lg transition-colors"><Eye size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-[#C5A55A] hover:bg-yellow-50 rounded-lg transition-colors"><Edit size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
