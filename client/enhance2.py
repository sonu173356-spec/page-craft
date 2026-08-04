import os

files_to_update = {
    'src/app/(dashboard)/author/books/page.tsx': '''\'use client\';
import React, { useState } from \'react\';
import { motion } from \'framer-motion\';
import { Search, Filter, Plus, Edit, Eye, Trash2, BookOpen } from \'lucide-react\';
import Link from \'next/link\';

const books = [
  { id: 1, title: \'The Silent Echo\', status: \'Published\', sales: 1245, price: \'?399\', date: \'2024-01-15\', image: \'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop\' },
  { id: 2, title: \'Midnight Dreams\', status: \'Under Review\', sales: 0, price: \'?299\', date: \'-\', image: \'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop\' },
  { id: 3, title: \'Journey to the Unknown\', status: \'Draft\', sales: 0, price: \'?499\', date: \'-\', image: \'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200&auto=format&fit=crop\' },
];

export default function AuthorBooksPage() {
  const [searchTerm, setSearchTerm] = useState(\'\');

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
                <span className={px-3 py-1 rounded-full text-xs font-medium shadow-sm }>
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
''',
    'src/app/(dashboard)/author/upload-book/page.tsx': '''\'use client\';
import React, { useState } from \'react\';
import { motion } from \'framer-motion\';
import { Upload, Book, IndianRupee, FileText, CheckCircle2 } from \'lucide-react\';

export default function UploadBookPage() {
  const [step, setStep] = useState(1);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-playfair text-[#1A1A2E]">Upload New Book</h1>
        <p className="text-gray-500 mt-2">Share your masterpiece with the world</p>
      </div>

      <div className="flex justify-between items-center relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-1 before:bg-gray-100 before:-z-10">
        {[
          { num: 1, label: \'Details\', icon: <Book className="w-5 h-5" /> },
          { num: 2, label: \'Pricing\', icon: <IndianRupee className="w-5 h-5" /> },
          { num: 3, label: \'Files\', icon: <FileText className="w-5 h-5" /> },
          { num: 4, label: \'Review\', icon: <CheckCircle2 className="w-5 h-5" /> }
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
            <div className={w-12 h-12 rounded-full flex items-center justify-center border-4  transition-colors}>
              {s.icon}
            </div>
            <span className={	ext-sm font-medium }>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Book Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Book Title</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="Enter book title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none">
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Self-Help</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="Write a compelling description..."></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Pricing & Formats</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (?)</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B1A1A]/20 outline-none" placeholder="299" />
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#1A1A2E]">Auto-generate ISBN</h4>
                  <p className="text-sm text-gray-500">We will provide a free ISBN for your book</p>
                </div>
                <div className="w-12 h-6 bg-[#8B1A1A] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A2E] border-b pb-4">Upload Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#8B1A1A] hover:bg-red-50/50 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#8B1A1A] mb-4" />
                <h4 className="font-medium text-[#1A1A2E] mb-1">Upload Manuscript</h4>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 50MB</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#8B1A1A] hover:bg-red-50/50 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#8B1A1A] mb-4" />
                <h4 className="font-medium text-[#1A1A2E] mb-1">Upload Cover</h4>
                <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] font-playfair">Ready to Publish!</h2>
            <p className="text-gray-500 max-w-md mx-auto">Please review all your details carefully. Once submitted, your book will go under our review process before being published.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={px-6 py-2 rounded-lg font-medium transition-colors }
          >
            Back
          </button>
          <button 
            onClick={() => setStep(s => Math.min(4, s + 1))}
            className="px-6 py-2 bg-[#8B1A1A] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
          >
            {step === 4 ? \'Submit for Review\' : \'Continue\'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
'''
}

for path, content in files_to_update.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated {path}')
