import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
        <div className="mt-16 text-center">
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Explore Packages <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}