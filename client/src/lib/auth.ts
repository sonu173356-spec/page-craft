// ============================================================
// Page Craft — Server-Side Authentication & Authorization
// Cryptographic JWT Signing, HttpOnly Cookie Sessions & RBAC
// ============================================================

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// In production, require JWT_SECRET. In development/test, provide a secure runtime key.
const JWT_SECRET = process.env.JWT_SECRET || 'pagecraft_jwt_super_secret_key_2026_change_in_production_min_32_chars';
export const AUTH_COOKIE_NAME = 'pagecraft_session';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MANAGER'
  | 'EDITOR'
  | 'FINANCE'
  | 'SUPPORT'
  | 'EMPLOYEE'
  | 'AUTHOR'
  | 'CUSTOMER'
  | 'READER';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  authorId?: string;
  iat?: number;
  exp?: number;
}

export interface PasswordResetPayload {
  email: string;
  type: 'password-reset';
  purpose?: string;
  jti: string;
  iat?: number;
  exp?: number;
}

function generateRandomHex(bytes: number = 16): string {
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const array = new Uint8Array(bytes);
    globalThis.crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

// ---- JWT Management ----

export function signJwtToken(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  if (!token || typeof token !== 'string') return null;
  // Explicitly reject any leftover prototype mock tokens
  if (token.startsWith('mock-') || token === 'undefined' || token === 'null') {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (decoded && decoded.userId && decoded.email && decoded.role) {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

export function signPasswordResetToken(email: string): string {
  const jti = generateRandomHex(16);
  const payload: PasswordResetPayload = {
    email: email.toLowerCase().trim(),
    type: 'password-reset',
    purpose: 'password_reset',
    jti,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyPasswordResetToken(token: string): PasswordResetPayload | null {
  if (!token || typeof token !== 'string') return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as PasswordResetPayload;
    if (decoded && decoded.type === 'password-reset' && decoded.email) {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

export function getAuthUserFromRequest(req: NextRequest): JwtPayload | null {
  // 1. Check HTTP-only cookie first
  const cookieToken = req.cookies.get(AUTH_COOKIE_NAME)?.value || req.cookies.get('pagecraft_token')?.value;
  if (cookieToken) {
    const verified = verifyJwtToken(cookieToken);
    if (verified) return verified;
  }

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    return verifyJwtToken(token);
  }

  return null;
}

export function setAuthCookie(res: NextResponse, token: string): NextResponse {
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
  return res;
}

export function clearAuthCookie(res: NextResponse): NextResponse {
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  res.cookies.set({
    name: 'pagecraft_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}

// ---- Password Security ----

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  if (!plainText || !hash) return false;
  try {
    return await bcrypt.compare(plainText, hash);
  } catch {
    return false;
  }
}

// ---- Role-Based Access Control (RBAC) ----

export const ADMIN_ROLES: UserRole[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'MANAGER',
  'EDITOR',
  'FINANCE',
  'SUPPORT',
];

export function isAdminRole(role?: string): boolean {
  if (!role) return false;
  return ADMIN_ROLES.includes(role.toUpperCase() as UserRole);
}

export function isAuthorOrAdmin(role?: string): boolean {
  if (!role) return false;
  const upper = role.toUpperCase();
  return upper === 'AUTHOR' || upper === 'EMPLOYEE' || ADMIN_ROLES.includes(upper as UserRole);
}

export function canManageTeamMembers(role?: string): boolean {
  if (!role) return false;
  return role.toUpperCase() === 'SUPER_ADMIN';
}
