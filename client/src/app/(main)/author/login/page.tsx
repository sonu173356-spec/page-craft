import { Metadata } from 'next';
import { Suspense } from 'react';
import AuthorLoginClient from './AuthorLoginClient';

export const metadata: Metadata = {
  title: 'Author Portal Login | Page Craft',
  description: 'Log in to your Page Craft Author Portal to manage book distribution, royalties, analytics, and sales.',
};

export default function AuthorLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4 text-sm font-medium text-gray-500">
          Loading Author Portal Login...
        </div>
      }
    >
      <AuthorLoginClient />
    </Suspense>
  );
}
