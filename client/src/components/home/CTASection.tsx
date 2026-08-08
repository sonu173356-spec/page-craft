'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-[#FDFAF6] border-t border-[#EDE4DB] relative overflow-hidden">
      {/* Decorative background subtle warmth */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C5A55A 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-40 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-white border border-[#EDE4DB] shadow-sm rounded-3xl p-10 md:p-14"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#8B1A1A] mb-6">
            Ready to Publish Your Book?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 font-normal leading-relaxed">
            Join successful authors who trust Page Craft to bring their stories to readers across India. Start your publishing journey today.
          </p>
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-lg px-10 py-6 rounded-full shadow-md hover:shadow-xl transition-all cursor-pointer">
              Start Publishing Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
