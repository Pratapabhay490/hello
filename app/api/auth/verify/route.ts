import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, JWTPayload } from '@/types';
import { verifyToken, getTokenFromHeaders } from '@/lib/auth';

/**
 * GET /api/auth/verify - Verify JWT token
 */
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeaders(request.headers);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No token provided',
        } as ApiResponse<never>,
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired token',
        } as ApiResponse<never>,
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: payload,
    } as ApiResponse<JWTPayload>);
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Token verification failed',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
