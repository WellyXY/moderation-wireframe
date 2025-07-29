'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Post } from '../types'

const ExperimentRanking: React.FC = () => {
  // Feed算法参数
  const [feedParams, setFeedParams] = useState({
    followingWeight: 40, // Following权重 (%)
    recentWeight: 20,    // Recent权重 (%)
    forYouWeight: 40,    // For You Trending权重 (%)
    likeWeight: 1.0,     // 点赞权重系数
    commentWeight: 1.5,  // 评论权重系数
    remixWeight: 2.0,    // Remix权重系数
    watchWeight: 3.0,    // 观看完成度权重系数
    timeDecay: 0.8,      // 时间衰减系数
  })

  // 内容标签过滤器 - 与ContentManagement一致
  const [filterContentType, setFilterContentType] = useState('all')

  // View Details 弹窗状态
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // 模拟测试Feed数据 - 只包含approved/blocked状态，没有pending和waiting_for_review
  const mockFeedPosts: Post[] = [
    {
      id: 'feed_1',
      userId: 'user_001',
      username: 'trending_creator',
      avatar: '👨‍🎨',
      content: 'New trending dance challenge!',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: 2340,
      comments: 156,
      remixes: 89,
      watchPercentage: 92,
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T10:00:00'),
      boostedAt: new Date('2024-01-15T12:00:00'),
      boostExpiry: new Date('2024-01-17T12:00:00'),
      isBoosted: true,
      boostType: 'feature',
      isBlocked: false,
      tags: ['dance', 'trending'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_001',
      editLookId: 'edit_feed_001',
      videoPrompt: 'Create an energetic dance video with trending music'
    },
    {
      id: 'feed_2',
      userId: 'user_002',
      username: 'music_lover',
      avatar: '🎵',
      content: 'Easy guitar tutorial for beginners',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      likes: 1890,
      comments: 234,
      remixes: 45,
      watchPercentage: 88,
      createdAt: new Date('2024-01-15T09:00:00'),
      updatedAt: new Date('2024-01-15T09:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['music', 'tutorial'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_002',
      editLookId: 'edit_feed_002',
      videoPrompt: 'Create a beginner-friendly guitar tutorial video'
    },
    {
      id: 'feed_3',
      userId: 'user_003',
      username: 'food_explorer',
      avatar: '🍳',
      content: 'Quick 5-minute breakfast recipe',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      likes: 1567,
      comments: 89,
      remixes: 67,
      watchPercentage: 95,
      createdAt: new Date('2024-01-15T08:00:00'),
      updatedAt: new Date('2024-01-15T08:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['cooking', 'quick'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_003',
      editLookId: 'edit_feed_003',
      videoPrompt: 'Create a quick and easy breakfast cooking video'
    },
    {
      id: 'feed_4',
      userId: 'user_004',
      username: 'art_creator',
      avatar: '🎨',
      content: 'Digital art speed painting',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      likes: 2156,
      comments: 178,
      remixes: 92,
      watchPercentage: 87,
      createdAt: new Date('2024-01-15T07:00:00'),
      updatedAt: new Date('2024-01-15T07:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['art', 'digital'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'medium',
      jobId: 'job_feed_004',
      editLookId: 'edit_feed_004',
      videoPrompt: 'Create a mesmerizing digital art speed painting video'
    },
    {
      id: 'feed_5',
      userId: 'user_005',
      username: 'fitness_coach',
      avatar: '💪',
      content: 'Beginner home workout routine',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      likes: 1823,
      comments: 145,
      remixes: 38,
      watchPercentage: 91,
      createdAt: new Date('2024-01-15T06:00:00'),
      updatedAt: new Date('2024-01-15T06:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['fitness', 'beginner'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_005',
      editLookId: 'edit_feed_005',
      videoPrompt: 'Create an encouraging beginner fitness workout video'
    },
    {
      id: 'feed_6',
      userId: 'user_006',
      username: 'tech_reviewer',
      avatar: '📱',
      content: 'Latest smartphone comparison',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      likes: 1945,
      comments: 267,
      remixes: 23,
      watchPercentage: 84,
      createdAt: new Date('2024-01-15T05:00:00'),
      updatedAt: new Date('2024-01-15T05:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['tech', 'review'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'medium',
      jobId: 'job_feed_006',
      editLookId: 'edit_feed_006',
      videoPrompt: 'Create an informative smartphone comparison video'
    },
    {
      id: 'feed_7',
      userId: 'user_007',
      username: 'travel_guide',
      avatar: '🗺️',
      content: 'Hidden gems in Tokyo for budget travelers',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      likes: 1234,
      comments: 95,
      remixes: 56,
      watchPercentage: 89,
      createdAt: new Date('2024-01-15T04:00:00'),
      updatedAt: new Date('2024-01-15T04:00:00'),
      isBoosted: true,
      boostType: 'good',
      boostedAt: new Date('2024-01-15T11:00:00'),
      boostExpiry: new Date('2024-01-17T11:00:00'),
      isBlocked: false,
      tags: ['travel', 'budget'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_007',
      editLookId: 'edit_feed_007',
      videoPrompt: 'Create a travel guide for budget-conscious travelers'
    },
    {
      id: 'feed_8',
      userId: 'user_008',
      username: 'comedy_king',
      avatar: '😂',
      content: 'Funny pet compilation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      likes: 3456,
      comments: 234,
      remixes: 123,
      watchPercentage: 96,
      createdAt: new Date('2024-01-15T03:00:00'),
      updatedAt: new Date('2024-01-15T03:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['funny', 'pets'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_008',
      editLookId: 'edit_feed_008',
      videoPrompt: 'Create a compilation of funny pet moments'
    },
    {
      id: 'feed_9',
      userId: 'user_009',
      username: 'science_nerd',
      avatar: '🔬',
      content: 'Mind-blowing physics experiments',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      likes: 1876,
      comments: 156,
      remixes: 78,
      watchPercentage: 82,
      createdAt: new Date('2024-01-15T02:00:00'),
      updatedAt: new Date('2024-01-15T02:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['science', 'physics'],
      status: 'approved',
      isNewUserFriendly: false,
      difficulty: 'hard',
      jobId: 'job_feed_009',
      editLookId: 'edit_feed_009',
      videoPrompt: 'Create educational physics experiment demonstrations'
    },
    {
      id: 'feed_10',
      userId: 'user_010',
      username: 'nature_lover',
      avatar: '🌿',
      content: 'Peaceful forest sounds for meditation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      likes: 998,
      comments: 67,
      remixes: 34,
      watchPercentage: 93,
      createdAt: new Date('2024-01-15T01:00:00'),
      updatedAt: new Date('2024-01-15T01:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['nature', 'meditation'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_010',
      editLookId: 'edit_feed_010',
      videoPrompt: 'Create a relaxing nature meditation video'
    },
    {
      id: 'feed_11',
      userId: 'user_011',
      username: 'fashion_guru',
      avatar: '👗',
      content: 'Sustainable fashion tips for beginners',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      likes: 1456,
      comments: 89,
      remixes: 45,
      watchPercentage: 86,
      createdAt: new Date('2024-01-14T23:00:00'),
      updatedAt: new Date('2024-01-14T23:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['fashion', 'sustainable'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_011',
      editLookId: 'edit_feed_011',
      videoPrompt: 'Create a sustainable fashion guide for beginners'
    },
    {
      id: 'feed_12',
      userId: 'user_012',
      username: 'gaming_pro',
      avatar: '🎮',
      content: 'Epic gaming highlights compilation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: 2789,
      comments: 345,
      remixes: 167,
      watchPercentage: 94,
      createdAt: new Date('2024-01-14T22:00:00'),
      updatedAt: new Date('2024-01-14T22:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['gaming', 'highlights'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'medium',
      jobId: 'job_feed_012',
      editLookId: 'edit_feed_012',
      videoPrompt: 'Create an exciting gaming highlights compilation'
    },
    {
      id: 'feed_13',
      userId: 'user_013',
      username: 'book_worm',
      avatar: '📚',
      content: 'Must-read books of 2024',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      likes: 876,
      comments: 123,
      remixes: 29,
      watchPercentage: 78,
      createdAt: new Date('2024-01-14T21:00:00'),
      updatedAt: new Date('2024-01-14T21:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['books', 'reading'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_013',
      editLookId: 'edit_feed_013',
      videoPrompt: 'Create a book recommendation video for 2024'
    },
    {
      id: 'feed_14',
      userId: 'user_014',
      username: 'plant_parent',
      avatar: '🌱',
      content: 'Indoor plant care for beginners',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      likes: 1234,
      comments: 98,
      remixes: 56,
      watchPercentage: 91,
      createdAt: new Date('2024-01-14T20:00:00'),
      updatedAt: new Date('2024-01-14T20:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['plants', 'care'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_014',
      editLookId: 'edit_feed_014',
      videoPrompt: 'Create a beginner guide for indoor plant care'
    },
    {
      id: 'feed_15',
      userId: 'user_015',
      username: 'crypto_trader',
      avatar: '💰',
      content: 'Cryptocurrency basics explained',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      likes: 1567,
      comments: 234,
      remixes: 89,
      watchPercentage: 85,
      createdAt: new Date('2024-01-14T19:00:00'),
      updatedAt: new Date('2024-01-14T19:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['crypto', 'finance'],
      status: 'approved',
      isNewUserFriendly: false,
      difficulty: 'medium',
      jobId: 'job_feed_015',
      editLookId: 'edit_feed_015',
      videoPrompt: 'Create an educational video about cryptocurrency basics'
    },
    {
      id: 'feed_16',
      userId: 'user_016',
      username: 'movie_critic',
      avatar: '🎬',
      content: 'Best movies to watch this weekend',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      likes: 2134,
      comments: 187,
      remixes: 78,
      watchPercentage: 88,
      createdAt: new Date('2024-01-14T18:00:00'),
      updatedAt: new Date('2024-01-14T18:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['movies', 'reviews'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_016',
      editLookId: 'edit_feed_016',
      videoPrompt: 'Create movie recommendations for weekend viewing'
    },
    {
      id: 'feed_17',
      userId: 'user_017',
      username: 'diy_master',
      avatar: '🔨',
      content: 'DIY home improvement on a budget',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      likes: 1789,
      comments: 145,
      remixes: 67,
      watchPercentage: 92,
      createdAt: new Date('2024-01-14T17:00:00'),
      updatedAt: new Date('2024-01-14T17:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['diy', 'home'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'medium',
      jobId: 'job_feed_017',
      editLookId: 'edit_feed_017',
      videoPrompt: 'Create a budget-friendly DIY home improvement guide'
    },
    {
      id: 'feed_18',
      userId: 'user_018',
      username: 'language_learner',
      avatar: '🗣️',
      content: 'Learn Spanish in 10 minutes',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      likes: 1345,
      comments: 123,
      remixes: 45,
      watchPercentage: 87,
      createdAt: new Date('2024-01-14T16:00:00'),
      updatedAt: new Date('2024-01-14T16:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['language', 'education'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_018',
      editLookId: 'edit_feed_018',
      videoPrompt: 'Create a quick Spanish language learning video'
    },
    {
      id: 'feed_19',
      userId: 'user_019',
      username: 'health_coach',
      avatar: '🏥',
      content: 'Mental health tips for stress relief',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      likes: 2456,
      comments: 234,
      remixes: 89,
      watchPercentage: 95,
      createdAt: new Date('2024-01-14T15:00:00'),
      updatedAt: new Date('2024-01-14T15:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['health', 'mental'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'easy',
      jobId: 'job_feed_019',
      editLookId: 'edit_feed_019',
      videoPrompt: 'Create mental health and stress relief tips'
    },
    {
      id: 'feed_20',
      userId: 'user_020',
      username: 'space_explorer',
      avatar: '🚀',
      content: 'Amazing facts about the universe',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      likes: 1998,
      comments: 167,
      remixes: 78,
      watchPercentage: 90,
      createdAt: new Date('2024-01-14T14:00:00'),
      updatedAt: new Date('2024-01-14T14:00:00'),
      isBoosted: false,
      isBlocked: false,
      tags: ['space', 'science'],
      status: 'approved',
      isNewUserFriendly: true,
      difficulty: 'medium',
      jobId: 'job_feed_020',
      editLookId: 'edit_feed_020',
      videoPrompt: 'Create fascinating space and universe facts video'
    }
  ]

  // 根据内容类型过滤 - 与ContentManagement逻辑一致
  const filteredByContentType = useMemo(() => {
    return mockFeedPosts.filter(post => {
      switch (filterContentType) {
        case 'all':
          return true
        case 'feature':
          return post.isBoosted && post.boostType === 'feature'
        case 'good':
          return post.isBoosted && post.boostType === 'good'
        case 'approved':
          return post.status === 'approved' && !post.isBoosted
        default:
          return true
      }
    })
  }, [filterContentType])

  // 根据Feed算法参数计算排序后的内容
  const rankedPosts = useMemo(() => {
    return [...filteredByContentType].sort((a, b) => {
      // 模拟Feed算法评分计算
      const calculateScore = (post: Post) => {
        // 基础参与度评分
        const engagementScore = (
          feedParams.likeWeight * post.likes +
          feedParams.commentWeight * post.comments +
          feedParams.remixWeight * post.remixes +
          feedParams.watchWeight * post.watchPercentage
        )

        // 时间衰减
        const hoursOld = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60)
        const timeDecayFactor = Math.pow(feedParams.timeDecay, hoursOld / 24)

        // Boost加分
        const boostScore = post.isBoosted ? 1000 : 0

        return engagementScore * timeDecayFactor + boostScore
      }

      return calculateScore(b) - calculateScore(a)
    })
  }, [filteredByContentType, feedParams])

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Testing Feeds</h2>
        <p className="text-gray-600">Test and view feed sorting results with algorithm parameters</p>
      </div>

      {/* Feed参数调整面板 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Feed Algorithm Parameters</h3>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔧</div>
          <p className="text-lg text-gray-600 mb-2">Parameter Controls</p>
          <p className="text-sm text-gray-500">Waiting for development...</p>
        </div>
      </div>

      {/* 内容显示区域 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Testing Feed Results ({rankedPosts.length})</h3>
          <div className="flex items-center gap-3">
            {/* Content Tag Filter */}
            <select
              value={filterContentType}
              onChange={(e) => setFilterContentType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All Content</option>
              <option value="feature">Feature</option>
              <option value="good">Good</option>
              <option value="approved">Approved</option>
            </select>
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
              🧪 Algorithm Testing Mode
            </div>
          </div>
        </div>

        {/* TV Wall Grid Layout - 和Content Management相同 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {rankedPosts.map((post: Post, index) => (
            <VideoCard key={post.id} post={post} index={index} onSelectPost={setSelectedPost} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedPost(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Content Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <p className="text-gray-900">{selectedPost.content}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                  <p className="text-gray-900">{selectedPost.username} ({selectedPost.userId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div>{selectedPost.status}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technical Details</label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Job ID: {selectedPost.jobId}</div>
                    <div>Post ID: {selectedPost.id}</div>
                    <div>Edit Look ID: {selectedPost.editLookId}</div>
                    <div>User ID: {selectedPost.userId}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video Prompt</label>
                  <p className="text-gray-900 text-sm bg-gray-50 p-3 rounded-lg">{selectedPost.videoPrompt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Metrics</label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Likes: {selectedPost.likes}</div>
                    <div>Comments: {selectedPost.comments}</div>
                    <div>Remixes: {selectedPost.remixes}</div>
                    <div>Watch Rate: {selectedPost.watchPercentage}%</div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 视频卡片组件 - 与ContentManagement UI完全一致
interface VideoCardProps {
  post: Post
  index: number
  onSelectPost: (post: Post) => void
}

const VideoCard: React.FC<VideoCardProps> = ({ post, index, onSelectPost }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // 页面加载后静音自动播放
      video.muted = true
      video.loop = true
      video.play().catch(console.error)
    }
  }, [])

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

  // 状态徽章 - 与ContentManagement一致
  const getStatusBadge = (post: Post) => {
    if (post.isBlocked) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          🚫 Blocked
        </span>
      )
    }
    
    if (post.isBoosted) {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center ${
          post.boostType === 'feature' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {post.boostType === 'feature' ? '⭐ Featured' : '👍 Boosted'}
        </span>
      )
    }
    
    switch (post.status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex items-center">
            ✓ Approved
          </span>
        )
      case 'blocked':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
            🚫 Blocked
          </span>
        )
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center">
            ⏳ Pending
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Video Player Area - 9:16 aspect ratio */}
      <div 
        className="aspect-[9/16] bg-gray-900 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={post.videoUrl}
          loop
          muted
          playsInline
        />
        
        {/* 排名标识 - 左上角，稍微偏右避免重叠 */}
        <div className="absolute top-2 left-16 z-10">
          <span className="px-2 py-1 text-xs font-bold bg-blue-600 text-white rounded-full">
            #{index + 1}
          </span>
        </div>
        
        {/* 状态徽章 - 左上角 */}
        <div className="absolute top-2 left-2">
          {getStatusBadge(post)}
        </div>

        {/* 观看百分比 - 右上角 */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
          {post.watchPercentage}%
        </div>

        {/* 音频指示器 - 右下角 */}
        <div className="absolute bottom-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isHovered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isHovered ? '🔊' : '🔇'}
          </span>
        </div>

        {/* 内容预览 - 底部 */}
        <div className="absolute bottom-2 left-2 right-16">
          <div className="bg-black bg-opacity-60 text-white p-2 rounded">
            <div className="text-xs font-medium line-clamp-2">{post.content}</div>
          </div>
        </div>
      </div>
      
      {/* Content Info - 与ContentManagement完全一致 */}
      <div className="p-3">
        {/* User Info */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs">{post.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-900 truncate">{post.username}</div>
            <div className="text-xs text-gray-500">ID: {post.id}</div>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <div className="flex items-center space-x-2">
            <span className="flex items-center">👍 {post.likes}</span>
            <span className="flex items-center">💬 {post.comments}</span>
            <span className="flex items-center">🔄 {post.remixes}</span>
          </div>
        </div>

        {/* Action Buttons - 与ContentManagement完全一致，但功能简化 */}
        <div className="space-y-1">
          <button
            className="w-full text-primary-600 hover:text-primary-900 text-xs font-medium py-1"
            onClick={() => onSelectPost(post)}
          >
            View Details
          </button>
          <div className="grid grid-cols-2 gap-1">
            <button
              className="px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 text-xs rounded transition-colors"
              title="Boost Good"
              onClick={() => console.log('Boost Good for:', post.id)}
            >
              👍 Good
            </button>
            <button
              className="px-2 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs rounded transition-colors"
              title="Boost Feature"
              onClick={() => console.log('Boost Feature for:', post.id)}
            >
              ⭐ Feature
            </button>
            <button
              className="px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs rounded transition-colors"
              title="Approve"
              onClick={() => console.log('Approve for:', post.id)}
            >
              ✓ Approve
            </button>
            <button
              className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs rounded transition-colors"
              title="Block"
              onClick={() => console.log('Block for:', post.id)}
            >
              🚫 Block
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperimentRanking 