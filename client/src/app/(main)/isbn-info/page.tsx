import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'ISBN Information | Page Craft' };

export default function IsbnInfoPage() {
  return (
    <main className="min-h-screen bg-[#FDFAF6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading title="Official ISBN Allocation" subtitle="Assign unique barcodes and international registration to your book." />
        <div className="bg-white p-8 rounded-2xl shadow-md mt-12 max-w-3xl mx-auto space-y-4 text-sm text-gray-700">
          <p>Every book published with Page Craft includes a official 13-digit ISBN allocated registered directly under government barcode standards.</p>
          <p>This allows your book to be cataloged in libraries, bookshops, Amazon, Flipkart, and international databases worldwide.</p>
        </div>
        <div className="mt-16 text-center">
          <Link href="/author/upload-book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-full font-bold text-base shadow-md transition-all">
            Get Free ISBN <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}