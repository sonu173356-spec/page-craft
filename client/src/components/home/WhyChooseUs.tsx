'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading, AnimatedCounter } from '@/components/ui';

const features = [
  "100% Royalty on Every Sale",
  "Pan-India Distribution Across Amazon, Flipkart & More",
  "Professional Editing & Design",
  "ISBN & Copyright in Your Name",
  "Personal Publishing Manager",
  "Live Sales Tracking Dashboard"
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#FAF6F0] text-[#2C1810] border-y border-[#EDE4DB] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#8B1A1A] mb-6">
              Why Choose <span className="text-[#C5A55A]">Page Craft</span>
            </h2>
            <p className="text-gray-700 text-lg mb-12 leading-relaxed">
              We empower authors with complete creative control and transparent publishing. Our platform is designed to maximize your success while preserving your artistic vision.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#EDE4DB] shadow-xs">
                <div className="text-4xl font-bold text-[#8B1A1A] mb-2 font-playfair"><AnimatedCounter end={100} suffix="+" /></div>
                <p className="text-gray-600 font-medium text-sm">Authors Published</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#EDE4DB] shadow-xs">
                <div className="text-4xl font-bold text-[#8B1A1A] mb-2 font-playfair"><AnimatedCounter end={50} suffix="+" /></div>
                <p className="text-gray-600 font-medium text-sm">Books Released</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#EDE4DB] shadow-xs">
                <div className="text-4xl font-bold text-[#8B1A1A] mb-2 font-playfair"><AnimatedCounter end={10000} suffix="+" /></div>
                <p className="text-gray-600 font-medium text-sm">Copies Printed</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#EDE4DB] shadow-xs">
                <div className="text-3xl font-bold text-[#8B1A1A] mb-2 font-playfair">Pan India</div>
                <p className="text-gray-600 font-medium text-sm">Distribution Reach</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EDE4DB] shadow-sm rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-playfair font-bold text-[#8B1A1A] mb-8">The Page Craft Advantage</h3>
            <ul className="space-y-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A55A] shrink-0" />
                  <span className="text-gray-800 text-lg font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
