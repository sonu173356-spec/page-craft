import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { getLiveAnalyticsSummary, generateCsvExport } from '@/lib/analytics';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      },
    });
  }

  return NextResponse.json({ analytics });
}
