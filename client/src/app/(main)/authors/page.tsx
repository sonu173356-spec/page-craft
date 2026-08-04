import { Metadata } from 'next';
import AuthorsPageClient from './AuthorsPageClient';

export const metadata: Metadata = {
  title: 'Our Authors | Page Craft',
  description: 'Meet the talented authors who have published their books with Page Craft.',
};

export default function AuthorsPage() {
  return <AuthorsPageClient />;
}
