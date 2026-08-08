import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PublishingPlansClient from '@/components/plans/PublishingPlansClient';

export const metadata: Metadata = {
  title: 'Publishing Packages & Plans | Page Craft',
  description: 'Select your publishing package, keep 100% net royalties, and access the Page Craft Author Portal.',
};

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4">Loading packages...</div>}>
      <PublishingPlansClient />
    </Suspense>
  );
}
