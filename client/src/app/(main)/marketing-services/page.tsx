import React from 'react';
import { Metadata } from 'next';
import MarketingServicesClient from '@/components/marketing/MarketingServicesClient';

export const metadata: Metadata = {
  title: 'Marketing Packages & Promotion Services | Page Craft',
  description: 'Boost your book sales with Amazon ads, influencer reviews, PR media releases, and author branding packages.',
};

export default function MarketingServicesPage() {
  return <MarketingServicesClient />;
}