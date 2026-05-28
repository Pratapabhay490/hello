import { NextRequest, NextResponse } from 'next/server';
import { sampleCategories } from '@/data/sampleData';
import { ApiResponse, Category } from '@/types';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

/**
 * GET /api/categories - Get all categories
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = rateLimit(identifier);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests',
        } as ApiResponse<never>,
        { status: 429 }
      );
    }

    // Sort by order
    const sortedCategories = [...sampleCategories].sort((a, b) => a.order - b.order);

    return NextResponse.json({
      success: true,
      data: sortedCategories,
    } as ApiResponse<Category[]>);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
