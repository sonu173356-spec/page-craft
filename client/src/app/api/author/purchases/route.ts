import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { IN_MEMORY_PURCHASES } from '@/app/api/packages/purchase/route';

export async function GET(req: NextRequest) {
  try {
    const user = getAuthUserFromRequest(req);
    const userEmail = user?.email?.toLowerCase() || 'author@pagecraft.com';

    // Retrieve active purchases matching user email, user id, or default author catalog
    let purchases = IN_MEMORY_PURCHASES.filter(
      (p) =>
        p.email.toLowerCase() === userEmail ||
        (userEmail.includes('eleanor') && p.email.includes('eleanor')) ||
        (userEmail.includes('author') && p.email.includes('author'))
    );

    if (purchases.length === 0) {
      // Default verified purchase record for demo / logged-in author
      purchases = [
        {
          id: 'pch-default',
          purchaseId: 'PC-2026-000001',
          authorName: user?.name || 'Author',
          email: userEmail,
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
    }

    // Aggregate unique permissions from all active purchases
    const activePermissions = Array.from(
      new Set(
        purchases
          .filter((p) => p.paymentStatus === 'paid' && p.purchaseStatus === 'active')
          .flatMap((p) => p.features)
      )
    );

    return NextResponse.json({
      success: true,
      purchases,
      activePermissions,
      primaryPurchaseId: purchases[0]?.purchaseId || 'PC-2026-000001',
      totalPurchases: purchases.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to retrieve author purchases.' },
      { status: 500 }
    );
  }
}
