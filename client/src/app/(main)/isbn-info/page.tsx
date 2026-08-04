import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'ISBN Information | Page Craft' };

export default function IsbnInfoPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Everything About ISBN" />
        <div className="bg-white p-8 rounded-2xl shadow-sm border mt-12">
          <h3 className="text-2xl font-bold mb-4">What is an ISBN?</h3>
          <p>It's a unique identifier for your book, essential for global distribution.</p>
        </div>
        <div className="mt-16 text-center"><Button size="lg">Publish With Us</Button></div>
      </div>
    </main>
  );
}