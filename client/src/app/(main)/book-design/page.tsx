import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Book Design | Page Craft' };

export default function BookDesignPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Stunning Book Covers & Interiors" subtitle="Design that sells your story." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">Custom Cover Design</h3></div>
          <div className="bg-white p-8 rounded-2xl shadow-md text-center"><h3 className="font-playfair font-bold text-2xl">Interior Formatting & Typesetting</h3></div>
        </div>
        <div className="mt-16 text-center">
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Get Design Quote <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}