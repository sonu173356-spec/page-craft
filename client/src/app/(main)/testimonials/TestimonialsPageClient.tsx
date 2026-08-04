'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  { id: 1, name: 'Sarah Jenkins', book: 'Whispers of the Wind', quote: 'Page Craft turned my messy manuscript into a beautiful, polished novel. Their editing team was phenomenal and respected my voice throughout the entire process.', rating: 5, avatar: 'SJ' },
  { id: 2, name: 'David Chen', book: 'The Silent Code', quote: 'As a first-time author, I was overwhelmed. The dedicated publishing manager walked me through every step. My book hit the bestsellers list in its first week!', rating: 5, avatar: 'DC' },
  { id: 3, name: 'Elena Rodriguez', book: 'Taste of Home', quote: 'The cover design process was a dream. They perfectly captured the essence of my memoir.', rating: 4, avatar: 'ER' },
  { id: 4, name: 'Marcus Sterling', book: 'Echoes in the Dark', quote: 'Their marketing package delivered exactly what was promised. I saw a 300% increase in my pre-orders compared to my previous self-published book.', rating: 5, avatar: 'MS' },
  { id: 5, name: 'Amanda Clarke', book: 'Little Paws', quote: 'Finding a reliable publisher for a children\'s book is hard. Page Craft managed the illustration and formatting beautifully.', rating: 5, avatar: 'AC' },
  { id: 6, name: 'Dr. Robert Hale', book: 'Modern Economics', quote: 'Professional, transparent, and efficient. A highly recommended service for academic and non-fiction authors.', rating: 4, avatar: 'RH' },
  { id: 7, name: 'Jessica Wong', book: 'Starlight Chronicles', quote: 'I retain my rights, get higher royalties, and have a beautiful book. What more could an author ask for?', rating: 5, avatar: 'JW' },
  { id: 8, name: 'Tom Baker', book: 'The Last Frontier', quote: 'Good communication. The final print quality is exceptional. Very happy with the result.', rating: 4, avatar: 'TB' },
  { id: 9, name: 'Rachel Greene', book: 'City of Glass', quote: 'From the developmental edit to the final proofread, the quality of work was outstanding. I felt like a true partner in the publishing process.', rating: 5, avatar: 'RG' },
  { id: 10, name: 'Michael O\'Connor', book: 'Shadows of the Past', quote: 'The author dashboard is incredibly intuitive. Being able to track my daily sales and royalties in real-time gives me so much peace of mind.', rating: 5, avatar: 'MO' },
  { id: 11, name: 'Sophie Turner', book: 'Botanical Wonders', quote: 'They helped me navigate the complex world of global distribution. My book is now available in stores across Europe!', rating: 5, avatar: 'ST' },
  { id: 12, name: 'James Wilson', book: 'Startup Fundamentals', quote: 'Solid editing and formatting. The process was a bit longer than expected, but the final product is great.', rating: 4, avatar: 'JW' },
];

const RatingFilter = ({ currentRating, setRating }: { currentRating: number | null, setRating: (rating: number | null) => void }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <button
        onClick={() => setRating(null)}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
          currentRating === null 
            ? 'bg-charcoal text-white' 
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        All Ratings
      </button>
      {[5, 4].map((rating) => (
        <button
          key={rating}
          onClick={() => setRating(rating)}
          className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            currentRating === rating 
              ? 'bg-charcoal text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {rating} <Star className={`w-4 h-4 ml-1 ${currentRating === rating ? 'text-accent fill-accent' : 'text-gray-400'}`} />
        </button>
      ))}
    </div>
  );
};

export default function TestimonialsPageClient() {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredTestimonials = useMemo(() => {
    if (filterRating === null) return testimonials;
    return testimonials.filter(t => t.rating === filterRating);
  }, [filterRating]);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]} className="mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">
              Hear From Our Authors
            </h1>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. Read what our community of published authors has to say about their experience with Page Craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          
          <RatingFilter currentRating={filterRating} setRating={setFilterRating} />

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={testimonial.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <div className="flex text-accent mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gray-200" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-primary/10 mb-4" />
                  
                  <p className="text-gray-700 mb-6 flex-grow italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">Author of <span className="text-primary">{testimonial.book}</span></p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No testimonials found for this rating.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-playfair font-bold mb-6">Ready to write your success story?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Join the ranks of our successful authors and let us help you bring your manuscript to the world.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-[#b09350] text-white rounded-full px-8">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
