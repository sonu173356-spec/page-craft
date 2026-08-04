'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Michael Chang',
    book: 'The Digital Mindset',
    quote: 'Publishing with Page Craft was a revelation. Not only did they provide top-tier editing, but their distribution network ensured my book reached readers in over 40 countries within the first month. The 100% royalty model is truly author-first.',
    rating: 5,
    avatar: 'MC'
  },
  {
    name: 'Emily Stanton',
    book: 'Garden of Glass',
    quote: 'As a first-time author, I was overwhelmed by the publishing landscape. Page Craft\'s team held my hand through the entire process, from formatting to marketing. My book looks gorgeous, and sales have exceeded my wildest expectations.',
    rating: 5,
    avatar: 'ES'
  },
  {
    name: 'Robert Davis',
    book: 'Echoes of the Past',
    quote: 'I switched to Page Craft after a terrible experience with another publisher. The difference is night and day. Honest communication, beautiful design work, and my royalties are paid on time, every time.',
    rating: 4,
    avatar: 'RD'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="absolute top-20 left-10 text-[#FDFAF6] opacity-50 pointer-events-none">
        <Quote className="w-64 h-64" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="What Our Authors Say" subtitle="Don't just take our word for it." />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, bulletActiveClass: '!bg-[#C5A55A]', bulletClass: 'swiper-pagination-bullet !bg-gray-300' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="!pb-16"
          >
            {testimonials.map((test, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-[#FDFAF6] p-10 md:p-14 rounded-3xl text-center relative mx-4 border border-gray-100 shadow-sm">
                  <Quote className="w-10 h-10 text-[#C5A55A] mx-auto mb-6 opacity-50" />
                  <p className="text-lg md:text-xl text-[#1A1A2E] italic mb-8 leading-relaxed">
                    "{test.quote}"
                  </p>
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < test.rating ? 'fill-[#C5A55A] text-[#C5A55A]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-[#8B1A1A] text-white rounded-full flex items-center justify-center font-bold">
                      {test.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-[#1A1A2E]">{test.name}</h4>
                      <p className="text-sm text-[#6B7280]">Author of {test.book}</p>
                    </div>
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
