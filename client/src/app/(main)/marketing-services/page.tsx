import React from 'react';
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
}