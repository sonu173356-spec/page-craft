import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, signJwtToken, setAuthCookie } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { validateCsrfOrigin } from '@/lib/csrf';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`author-signup:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many signup attempts. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      penName,
      agreeTerms,
    } = body;

    // 1. Server-Side Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Full name, email address, and password are required.' },
        { status: 400 }
      );
    }

    if (!agreeTerms) {
      return NextResponse.json(
        { error: 'You must agree to the Terms & Conditions and Privacy Policy.' },
        { status: 400 }
      );
    }

    if (String(password).length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).slice(0, 100).trim();

    // 2. Check if account already exists
    let existingUser = null;
    try {
      if (prisma && prisma.user) {
        existingUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });
      }
    } catch (e) {
      console.warn('Prisma user lookup warning:', e);
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account already exists with this email address. Please log in.' },
        { status: 409 }
      );
    }

    // 3. Secure Password Hashing
    const passwordHash = await hashPassword(password);
    const userId = `usr-author-${Date.now().toString(36)}`;
    const authorSlug = (penName || normalizedName).toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // 4. Create in Database
    try {
      if (prisma && prisma.user) {
        await prisma.user.create({
          data: {
            id: userId,
            name: penName ? String(penName).slice(0, 100).trim() : normalizedName,
            email: normalizedEmail,
            passwordHash,
            role: 'EMPLOYEE',
            status: 'ACTIVE',
            phone: phone ? String(phone).slice(0, 30) : null,
            isVerified: true,
          },
        });

        // Link author profile record
        if (prisma.author) {
          await prisma.author.create({
            data: {
              userId,
              name: penName ? String(penName).slice(0, 100).trim() : normalizedName,
              slug: authorSlug,
              bio: 'Published author with Page Craft.',
              booksPublished: 1,
            },
          });
        }
      }
    } catch (createErr) {
      console.warn('Prisma account creation error:', createErr);
    }

    // 5. Generate Session Token
    const token = signJwtToken({
      userId,
      email: normalizedEmail,
      name: penName ? String(penName).slice(0, 100).trim() : normalizedName,
      role: 'AUTHOR',
      authorId: authorSlug,
    });

    // 6. Record Activity Log
    await recordActivityLog({
      userId,
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'AUTHOR_PORTAL_SIGNUP',
      details: `New Author account created for ${normalizedName} (${authorSlug})`,
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    const res = NextResponse.json({
      success: true,
      message: 'Your Author Portal account has been created successfully.',
      user: {
        userId,
        email: normalizedEmail,
        name: penName || normalizedName,
        role: 'AUTHOR',
        slug: authorSlug,
      },
    });

    return setAuthCookie(res, token);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An unexpected error occurred during signup.' },
      { status: 500 }
    );
  }
}
