'use client';
import { motion } from 'framer-motion';
import { Feather, Compass, Heart, Lightbulb, Briefcase, Smile, Zap, BookOpen } from 'lucide-react';
import { SectionHeading } from '@/components/ui';
import Link from 'next/link';

const categories = [
  { name: 'Fiction', icon: Feather, count: '12K+', color: 'group-hover:text-purple-500' },
  { name: 'Non-Fiction', icon: BookOpen, count: '8K+', color: 'group-hover:text-blue-500' },
  { name: 'Poetry', icon: Heart, count: '3K+', color: 'group-hover:text-pink-500' },
  { name: 'Self-Help', icon: Lightbulb, count: '5K+', color: 'group-hover:text-yellow-500' },
  { name: 'Romance', icon: Smile, count: '7K+', color: 'group-hover:text-red-500' },
  { name: 'Mystery', icon: Compass, count: '4K+', color: 'group-hover:text-indigo-500' },
  { name: 'Children\'s', icon: Zap, count: '2K+', color: 'group-hover:text-orange-500' },
  { name: 'Business', icon: Briefcase, count: '6K+', color: 'group-hover:text-emerald-500' },
];

export default function BookCategories() {
  return (
    <section className="py-20 bg-[#FDFAF6]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Explore by Category" subtitle="Find your next favorite read among our diverse genres." />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link href={`/bookstore?category=${encodeURIComponent(cat.name)}`}>
                <div className="group bg-white p-6 rounded-xl border border-gray-100 text-center hover:border-[#C5A55A] hover:shadow-md transition-all cursor-pointer h-full flex flex-col items-center justify-center">
                  <cat.icon className={`w-10 h-10 mb-4 text-[#1A1A2E] transition-colors ${cat.color}`} />
                  <h4 className="font-bold text-[#1A1A2E] mb-1">{cat.name}</h4>
                  <p className="text-xs text-[#6B7280]">{cat.count} Books</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
