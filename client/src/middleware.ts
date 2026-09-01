import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken, isAdminRole, isAuthorOrAdmin, AUTH_COOKIE_NAME } from '@/lib/auth';
import { validateRedirectUrl } from '@/lib/redirect';

// Public author authentication routes that should not be intercepted by the author dashboard guard
const PUBLIC_AUTHOR_AUTH_PATHS = [
  '/author/login',
  '/author/signup',
  '/author/forgot-password',
  '/author/reset-password',
];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Extract session token from HttpOnly cookie or Authorization header
  const cookieToken = req.cookies.get(AUTH_COOKIE_NAME)?.value || req.cookies.get('pagecraft_token')?.value;
  let token = cookieToken;
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  const user = token ? verifyJwtToken(token) : null;

  // Helper to add security & cache headers to any response
  const applyHeaders = (res: NextResponse, isSensitive: boolean = false) => {
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

    if (isSensitive) {
      res.headers.set('Cache-Control', 'private, no-store, must-revalidate');
      res.headers.set('Pragma', 'no-cache');
      res.headers.set('Expires', '0');
    }
    return res;
  };

  // 2. Check /admin/** routes
  if (pathname.startsWith('/admin')) {
    const rawTarget = pathname + (search || '');
    const safeRedirect = validateRedirectUrl(rawTarget, '/admin/dashboard');

    if (!user) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', safeRedirect);
      return applyHeaders(NextResponse.redirect(loginUrl), true);
    }

    if (!isAdminRole(user.role)) {
      // User is logged in but not an administrator
      if (user.role === 'AUTHOR') {
        return applyHeaders(NextResponse.redirect(new URL('/author/dashboard', req.url)), true);
      }
      return applyHeaders(NextResponse.redirect(new URL('/bookstore', req.url)), true);
    }

    const res = NextResponse.next();
    return applyHeaders(res, true);
  }

  // 3. Check /author/** protected dashboard routes
  if (pathname.startsWith('/author')) {
    const isPublicAuthorAuth = PUBLIC_AUTHOR_AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));

    if (!isPublicAuthorAuth) {
      const rawTarget = pathname + (search || '');
      const safeRedirect = validateRedirectUrl(rawTarget, '/author/dashboard');

      if (!user) {
        const loginUrl = new URL('/author/login', req.url);
        loginUrl.searchParams.set('redirect', safeRedirect);
        return applyHeaders(NextResponse.redirect(loginUrl), true);
      }

      if (!isAuthorOrAdmin(user.role)) {
        const plansUrl = new URL('/publishing-plans', req.url);
        plansUrl.searchParams.set('reason', 'author_status_required');
        return applyHeaders(NextResponse.redirect(plansUrl), true);
      }

      const res = NextResponse.next();
      return applyHeaders(res, true);
    }
  }

  // 4. Check /api/** routes
  if (pathname.startsWith('/api/')) {
    const isSensitiveApi =
      pathname.startsWith('/api/author/') ||
      pathname.startsWith('/api/admin/') ||
      pathname.startsWith('/api/analytics') ||
      pathname.startsWith('/api/team') ||
      pathname.startsWith('/api/backup') ||
      pathname.startsWith('/api/activity-logs') ||
      pathname.startsWith('/api/auth/me');

    const res = NextResponse.next();
    return applyHeaders(res, isSensitiveApi);
  }

  const res = NextResponse.next();
  return applyHeaders(res, false);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, books public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|books/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
