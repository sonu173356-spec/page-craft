import { NextRequest } from 'next/server';

/**
 * CSRF & Origin Validation Utility
 * Validates Origin and Referer headers for state-changing HTTP requests (POST, PUT, DELETE, PATCH).
 */
export function validateCsrfOrigin(req: NextRequest): boolean {
  // Safe read-only HTTP methods do not require origin check
  const method = req.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true;
  }

  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  const referer = req.headers.get('referer');

  // If no origin and no referer are present (e.g. some internal tools/tests), allow only if explicit server header matches
  if (!origin && !referer) {
    // In local development or automated test environment without Origin header, permit request
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    return false;
  }

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host.toLowerCase() === host.toLowerCase()) {
        return true;
      }
    } catch {
      return false;
    }
  }

  if (referer && host) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.host.toLowerCase() === host.toLowerCase()) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}
