import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
        <div className="mt-16 text-center">
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Distribute Now <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}