import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAuthorOrAdmin } from '@/lib/auth';
import { IN_MEMORY_PURCHASES } from '@/app/api/packages/purchase/route';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // 1. Decisive server-side authentication
    const user = getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      );
    }

    // 2. Decisive server-side authorization
    if (!isAuthorOrAdmin(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden. Author privileges required.' },
        { status: 403 }
      );
    }

    const sessionEmail = user.email.toLowerCase().trim();
    const sessionUserId = user.userId;

    // 3. Query Database or fallback store for purchases belonging strictly to this authenticated user
    let userPurchases: any[] = [];

    try {
      if (prisma && prisma.order) {
        const dbOrders = await prisma.order.findMany({
          where: {
            OR: [
              { userId: sessionUserId },
              { authorName: user.name },
            ],
          },
          include: { orderItems: true, payments: true },
        });

        if (dbOrders && dbOrders.length > 0) {
          userPurchases = dbOrders.map((o) => ({
            id: o.id,
            purchaseId: o.orderNumber,
            authorName: o.authorName,
            packageName: o.bookTitle,
            amount: o.totalAmount,
            paymentStatus: o.paymentStatus.toLowerCase(),
            purchaseStatus: 'active',
            purchasedAt: o.createdAt.toISOString(),
          }));
        }
      }
    } catch (dbErr) {
      console.warn('Database purchase query fallback:', dbErr);
    }

    // Filter in-memory verified purchases strictly by authenticated session identity
    if (userPurchases.length === 0) {
      userPurchases = IN_MEMORY_PURCHASES.filter(
        (p) =>
          (p.userId && p.userId === sessionUserId) ||
          p.email.toLowerCase() === sessionEmail
      ).map((p) => ({
        id: p.id,
        purchaseId: p.purchaseId,
        authorName: p.authorName,
        packageName: p.packageName,
        packageId: p.packageId,
        amount: p.amount,
        currency: p.currency,
        paymentStatus: p.paymentStatus,
        purchaseStatus: p.purchaseStatus,
        features: p.features,
        purchasedAt: p.purchasedAt,
      }));
    }

    // 4. Derive permissions strictly from verified active purchases
    const activePermissions = Array.from(
      new Set(
        userPurchases
          .filter((p) => p.paymentStatus === 'paid' && p.purchaseStatus === 'active')
          .flatMap((p) => p.features || [])
      )
    );

    return NextResponse.json({
      success: true,
      purchases: userPurchases,
      activePermissions,
      primaryPurchaseId: userPurchases[0]?.purchaseId || null,
      totalPurchases: userPurchases.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An error occurred while retrieving purchase records.' },
      { status: 500 }
    );
  }
}
