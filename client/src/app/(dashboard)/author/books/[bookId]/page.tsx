'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import DIYBookStudio from '@/components/author/DIYBookStudio';
import { Sparkles } from 'lucide-react';

function DIYBookEditContent() {
  const params = useParams();
  const bookId = typeof params?.bookId === 'string' ? params.bookId : undefined;

  return <DIYBookStudio initialProjectId={bookId} />;
}

export default function BookEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFAF6]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1A1A2E]">Opening Book Studio Project...</p>
          </div>
        </div>
      }
    >
      <DIYBookEditContent />
    </Suspense>
  );
}
