import { Metadata } from 'next';
import TestimonialsPageClient from './TestimonialsPageClient';

export const metadata: Metadata = {
  title: 'Testimonials | Page Craft',
  description: 'Read success stories and reviews from published authors who have worked with Page Craft.',
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
