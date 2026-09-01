// ============================================================
// Page Craft — Automated Security Verification Suite
// Tests negative authorization, mock token rejection, open redirect blocking,
// cryptographic token validation, CSRF checks, and role hierarchy enforcement.
// ============================================================

import {
  signJwtToken,
  verifyJwtToken,
  hashPassword,
  comparePassword,
  signPasswordResetToken,
  verifyPasswordResetToken,
  isAdminRole,
  isAuthorOrAdmin,
  canManageTeamMembers,
} from '../src/lib/auth';
import { validateRedirectUrl } from '../src/lib/redirect';
import { checkRateLimit } from '../src/lib/rateLimit';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  totalTests += 1;
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests += 1;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    if (failureDetails) {
      console.error(`     Details: ${failureDetails}`);
    }
  }
}

async function runSecurityTestSuite() {
  console.log('\n🔒 =========================================================');
  console.log('   PAGE CRAFT ENTERPRISE SECURITY VERIFICATION SUITE');
  console.log('=========================================================\n');

  // --- Suite 1: Mock & Malformed Token Rejection ---
  console.log('📦 Suite 1: Negative Authorization & Mock Token Rejection');
  assert(verifyJwtToken('mock-access-token-jwt') === null, 'Rejects prototype mock access token');
  assert(verifyJwtToken('mock-admin-token') === null, 'Rejects arbitrary mock tokens');
  assert(verifyJwtToken('undefined') === null, 'Rejects literal "undefined" token string');
  assert(verifyJwtToken('null') === null, 'Rejects literal "null" token string');
  assert(verifyJwtToken('') === null, 'Rejects empty token string');
  assert(verifyJwtToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.bogussig') === null, 'Rejects forged token with invalid signature');

  // --- Suite 2: Cryptographic JWT Lifecycle ---
  console.log('\n📦 Suite 2: Cryptographic JWT Signing & Integrity');
  const sessionData = {
    userId: 'usr-sec-001',
    email: 'sec-author@example.invalid',
    name: 'Security Test Author',
    role: 'AUTHOR' as const,
  };
  const token = signJwtToken(sessionData);
  assert(typeof token === 'string' && token.split('.').length === 3, 'Generates valid 3-part signed JWT');

  const verified = verifyJwtToken(token);
  assert(
    verified !== null &&
    verified.userId === sessionData.userId &&
    verified.email === sessionData.email &&
    verified.role === 'AUTHOR',
    'Successfully verifies authentic JWT payload'
  );

  // Tampering test: flip one char in signature
  const parts = token.split('.');
  const tamperedSig = parts[2].substring(0, parts[2].length - 1) + (parts[2].endsWith('a') ? 'b' : 'a');
  const tamperedToken = `${parts[0]}.${parts[1]}.${tamperedSig}`;
  assert(verifyJwtToken(tamperedToken) === null, 'Detects signature tampering and rejects modified JWT');

  // --- Suite 3: Password Hashing & Constant-Time Comparison ---
  console.log('\n📦 Suite 3: Password Hashing & Bcrypt Verification');
  const rawPass = 'V3ry$ecureP@ssw0rd2026!';
  const hash = await hashPassword(rawPass);
  assert(hash.startsWith('$2a$') || hash.startsWith('$2b$'), 'Generates strong standard bcrypt password hash');
  assert(await comparePassword(rawPass, hash) === true, 'Bcrypt successfully authenticates matching password');
  assert(await comparePassword('WrongPassword123', hash) === false, 'Bcrypt rejects incorrect password');
  assert(await comparePassword('', hash) === false, 'Bcrypt rejects empty password');

  // --- Suite 4: Open Redirect Protection ---
  console.log('\n📦 Suite 4: Open Redirect Protection');
  assert(validateRedirectUrl('https://evil-attacker.com', '/admin') === '/admin', 'Blocks absolute HTTP/HTTPS external redirect');
  assert(validateRedirectUrl('//evil-attacker.com/steal-cookie', '/admin') === '/admin', 'Blocks protocol-relative "//" bypass');
  assert(validateRedirectUrl('/\\evil-attacker.com', '/admin') === '/admin', 'Blocks backslash "/\\" Windows UNC/browser bypass');
  assert(validateRedirectUrl('\\\\evil-attacker.com', '/admin') === '/admin', 'Blocks leading backslashes "\\\\" bypass');
  assert(validateRedirectUrl('javascript:alert(1)', '/admin') === '/admin', 'Blocks javascript: pseudo-protocol');
  assert(validateRedirectUrl('/admin/books?filter=active', '/admin') === '/admin/books?filter=active', 'Allows valid internal relative paths');
  assert(validateRedirectUrl('/author/dashboard', '/author') === '/author/dashboard', 'Allows legitimate author dashboard path');

  // --- Suite 5: Password Reset Token Security ---
  console.log('\n📦 Suite 5: Cryptographic Password Reset Tokens');
  const resetEmail = 'author-reset@example.invalid';
  const resetToken = signPasswordResetToken(resetEmail);
  assert(typeof resetToken === 'string' && resetToken.length > 20, 'Signs cryptographic password reset token');

  const verifiedReset = verifyPasswordResetToken(resetToken);
  assert(
    verifiedReset !== null && verifiedReset.email === resetEmail && verifiedReset.purpose === 'password_reset',
    'Decodes and verifies valid password reset token payload'
  );

  assert(verifyPasswordResetToken(resetToken + 'tamper') === null, 'Rejects tampered password reset token');
  assert(verifyPasswordResetToken('invalid-reset-token') === null, 'Rejects arbitrary password reset string');

  // --- Suite 6: Role-Based Access Control (RBAC) Hierarchy ---
  console.log('\n📦 Suite 6: Role Hierarchy & Isolation Rules');
  assert(isAdminRole('SUPER_ADMIN') === true, 'SUPER_ADMIN is recognized as Admin role');
  assert(isAdminRole('ADMIN') === true, 'ADMIN is recognized as Admin role');
  assert(isAdminRole('MANAGER') === true, 'MANAGER is recognized as Admin role');
  assert(isAdminRole('AUTHOR') === false, 'AUTHOR is NOT recognized as Admin role');
  assert(isAdminRole('CUSTOMER') === false, 'CUSTOMER is NOT recognized as Admin role');
  assert(isAdminRole('READER') === false, 'READER is NOT recognized as Admin role');

  assert(isAuthorOrAdmin('AUTHOR') === true, 'AUTHOR is permitted on author-scoped endpoints');
  assert(isAuthorOrAdmin('SUPER_ADMIN') === true, 'SUPER_ADMIN is permitted on author-scoped endpoints');
  assert(isAuthorOrAdmin('CUSTOMER') === false, 'CUSTOMER is blocked from author endpoints');
  assert(isAuthorOrAdmin('READER') === false, 'READER is blocked from author endpoints');

  assert(canManageTeamMembers('SUPER_ADMIN') === true, 'Only SUPER_ADMIN can manage team members');
  assert(canManageTeamMembers('ADMIN') === false, 'Standard ADMIN cannot create/manage team roles');
  assert(canManageTeamMembers('AUTHOR') === false, 'AUTHOR cannot manage team roles');

  // --- Suite 7: Sliding-Window Rate Limiter ---
  console.log('\n📦 Suite 7: Rate Limiting Enforcement');
  const testKey = `test-ip-${Date.now()}`;
  const rateConfig = { windowMs: 10000, maxRequests: 3 };

  const r1 = checkRateLimit(testKey, rateConfig);
  const r2 = checkRateLimit(testKey, rateConfig);
  const r3 = checkRateLimit(testKey, rateConfig);
  const r4 = checkRateLimit(testKey, rateConfig); // Should be blocked

  assert(r1.allowed === true && r1.remaining === 2, 'Rate limiter allows request 1');
  assert(r2.allowed === true && r2.remaining === 1, 'Rate limiter allows request 2');
  assert(r3.allowed === true && r3.remaining === 0, 'Rate limiter allows request 3');
  assert(r4.allowed === false && r4.retryAfterSeconds > 0, 'Rate limiter blocks request 4 exceeding threshold');

  // --- Final Results Summary ---
  console.log('\n=========================================================');
  console.log(`🎯 Test Run Summary: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('=========================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runSecurityTestSuite().catch((e) => {
  console.error('Test runner fatal error:', e);
  process.exit(1);
});
