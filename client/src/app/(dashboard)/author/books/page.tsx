'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Edit, Eye, Trash2, X, Check, BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const initialBooks = [
  { id: 'proj-001', title: 'The Silent Echo of Whispers', status: 'Ready for Review', sales: 1245, price: '₹399', date: '2026-08-01', category: 'Literary Fiction', progress: 95, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop' },
  { id: 'proj-002', title: 'Midnight Verses & Shadows', status: 'In Progress', sales: 0, price: '₹299', date: '2026-08-03', category: 'Poetry', progress: 70, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop' },
  { id: 'proj-003', title: 'Journey to the Unknown Peak', status: 'Draft', sales: 0, price: '₹499', date: '2026-08-05', category: 'Self-Help', progress: 30, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop' },
];

export default function AuthorBooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [booksList, setBooksList] = useState<any[]>(initialBooks);
  
  // Modals state
  const [selectedPreviewBook, setSelectedPreviewBook] = useState<any | null>(null);
  const [selectedEditBook, setSelectedEditBook] = useState<any | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('Fiction');
  const [editStatus, setEditStatus] = useState('Published');

  useEffect(() => {
    async function loadAuthorBooks() {
      let combined = [...initialBooks];

      // 1. Fetch server-side saved DIY projects
      try {
        const res = await fetch('/api/author/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.projects && data.projects.length > 0) {
            const apiMapped = data.projects.map((p: any) => ({
              id: p.id,
              title: p.title,
              status: p.status || 'Draft',
              sales: 0,
              price: '₹399',
              date: p.lastSavedAt ? p.lastSavedAt.split('T')[0] : '2026-08-08',
              category: p.genre || 'Fiction',
              progress: p.progress || 60,
              image: p.coverFrontImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop',
            }));

            // merge unique by id
            const existingIds = new Set(apiMapped.map((b: any) => b.id));
            const remaining = combined.filter((b: any) => !existingIds.has(b.id));
            combined = [...apiMapped, ...remaining];
          }
        }
      } catch (err) {
        console.warn('Could not fetch server projects:', err);
      }

      // 2. Fetch local storage books
      try {
        const storedStr = localStorage.getItem('pagecraft_user_books');
        if (storedStr) {
          const customBooks = JSON.parse(storedStr);
          const sanitized = customBooks.map((b: any) => ({
            ...b,
            image: b.image && !b.image.startsWith('blob:') ? b.image : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop',
          }));
          
          const existingIds = new Set(combined.map((b: any) => b.id));
          const localOnly = sanitized.filter((b: any) => !existingIds.has(b.id));
          combined = [...localOnly, ...combined];
        }
      } catch (err) {
        console.warn('LocalStorage load error:', err);
      }

      setBooksList(combined);
    }

    loadAuthorBooks();
  }, []);

  const saveBooksToStorage = (updated: any[]) => {
    setBooksList(updated);
    try {
      localStorage.setItem('pagecraft_user_books', JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  };

  const handleOpenEditModal = (book: any) => {
    setSelectedEditBook(book);
    setEditTitle(book.title);
    setEditPrice(String(book.price).replace('₹', ''));
    setEditCategory(book.category || 'Fiction');
    setEditStatus(book.status);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditBook) return;

    const updated = booksList.map((b) => {
      if (b.id === selectedEditBook.id) {
        return {
          ...b,
          title: editTitle,
          price: `₹${editPrice}`,
          category: editCategory,
          status: editStatus,
        };
      }
      return b;
    });

    saveBooksToStorage(updated);
    setSelectedEditBook(null);
    toast.success(`Book "${editTitle}" updated successfully!`);
  };

  const handleDeleteBook = (bookId: string | number, bookTitle: string) => {
    if (confirm(`Are you sure you want to archive "${bookTitle}"?`)) {
      const updated = booksList.filter((b) => b.id !== bookId);
      saveBooksToStorage(updated);
      toast.success(`"${bookTitle}" archived.`);
    }
  };

  const filteredBooks = booksList.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-[#1A1A2E]">
      {/* Top Header & Create CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED3] shadow-xs">
        <div>
          <span className="px-3 py-1 bg-red-100 text-[#8B1A1A] text-xs font-bold rounded-full uppercase tracking-wider">
            Author Catalog
          </span>
          <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E] mt-2">My Books & Book Interiors</h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, preview, and track the publishing progress of all your titles.
          </p>
        </div>

        <Link
          href="/author/books/new"
          className="px-6 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Book in Studio</span>
        </Link>
      </div>

      {/* Filter & Search Strip */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#E5DED3] flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search titles in your catalog..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FDFAF6] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs font-bold">
          {['All', 'Draft', 'In Progress', 'Ready for Review', 'Submitted', 'Published'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#8B1A1A] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const isSubmitted = book.status === 'Submitted' || book.status === 'Under Review' || book.status === 'Published';

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl shadow-xs border border-[#E5DED3] overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-52 bg-gray-100 relative overflow-hidden flex justify-center items-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                        book.status === 'Published'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : book.status === 'Ready for Review' || book.status === 'Submitted' || book.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-md text-[10px] font-medium">
                    {book.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-[#1A1A2E] text-lg font-playfair line-clamp-1">{book.title}</h3>

                  {/* Progress Indicator */}
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-gray-500">
                      <span>Publishing Readiness</span>
                      <strong className="text-[#8B1A1A]">{book.progress || 80}%</strong>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8B1A1A] h-full rounded-full transition-all"
                        style={{ width: `${book.progress || 80}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                    <span>Retail: <strong className="text-[#8B1A1A] font-bold">{book.price}</strong></span>
                    <span>Date: <strong className="text-gray-700">{book.date}</strong></span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-gray-100 mt-2">
                <div className="flex items-center justify-between gap-2 pt-3">
                  <Link
                    href={`/author/books/${book.id}`}
                    className="flex-1 py-2.5 bg-[#FDFAF6] hover:bg-[#F7F1E8] text-[#8B1A1A] border border-rose-200/80 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Continue Editing</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedPreviewBook(book)}
                    title="Live Preview"
                    className="p-2.5 text-gray-500 hover:text-[#8B1A1A] hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteBook(book.id, book.title)}
                    title="Archive Book"
                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-gray-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👁️ Preview Modal */}
      <AnimatePresence>
        {selectedPreviewBook && (
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative space-y-4"
            >
              <button
                onClick={() => setSelectedPreviewBook(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex gap-4 items-center">
                <img
                  src={selectedPreviewBook.image}
                  alt={selectedPreviewBook.title}
                  className="w-24 h-36 object-cover rounded-2xl shadow-md border"
                />
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 bg-red-100 text-[#8B1A1A] text-[10px] font-bold rounded-full">
                    {selectedPreviewBook.category || 'General'}
                  </span>
                  <h3 className="text-xl font-bold font-playfair text-[#1A1A2E]">{selectedPreviewBook.title}</h3>
                  <p className="text-xs text-gray-500">Retail Price: <strong className="text-[#8B1A1A]">{selectedPreviewBook.price}</strong></p>
                  <p className="text-xs text-gray-500">Status: <strong className="text-emerald-700">{selectedPreviewBook.status}</strong></p>
                </div>
              </div>

              <div className="bg-[#FDFAF6] p-4 rounded-2xl border border-gray-200 text-xs space-y-1.5 text-gray-700">
                <span className="font-bold text-[#8B1A1A] block">Publishing & Storage Summary:</span>
                <p>• Readiness Progress: <strong>{selectedPreviewBook.progress || 85}% complete</strong></p>
                <p>• Book Interior Status: <strong>Validated & Typeset Ready</strong></p>
                <p>• Net Royalty: <strong>100% Net Royalty Retention</strong></p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href={`/author/books/${selectedPreviewBook.id}`}
                  className="px-5 py-2.5 bg-[#8B1A1A] text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Open in DIY Studio
                </Link>
                <button
                  onClick={() => setSelectedPreviewBook(null)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
