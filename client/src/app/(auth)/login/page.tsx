import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Page Craft',
  description: 'Login to your Page Craft account',
};

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm font-medium">
        Loading Author Portal Login...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
