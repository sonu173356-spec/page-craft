import React from 'react';
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
}