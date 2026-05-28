'use client';

import React, { useState } from 'react';
import { sampleCategories } from '@/data/sampleData';
import { VideoMetadata } from '@/types';
import { validate } from '@/utils/validation';
import { FaSave, FaTimes, FaCheckCircle } from 'react-icons/fa';

const AdminVideoForm: React.FC = () => {
  const [formData, setFormData] = useState<VideoMetadata>({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    categoryId: '',
    duration: 0,
    featured: false,
    trending: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'duration') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Title validation
    const titleValidation = validate.videoTitle(formData.title);
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.error!;
    }

    // Description validation
    const descValidation = validate.videoDescription(formData.description);
    if (!descValidation.valid) {
      newErrors.description = descValidation.error!;
    }

    // Thumbnail URL validation
    const thumbValidation = validate.url(formData.thumbnailUrl);
    if (!thumbValidation.valid) {
      newErrors.thumbnailUrl = thumbValidation.error!;
    }

    // Video URL validation
    const videoValidation = validate.videoUrl(formData.videoUrl);
    if (!videoValidation.valid) {
      newErrors.videoUrl = videoValidation.error!;
    }

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    // Duration validation
    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Simulate API call (in production, call actual API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Video metadata submitted:', formData);
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        thumbnailUrl: '',
        videoUrl: '',
        categoryId: '',
        duration: 0,
        featured: false,
        trending: false,
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting video:', error);
      setErrors({ submit: 'Failed to add video. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      thumbnailUrl: '',
      videoUrl: '',
      categoryId: '',
      duration: 0,
      featured: false,
      trending: false,
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Add New Video</h2>
        <p className="text-gray-400">
          Fill in the details below to add a new video to the platform
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center space-x-3">
          <FaCheckCircle className="text-green-500 text-xl" />
          <span className="text-green-500 font-medium">Video added successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass rounded-lg p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Video Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
              errors.title ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="Enter video title"
          />
          {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="Enter video description"
          />
          {errors.description && <p className="mt-2 text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Thumbnail URL */}
        <div>
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-300 mb-2">
            Thumbnail URL *
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
              errors.thumbnailUrl ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="https://example.com/thumbnail.jpg"
          />
          {errors.thumbnailUrl && <p className="mt-2 text-sm text-red-500">{errors.thumbnailUrl}</p>}
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300 mb-2">
            Video URL * (TeraBox/Public Video Link)
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
              errors.videoUrl ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="https://terabox.com/... or direct video URL"
          />
          {errors.videoUrl && <p className="mt-2 text-sm text-red-500">{errors.videoUrl}</p>}
          <p className="mt-2 text-xs text-gray-500">
            Supported: TeraBox links, direct MP4/WEBM URLs, or streaming URLs
          </p>
        </div>

        {/* Category and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-white focus:outline-none focus:border-primary transition-colors ${
                errors.categoryId ? 'border-red-500' : 'border-gray-700'
              }`}
            >
              <option value="">Select a category</option>
              {sampleCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-2 text-sm text-red-500">{errors.categoryId}</p>}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
              Duration (seconds) *
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                errors.duration ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="600"
            />
            {errors.duration && <p className="mt-2 text-sm text-red-500">{errors.duration}</p>}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-primary bg-surface border-gray-700 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">Featured Video</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="trending"
              checked={formData.trending}
              onChange={handleChange}
              className="w-5 h-5 text-primary bg-surface border-gray-700 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">Trending Video</span>
          </label>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full spinner" />
                <span>Adding Video...</span>
              </>
            ) : (
              <>
                <FaSave size={18} />
                <span>Add Video</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-3 bg-surface-light hover:bg-surface-lighter text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes size={18} />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminVideoForm;
