import { SignJWT, jwtVerify } from 'jose';
import { JWTPayload } from '@/types';
import { JWT_SECRET, JWT_EXPIRES_IN } from './constants';

const secret = new TextEncoder().encode(JWT_SECRET);

/**
 * Generate JWT token
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);

  return token;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as 'admin' | 'user',
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from request headers
 */
export function getTokenFromHeaders(headers: Headers): string | null {
  const authHeader = headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Verify admin role
 */
export function isAdmin(payload: JWTPayload | null): boolean {
  return payload?.role === 'admin';
}

/**
 * Hash password (placeholder - in production use bcrypt)
 */
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or similar
  // For now, we'll use a simple hash (NOT SECURE - FOR DEMO ONLY)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify password (placeholder - in production use bcrypt)
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
}
