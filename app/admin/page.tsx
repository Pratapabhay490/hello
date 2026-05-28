'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaVideo, FaChartBar, FaFolder, FaUsers, FaPlus } from 'react-icons/fa';
import AdminVideoForm from '@/components/admin/AdminVideoForm';
import AdminStats from '@/components/admin/AdminStats';
import AdminVideoList from '@/components/admin/AdminVideoList';

type AdminTab = 'dashboard' | 'videos' | 'add-video' | 'categories' | 'users';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="glass-strong border-b border-gray-800">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors"
            >
              <FaHome size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-surface border-r border-gray-800">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'
              }`}
            >
              <FaChartBar size={20} />
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'videos'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'
              }`}
            >
              <FaVideo size={20} />
              <span className="font-medium">All Videos</span>
            </button>

            <button
              onClick={() => setActiveTab('add-video')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'add-video'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'
              }`}
            >
              <FaPlus size={20} />
              <span className="font-medium">Add Video</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'
              }`}
            >
              <FaFolder size={20} />
              <span className="font-medium">Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'
              }`}
            >
              <FaUsers size={20} />
              <span className="font-medium">Users</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && <AdminStats />}
          {activeTab === 'videos' && <AdminVideoList />}
          {activeTab === 'add-video' && <AdminVideoForm />}
          {activeTab === 'categories' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Categories Management</h2>
              <div className="glass rounded-lg p-6">
                <p className="text-gray-400">Category management coming soon...</p>
              </div>
            </div>
          )}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <div className="glass rounded-lg p-6">
                <p className="text-gray-400">User management coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
