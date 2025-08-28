'use client'

import React from 'react'

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'content', label: 'Content Management', icon: '📹' },
  { id: 'experiment', label: 'For You', icon: '🧪' },
  { id: 'trending', label: 'Trending Feeds', icon: '🔥' },
  // { id: 'discover', label: 'Discover Page', icon: '🧭' }, // Hidden as requested
  { id: 'explore', label: 'Explore Page', icon: '🔍' },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
} 