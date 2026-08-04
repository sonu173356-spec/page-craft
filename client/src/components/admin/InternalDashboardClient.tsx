'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Edit3, Plus, Search, Filter, RefreshCw, CheckCircle2, 
  Trash2, Eye, Globe, ExternalLink, ShieldCheck, DollarSign, UserCheck, 
  Sparkles, Save, X, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface AuthorBook {
  id: string;
  title: string;
  subtitle?: string;
  authorName: string;
  category: string;
  format: 'Paperback' | 'Hardcover' | 'eBook';
  price: number;
  royaltyRate: number;
  status: 'Published' | 'Under Review' | 'Draft';
  isbn: string;
  publishedDate: string;
  coverImage: string;
  salesCount: number;
  description: string;
}

const INITIAL_BOOKS: AuthorBook[] = [
  {
    id: 'pc-101',
    title: 'The Silent Echo',
    subtitle: 'A Psychological Suspense Thriller',
    authorName: 'Eleanor Vance',
    category: 'Fiction',
    format: 'Paperback',
    price: 399,
    royaltyRate: 100,
    status: 'Published',
    isbn: '978-93-89021-12-4',
    publishedDate: '2024-01-15',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    salesCount: 1245,
    description: 'A gripping psychological thriller that will keep you on the edge of your seat until the final breathtaking page.',
  },
  {
    id: 'pc-102',
    title: 'Midnight Dreams',
    subtitle: 'Poetry of Love & Loss',
    authorName: 'Sarah Jenkins',
    category: 'Poetry',
    format: 'Hardcover',
    price: 299,
    royaltyRate: 100,
    status: 'Under Review',
    isbn: '978-93-89021-45-2',
    publishedDate: '2024-02-10',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
    salesCount: 420,
    description: 'A soulful collection of contemporary verses exploring modern love, heartbreak, and healing.',
  },
  {
    id: 'pc-103',
    title: 'Startup Unlocked',
    subtitle: 'From 0 to $1M ARR in 12 Months',
    authorName: 'Marcus Sterling',
    category: 'Business',
    format: 'eBook',
    price: 499,
    royaltyRate: 100,
    status: 'Published',
    isbn: '978-93-89021-99-5',
    publishedDate: '2023-11-20',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
    salesCount: 3100,
    description: 'The ultimate zero-fluff playbook for founders and bootstrappers building venture-scalable software businesses.',
  },
  {
    id: 'pc-104',
    title: 'Shadows of Eldoria',
    subtitle: 'Book I of The Ancient Realm Chronicles',
    authorName: 'Jessica Wong',
    category: 'Fantasy',
    format: 'Paperback',
    price: 449,
    royaltyRate: 100,
    status: 'Draft',
    isbn: '978-93-89021-08-7',
    publishedDate: '2024-03-01',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop',
    salesCount: 0,
    description: 'An epic high-fantasy saga following a young mage destined to reunite seven broken kingdoms.',
  },
];

export default function InternalDashboardClient() {
  const [books, setBooks] = useState<AuthorBook[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingBook, setEditingBook] = useState<AuthorBook | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for editor modal
  const [formState, setFormState] = useState<Partial<AuthorBook>>({});

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.isbn.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (book: AuthorBook) => {
    setEditingBook(book);
    setFormState(book);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    setBooks(prev => prev.map(b => (b.id === editingBook.id ? { ...b, ...formState } as AuthorBook : b)));
    toast.success(`Successfully updated "${formState.title}" and synced with main website!`);
    setEditingBook(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: AuthorBook = {
      id: `pc-${Date.now().toString().slice(-4)}`,
      title: formState.title || 'Untitled Book',
      subtitle: formState.subtitle || '',
      authorName: formState.authorName || 'Author Name',
      category: formState.category || 'Fiction',
      format: (formState.format as any) || 'Paperback',
      price: Number(formState.price) || 299,
      royaltyRate: 100,
      status: (formState.status as any) || 'Published',
      isbn: formState.isbn || `978-93-${Math.floor(100000 + Math.random() * 900000)}`,
      publishedDate: new Date().toISOString().split('T')[0],
      coverImage: formState.coverImage || '/logo-full.png',
      salesCount: 0,
      description: formState.description || 'No description provided.',
    };

    setBooks([newBook, ...books]);
    toast.success(`Created new author book "${newBook.title}" and published to bookstore!`);
    setIsCreateModalOpen(false);
    setFormState({});
  };

  const handleSyncWithMainWebsite = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Main Website Bookstore API synced successfully! All live changes deployed.');
    }, 1200);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the main website?`)) {
      setBooks(prev => prev.filter(b => b.id !== id));
      toast.success(`Removed "${title}" from platform.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Sync Status */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2D2D44] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-[#8B1A1A] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Internal Control Panel
            </span>
            <span className="flex items-center text-green-400 text-xs font-semibold gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
              Connected to Main Website API
            </span>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-white">Internal Content Dashboard</h1>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl">
            Manage, edit, and publish author books directly to the live Page Craft bookstore and main website pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSyncWithMainWebsite}
            disabled={isSyncing}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A55A] hover:bg-[#b09148] text-[#1A1A2E] font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Main Site API'}
          </button>
          <button
            onClick={() => {
              setFormState({
                category: 'Fiction',
                format: 'Paperback',
                price: 399,
                status: 'Published',
              });
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Author Book
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Books</p>
            <h3 className="text-3xl font-bold text-[#1A1A2E] font-playfair mt-1">{books.length}</h3>
          </div>
          <div className="p-3 bg-red-50 text-[#8B1A1A] rounded-xl"><BookOpen className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Published</p>
            <h3 className="text-3xl font-bold text-green-600 font-playfair mt-1">
              {books.filter(b => b.status === 'Published').length}
            </h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Globe className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Review</p>
            <h3 className="text-3xl font-bold text-amber-500 font-playfair mt-1">
              {books.filter(b => b.status === 'Under Review').length}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><UserCheck className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Avg Royalty Rate</p>
            <h3 className="text-3xl font-bold text-[#C5A55A] font-playfair mt-1">100%</h3>
          </div>
          <div className="p-3 bg-yellow-50 text-[#C5A55A] rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, author name, or ISBN..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase">Status:</span>
          {['All', 'Published', 'Under Review', 'Draft'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#8B1A1A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Author Books Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Book Details</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Price / Format</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">ISBN</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative border border-gray-200">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1A1A2E] font-playfair text-base group-hover:text-[#8B1A1A] transition-colors">
                          {book.title}
                        </h4>
                        {book.subtitle && <p className="text-xs text-gray-400 line-clamp-1">{book.subtitle}</p>}
                        <span className="inline-block mt-1 text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {book.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-medium text-[#1A1A2E]">
                    {book.authorName}
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-bold text-[#8B1A1A]">₹{book.price}</div>
                    <div className="text-xs text-gray-400">{book.format} • 100% Royalty</div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        book.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : book.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-mono text-xs text-gray-500">
                    {book.isbn}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(book)}
                        className="p-2 text-gray-500 hover:text-[#8B1A1A] hover:bg-red-50 rounded-lg transition-colors"
                        title="Edit Book Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id, book.title)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Book Modal */}
      <AnimatePresence>
        {editingBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#1A1A2E] text-white">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#C5A55A]" />
                  <h3 className="font-playfair text-xl font-bold">Edit Author Book: {editingBook.title}</h3>
                </div>
                <button onClick={() => setEditingBook(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Book Title</label>
                    <input
                      type="text"
                      value={formState.title || ''}
                      onChange={e => setFormState({ ...formState, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-500">Author Name</label>
                    <input
                      type="text"
                      value={formState.authorName || ''}
                      onChange={e => setFormState({ ...formState, authorName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                    <select
                      value={formState.category || 'Fiction'}
                      onChange={e => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                    >
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Poetry</option>
                      <option>Business</option>
                      <option>Self-Help</option>
                      <option>Fantasy</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-500">Price (₹)</label>
                    <input
                      type="number"
                      value={formState.price || ''}
                      onChange={e => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-500">Publication Status</label>
                    <select
                      value={formState.status || 'Published'}
                      onChange={e => setFormState({ ...formState, status: e.target.value as any })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                    >
                      <option value="Published">Published (Live on Site)</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Cover Image URL / Path</label>
                    <input
                      type="text"
                      value={formState.coverImage || ''}
                      onChange={e => setFormState({ ...formState, coverImage: e.target.value })}
                      placeholder="/logo-full.png or https://..."
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      rows={3}
                      value={formState.description || ''}
                      onChange={e => setFormState({ ...formState, description: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-lg shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Save & Deploy Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create New Book Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#8B1A1A] text-white">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#C5A55A]" />
                  <h3 className="font-playfair text-xl font-bold">Add New Author Book</h3>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-200 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNew} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Title</label>
                    <input
                      type="text"
                      placeholder="Book Title"
                      onChange={e => setFormState({ ...formState, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">Author Name</label>
                    <input
                      type="text"
                      placeholder="Author Name"
                      onChange={e => setFormState({ ...formState, authorName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">Price (₹)</label>
                    <input
                      type="number"
                      placeholder="399"
                      onChange={e => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-[#8B1A1A] text-white font-bold rounded-lg shadow-md">
                    Publish Book
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
