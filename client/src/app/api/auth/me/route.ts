import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    {
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
        authorId: user.authorId,
      },
    },
    {
      headers: {
        'Cache-Control': 'private, no-store, must-revalidate',
      },
    }
  );
}
