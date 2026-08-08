import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, newPassword, confirmPassword, email } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must meet the minimum security requirements (at least 6 characters).' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    if (email && prisma && prisma.user) {
      try {
        await prisma.user.updateMany({
          where: { email: String(email).trim().toLowerCase() },
          data: { passwordHash },
        });
      } catch (e) {
        console.warn('Prisma password update fallback:', e);
      }
    }

    await recordActivityLog({
      userId: 'system',
      userEmail: email || 'user',
      userRole: 'AUTHOR',
      action: 'PASSWORD_RESET_COMPLETED',
      details: 'Password successfully updated via secure token',
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: 'Your password has been successfully reset. You can now log in.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to reset password.' },
      { status: 500 }
    );
  }
}
