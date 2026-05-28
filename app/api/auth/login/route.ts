import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, AuthToken, LoginCredentials } from '@/types';
import { generateToken, verifyPassword } from '@/lib/auth';
import { validate } from '@/utils/validation';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

// Mock user database (in production, use a real database)
const MOCK_USERS = [
  {
    id: 'admin-1',
    email: 'admin@terabooks.com',
    password: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', // "admin123"
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: 'user-1',
    email: 'user@terabooks.com',
    password: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb', // "user123"
    name: 'Regular User',
    role: 'user' as const,
  },
];

/**
 * POST /api/auth/login - User login
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - stricter for auth endpoints
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = rateLimit(`auth-${identifier}`);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many login attempts. Please try again later.',
        } as ApiResponse<never>,
        { status: 429 }
      );
    }

    const body: LoginCredentials = await request.json();
    const { email, password } = body;

    // Validate input
    const emailValidation = validate.email(email);
    if (!emailValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: emailValidation.error,
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const passwordValidation = validate.password(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: passwordValidation.error,
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        } as ApiResponse<never>,
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        } as ApiResponse<never>,
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: AuthToken = {
      token,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    };

    return NextResponse.json({
      success: true,
      data: response,
      message: 'Login successful',
    } as ApiResponse<AuthToken>);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
