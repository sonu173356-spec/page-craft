'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export default function CTASection() {
  return (
    <section className="py-24 bg-[#1A1A2E] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C5A55A 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1A1A] rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A55A] rounded-full blur-3xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Ready to Publish Your Book?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-light">
            Join thousands of successful authors who trust Page Craft to bring their stories to the world. Start your publishing journey today.
          </p>
          <Button size="lg" className="bg-[#C5A55A] hover:bg-[#b09040] text-[#1A1A2E] font-bold text-lg px-10 py-6 rounded-full shadow-[0_0_20px_rgba(197,165,90,0.3)] hover:shadow-[0_0_30px_rgba(197,165,90,0.5)] transition-all">
            Start Publishing Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
