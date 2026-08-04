import React from 'react';
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
}