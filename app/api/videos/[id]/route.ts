import { NextRequest, NextResponse } from 'next/server';
import { getVideoById } from '@/data/sampleData';
import { ApiResponse, Video } from '@/types';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/videos/:id - Get single video by ID
 */
export async function GET(request: NextRequest, context: RouteContext) {
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

    const { id } = await context.params;
    const video = getVideoById(id);

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          error: 'Video not found',
        } as ApiResponse<never>,
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: video,
    } as ApiResponse<Video>);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch video',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
