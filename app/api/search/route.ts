import { NextRequest, NextResponse } from 'next/server';
import { searchVideos } from '@/data/sampleData';
import { ApiResponse, Video } from '@/types';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

/**
 * GET /api/search - Search videos
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

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Search query is required',
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const results = searchVideos(query);

    return NextResponse.json({
      success: true,
      data: results,
    } as ApiResponse<Video[]>);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
