'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Edit, Eye, Trash2, X, Check, BookOpen, HardDrive, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const initialBooks = [
  { id: 1, title: 'The Silent Echo', status: 'Published', sales: 1245, price: '₹399', date: '2024-01-15', category: 'Fiction', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop' },
  { id: 2, title: 'Midnight Dreams', status: 'Under Review', sales: 0, price: '₹299', date: '2026-08-01', category: 'Poetry', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&auto=format&fit=crop' },
  { id: 3, title: 'Journey to the Unknown', status: 'Draft', sales: 0, price: '₹499', date: '2026-07-28', category: 'Self-Help', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop' },
];

export default function AuthorBooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
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
    try {
      const storedStr = localStorage.getItem('pagecraft_user_books');
      if (storedStr) {
        const customBooks = JSON.parse(storedStr);
        const fallbackCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop';
        
        // Clean up expired blob: URLs from previous browser sessions
        const sanitized = customBooks.map((b: any) => {
          if (!b.image || typeof b.image !== 'string' || b.image.startsWith('blob:')) {
            return { ...b, image: fallbackCover };
          }
          return b;
        });

        localStorage.setItem('pagecraft_user_books', JSON.stringify(sanitized));
        setBooksList([...sanitized, ...initialBooks]);
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
    }
  }, []);

  const saveBooksToStorage = (updated: any[]) => {
    setBooksList(updated);
    try {
      const customOnly = updated.filter(b => typeof b.id === 'number' && b.id > 100);
      localStorage.setItem('pagecraft_user_books', JSON.stringify(customOnly));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }
  };

  const handleOpenEditModal = (book: any) => {
    setSelectedEditBook(book);
    setEditTitle(book.title);
    setEditPrice(book.price.replace('₹', ''));
    setEditCategory(book.category || 'Fiction');
    setEditStatus(book.status);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditBook) return;

    const updated = booksList.map(b => {
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

  const handleDeleteBook = (bookId: number, bookTitle: string) => {
    if (confirm(`Are you sure you want to delete "${bookTitle}" from your catalog?`)) {
      const updated = booksList.filter(b => b.id !== bookId);
      saveBooksToStorage(updated);
      toast.success(`"${bookTitle}" deleted from your catalog.`);
    }
  };

  const filteredBooks = booksList.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">My Books</h1>
          <p className="text-xs text-gray-500 mt-1">Manage, preview, edit and track your published manuscripts</p>
        </div>
        <Link href="/author/upload-book" className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1A1A] text-white rounded-xl font-bold text-xs hover:bg-red-800 transition-colors shadow-sm">
          <Plus size={16} />
          Upload New Book
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search my books catalog..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <strong>{filteredBooks.length}</strong> books
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
            <div className="h-48 bg-gray-100 relative overflow-hidden flex justify-center items-center">
              <img 
                src={book.image} 
                alt={book.title} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  book.status === 'Published' ? 'bg-green-100 text-green-700' : book.status === 'Under Review' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {book.status}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#1A1A2E] text-lg mb-2 font-playfair">{book.title}</h3>
              <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                <span>Sales: <strong className="text-[#1A1A2E]">{book.sales}</strong></span>
                <span>Price: <strong className="text-[#8B1A1A]">{book.price}</strong></span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[11px] text-gray-400">Date: {book.date}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedPreviewBook(book)} 
                    title="Preview Book"
                    className="p-2 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleOpenEditModal(book)} 
                    title="Edit Book Details"
                    className="p-2 text-gray-400 hover:text-[#C5A55A] hover:bg-yellow-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteBook(book.id, book.title)} 
                    title="Delete Book"
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 👁️ 1. View / Preview Book Modal */}
      <AnimatePresence>
        {selectedPreviewBook && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative space-y-4">
              <button onClick={() => setSelectedPreviewBook(null)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
                <X size={18} />
              </button>

              <div className="flex gap-4 items-center">
                <img src={selectedPreviewBook.image} alt={selectedPreviewBook.title} className="w-24 h-32 object-cover rounded-xl shadow-md border" />
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 bg-red-100 text-[#8B1A1A] text-[10px] font-bold rounded-full">{selectedPreviewBook.category || 'General'}</span>
                  <h3 className="text-xl font-bold font-playfair text-[#1A1A2E]">{selectedPreviewBook.title}</h3>
                  <p className="text-xs text-gray-500">Retail Price: <strong className="text-[#8B1A1A]">{selectedPreviewBook.price}</strong></p>
                  <p className="text-xs text-gray-500">Status: <strong className="text-green-700">{selectedPreviewBook.status}</strong></p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-1.5 text-gray-700">
                <span className="font-bold text-[#8B1A1A] block">Manuscript & Asset Storage Details:</span>
                <p>• Total Sales Volume: <strong>{selectedPreviewBook.sales} copies</strong></p>
                <p>• Published Date: <strong>{selectedPreviewBook.date}</strong></p>
                <p>• Cloud Storage: <strong>{selectedPreviewBook.storageProvider || 'Google Drive / Supabase Synced'}</strong></p>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setSelectedPreviewBook(null)} className="px-5 py-2 bg-[#8B1A1A] text-white font-bold rounded-xl text-xs">Close Preview</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ✏️ 2. Edit Book Modal */}
      <AnimatePresence>
        {selectedEditBook && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl overflow-hidden relative space-y-4">
              <button onClick={() => setSelectedEditBook(null)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold font-playfair text-[#1A1A2E] border-b pb-3">Edit Book Details</h3>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-gray-600">Book Title</label>
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm" required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600">Price (₹)</label>
                    <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600">Category</label>
                    <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm">
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Poetry</option>
                      <option>Self-Help</option>
                      <option>Business</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-600">Publishing Status</label>
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none text-sm">
                    <option>Published</option>
                    <option>Under Review</option>
                    <option>Draft</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setSelectedEditBook(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-[#8B1A1A] hover:bg-red-800 text-white font-bold rounded-xl flex items-center gap-1"><Check size={14} /> Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
