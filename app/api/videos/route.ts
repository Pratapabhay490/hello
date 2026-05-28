import { NextRequest, NextResponse } from 'next/server';
import { sampleVideos } from '@/data/sampleData';
import { ApiResponse, PaginatedResponse, Video } from '@/types';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { rateLimit, getRateLimitIdentifier } from '@/lib/rateLimit';

/**
 * GET /api/videos - Get all videos with pagination and filtering
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
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(
      parseInt(searchParams.get('limit') || DEFAULT_PAGE_SIZE.toString()),
      50
    );
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const sortBy = searchParams.get('sortBy') || 'recent';

    // Filter videos
    let filteredVideos = [...sampleVideos];

    if (categoryId) {
      filteredVideos = filteredVideos.filter(v => v.categoryId === categoryId);
    }

    if (featured) {
      filteredVideos = filteredVideos.filter(v => v.featured);
    }

    if (trending) {
      filteredVideos = filteredVideos.filter(v => v.trending);
    }

    // Sort videos
    switch (sortBy) {
      case 'popular':
        filteredVideos.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        filteredVideos.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.views - a.views;
        });
        break;
      case 'recent':
      default:
        filteredVideos.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    // Paginate
    const total = filteredVideos.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedVideos = filteredVideos.slice(start, end);

    const response: PaginatedResponse<Video> = {
      data: paginatedVideos,
      total,
      page,
      limit,
      totalPages,
    };

    return NextResponse.json(response, {
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch videos',
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}
