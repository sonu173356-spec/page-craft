'use client';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui';
import Link from 'next/link';

const latestBooks = [
  { id: 1, title: 'Echoes of Eternity', author: 'Mark T. Vance', price: '₹399', category: 'Sci-Fi', color: 'bg-indigo-100' },
  { id: 2, title: 'The Vegan Kitchen', author: 'Lily Brooks', price: '₹499', category: 'Cookbook', color: 'bg-emerald-100' },
  { id: 3, title: 'Midnight Whispers', author: 'S. R. Thorne', price: '₹299', category: 'Thriller', color: 'bg-slate-200' },
  { id: 4, title: 'Startup Playbook', author: 'John Doe', price: '₹599', category: 'Business', color: 'bg-blue-100' },
  { id: 5, title: 'Poetic Soul', author: 'Maya Lin', price: '₹199', category: 'Poetry', color: 'bg-pink-100' },
  { id: 6, title: 'The Lost City', author: 'Alex Rider', price: '₹349', category: 'Adventure', color: 'bg-amber-100' }
];

export default function LatestBooks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Latest Releases" subtitle="Explore the newest additions to our growing bookstore." />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {latestBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              <div className={`w-1/3 ${book.color} flex items-center justify-center p-4`}>
                <Book className="w-12 h-12 text-[#8B1A1A]/20" />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <span className="text-xs font-semibold text-[#8B1A1A] uppercase tracking-wider mb-1">{book.category}</span>
                <h4 className="font-playfair font-bold text-lg text-gray-900 leading-tight mb-1 line-clamp-1">{book.title}</h4>
                <p className="text-[#6B7280] text-sm mb-3">{book.author}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-gray-900">{book.price}</span>
                  <Button variant="outline" size="sm" className="text-xs px-3 h-8 border-[#C5A55A] text-[#C5A55A] hover:bg-[#C5A55A] hover:text-white cursor-pointer">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/bookstore">
            <Button size="lg" className="bg-[#8B1A1A] hover:bg-[#722F37] text-white shadow-md cursor-pointer">
              View All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
