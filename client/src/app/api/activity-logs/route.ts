import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAdminRole } from '@/lib/auth';
import { getActivityLogs } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || undefined;

  const logs = await getActivityLogs(q);
  return NextResponse.json({ logs });
}
