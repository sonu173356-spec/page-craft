'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-[#FDFAF6] border-t border-gray-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-[#C5A55A]/10 text-[#C5A55A] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-[#1A1A2E] mb-4">Stay Updated</h2>
          <p className="text-[#6B7280] mb-8">
            Subscribe to our newsletter for publishing tips, author interviews, and exclusive discounts on our services.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A] transition-colors"
              required
            />
            <Button className="bg-[#8B1A1A] hover:bg-[#722F37] text-white py-3 px-8 rounded-lg whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-gray-500">
            By subscribing, you agree to our Privacy Policy. We respect your inbox and never spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
