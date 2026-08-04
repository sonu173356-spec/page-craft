import React from 'react';
import { Metadata } from 'next';
import PublishingPlansClient from '@/components/plans/PublishingPlansClient';

export const metadata: Metadata = {
  title: 'Publishing Plans & Packages | Page Craft',
  description: 'Choose the right publishing plan for your book. We offer Starter, Professional, and Premium plans with 100% net royalties.',
};

export default function PublishingPlansPage() {
  return <PublishingPlansClient />;
}