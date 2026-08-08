import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Book Editing | Page Craft' };

export default function BookEditingPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Professional Editing & Proofreading" subtitle="Refine your words with expert editors." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {['Proofreading', 'Copy Editing', 'Developmental Editing'].map(e => (
            <div key={e} className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">{e}</h3></div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/packages?source=editing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Get Editing Quote <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}