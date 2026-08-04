import { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers | Page Craft',
  description: 'Join the Page Craft team. We are looking for passionate individuals to help build the future of publishing.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
