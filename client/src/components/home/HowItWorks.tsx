'use client';
import { motion } from 'framer-motion';
import { FileText, PenTool, Printer, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/ui';

const steps = [
  {
    icon: FileText,
    title: 'Submit Manuscript',
    description: 'Share your completed manuscript with our expert team for initial review.'
  },
  {
    icon: PenTool,
    title: 'Design & Edit',
    description: 'We edit, format, and design a stunning cover tailored to your genre.'
  },
  {
    icon: Printer,
    title: 'Print & Publish',
    description: 'Your book goes through quality checks before being published and printed.'
  },
  {
    icon: TrendingUp,
    title: 'Distribute & Earn',
    description: 'Your book is distributed globally, and you start earning 100% royalties.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading title="How Publishing Works" subtitle="Your journey from manuscript to published book in four simple steps." />
        
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#8B1A1A]/20 via-[#C5A55A]/50 to-[#8B1A1A]/20 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-20 h-20 bg-white border-4 border-[#FDFAF6] shadow-lg rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#8B1A1A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-[#C5A55A]" />
                </div>
                <h3 className="font-playfair font-bold text-xl text-[#1A1A2E] mb-3">{step.title}</h3>
                <p className="text-[#6B7280]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
