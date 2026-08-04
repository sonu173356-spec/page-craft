const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app', '(main)');

const pages = {
  'publishing-plans': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Check, X } from 'lucide-react';

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

export default function PublishingPlansPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Choose Your Publishing Plan" subtitle="Transparent pricing. No hidden fees." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div key={plan.name} className={\`relative bg-white rounded-2xl shadow-xl border \${plan.popular ? 'border-[#C5A55A] scale-105 z-10' : 'border-gray-100'} p-8 flex flex-col\`}>
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
              <Button className="w-full mt-8 bg-[#8B1A1A] hover:bg-[#722F37]">Get Started</Button>
            </div>
          ))}
        </div>
        <div className="mt-24">
          <SectionHeading title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do I keep 100% of my royalties?</AccordionTrigger>
              <AccordionContent>Yes, absolutely. You retain all rights and 100% of the net royalties.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}`,
  'publishing-process': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { FileText, Edit3, PenTool, Hash, Printer, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Publishing Process | Page Craft',
  description: 'From manuscript to bookshelf, learn about our 6-step book publishing process.',
};

const steps = [
  { icon: FileText, title: 'Submit Manuscript', desc: 'Send us your completed manuscript for review.', time: '1-2 Days' },
  { icon: Edit3, title: 'Editorial Review & Editing', desc: 'Professional editing and proofreading.', time: '7-14 Days' },
  { icon: PenTool, title: 'Cover Design & Typesetting', desc: 'Custom cover design and beautiful interior.', time: '7-10 Days' },
  { icon: Hash, title: 'ISBN & Legal', desc: 'Assigning ISBNs and registering your copyright.', time: '3-5 Days' },
  { icon: Printer, title: 'Printing & Quality Check', desc: 'Premium printing with strict quality assurance.', time: '7-10 Days' },
  { icon: Globe, title: 'Distribution & Marketing', desc: 'Global availability and marketing campaigns.', time: 'Ongoing' },
];

export default function PublishingProcessPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="From Manuscript to Bookshelf" subtitle="A transparent, guided journey." />
        <div className="mt-16 space-y-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="bg-[#8B1A1A] text-white p-4 rounded-full shrink-0"><Icon size={24} /></div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-[#1A1A2E]">{i + 1}. {step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.desc}</p>
                  <span className="text-sm font-bold text-[#C5A55A] mt-2 block">Estimated: {step.time}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-20 text-center">
          <Button size="lg" className="bg-[#8B1A1A] hover:bg-[#722F37]">Submit Your Manuscript</Button>
        </div>
      </div>
    </main>
  );
}`,
  'self-publishing': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = { title: 'Self Publishing | Page Craft' };

export default function SelfPublishingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Publish on Your Own Terms" subtitle="Empowering authors with tools to succeed." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {['Full Creative Control', '100% Royalty Retention', 'Faster Time to Market', 'Global Distribution', 'Flexible Pricing', 'Own Your Rights'].map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
              <CheckCircle2 className="text-[#C5A55A]" /><h3 className="font-semibold">{b}</h3>
            </div>
          ))}
        </div>
        <div className="mt-24 bg-[#1A1A2E] text-white p-12 rounded-2xl text-center">
          <p className="text-2xl font-playfair italic">"Self-publishing gave me freedom, and Page Craft made it professional."</p>
        </div>
        <div className="mt-16 text-center"><Button size="lg">Start Journey</Button></div>
      </div>
    </main>
  );
}`,
  'book-printing': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Book Printing | Page Craft' };

export default function BookPrintingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Premium Quality Book Printing" subtitle="State-of-the-art printing technology." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">Paperback</h3></div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">Hardcover</h3></div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">Print-on-Demand</h3></div>
        </div>
        <div className="mt-16 text-center"><Button size="lg">Get Quote</Button></div>
      </div>
    </main>
  );
}`,
  'distribution': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Distribution | Page Craft' };

export default function DistributionPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Reach Readers Worldwide" subtitle="150+ countries, 50+ platforms." />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Amazon', 'Flipkart', 'Google Books', 'Apple Books'].map(p => (
            <div key={p} className="bg-white p-6 rounded-xl text-center font-bold">{p}</div>
          ))}
        </div>
        <div className="mt-16 text-center"><Button size="lg">Distribute Now</Button></div>
      </div>
    </main>
  );
}`,
  'marketing-services': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Marketing Services | Page Craft' };

export default function MarketingServicesPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Get Your Book Noticed" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {['Amazon Ads', 'Social Media', 'Influencer Outreach', 'Book Reviews', 'Author Branding', 'Email Marketing'].map(s => (
            <div key={s} className="bg-white p-6 rounded-xl shadow-md font-bold text-center">{s}</div>
          ))}
        </div>
        <div className="mt-16 text-center"><Button size="lg">Explore Packages</Button></div>
      </div>
    </main>
  );
}`,
  'book-editing': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Book Editing | Page Craft' };

export default function BookEditingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Professional Editing Services" />
        <div className="space-y-8 mt-12">
          {['Developmental', 'Copy Editing', 'Proofreading', 'Line Editing'].map(t => (
            <div key={t} className="bg-white p-8 rounded-2xl shadow-sm border"><h3 className="text-2xl font-bold">{t}</h3></div>
          ))}
        </div>
        <div className="mt-16 text-center"><Button size="lg">Request Sample Edit</Button></div>
      </div>
    </main>
  );
}`,
  'book-design': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Book Design | Page Craft' };

export default function BookDesignPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Stunning Book Covers & Interiors" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-12">
          {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[2/3] bg-gray-200 rounded-md flex items-center justify-center">Cover {i}</div>)}
        </div>
        <div className="mt-16 text-center"><Button size="lg">Start Design Process</Button></div>
      </div>
    </main>
  );
}`,
  'isbn-info': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'ISBN Information | Page Craft' };

export default function IsbnInfoPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Everything About ISBN" />
        <div className="bg-white p-8 rounded-2xl shadow-sm border mt-12">
          <h3 className="text-2xl font-bold mb-4">What is an ISBN?</h3>
          <p>It's a unique identifier for your book, essential for global distribution.</p>
        </div>
        <div className="mt-16 text-center"><Button size="lg">Publish With Us</Button></div>
      </div>
    </main>
  );
}`,
  'pricing': `import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { RoyaltyCalculator } from './RoyaltyCalculator';

export const metadata: Metadata = { title: 'Pricing & Add-ons | Page Craft' };

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title="Transparent Pricing" subtitle="No hidden fees. Pay only for what you need." />
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div><h3 className="text-2xl font-bold mb-6">Add-on Services</h3></div>
          <RoyaltyCalculator />
        </div>
        <div className="mt-16 text-center"><Button size="lg">Get Started Today</Button></div>
      </div>
    </main>
  );
}`
};

Object.entries(pages).forEach(([slug, content]) => {
  const dirPath = path.join(baseDir, slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

// Write RoyaltyCalculator
const calculatorPath = path.join(baseDir, 'pricing', 'RoyaltyCalculator.tsx');
if (!fs.existsSync(path.dirname(calculatorPath))) fs.mkdirSync(path.dirname(calculatorPath), { recursive: true });
fs.writeFileSync(calculatorPath, `'use client';
import React, { useState } from 'react';
export function RoyaltyCalculator() {
  const [price, setPrice] = useState('300');
  return (
    <div className="bg-[#1A1A2E] text-white p-8 rounded-2xl">
      <h3 className="text-2xl font-playfair font-bold text-[#C5A55A] mb-4">Royalty Calculator</h3>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded-md p-3 text-white mb-4" />
      <div>Your Net Royalty: ₹{Math.max(0, Number(price) - 100 - (Number(price) * 0.4)).toFixed(2)}</div>
    </div>
  );
}`);

console.log('Done');
