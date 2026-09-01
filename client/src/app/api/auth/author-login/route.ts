import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, signJwtToken, setAuthCookie } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`author-login:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email address and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // 1. Verify User strictly from Database
    let dbUser: any = null;
    try {
      if (prisma && prisma.user) {
        dbUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          include: { authors: true },
        });
      }
    } catch (e) {
      console.warn('Prisma author login lookup warning:', e);
    }

    if (!dbUser) {
      // Reject non-existent accounts - NO backdoor passwords or arbitrary length acceptances
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 2. Cryptographic password comparison
    const isMatch = await comparePassword(String(password), dbUser.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (dbUser.status === 'DISABLED') {
      return NextResponse.json(
        { error: 'Your author account has been deactivated. Please contact support.' },
        { status: 403 }
      );
    }

    const userId = dbUser.id;
    const authorName = dbUser.name;
    const authorSlug = dbUser.authors?.[0]?.slug || authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // 3. Sign JWT Token
    const token = signJwtToken({
      userId,
      email: normalizedEmail,
      name: authorName,
      role: 'AUTHOR',
      authorId: authorSlug,
    });

    // 4. Record Activity Log
    await recordActivityLog({
      userId,
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'AUTHOR_PORTAL_LOGIN',
      details: `Successful login to Author Portal for ${authorName}`,
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    const res = NextResponse.json({
      success: true,
      message: 'Welcome back, Author!',
      user: {
        userId,
        email: normalizedEmail,
        name: authorName,
        role: 'AUTHOR',
        slug: authorSlug,
      },
      redirectTo: '/author/dashboard',
    });

    return setAuthCookie(res, token);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
