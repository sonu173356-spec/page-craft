import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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
        <div className="mt-24 bg-[#FAF6F0] border border-[#EDE4DB] text-[#2C1810] p-12 rounded-2xl text-center shadow-xs">
          <p className="text-2xl font-playfair italic font-medium text-[#8B1A1A]">"Self-publishing gave me freedom, and Page Craft made it professional."</p>
        </div>
        <div className="mt-16 text-center">
          <Link href="/packages?source=self-publishing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Choose Publishing Package <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}