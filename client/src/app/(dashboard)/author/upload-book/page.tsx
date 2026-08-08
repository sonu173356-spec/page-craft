'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadBookRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/author/dashboard');
  }, [router]);

  return null;
}
