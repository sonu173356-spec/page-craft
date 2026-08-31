import { Metadata } from 'next';
import FaqPageClient from './FaqPageClient';

export const metadata: Metadata = {
  title: 'FAQ | Page Craft',
  description: 'Frequently asked questions about publishing packages, process, and rights at Page Craft.',
};

export default function FaqPage() {
  return <FaqPageClient />;
}
