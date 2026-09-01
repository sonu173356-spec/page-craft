import { Suspense } from 'react';
import InternalDashboardClient from '@/components/admin/InternalDashboardClient';

export default function InternalDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4 text-sm font-medium text-gray-500">
          Loading Dashboard...
        </div>
      }
    >
      <InternalDashboardClient />
    </Suspense>
  );
}
