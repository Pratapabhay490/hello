import { VALIDATION } from '@/lib/constants';

/**
 * Validation utility functions
 */

export const validate = {
  /**
   * Validate email format
   */
  email(email: string): { valid: boolean; error?: string } {
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    
    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
    
    return { valid: true };
  },

  /**
   * Validate password
   */
  password(password: string): { valid: boolean; error?: string } {
    if (!password) {
      return { valid: false, error: 'Password is required' };
    }
    
    if (password.length < VALIDATION.PASSWORD_MIN) {
      return { valid: false, error: `Password must be at least ${VALIDATION.PASSWORD_MIN} characters` };
    }
    
    if (password.length > VALIDATION.PASSWORD_MAX) {
      return { valid: false, error: `Password must be less than ${VALIDATION.PASSWORD_MAX} characters` };
    }
    
    return { valid: true };
  },

  /**
   * Validate video title
   */
  videoTitle(title: string): { valid: boolean; error?: string } {
    if (!title || !title.trim()) {
      return { valid: false, error: 'Title is required' };
    }
    
    if (title.length < VALIDATION.VIDEO_TITLE_MIN) {
      return { valid: false, error: `Title must be at least ${VALIDATION.VIDEO_TITLE_MIN} characters` };
    }
    
    if (title.length > VALIDATION.VIDEO_TITLE_MAX) {
      return { valid: false, error: `Title must be less than ${VALIDATION.VIDEO_TITLE_MAX} characters` };
    }
    
    return { valid: true };
  },

  /**
   * Validate video description
   */
  videoDescription(description: string): { valid: boolean; error?: string } {
    if (!description || !description.trim()) {
      return { valid: false, error: 'Description is required' };
    }
    
    if (description.length < VALIDATION.VIDEO_DESCRIPTION_MIN) {
      return { valid: false, error: `Description must be at least ${VALIDATION.VIDEO_DESCRIPTION_MIN} characters` };
    }
    
    if (description.length > VALIDATION.VIDEO_DESCRIPTION_MAX) {
      return { valid: false, error: `Description must be less than ${VALIDATION.VIDEO_DESCRIPTION_MAX} characters` };
    }
    
    return { valid: true };
  },

  /**
   * Validate URL
   */
  url(url: string): { valid: boolean; error?: string } {
    if (!url) {
      return { valid: false, error: 'URL is required' };
    }
    
    if (!VALIDATION.URL_REGEX.test(url)) {
      return { valid: false, error: 'Invalid URL format' };
    }
    
    return { valid: true };
  },

  /**
   * Validate video URL (stricter - checks for video extensions or common video hosting patterns)
   */
  videoUrl(url: string): { valid: boolean; error?: string } {
    const urlValidation = this.url(url);
    if (!urlValidation.valid) {
      return urlValidation;
    }
    
    // Check if URL contains video extensions or known video hosting domains
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.m3u8', '.mpd'];
    const videoHosts = ['terabox', 'youtube', 'vimeo', 'dailymotion', 'streamable'];
    
    const hasVideoExtension = videoExtensions.some(ext => url.toLowerCase().includes(ext));
    const hasVideoHost = videoHosts.some(host => url.toLowerCase().includes(host));
    
    if (!hasVideoExtension && !hasVideoHost) {
      return { 
        valid: false, 
        error: 'URL must be a valid video file or from a supported video hosting service' 
      };
    }
    
    return { valid: true };
  },

  /**
   * Validate required field
   */
  required(value: unknown, fieldName: string): { valid: boolean; error?: string } {
    if (value === null || value === undefined || value === '') {
      return { valid: false, error: `${fieldName} is required` };
    }
    
    return { valid: true };
  },

  /**
   * Validate number range
   */
  numberRange(
    value: number, 
    min: number, 
    max: number, 
    fieldName: string
  ): { valid: boolean; error?: string } {
    if (typeof value !== 'number' || isNaN(value)) {
      return { valid: false, error: `${fieldName} must be a number` };
    }
    
    if (value < min || value > max) {
      return { valid: false, error: `${fieldName} must be between ${min} and ${max}` };
    }
    
    return { valid: true };
  },
};

/**
 * Sanitize string input (basic XSS prevention)
 */
export const sanitize = {
  /**
   * Remove HTML tags from string
   */
  html(input: string): string {
    return input.replace(/<[^>]*>/g, '');
  },

  /**
   * Escape special characters
   */
  escape(input: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    
    return input.replace(/[&<>"'/]/g, char => map[char]);
  },

  /**
   * Trim and normalize whitespace
   */
  whitespace(input: string): string {
    return input.trim().replace(/\s+/g, ' ');
  },
};
