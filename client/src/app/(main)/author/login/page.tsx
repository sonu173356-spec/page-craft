import { Metadata } from 'next';
import AuthorLoginClient from './AuthorLoginClient';

export const metadata: Metadata = {
  title: 'Author Portal Login | Page Craft',
  description: 'Log in to your Page Craft Author Portal to manage book distribution, royalties, analytics, and sales.',
};

export default function AuthorLoginPage() {
  return <AuthorLoginClient />;
}
