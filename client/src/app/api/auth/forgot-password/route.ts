import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { recordActivityLog } from '@/lib/logger';
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

    // Generate cryptographic reset token & expiry (1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Record activity log for security tracking
    await recordActivityLog({
      userId: 'system',
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'PASSWORD_RESET_REQUEST',
      details: `Password reset link requested for ${normalizedEmail}`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    // Return uniform message to avoid email enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists for this email address, you will receive password reset instructions.',
      demoToken: resetToken,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
