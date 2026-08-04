import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { Check, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Publishing Plans | Page Craft',
  description: 'Choose the right publishing plan for your book. We offer Starter, Professional, and Premium plans.',
};

const plans = [
  {
    name: 'Starter', price: '₹9,999',
    description: 'Perfect for first-time authors.',
    features: ['Cover design', 'ISBN allocation', 'Indian distribution', '100% royalty', 'Personal manager'],
    missing: ['Editing', 'Custom typesetting', 'Global distribution', 'Marketing'],
    popular: false,
  },
  {
    name: 'Professional', price: '₹24,999',
    description: 'Comprehensive publishing support.',
    features: ['Cover design', 'ISBN allocation', 'Global distribution', '100% royalty', 'Personal manager', 'Basic editing', '5 author copies', 'Amazon ads setup', 'Author interview'],
    missing: ['Custom typesetting', 'Influencer marketing'],
    popular: true,
  },
  {
    name: 'Premium', price: '₹49,999',
    description: 'Ultimate publishing experience.',
    features: ['Custom cover design', 'ISBN allocation', 'Global distribution', '100% royalty', 'Personal manager', 'Advanced editing', 'Custom typesetting', '10 author copies', '30-day Amazon ads', 'Amazon ranking strategy', 'Influencer marketing'],
    missing: [],
    popular: false,
  }
];

const faqs = [
  {
    id: 'faq-1',
    title: 'Do I keep 100% of my royalties?',
    content: 'Yes, absolutely. You retain all rights and 100% of the net royalties.',
  },
  {
    id: 'faq-2',
    title: 'How long does the publishing process take?',
    content: 'Our standard publishing timeline is 30 to 45 days after manuscript submission.',
  },
  {
    id: 'faq-3',
    title: 'Can I upgrade my plan later?',
    content: 'Yes! You can upgrade your publishing plan at any stage before final printing.',
  },
];

export default function PublishingPlansPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Choose Your Publishing Plan" subtitle="Transparent pricing. No hidden fees." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white rounded-2xl shadow-xl border ${plan.popular ? 'border-[#C5A55A] scale-105 z-10' : 'border-gray-100'} p-8 flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B1A1A] text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
              )}
              <h3 className="text-2xl font-playfair font-bold text-[#1A1A2E]">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
              <div className="my-6 text-4xl font-bold text-[#8B1A1A]">{plan.price}</div>
              <ul className="flex-1 space-y-4">
                {plan.features.map(f => <li key={f} className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2 shrink-0" /><span>{f}</span></li>)}
                {plan.missing.map(f => <li key={f} className="flex items-start opacity-50"><X className="h-5 w-5 text-gray-400 mr-2 shrink-0" /><span className="line-through">{f}</span></li>)}
              </ul>
              <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="w-full mt-8">
                <button className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-sm transition-all shadow flex items-center justify-center gap-2">
                  Get Started <ExternalLink className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-24 max-w-4xl mx-auto">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </main>
  );
}