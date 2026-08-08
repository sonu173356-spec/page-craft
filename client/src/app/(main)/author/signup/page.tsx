import { Metadata } from 'next';
import AuthorSignupClient from './AuthorSignupClient';

export const metadata: Metadata = {
  title: 'Create Author Account | Page Craft Author Portal',
  description: 'Register and activate your official Page Craft Author Portal account to track book publishing, distribution, and royalties.',
};

export default function AuthorSignupPage() {
  return <AuthorSignupClient />;
}
