'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Post } from '../types'

// Mock data with diverse remix counts and creation times
const mockExploreContent: Post[] = [
  {
    id: 'post_001',
    userId: 'user_001',
    username: 'viral_dancer',
    avatar: '💃',
    content: 'Viral Blackpink dance challenge',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 8500,
    comments: 1200,
    remixes: 1834,
    watchPercentage: 96,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['dance', 'kpop'],
    status: 'approved',
    jobId: 'job_001',
    editLookId: 'edit_001',
    videoPrompt: 'Viral dance content',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    originalScore: 950,
  },
  {
    id: 'post_002',
    userId: 'user_002',
    username: 'makeup_guru',
    avatar: '💄',
    content: '10-minute glow up transformation',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 3400,
    comments: 450,
    remixes: 678,
    watchPercentage: 89,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['beauty', 'makeup'],
    status: 'approved',
    jobId: 'job_002',
    editLookId: 'edit_002',
    videoPrompt: 'Beauty transformation',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    originalScore: 820,
  },
  {
    id: 'post_003',
    userId: 'user_003',
    username: 'food_wizard',
    avatar: '🧙‍♂️',
    content: 'Mind-blowing pasta recipe hack',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 2800,
    comments: 320,
    remixes: 445,
    watchPercentage: 94,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['cooking', 'lifehack'],
    status: 'approved',
    jobId: 'job_003',
    editLookId: 'edit_003',
    videoPrompt: 'Cooking hack content',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    originalScore: 750,
  },
  {
    id: 'post_004',
    userId: 'user_004',
    username: 'pet_lover',
    avatar: '🐕',
    content: 'Golden retriever learns skateboard',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 5200,
    comments: 780,
    remixes: 89,
    watchPercentage: 97,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['pets', 'funny'],
    status: 'approved',
    jobId: 'job_004',
    editLookId: 'edit_004',
    videoPrompt: 'Cute pet content',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    originalScore: 680,
  },
  {
    id: 'post_005',
    userId: 'user_005',
    username: 'fitness_coach',
    avatar: '🏋️‍♀️',
    content: 'HIIT workout burns 300 calories',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 4100,
    comments: 520,
    remixes: 267,
    watchPercentage: 85,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['fitness', 'health'],
    status: 'approved',
    jobId: 'job_005',
    editLookId: 'edit_005',
    videoPrompt: 'Fitness routine',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    originalScore: 620,
  },
  {
    id: 'post_006',
    userId: 'user_006',
    username: 'comedy_master',
    avatar: '🎭',
    content: 'When your mom calls during work',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 7800,
    comments: 920,
    remixes: 34,
    watchPercentage: 92,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['comedy', 'relatable'],
    status: 'approved',
    jobId: 'job_006',
    editLookId: 'edit_006',
    videoPrompt: 'Comedy skit',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    originalScore: 580,
  },
  {
    id: 'post_007',
    userId: 'user_007',
    username: 'art_student',
    avatar: '🎨',
    content: 'Speed painting realistic portrait',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1900,
    comments: 180,
    remixes: 156,
    watchPercentage: 88,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['art', 'drawing'],
    status: 'approved',
    jobId: 'job_007',
    editLookId: 'edit_007',
    videoPrompt: 'Art creation',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    originalScore: 540,
  },
  {
    id: 'post_008',
    userId: 'user_008',
    username: 'tech_geek',
    avatar: '🤖',
    content: 'ChatGPT vs human creativity test',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 3200,
    comments: 560,
    remixes: 23,
    watchPercentage: 90,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['tech', 'ai'],
    status: 'approved',
    jobId: 'job_008',
    editLookId: 'edit_008',
    videoPrompt: 'Tech comparison',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    originalScore: 500,
  },
  {
    id: 'post_009',
    userId: 'user_009',
    username: 'travel_blogger',
    avatar: '✈️',
    content: 'Hidden gems in Tokyo streets',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 2600,
    comments: 340,
    remixes: 67,
    watchPercentage: 86,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['travel', 'japan'],
    status: 'approved',
    jobId: 'job_009',
    editLookId: 'edit_009',
    videoPrompt: 'Travel guide',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    originalScore: 480,
  },
  {
    id: 'post_010',
    userId: 'user_010',
    username: 'life_hacker',
    avatar: '🧠',
    content: 'Study technique that changed my life',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1400,
    comments: 200,
    remixes: 289,
    watchPercentage: 93,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    isBoosted: false,
    isBlocked: false,
    tags: ['education', 'productivity'],
    status: 'approved',
    jobId: 'job_010',
    editLookId: 'edit_010',
    videoPrompt: 'Study tips',
    exploreFlag: true,
    exploreFlaggedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    originalScore: 450,
  },
]

// Time-based weight calculation
const calculateWeight = (exploreFlaggedAt: Date): number => {
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - exploreFlaggedAt.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysSince <= 3) {
    return 1.5 // 1-3 days: 1.5x multiplier
  } else if (daysSince <= 7) {
    return 1.0 // 3-7 days: 1.0x multiplier
  } else {
    return 0.7 // 7+ days: 0.7x multiplier
  }
}

// Calculate base ranking score with new time decay for fresh content
const calculateRankingScore = (post: Post): number => {
  const now = new Date()
  const daysSinceCreated = Math.floor((now.getTime() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  
  // Base score components (only remix count matters)
  const usageLast14Days = post.remixes
  const baseScore = Math.log(1 + usageLast14Days) * 10
  
  // Remove sliding score as requested
  
  // NEW: Smooth fresh content time decay boost
  const freshContentBoost = (() => {
    if (daysSinceCreated >= 7) {
      return 1.0 // Baseline after 7 days
    }
    
    // Smooth exponential decay from 5.0x to 1.0x over 7 days
    // Formula: 5.0 * e^(-0.23 * days) where it reaches ~1.0 at day 7
    const decayRate = 0.23
    const maxBoost = 5.0
    const minBoost = 1.0
    
    const boost = maxBoost * Math.exp(-decayRate * daysSinceCreated)
    return Math.max(boost, minBoost)
  })()
  
  return Math.round(baseScore * freshContentBoost)
}

// Calculate weighted score (for explore-flagged content)
const calculateWeightedScore = (post: Post): number => {
  if (!post.exploreFlag || !post.exploreFlaggedAt) {
    return calculateRankingScore(post)
  }
  
  const baseRankingScore = calculateRankingScore(post)
  const exploreWeight = calculateWeight(post.exploreFlaggedAt)
  return Math.round(baseRankingScore * exploreWeight)
}

// Format time since flagged
const formatTimeSince = (date: Date): string => {
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  const hoursSince = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (daysSince === 0) {
    return `${hoursSince}h ago`
  } else if (daysSince === 1) {
    return '1 day ago'
  } else {
    return `${daysSince} days ago`
  }
}

// Format create time
const formatCreateTime = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Video Table Row Component
interface VideoTableRowProps {
  post: Post
  index: number
  weight: number
  weightedScore: number
  onRemoveFlag: (postId: string) => void
  getWeightBadge: (weight: number) => JSX.Element
}

const VideoTableRow: React.FC<VideoTableRowProps> = ({ 
  post, 
  index, 
  weight, 
  weightedScore, 
  onRemoveFlag, 
  getWeightBadge 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.muted = false
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.muted = true
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4 sticky left-0 bg-white z-10 border-r border-gray-100">
        <div className="relative inline-flex items-center justify-center">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-all duration-200 ${
            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg' :
            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 shadow-md' :
            index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600 shadow-md' :
            'bg-gradient-to-r from-purple-500 to-purple-700 shadow-sm'
          }`}>
            {index + 1}
          </div>
          {index < 3 && (
            <div className="absolute -top-1 -right-1 text-xs">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-3">
        <div 
          className="relative w-24 h-32 group cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video 
            ref={videoRef}
            src={post.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
            className={`w-full h-full object-cover rounded bg-gray-900 transition-transform duration-200 ${
              isHovered ? 'scale-110 shadow-xl z-10' : 'scale-100'
            }`}
            muted 
            playsInline 
            loop 
            autoPlay 
          />
          {/* Audio indicator */}
          <div className="absolute bottom-2 right-2 text-white text-sm">
            {isHovered ? '🔊' : '🔇'}
          </div>
        </div>
      </td>
      <td className="py-4 px-3">
        <div className="text-sm font-medium text-gray-900">{post.id}</div>
        <div className="text-xs text-gray-500 max-w-xs truncate">{post.content}</div>
      </td>
      <td className="py-4 px-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{post.avatar}</span>
          <div>
            <div className="text-sm font-medium text-gray-900">{post.username}</div>
            <div className="text-xs text-gray-500">{post.userId}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-center">
        {getWeightBadge(weight)}
      </td>
      <td className="py-4 px-3 text-center">
        <div className="text-sm font-bold text-purple-600">{weightedScore}</div>
      </td>
      <td className="py-4 px-3">
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-3 text-xs text-gray-600">
            <span className="flex items-center space-x-1">
              <span>👍</span>
              <span>{post.likes.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>💬</span>
              <span>{post.comments.toLocaleString()}</span>
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-xs text-gray-600">
            <span className="flex items-center space-x-1">
              <span>🔄</span>
              <span>{post.remixes.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-center">
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {formatCreateTime(post.createdAt)}
        </div>
      </td>
      <td className="py-4 px-3 text-center">
        <div className="text-sm font-medium text-gray-900">{calculateRankingScore(post)}</div>
      </td>
      <td className="py-4 px-3 text-center">
        <button
          onClick={() => onRemoveFlag(post.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors whitespace-nowrap"
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default function ExplorePage() {
  const [exploreContent, setExploreContent] = useState<Post[]>(mockExploreContent)

  // Sort content by weighted score (highest first)
  const sortedContent = useMemo(() => {
    return [...exploreContent].sort((a, b) => {
      const aScore = calculateWeightedScore(a)
      const bScore = calculateWeightedScore(b)
      return bScore - aScore
    })
  }, [exploreContent])

  const handleRemoveFlag = (postId: string) => {
    setExploreContent(prev => prev.filter(post => post.id !== postId))
  }

  const getWeightBadge = (weight: number) => {
    if (weight === 1.5) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">1.5x</span>
    } else if (weight === 1.0) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">1.0x</span>
    } else {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">0.7x</span>
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Page</h2>
        <p className="text-gray-600">Manage content flagged for Explore with time-based weight decay and smart ranking</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center border-b border-gray-200 px-4">
          <div className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600">
            Explore Content ({exploreContent.length})
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Content Table */}
          {sortedContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Explore Content</h3>
              <p className="text-gray-500">No content has been flagged for Explore yet. Go to Content Management to add some content.</p>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-hidden">
              <div className="min-w-[1400px]">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="pb-3 text-sm font-medium text-gray-700 w-20 sticky left-0 bg-white z-10">Rank</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-32">Video</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-48">Post ID</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-48">Author</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-24 text-center">Weight</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-32 text-center">Weighted Score</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-40 text-center">Engagement</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-48 text-center">Create Time</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-32 text-center">Ranking Score</th>
                      <th className="pb-3 text-sm font-medium text-gray-700 w-24 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedContent.map((post, index) => {
                      const weight = post.exploreFlaggedAt ? calculateWeight(post.exploreFlaggedAt) : 1.0
                      const weightedScore = calculateWeightedScore(post)

                      return (
                        <VideoTableRow
                          key={post.id}
                          post={post}
                          index={index}
                          weight={weight}
                          weightedScore={weightedScore}
                          onRemoveFlag={handleRemoveFlag}
                          getWeightBadge={getWeightBadge}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}