/**
 * Safe Redirect Validation Utility
 * Prevents open redirect attacks by ensuring returnTo/callbackUrl/redirect destinations
 * are strictly relative paths to approved internal application routes.
 */

export function validateRedirectUrl(
  url: string | null | undefined,
  fallback: string = '/'
): string {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  const trimmed = url.trim();

  // Reject empty string
  if (!trimmed) {
    return fallback;
  }

  // Reject protocol-relative URLs (e.g. "//evil.com")
  if (trimmed.startsWith('//')) {
    return fallback;
  }

  // Reject backslashes or encoded backslashes (e.g. "/\evil.com" or "\evil.com")
  if (trimmed.includes('\\') || trimmed.includes('%5c') || trimmed.includes('%5C')) {
    return fallback;
  }

  // Reject absolute URLs with protocol (e.g. "http://", "https://", "javascript:", "data:")
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return fallback;
  }

  // Reject control characters, newlines, carriage returns, null bytes
  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return fallback;
  }

  // Must begin with a single slash '/'
  if (!trimmed.startsWith('/')) {
    return fallback;
  }

  // Ensure it does not resolve to an external protocol after double decoding
  try {
    const decoded = decodeURIComponent(trimmed);
    if (
      decoded.startsWith('//') ||
      decoded.includes('\\') ||
      /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(decoded)
    ) {
      return fallback;
    }
  } catch {
    return fallback;
  }

  return trimmed;
}

export function getDefaultDashboardForRole(role?: string): string {
  if (!role) return '/';
  const normalized = role.toUpperCase();
  if (['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EDITOR', 'FINANCE', 'SUPPORT'].includes(normalized)) {
    return '/admin/dashboard';
  }
  if (normalized === 'AUTHOR') {
    return '/author/dashboard';
  }
  return '/bookstore';
}
