import { NextRequest, NextResponse } from 'next/server';
import { signPasswordResetToken } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { sendPasswordResetEmail } from '@/lib/mailer';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`forgot-pass:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many password reset requests. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // 1. Generate cryptographic signed reset token (valid for 1 hour)
    const resetToken = signPasswordResetToken(normalizedEmail);

    // 2. Build full reset URL
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const resetUrl = `${baseUrl}/author/reset-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(normalizedEmail)}`;

    // 3. Dispatch email if user exists in database
    try {
      let userExists = true;
      if (prisma && prisma.user) {
        const found = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        userExists = !!found;
      }

      if (userExists) {
        await sendPasswordResetEmail(normalizedEmail, resetUrl, resetToken);
      }
    } catch (mailErr) {
      console.warn('Password reset dispatch warning:', mailErr);
    }

    // 4. Record activity log
    await recordActivityLog({
      userId: 'system',
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'PASSWORD_RESET_REQUEST',
      details: `Password reset requested for ${normalizedEmail}`,
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    // 5. Always return generic safe response without leaking tokens or account existence
    return NextResponse.json({
      success: true,
      message: 'If an account is associated with this email address, password reset instructions have been sent.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
