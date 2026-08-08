import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { recordActivityLog } from '@/lib/logger';
import { sendPasswordResetEmail } from '@/lib/mailer';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
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

    // 1. Generate cryptographic reset token & expiry (1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

    // 2. Build full reset URL
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const resetUrl = `${baseUrl}/author/reset-password?token=${resetToken}&email=${encodeURIComponent(normalizedEmail)}`;

    // 3. Dispatch email
    const mailResult = await sendPasswordResetEmail(normalizedEmail, resetUrl, resetToken);

    // 4. Record activity log for security tracking
    await recordActivityLog({
      userId: 'system',
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'PASSWORD_RESET_REQUEST',
      details: `Password reset link generated and dispatched for ${normalizedEmail}`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: `Password reset instructions sent to ${normalizedEmail}.`,
      email: normalizedEmail,
      resetUrl,
      demoToken: resetToken,
      expiresIn: '60 minutes',
      deliveryMethod: mailResult.provider,
    });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: err.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
