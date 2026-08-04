'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading, AnimatedCounter } from '@/components/ui';

const features = [
  "100% Royalty on Every Sale",
  "Global Distribution in 150+ Countries",
  "Professional Editing & Design",
  "ISBN & Copyright in Your Name",
  "Personal Publishing Manager",
  "Live Sales Tracking Dashboard"
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#1A1A2E] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2D2D44] to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Why Choose <span className="text-[#C5A55A]">Page Craft</span></h2>
            <p className="text-gray-300 text-lg mb-12">
              We empower authors with complete creative control and transparent publishing. Our platform is designed to maximize your success while preserving your artistic vision.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedCounter end={12000} suffix="+" /></div>
                <p className="text-[#C5A55A] font-medium">Authors Published</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedCounter end={25000} suffix="+" /></div>
                <p className="text-[#C5A55A] font-medium">Books Released</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedCounter end={2000000} suffix="+" /></div>
                <p className="text-[#C5A55A] font-medium">Copies Sold</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2"><AnimatedCounter end={150} suffix="+" /></div>
                <p className="text-[#C5A55A] font-medium">Countries Reached</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-playfair font-bold mb-8">The Page Craft Advantage</h3>
            <ul className="space-y-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A55A] flex-shrink-0" />
                  <span className="text-gray-200 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
