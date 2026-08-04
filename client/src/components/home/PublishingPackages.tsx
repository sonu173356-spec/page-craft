'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading, Button } from '@/components/ui';

const packages = [
  {
    name: 'Starter',
    price: '₹9,999',
    description: 'Perfect for authors ready to publish an already edited manuscript.',
    features: [
      'Basic Cover Design',
      'Interior Formatting',
      'ISBN Assignment',
      'Amazon Distribution',
      '100% Royalty',
      'Author Dashboard'
    ],
    isPopular: false
  },
  {
    name: 'Professional',
    price: '₹24,999',
    description: 'Our most popular plan with editing and enhanced marketing support.',
    features: [
      'Premium Cover Design',
      'Copy Editing (up to 50k words)',
      'Global Distribution (150+ countries)',
      'Social Media Marketing Kit',
      'Author Website setup',
      'Priority Support'
    ],
    isPopular: true
  },
  {
    name: 'Premium',
    price: '₹49,999',
    description: 'The ultimate white-glove service for serious authors wanting it all.',
    features: [
      'Custom Illustrated Cover',
      'Developmental Editing',
      'Advanced Marketing Campaign',
      'Video Trailer Creation',
      'Physical Book Review Copies',
      'Dedicated PR Manager'
    ],
    isPopular: false
  }
];

export default function PublishingPackages() {
  return (
    <section className="py-20 bg-[#FDFAF6]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Publishing Packages" subtitle="Transparent pricing tailored to every author's needs and budget." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto items-center">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 border ${pkg.isPopular ? 'border-[#C5A55A] shadow-2xl md:-translate-y-4 md:py-12 z-10' : 'border-gray-200 shadow-sm hover:shadow-md'} transition-all`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8B1A1A] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="font-playfair font-bold text-2xl text-[#1A1A2E] mb-2">{pkg.name}</h3>
                <p className="text-[#6B7280] text-sm mb-6 h-10">{pkg.description}</p>
                <div className="text-4xl font-bold text-[#1A1A2E]">{pkg.price}</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${pkg.isPopular ? 'text-[#C5A55A]' : 'text-[#8B1A1A]'}`} />
                    <span className="text-[#4A4A5A]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${pkg.isPopular ? 'bg-[#8B1A1A] hover:bg-[#722F37] text-white' : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'} `}
                size="lg"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
