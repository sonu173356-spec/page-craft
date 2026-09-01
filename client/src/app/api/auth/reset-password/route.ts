import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, verifyPasswordResetToken } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`reset-pass:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many reset attempts. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const { token, newPassword, confirmPassword } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Password reset token is required.' },
        { status: 400 }
      );
    }

    if (!newPassword || String(newPassword).length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    // 1. Cryptographically verify the reset token
    const tokenPayload = verifyPasswordResetToken(token);
    if (!tokenPayload || !tokenPayload.email) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    const verifiedEmail = tokenPayload.email.toLowerCase().trim();

    // 2. Hash new password
    const passwordHash = await hashPassword(newPassword);

    // 3. Update in Database
    let updated = false;
    if (prisma && prisma.user) {
      try {
        const updateResult = await prisma.user.updateMany({
          where: { email: verifiedEmail },
          data: { passwordHash, mustResetPassword: false },
        });
        updated = updateResult.count > 0;
      } catch (e) {
        console.warn('Prisma password update error:', e);
      }
    }

    await recordActivityLog({
      userId: 'system',
      userEmail: verifiedEmail,
      userRole: 'AUTHOR',
      action: 'PASSWORD_RESET_COMPLETED',
      details: 'Password successfully updated via verified token',
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: 'Your password has been successfully reset. You can now log in.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to reset password.' },
      { status: 500 }
    );
  }
}
