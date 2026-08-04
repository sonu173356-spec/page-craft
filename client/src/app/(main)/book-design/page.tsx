import React from 'react';
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
}