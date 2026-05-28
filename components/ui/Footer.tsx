'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark border-t border-gray-800 mt-20">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold gradient-text mb-4">TeraBooks Player</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium video streaming platform for all your entertainment needs. Watch anywhere,
              anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/my-list" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  My List
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} TeraBooks Player. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
