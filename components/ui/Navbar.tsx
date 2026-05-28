'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaUser, FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl md:text-3xl font-bold gradient-text group-hover:scale-105 transition-transform">
              TeraBooks
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              href="/trending"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Trending
            </Link>
            <Link
              href="/my-list"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              My List
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos..."
                    className="w-48 md:w-64 px-4 py-2 bg-surface border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="ml-2 text-white hover:text-primary transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-white hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <FaSearch size={20} />
                </button>
              )}
            </div>

            {/* Notifications */}
            <button
              className="hidden md:block text-white hover:text-primary transition-colors"
              aria-label="Notifications"
            >
              <FaBell size={20} />
            </button>

            {/* User Profile */}
            <Link
              href="/profile"
              className="hidden md:flex items-center space-x-2 text-white hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <FaUser size={16} />
              </div>
            </Link>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="hidden md:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
            >
              Admin
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-primary transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-gray-700">
          <div className="container-responsive py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              Categories
            </Link>
            <Link
              href="/trending"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              Trending
            </Link>
            <Link
              href="/my-list"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              My List
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              Profile
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-primary transition-colors font-medium py-2"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
