'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/ui';

const faqs = [
  {
    question: 'How does the 100% royalty model work?',
    answer: 'Unlike traditional publishers, we don\'t take a cut of your sales. After deducting the actual printing and distribution costs, you receive 100% of the net profit from every book sold.'
  },
  {
    question: 'Who owns the rights to my book?',
    answer: 'You do. You retain 100% of the copyright and publishing rights to your work. We are a service provider helping you publish, not a traditional publisher buying your rights.'
  },
  {
    question: 'How long does the publishing process take?',
    answer: 'Depending on the package and services required (like editing or custom illustrations), the process typically takes between 4 to 12 weeks from book interior submission to global availability.'
  },
  {
    question: 'Where will my book be sold?',
    answer: 'Your book will be available globally through major retailers including Amazon, Barnes & Noble, Apple Books, Kobo, and distributed to thousands of independent bookstores and libraries via Ingram.'
  },
  {
    question: 'Do you provide marketing support?',
    answer: 'Yes! Our Professional and Premium packages include dedicated marketing support. We also offer standalone marketing services including social media campaigns, author website creation, and Amazon ads management.'
  },
  {
    question: 'Can I publish a book that was previously published?',
    answer: 'Absolutely, provided you currently hold all the rights to the work. We frequently help authors republish their books with fresh covers, updated formatting, and better distribution.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#FDFAF6]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Frequently Asked Questions" subtitle="Got questions? We've got answers to help you get started." />
        
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:border-[#C5A55A]/50 transition-colors h-fit">
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-[#1A1A2E] pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#C5A55A] transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-[#4A4A5A] border-t border-gray-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="/faq" className="text-[#8B1A1A] font-semibold hover:underline">View All FAQs →</a>
        </div>
      </div>
    </section>
  );
}
