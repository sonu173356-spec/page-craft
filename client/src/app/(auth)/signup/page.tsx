import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SignupForm from '@/components/auth/SignupForm';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Author Signup — Page Craft DIY Book Studio',
  description: 'Create your author account and start designing your book in the DIY Book Creation Studio.',
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFAF6]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1A1A2E]">Loading Author Registration...</p>
          </div>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
