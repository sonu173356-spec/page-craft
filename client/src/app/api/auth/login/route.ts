import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, signJwtToken, setAuthCookie, UserRole } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`login:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many failed login attempts. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // 1. Look up user strictly in Database
    let dbUser: any = null;
    try {
      if (prisma && prisma.user) {
        dbUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      }
    } catch (err) {
      console.warn('Database user lookup warning:', err);
    }

    if (!dbUser) {
      // Reject any non-existent user - NO hardcoded password bypasses or email string guessing
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // 2. Cryptographic password hash comparison
    const isMatch = await comparePassword(String(password), dbUser.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (dbUser.status === 'DISABLED') {
      return NextResponse.json(
        { error: 'Account has been disabled. Please contact administrator.' },
        { status: 403 }
      );
    }

    const userRole = dbUser.role as UserRole;
    const userName = dbUser.name;
    const userId = dbUser.id;

    // 3. Issue signed JWT session token
    const token = signJwtToken({
      userId,
      email: normalizedEmail,
      role: userRole,
      name: userName,
    });

    // 4. Record Activity Log
    await recordActivityLog({
      userId,
      userEmail: normalizedEmail,
      userRole,
      action: 'USER_LOGIN_SUCCESS',
      details: `Successful login as ${userRole}`,
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    const res = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        userId,
        email: normalizedEmail,
        name: userName,
        role: userRole,
      },
    });

    return setAuthCookie(res, token);
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
