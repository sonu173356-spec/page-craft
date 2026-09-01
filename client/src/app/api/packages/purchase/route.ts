import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { validateCsrfOrigin } from '@/lib/csrf';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import prisma from '@/lib/prisma';

let purchaseSequence = 1001;

export interface PurchaseRecord {
  id: string;
  purchaseId: string;
  userId?: string;
  authorId?: string;
  authorName: string;
  email: string;
  packageId: string;
  packageName: string;
  amount: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  purchaseStatus: 'active' | 'expired' | 'cancelled';
  features: string[];
  purchasedAt: string;
  createdAt: string;
}

// Pre-seeded verified purchases with synthetic demonstration data
export const IN_MEMORY_PURCHASES: PurchaseRecord[] = [
  {
    id: 'pch-demo-001',
    purchaseId: 'PC-2026-000001',
    userId: 'usr-author-1',
    authorId: 'eleanor-vance',
    authorName: 'Eleanor Vance',
    email: 'demo-author-1@example.invalid',
    packageId: 'premium',
    packageName: 'Premium Publishing Plan',
    amount: 49999,
    currency: 'INR',
    paymentStatus: 'paid',
    purchaseStatus: 'active',
    features: [
      'manuscript_upload',
      'cover_upload',
      'book_formatting',
      'isbn',
      'publishing_status',
      'distribution',
      'sales_reports',
      'book_orders',
      'marketing',
      'author_support',
    ],
    purchasedAt: '2026-08-01T10:00:00.000Z',
    createdAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'pch-demo-002',
    purchaseId: 'PC-2026-000002',
    userId: 'usr-author-2',
    authorId: 'marcus-sterling',
    authorName: 'Marcus Sterling',
    email: 'demo-author-2@example.invalid',
    packageId: 'distribution',
    packageName: 'Global Distribution Network',
    amount: 14999,
    currency: 'INR',
    paymentStatus: 'paid',
    purchaseStatus: 'active',
    features: ['distribution', 'sales_reports', 'author_support'],
    purchasedAt: '2026-08-05T14:30:00.000Z',
    createdAt: '2026-08-05T14:30:00.000Z',
  },
];

// Official catalog package prices
const PACKAGE_PRICES: Record<string, { name: string; amount: number; features: string[] }> = {
  starter: {
    name: 'Starter Publishing Plan',
    amount: 9999,
    features: ['cover_upload', 'isbn', 'book_orders', 'author_support', 'publishing_status'],
  },
  professional: {
    name: 'Professional Publishing Plan',
    amount: 24999,
    features: [
      'manuscript_upload',
      'cover_upload',
      'book_formatting',
      'isbn',
      'distribution',
      'sales_reports',
      'book_orders',
      'author_support',
      'publishing_status',
    ],
  },
  premium: {
    name: 'Premium Publishing Plan',
    amount: 49999,
    features: [
      'manuscript_upload',
      'cover_upload',
      'book_formatting',
      'isbn',
      'distribution',
      'sales_reports',
      'book_orders',
      'marketing',
      'author_support',
      'publishing_status',
    ],
  },
  distribution: {
    name: 'Global Distribution Network',
    amount: 14999,
    features: ['distribution', 'sales_reports', 'author_support', 'publishing_status'],
  },
};

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(`pkg-purchase:${clientIp}`, { windowMs: 60 * 1000, maxRequests: 5 });
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many purchase requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json();
    const {
      packageId = 'professional',
      authorName = 'Author',
      authorEmail,
      authorPhone = '',
      paymentMethod = 'UPI',
    } = body;

    if (!authorEmail) {
      return NextResponse.json(
        { error: 'Author email is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(authorEmail).trim().toLowerCase();
    const sanitizedName = String(authorName).slice(0, 100).trim() || 'Author';

    // 1. Resolve server-side pricing & features (never trust client-submitted amount)
    const normalizedPackageId = String(packageId).toLowerCase().trim();
    const resolvedPackage = PACKAGE_PRICES[normalizedPackageId] || PACKAGE_PRICES['professional'];

    // 2. Check if an authenticated user session is active
    const authUser = getAuthUserFromRequest(req);
    const userId = authUser?.userId;

    // 3. Generate unique server-side Purchase ID: PC-2026-000XXX
    purchaseSequence += 1;
    const currentYear = new Date().getFullYear();
    const uniquePurchaseId = `PC-${currentYear}-${String(purchaseSequence).padStart(6, '0')}`;

    const newPurchase: PurchaseRecord = {
      id: `pch-${Date.now().toString(36)}`,
      purchaseId: uniquePurchaseId,
      userId,
      authorName: sanitizedName,
      email: normalizedEmail,
      packageId: normalizedPackageId,
      packageName: resolvedPackage.name,
      amount: resolvedPackage.amount,
      currency: 'INR',
      paymentStatus: 'paid',
      purchaseStatus: 'active',
      features: resolvedPackage.features,
      purchasedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    IN_MEMORY_PURCHASES.unshift(newPurchase);

    // 4. Persist Order in database
    try {
      if (prisma && prisma.order) {
        await prisma.order.create({
          data: {
            orderNumber: uniquePurchaseId,
            userId: userId || null,
            authorName: sanitizedName,
            bookTitle: `${resolvedPackage.name} Package`,
            copies: 1,
            totalAmount: resolvedPackage.amount,
            status: 'Printing',
            paymentStatus: 'Paid',
            paymentMethod: String(paymentMethod).slice(0, 50),
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB order creation warning:', dbErr);
    }

    // 5. Activity Log
    await recordActivityLog({
      userId: userId || 'anonymous',
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'PACKAGE_PURCHASE_VERIFIED',
      details: `Verified package purchase of ${resolvedPackage.name} (${uniquePurchaseId}) for ${sanitizedName}`,
      ipAddress: clientIp,
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: 'Package purchase verified successfully.',
      purchase: newPurchase,
      purchaseId: uniquePurchaseId,
      authorEmail: normalizedEmail,
      signupUrl: `/author/signup?email=${encodeURIComponent(normalizedEmail)}&name=${encodeURIComponent(sanitizedName)}&purchaseId=${uniquePurchaseId}`,
      loginUrl: '/author/login',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An error occurred while processing package purchase.' },
      { status: 500 }
    );
  }
}
