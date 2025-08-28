'use client'

import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ContentManagement from './components/ContentManagement'
import ExperimentRanking from './components/ExperimentRanking'
import TrendingFeeds from './components/TrendingFeeds'
import DiscoverPage from './components/DiscoverPage'
import ExplorePage from './components/ExplorePage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('content')
  
  // Auto-login as admin user (no login page needed)
  const currentUser = { username: 'admin', userId: 'admin_001' }

  const handleLogout = () => {
    // Refresh page to "logout"
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1">
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'experiment' && <ExperimentRanking currentUserId={currentUser?.userId} />}
          {activeTab === 'trending' && <TrendingFeeds currentUserId={currentUser?.userId} />}
          {activeTab === 'discover' && <DiscoverPage />}
          {activeTab === 'explore' && <ExplorePage />}
        </main>
      </div>
    </div>
  )
}