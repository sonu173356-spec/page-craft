import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAdminRole } from '@/lib/auth';
import { getLiveAnalyticsSummary, generateCsvExport } from '@/lib/analytics';

export async function GET(req: NextRequest) {
  // 1. Decisive server-side authentication
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized. Authentication required.' }, { status: 401 });
  }

  // 2. Decisive server-side admin authorization
  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden. Administrator privileges required.' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');

  const analytics = await getLiveAnalyticsSummary();

  if (format === 'csv') {
    const csvContent = generateCsvExport(analytics.topSellingBooks, ['title', 'author', 'sales', 'revenue']);
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="PageCraft_Sales_Analytics.csv"',
        'Cache-Control': 'private, no-store, must-revalidate',
      },
    });
  }

  return NextResponse.json(
    { analytics },
    {
      headers: {
        'Cache-Control': 'private, no-store, must-revalidate',
      },
    }
  );
}
