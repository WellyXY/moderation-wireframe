'use client'

import React from 'react'

interface HeaderProps {
  currentUser: { username: string; userId: string } | null
  onLogout: () => void
}

export default function Header({ currentUser, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">🛡️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Moderation System</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span>Recommendation Algorithm Management System</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            🔔
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            ⚙️
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {currentUser?.username || 'Admin'}
              </span>
              <span className="text-xs text-gray-500">
                ID: {currentUser?.userId || 'N/A'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 