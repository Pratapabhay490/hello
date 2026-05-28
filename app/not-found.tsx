import Link from 'next/link';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-4">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text animate-pulse">404</h1>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <FaExclamationTriangle className="text-yellow-500 text-2xl" />
            <p className="text-2xl text-gray-400">Page Not Found</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-2 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            <FaHome size={20} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/categories"
            className="flex items-center space-x-2 px-8 py-3 bg-surface-light hover:bg-surface-lighter text-white font-semibold rounded-lg transition-colors border border-gray-700"
          >
            <span>Browse Categories</span>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-4 opacity-20">
          <div className="w-16 h-16 border-4 border-primary rounded-full animate-spin-slow" />
          <div className="w-16 h-16 border-4 border-primary rounded-full animate-spin-slow animation-delay-200" />
          <div className="w-16 h-16 border-4 border-primary rounded-full animate-spin-slow animation-delay-400" />
        </div>
      </div>
    </div>
  );
}
