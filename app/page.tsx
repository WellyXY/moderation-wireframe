'use client'

import React, { useState } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ContentManagement from './components/ContentManagement'
import ExperimentRanking from './components/ExperimentRanking'
import TrendingFeeds from './components/TrendingFeeds'

export default function Home() {
  const [activeTab, setActiveTab] = useState('content')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ username: string; userId: string } | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleLogin = async (username: string, password: string) => {
    setLoginLoading(true)
    setLoginError('')

    // 模拟登录验证
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true)
        setCurrentUser({ 
          username: username,
          userId: 'admin_001' // 示例用户ID
        })
        setLoginError('')
      } else {
        setLoginError('Invalid username or password')
      }
      setLoginLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setActiveTab('content')
  }

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={handleLogin}
        isLoading={loginLoading}
        error={loginError}
      />
    )
  }

  // 登录后显示主界面
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1">
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'experiment' && <ExperimentRanking currentUserId={currentUser?.userId} />}
          {activeTab === 'trending' && <TrendingFeeds currentUserId={currentUser?.userId} />}
        </main>
      </div>
    </div>
  )
} 