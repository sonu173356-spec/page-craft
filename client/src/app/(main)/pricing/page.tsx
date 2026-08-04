import React from 'react';
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
}