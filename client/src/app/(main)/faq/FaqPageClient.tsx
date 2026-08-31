'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'General', 'Publishing', 'Rights', 'Support'];

const faqs = [
  { question: 'What is Page Craft?', answer: 'Page Craft is a premium independent publishing house that provides full-service publishing solutions including editing, cover design, formatting, and publication.', category: 'General' },
  { question: 'How long does the publishing process take?', answer: 'Typically, the process takes between 3 to 6 months depending on the book interior\'s condition, required edits, and the specific publishing package chosen.', category: 'Publishing' },
  { question: 'Do I keep the rights to my book?', answer: 'Yes! Unlike traditional publishers, Page Craft authors retain 100% of their intellectual property rights and copyrights.', category: 'Rights' },
  { question: 'How much does it cost to publish a book?', answer: 'Our publishing packages start at ₹9,999. We also offer custom packages tailored to your specific needs. Please visit our publishing plans page for detailed breakdowns.', category: 'Publishing' },
  { question: 'Where will my book be sold?', answer: 'Your book will be available through major online retailers including Amazon and Flipkart, and in leading independent bookstores.', category: 'Publishing' },
  { question: 'Do you offer editing services?', answer: 'Yes, we offer developmental editing, copyediting, and proofreading services as part of our publishing packages.', category: 'Publishing' },
  { question: 'Can I choose my own book cover design?', answer: 'Absolutely. Our award-winning design team works collaboratively with you to ensure your vision is realized while meeting industry standards.', category: 'Publishing' },
  { question: 'How are royalties paid?', answer: 'Royalties are paid monthly via direct deposit or UPI, provided your earnings meet the minimum threshold.', category: 'Publishing' },
  { question: 'What genres do you accept?', answer: 'We accept a wide range of genres including fiction, non-fiction, memoirs, poetry, and children\'s books. However, we do not publish content that promotes hate speech or illegal activities.', category: 'General' },
  { question: 'Who sets the retail price of my book?', answer: 'You have the final say on the retail price of your book, though our team will provide recommendations based on market research and genre standards.', category: 'Publishing' },
  { question: 'Can I use my own ISBN?', answer: 'Yes, you can provide your own ISBN. If you don\'t have one, we will provide a free Page Craft ISBN for your book.', category: 'Publishing' },
  { question: 'How do I track my sales?', answer: 'Authors receive access to a personalized dashboard where they can track real-time sales, royalties, and order status.', category: 'Support' },
  { question: 'What if I want to unpublish my book?', answer: 'You can unpublish your book at any time by providing a 30-day written notice. Since you own the rights, you are free to take your book elsewhere.', category: 'Rights' },
  { question: 'Do you publish non-English books?', answer: 'Currently, we offer full publishing services for English-language and select regional book interiors.', category: 'General' },
  { question: 'Who do I contact if I have a problem?', answer: 'You will be assigned a dedicated publishing manager who will be your primary point of contact throughout the entire process.', category: 'Support' },
  { question: 'Do you offer illustration services for children\'s books?', answer: 'Yes, we have a network of talented illustrators and can manage the entire illustration process for you.', category: 'Publishing' },
  { question: 'Are there hidden fees?', answer: 'No. All costs are clearly outlined in your publishing agreement before any work begins. We believe in complete transparency.', category: 'Publishing' },
  { question: 'How do I submit my book interior?', answer: 'You can submit your book interior through our secure online portal. We accept Word documents (.doc, .docx) and PDFs.', category: 'General' },
];

export default function FaqPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} className="mb-8 text-white/80" />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 rounded-full border-none shadow-lg text-charcoal bg-white w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredFaqs.length > 0 ? (
                  <Accordion 
                    items={filteredFaqs.map(faq => ({
                      id: faq.question,
                      title: faq.question,
                      content: faq.answer
                    }))} 
                  />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No frequently asked questions found matching your search.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-white border-t border-gray-100 text-center px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-playfair font-bold text-charcoal mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-[#b09350] text-white rounded-full px-8">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
