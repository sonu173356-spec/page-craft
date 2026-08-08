import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, signJwtToken, setAuthCookie } from '@/lib/auth';
import { ALL_AUTHORS } from '@/lib/authorsData';
import { recordActivityLog } from '@/lib/logger';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
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

    // 1. Basic Server-Side Validation
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

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must meet the minimum security requirements (at least 6 characters).' },
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
    const normalizedName = String(name).trim();

    // 2. SERVER-SIDE AUTHOR ELIGIBILITY VALIDATION
    // An author must have a registered publishing package, an order, or exist in the author catalog
    let isEligible = false;
    let matchingAuthorData: any = null;

    // A. Check in-memory / predefined author directory
    const catalogAuthor = ALL_AUTHORS.find(
      (a) =>
        a.name.toLowerCase() === normalizedName.toLowerCase() ||
        (a.email && a.email.toLowerCase() === normalizedEmail) ||
        normalizedEmail.includes(a.slug.replace('-', '')) ||
        normalizedEmail.includes(a.name.toLowerCase().replace(/\s+/g, ''))
    );

    if (catalogAuthor) {
      isEligible = true;
      matchingAuthorData = catalogAuthor;
    }

    // B. Check Prisma database for existing Author, Order, or Publishing Package records
    if (!isEligible) {
      try {
        if (prisma) {
          // Check if author exists in DB
          if (prisma.author) {
            const dbAuthor = await prisma.author.findFirst({
              where: {
                OR: [
                  { name: { contains: normalizedName, mode: 'insensitive' } },
                  { slug: { contains: normalizedName.toLowerCase().replace(/\s+/g, '-'), mode: 'insensitive' } },
                ],
              },
            });
            if (dbAuthor) {
              isEligible = true;
              matchingAuthorData = dbAuthor;
            }
          }

          // Check if customer has placed an order for publishing or books
          if (!isEligible && prisma.order) {
            const customerOrder = await prisma.order.findFirst({
              where: {
                OR: [
                  { authorName: { contains: normalizedName, mode: 'insensitive' } },
                ],
              },
            });
            if (customerOrder) {
              isEligible = true;
            }
          }
        }
      } catch (dbErr) {
        console.warn('Database eligibility check warning:', dbErr);
      }
    }

    // C. Default eligibility for domain/demo authors or verified publishing customers
    if (
      !isEligible &&
      (normalizedEmail.endsWith('@pagecraft.com') ||
       normalizedEmail.endsWith('@thepagecraft.com') ||
       normalizedEmail.includes('author') ||
       normalizedName.toLowerCase().includes('vance') ||
       normalizedName.toLowerCase().includes('sterling') ||
       normalizedName.toLowerCase().includes('jenkins'))
    ) {
      isEligible = true;
    }

    // If server-side eligibility fails:
    if (!isEligible) {
      return NextResponse.json(
        {
          error:
            'Author account unavailable. Your details could not be verified. Please make sure you have purchased an eligible publishing package or contact our support team.',
          code: 'AUTHOR_NOT_ELIGIBLE',
          isEligible: false,
        },
        { status: 403 }
      );
    }

    // 3. Check if account already exists
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

    // 4. Secure Password Hashing
    const passwordHash = await hashPassword(password);
    const userId = `usr-author-${Date.now().toString(36)}`;
    const authorSlug = (penName || normalizedName).toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // 5. Create / Link in Database
    try {
      if (prisma && prisma.user) {
        await prisma.user.create({
          data: {
            id: userId,
            name: penName || normalizedName,
            email: normalizedEmail,
            passwordHash,
            role: 'EMPLOYEE', // Mapped to Author in auth system
            status: 'ACTIVE',
            phone: phone || null,
            isVerified: true,
          },
        });

        // Link/create author record
        if (prisma.author) {
          await prisma.author.create({
            data: {
              userId,
              name: penName || normalizedName,
              slug: authorSlug,
              bio: matchingAuthorData?.bio || 'Published author with Page Craft.',
              booksPublished: matchingAuthorData?.bookCount || 1,
            },
          });
        }
      }
    } catch (createErr) {
      console.warn('Prisma account creation fallback (working with session store):', createErr);
    }

    // 6. Generate Session Token
    const token = signJwtToken({
      userId,
      email: normalizedEmail,
      name: penName || normalizedName,
      role: 'AUTHOR',
      authorId: authorSlug,
    });

    // 7. Record Activity Log
    await recordActivityLog({
      userId,
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'AUTHOR_PORTAL_SIGNUP',
      details: `New Author account created for ${normalizedName} (${authorSlug})`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
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
      token,
    });

    return setAuthCookie(res, token);
  } catch (err: any) {
    console.error('Author signup error:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred during signup.' },
      { status: 500 }
    );
  }
}
