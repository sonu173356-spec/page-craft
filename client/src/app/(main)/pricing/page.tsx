import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RoyaltyCalculator } from './RoyaltyCalculator';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
        <div className="mt-16 text-center">
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Get Started Today <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}