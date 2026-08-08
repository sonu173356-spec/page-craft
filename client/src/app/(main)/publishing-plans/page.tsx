import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PublishingPlansClient from '@/components/plans/PublishingPlansClient';

export const metadata: Metadata = {
  title: 'Publishing Plans & Packages | Page Craft',
  description: 'Choose the right publishing plan for your book. We offer Starter, Professional, and Premium plans with 100% net royalties.',
};

export default function PublishingPlansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4">Loading publishing plans...</div>}>
      <PublishingPlansClient />
    </Suspense>
  );
}