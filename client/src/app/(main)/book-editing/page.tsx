import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = { title: 'Book Editing | Page Craft' };

export default function BookEditingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Professional Editing Services" />
        <div className="space-y-8 mt-12">
          {['Developmental', 'Copy Editing', 'Proofreading', 'Line Editing'].map(t => (
            <div key={t} className="bg-white p-8 rounded-2xl shadow-sm border"><h3 className="text-2xl font-bold">{t}</h3></div>
          ))}
        </div>
        <div className="mt-16 text-center"><Button size="lg">Request Sample Edit</Button></div>
      </div>
    </main>
  );
}