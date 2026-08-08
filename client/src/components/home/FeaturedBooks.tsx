'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Book, Star } from 'lucide-react';
import { Button, SectionHeading } from '@/components/ui';

import 'swiper/css';
import 'swiper/css/navigation';

const mockBooks = [
  { id: 1, title: 'The Silent Echo', author: 'Elena Martinez', price: '₹299', rating: 4.8, color: 'bg-rose-100' },
  { id: 2, title: 'Beyond the Horizon', author: 'James Wilson', price: '₹349', rating: 4.5, color: 'bg-blue-100' },
  { id: 3, title: 'Whispers of Time', author: 'Sarah Jenkins', price: '₹249', rating: 4.9, color: 'bg-amber-100' },
  { id: 4, title: 'Digital Frontiers', author: 'Alex Chen', price: '₹499', rating: 4.7, color: 'bg-emerald-100' },
  { id: 5, title: 'The Last Kingdom', author: 'David Wright', price: '₹399', rating: 4.6, color: 'bg-purple-100' },
  { id: 6, title: 'Culinary Magic', author: 'Maria Garcia', price: '₹299', rating: 4.8, color: 'bg-orange-100' },
  { id: 7, title: 'Mind Over Matter', author: 'Dr. Robert Lee', price: '₹199', rating: 4.4, color: 'bg-cyan-100' },
  { id: 8, title: 'Urban Legends', author: 'Tom Harris', price: '₹329', rating: 4.7, color: 'bg-slate-100' },
];

export default function FeaturedBooks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Featured Books" subtitle="Discover our most popular titles handpicked for you." />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 relative px-2 md:px-8"
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {mockBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className={`h-64 ${book.color} flex items-center justify-center relative overflow-hidden`}>
                    <Book className="w-20 h-20 text-[#8B1A1A]/20" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair font-bold text-xl text-gray-900 line-clamp-1">{book.title}</h3>
                      <span className="font-bold text-[#8B1A1A]">{book.price}</span>
                    </div>
                    <p className="text-[#6B7280] text-sm mb-4">{book.author}</p>
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-[#C5A55A] text-[#C5A55A]' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-[#6B7280] ml-2">{book.rating}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-auto border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white transition-colors cursor-pointer">
                      View Details
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
