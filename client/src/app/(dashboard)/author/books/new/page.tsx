'use client';

import React, { Suspense } from 'react';
import DIYBookStudio from '@/components/author/DIYBookStudio';
import { Sparkles } from 'lucide-react';

function DIYNewBookPageContent() {
  return <DIYBookStudio />;
}

export default function NewBookCreationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFAF6]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1A1A2E]">Loading DIY Book Creation Studio...</p>
          </div>
        </div>
      }
    >
      <DIYNewBookPageContent />
    </Suspense>
  );
}
