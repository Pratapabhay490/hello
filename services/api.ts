import {
  Video,
  Category,
  ApiResponse,
  PaginatedResponse,
  SearchFilters,
  LoginCredentials,
  AuthToken,
  JWTPayload,
} from '@/types';
import { API_BASE_URL, API_TIMEOUT } from '@/lib/constants';

/**
 * Base API client with error handling and timeout
 */
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

const apiClient = new ApiClient();

/**
 * Video API services
 */
export const videoService = {
  /**
   * Get all videos with filters
   */
  async getVideos(filters?: SearchFilters): Promise<PaginatedResponse<Video>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const endpoint = `/videos${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await apiClient.get<PaginatedResponse<Video>>(endpoint);
    return response.data as PaginatedResponse<Video>;
  },

  /**
   * Get single video by ID
   */
  async getVideo(id: string): Promise<Video> {
    const response = await apiClient.get<Video>(`/videos/${id}`);
    if (!response.success || !response.data) {
      throw new Error('Video not found');
    }
    return response.data;
  },

  /**
   * Track video view
   */
  async trackView(videoId: string): Promise<void> {
    await apiClient.post('/videos/track-view', { videoId });
  },
};

/**
 * Category API services
 */
export const categoryService = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>('/categories');
    if (!response.success || !response.data) {
      throw new Error('Failed to fetch categories');
    }
    return response.data;
  },
};

/**
 * Search API services
 */
export const searchService = {
  /**
   * Search videos
   */
  async search(query: string): Promise<Video[]> {
    const params = new URLSearchParams({ q: query });
    const response = await apiClient.get<Video[]>(`/search?${params.toString()}`);
    if (!response.success || !response.data) {
      throw new Error('Search failed');
    }
    return response.data;
  },
};

/**
 * Authentication API services
 */
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthToken> {
    const response = await apiClient.post<AuthToken>('/auth/login', credentials);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Login failed');
    }
    return response.data;
  },

  /**
   * Verify token
   */
  async verifyToken(token: string): Promise<JWTPayload> {
    const response = await apiClient.get<JWTPayload>('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.success || !response.data) {
      throw new Error('Token verification failed');
    }
    return response.data;
  },

  /**
   * Get stored token
   */
  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('terabooks_auth_token');
  },

  /**
   * Store token
   */
  storeToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('terabooks_auth_token', token);
  },

  /**
   * Remove token
   */
  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('terabooks_auth_token');
  },
};
