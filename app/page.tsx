'use client'

import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ContentManagement from './components/ContentManagement'
import ExperimentRanking from './components/ExperimentRanking'

export default function Home() {
  const [activeTab, setActiveTab] = useState('content')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1">
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'experiment' && <ExperimentRanking />}
        </main>
      </div>
    </div>
  )
} 