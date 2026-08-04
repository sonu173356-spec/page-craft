import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FileText, Edit3, PenTool, Hash, Printer, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Submit Your Manuscript <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}