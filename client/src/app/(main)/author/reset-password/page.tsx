import { Metadata } from 'next';
import { Suspense } from 'react';
import AuthorResetPasswordClient from './AuthorResetPasswordClient';

export const metadata: Metadata = {
  title: 'Reset Password | Page Craft Author Portal',
  description: 'Set a new secure password for your Page Craft Author Portal account.',
};

export default function AuthorResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4">Loading security desk...</div>}>
      <AuthorResetPasswordClient />
    </Suspense>
  );
}
