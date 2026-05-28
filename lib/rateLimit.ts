import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW } from './constants';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Simple in-memory rate limiter
 * In production, use Redis or similar distributed cache
 */
export function rateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = store[identifier];

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    });
  }

  if (!record || record.resetTime < now) {
    // Create new record
    store[identifier] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime: store[identifier].resetTime,
    };
  }

  // Increment count
  store[identifier].count += 1;

  const allowed = store[identifier].count <= RATE_LIMIT_MAX_REQUESTS;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - store[identifier].count);

  return {
    allowed,
    remaining,
    resetTime: record.resetTime,
  };
}

/**
 * Get rate limit identifier from request
 */
export function getRateLimitIdentifier(request: Request): string {
  // In production, use IP address or user ID
  // For now, use a combination of headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') || 'unknown';

  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';
  return `${ip}-${userAgent}`;
}
