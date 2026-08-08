import { Metadata } from 'next';
import AuthorsPageClient from './AuthorsPageClient';

export const metadata: Metadata = {
  title: 'Authors | Page Craft Publishing',
  description:
    'Discover the talented novelists, business leaders, poets, and storytellers who have trusted Page Craft to bring their published books to readers worldwide.',
  openGraph: {
    title: 'Published Authors Directory | Page Craft',
    description:
      'Explore our community of bestselling fiction, non-fiction, academic, and poetry authors.',
    type: 'website',
    url: 'https://www.thepagecraft.com/authors',
  },
  alternates: {
    canonical: 'https://www.thepagecraft.com/authors',
  },
};

export default function AuthorsPage() {
  return <AuthorsPageClient />;
}
