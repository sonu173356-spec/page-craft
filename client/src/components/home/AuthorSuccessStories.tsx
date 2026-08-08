'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading, Card } from '@/components/ui';

const stories = [
  {
    name: 'Sarah Jenkins',
    book: 'Whispers of Time',
    quote: '"Page Craft transformed my rough book interior into a bestseller. Their editorial team is world-class, and the marketing support helped me reach readers globally. I kept 100% of my rights and couldn\'t be happier."',
    initials: 'SJ',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    name: 'David Wright',
    book: 'The Last Kingdom',
    quote: '"I was hesitant about self-publishing until I found Page Craft. The transparency in royalties and the dedicated publishing manager made the entire process seamless. Highly recommended for first-time authors."',
    initials: 'DW',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    name: 'Elena Martinez',
    book: 'The Silent Echo',
    quote: '"The print quality of my books is astonishing. My readers constantly compliment the cover design and paper quality. Page Craft truly cares about the physical product as much as the content."',
    initials: 'EM',
    color: 'bg-rose-100 text-rose-700'
  }
];

export default function AuthorSuccessStories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Author Success Stories" subtitle="Hear directly from authors who have achieved their publishing dreams with us." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card className="p-8 h-full bg-[#FDFAF6] border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${story.color}`}>
                    {story.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A2E]">{story.name}</h4>
                    <p className="text-sm text-[#8B1A1A] font-medium">Author of "{story.book}"</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A55A] text-[#C5A55A]" />
                  ))}
                </div>
                
                <p className="text-[#4A4A5A] italic flex-grow">
                  {story.quote}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
