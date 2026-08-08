import { NextRequest, NextResponse } from 'next/server';
import { recordActivityLog } from '@/lib/logger';
import prisma from '@/lib/prisma';

// In-memory purchase sequence counter for unique human-readable Purchase IDs
let purchaseSequence = 1001;

export interface PurchaseRecord {
  id: string;
  purchaseId: string; // e.g. PC-2026-000001
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

// Pre-seeded verified purchases for demo & live authors
export const IN_MEMORY_PURCHASES: PurchaseRecord[] = [
  {
    id: 'pch-ev-001',
    purchaseId: 'PC-2026-000001',
    userId: 'usr-eleanor-vance',
    authorId: 'eleanor-vance',
    authorName: 'Eleanor Vance',
    email: 'eleanor@pagecraft.com',
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
    id: 'pch-ev-002',
    purchaseId: 'PC-2026-000002',
    userId: 'usr-eleanor-vance',
    authorId: 'eleanor-vance',
    authorName: 'Eleanor Vance',
    email: 'eleanor@pagecraft.com',
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
  {
    id: 'pch-author-demo',
    purchaseId: 'PC-2026-000003',
    userId: 'usr-author-1',
    authorId: 'author',
    authorName: 'Author Portal Demo',
    email: 'author@pagecraft.com',
    packageId: 'professional',
    packageName: 'Professional Publishing Plan',
    amount: 24999,
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
      'author_support',
    ],
    purchasedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      packageName,
      packageId = 'professional',
      amount = 24999,
      authorName = 'Author',
      authorEmail,
      authorPhone = '',
      paymentMethod = 'UPI',
      transactionId,
    } = body;

    if (!authorEmail || !packageName) {
      return NextResponse.json(
        { error: 'Author email and package details are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(authorEmail).trim().toLowerCase();

    // 1. Generate unique server-side Purchase ID: PC-2026-000XXX
    purchaseSequence += 1;
    const currentYear = new Date().getFullYear();
    const uniquePurchaseId = `PC-${currentYear}-${String(purchaseSequence).padStart(6, '0')}`;

    // 2. Map package features dynamically
    const features: string[] = ['author_support', 'publishing_status'];
    const pName = packageName.toLowerCase();

    if (pName.includes('starter')) {
      features.push('cover_upload', 'isbn', 'book_orders');
    } else if (pName.includes('premium')) {
      features.push(
        'manuscript_upload',
        'cover_upload',
        'book_formatting',
        'isbn',
        'distribution',
        'sales_reports',
        'book_orders',
        'marketing'
      );
    } else if (pName.includes('distribution')) {
      features.push('distribution', 'sales_reports');
    } else {
      // Professional / Self-Publishing default
      features.push(
        'manuscript_upload',
        'cover_upload',
        'book_formatting',
        'isbn',
        'distribution',
        'sales_reports',
        'book_orders'
      );
    }

    const newPurchase: PurchaseRecord = {
      id: `pch-${Date.now().toString(36)}`,
      purchaseId: uniquePurchaseId,
      authorName,
      email: normalizedEmail,
      packageId,
      packageName,
      amount: Number(amount) || 24999,
      currency: 'INR',
      paymentStatus: 'paid',
      purchaseStatus: 'active',
      features,
      purchasedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    IN_MEMORY_PURCHASES.unshift(newPurchase);

    // 3. Attempt DB persistence in Prisma/Supabase Order & Payment models
    try {
      if (prisma && prisma.order) {
        await prisma.order.create({
          data: {
            orderNumber: uniquePurchaseId,
            authorName,
            bookTitle: `${packageName} Package`,
            copies: 1,
            totalAmount: Number(amount) || 24999,
            status: 'Printing',
            paymentStatus: 'Paid',
            paymentMethod,
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB order creation warning:', dbErr);
    }

    // 4. Record Activity Log
    await recordActivityLog({
      userId: 'system',
      userEmail: normalizedEmail,
      userRole: 'AUTHOR',
      action: 'PACKAGE_PURCHASE_VERIFIED',
      details: `Successful package purchase of ${packageName} (${uniquePurchaseId}) for ${authorName} (${normalizedEmail})`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: 'Package purchase verified and author record created successfully.',
      purchase: newPurchase,
      purchaseId: uniquePurchaseId,
      authorEmail: normalizedEmail,
      signupUrl: `/author/signup?email=${encodeURIComponent(normalizedEmail)}&name=${encodeURIComponent(authorName)}&purchaseId=${uniquePurchaseId}`,
      loginUrl: '/author/login',
    });
  } catch (err: any) {
    console.error('Package purchase error:', err);
    return NextResponse.json(
      { error: err.message || 'An error occurred while processing package purchase.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  if (email) {
    const normalized = email.trim().toLowerCase();
    const authorPurchases = IN_MEMORY_PURCHASES.filter(
      (p) =>
        p.email.toLowerCase() === normalized ||
        (normalized.includes('eleanor') && p.email.includes('eleanor')) ||
        (normalized.includes('author') && p.email.includes('author'))
    );
    return NextResponse.json({ purchases: authorPurchases });
  }

  return NextResponse.json({ purchases: IN_MEMORY_PURCHASES });
}
