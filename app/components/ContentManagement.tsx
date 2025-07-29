'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Post } from '../types'

// Mock data
const mockPosts: Post[] = [
  {
    id: 'cm_1',
    userId: 'user_cm_001',
    username: 'creative_artist',
    avatar: '🎨',
    content: 'Digital art creation process timelapse',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1456,
    comments: 234,
    remixes: 89,
    watchPercentage: 92,
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['art', 'digital'],
    status: 'pending',
    jobId: 'job_cm_001_digital_art',
    editLookId: 'edit_cm_001_artistic',
    videoPrompt: 'Create a mesmerizing digital art creation timelapse with artistic effects',
  },
  {
    id: 'cm_2',
    userId: 'user_cm_002',
    username: 'cooking_master',
    avatar: '👨‍🍳',
    content: 'Authentic pasta making from scratch',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 2345,
    comments: 187,
    remixes: 67,
    watchPercentage: 88,
    createdAt: new Date('2024-01-15T09:15:00'),
    updatedAt: new Date('2024-01-15T09:15:00'),
    boostedAt: new Date('2024-01-15T11:00:00'),
    boostExpiry: new Date('2024-01-17T11:00:00'),
    isBoosted: true,
    boostType: 'feature',
    isBlocked: false,
    tags: ['cooking', 'italian'],
    status: 'approved',
    jobId: 'job_cm_002_pasta_making',
    editLookId: 'edit_cm_002_warm_kitchen',
    videoPrompt: 'Professional pasta making tutorial with warm kitchen atmosphere',
  },
  {
    id: 'cm_3',
    userId: 'user_cm_003',
    username: 'adventure_seeker',
    avatar: '🧗‍♂️',
    content: 'Mountain climbing adventure tips',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 1890,
    comments: 145,
    remixes: 45,
    watchPercentage: 95,
    createdAt: new Date('2024-01-15T08:45:00'),
    updatedAt: new Date('2024-01-15T08:45:00'),
    isBoosted: true,
    boostType: 'good',
    boostedAt: new Date('2024-01-15T10:30:00'),
    boostExpiry: new Date('2024-01-17T10:30:00'),
    isBlocked: false,
    tags: ['adventure', 'outdoors'],
    status: 'approved',
    jobId: 'job_cm_003_mountain_climbing',
    editLookId: 'edit_cm_003_adventure',
    videoPrompt: 'Exciting mountain climbing adventure with safety tips and breathtaking views',
  },
  {
    id: 'cm_4',
    userId: 'user_cm_004',
    username: 'tech_insider',
    avatar: '💻',
    content: 'Latest gadget unboxing and review',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: 1567,
    comments: 234,
    remixes: 78,
    watchPercentage: 84,
    createdAt: new Date('2024-01-14T18:20:00'),
    updatedAt: new Date('2024-01-14T18:20:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['tech', 'review'],
    status: 'approved',
    jobId: 'job_cm_004_gadget_review',
    editLookId: 'edit_cm_004_tech_modern',
    videoPrompt: 'Professional gadget unboxing and review with clean modern aesthetic',
  },
  {
    id: 'cm_5',
    userId: 'user_cm_005',
    username: 'music_composer',
    avatar: '🎵',
    content: 'Behind the scenes music production',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 987,
    comments: 156,
    remixes: 234,
    watchPercentage: 91,
    createdAt: new Date('2024-01-14T14:10:00'),
    updatedAt: new Date('2024-01-14T14:10:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['music', 'production'],
    status: 'pending',
    jobId: 'job_cm_005_music_production',
    editLookId: 'edit_cm_005_studio_vibe',
    videoPrompt: 'Music production behind the scenes with studio equipment and creative process',
  },
  {
    id: 'cm_6',
    userId: 'user_cm_006',
    username: 'fitness_trainer',
    avatar: '💪',
    content: 'Full body workout routine for beginners',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    likes: 1234,
    comments: 98,
    remixes: 34,
    watchPercentage: 87,
    createdAt: new Date('2024-01-14T07:30:00'),
    updatedAt: new Date('2024-01-14T07:30:00'),
    isBoosted: false,
    isBlocked: true,
    tags: ['fitness', 'beginner'],
    status: 'blocked',
    jobId: 'job_cm_006_fitness_routine',
    editLookId: 'edit_cm_006_energetic',
    videoPrompt: 'High-energy beginner fitness routine with clear instructions and motivation',
  },
  {
    id: 'cm_7',
    userId: 'user_cm_007',
    username: 'travel_vlogger',
    avatar: '✈️',
    content: 'Hidden gems in European cities',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 2156,
    comments: 312,
    remixes: 89,
    watchPercentage: 93,
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['travel', 'europe'],
    status: 'approved',
    jobId: 'job_cm_007_europe_travel',
    editLookId: 'edit_cm_007_wanderlust',
    videoPrompt: 'Inspiring European travel vlog showcasing hidden gems and local culture',
  },
  {
    id: 'cm_8',
    userId: 'user_cm_008',
    username: 'pet_lover',
    avatar: '🐕',
    content: 'Training your puppy basic commands',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    likes: 1678,
    comments: 145,
    remixes: 56,
    watchPercentage: 89,
    createdAt: new Date('2024-01-14T13:20:00'),
    updatedAt: new Date('2024-01-14T13:20:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['pets', 'training'],
    status: 'pending',
    jobId: 'job_cm_008_puppy_training',
    editLookId: 'edit_cm_008_cute_pets',
    videoPrompt: 'Adorable puppy training session with helpful tips and cute moments',
  },
  {
    id: 'cm_9',
    userId: 'user_cm_009',
    username: 'photography_pro',
    avatar: '📷',
    content: 'Portrait photography lighting techniques',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 1345,
    comments: 234,
    remixes: 67,
    watchPercentage: 86,
    createdAt: new Date('2024-01-14T11:15:00'),
    updatedAt: new Date('2024-01-14T11:15:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['photography', 'tutorial'],
    status: 'approved',
    jobId: 'job_cm_009_portrait_lighting',
    editLookId: 'edit_cm_009_professional',
    videoPrompt: 'Professional portrait photography tutorial with lighting setup and techniques',
  },
  {
    id: 'cm_10',
    userId: 'user_cm_010',
    username: 'garden_guru',
    avatar: '🌻',
    content: 'Growing vegetables in small spaces',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    likes: 876,
    comments: 123,
    remixes: 45,
    watchPercentage: 92,
    createdAt: new Date('2024-01-14T09:30:00'),
    updatedAt: new Date('2024-01-14T09:30:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['gardening', 'vegetables'],
    status: 'pending',
    jobId: 'job_cm_010_small_garden',
    editLookId: 'edit_cm_010_green_thumb',
    videoPrompt: 'Practical small space gardening guide with vegetable growing tips',
  },
  {
    id: 'cm_11',
    userId: 'user_cm_011',
    username: 'makeup_artist',
    avatar: '💄',
    content: 'Natural everyday makeup tutorial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    likes: 2234,
    comments: 345,
    remixes: 123,
    watchPercentage: 94,
    createdAt: new Date('2024-01-14T08:15:00'),
    updatedAt: new Date('2024-01-14T08:15:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['beauty', 'makeup'],
    status: 'approved',
    jobId: 'job_cm_011_natural_makeup',
    editLookId: 'edit_cm_011_beauty_glow',
    videoPrompt: 'Natural makeup tutorial with step-by-step instructions and beauty tips',
  },
  {
    id: 'cm_12',
    userId: 'user_cm_012',
    username: 'car_enthusiast',
    avatar: '🚗',
    content: 'Classic car restoration process',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1567,
    comments: 187,
    remixes: 78,
    watchPercentage: 88,
    createdAt: new Date('2024-01-13T20:45:00'),
    updatedAt: new Date('2024-01-13T20:45:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['cars', 'restoration'],
    status: 'pending',
    jobId: 'job_cm_012_car_restoration',
    editLookId: 'edit_cm_012_vintage_auto',
    videoPrompt: 'Classic car restoration showcase with detailed process and vintage aesthetics',
  },
  {
    id: 'cm_13',
    userId: 'user_cm_013',
    username: 'study_helper',
    avatar: '📚',
    content: 'Effective study techniques for students',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 1089,
    comments: 156,
    remixes: 67,
    watchPercentage: 85,
    createdAt: new Date('2024-01-13T19:30:00'),
    updatedAt: new Date('2024-01-13T19:30:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['education', 'study'],
    status: 'approved',
    jobId: 'job_cm_013_study_tips',
    editLookId: 'edit_cm_013_academic',
    videoPrompt: 'Educational study tips video with organized presentation and helpful techniques',
  },
  {
    id: 'cm_14',
    userId: 'user_cm_014',
    username: 'craft_creator',
    avatar: '✂️',
    content: 'DIY home decoration ideas',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 1456,
    comments: 198,
    remixes: 89,
    watchPercentage: 91,
    createdAt: new Date('2024-01-13T17:20:00'),
    updatedAt: new Date('2024-01-13T17:20:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['diy', 'crafts'],
    status: 'pending',
    jobId: 'job_cm_014_diy_decor',
    editLookId: 'edit_cm_014_crafty',
    videoPrompt: 'Creative DIY home decoration tutorial with step-by-step crafting instructions',
  },
  {
    id: 'cm_15',
    userId: 'user_cm_015',
    username: 'language_tutor',
    avatar: '🗣️',
    content: 'French pronunciation for beginners',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    likes: 987,
    comments: 123,
    remixes: 45,
    watchPercentage: 87,
    createdAt: new Date('2024-01-13T16:10:00'),
    updatedAt: new Date('2024-01-13T16:10:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['language', 'french'],
    status: 'approved',
    jobId: 'job_cm_015_french_pronunciation',
    editLookId: 'edit_cm_015_educational',
    videoPrompt: 'French pronunciation tutorial with clear audio and educational formatting',
  },
  {
    id: 'cm_16',
    userId: 'user_cm_016',
    username: 'meditation_guide',
    avatar: '🧘‍♀️',
    content: 'Mindfulness meditation for beginners',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    likes: 1789,
    comments: 234,
    remixes: 56,
    watchPercentage: 96,
    createdAt: new Date('2024-01-13T15:45:00'),
    updatedAt: new Date('2024-01-13T15:45:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['meditation', 'wellness'],
    status: 'approved',
    jobId: 'job_cm_016_mindfulness',
    editLookId: 'edit_cm_016_peaceful',
    videoPrompt: 'Calming mindfulness meditation guide with peaceful atmosphere and soothing visuals',
  },
  {
    id: 'cm_17',
    userId: 'user_cm_017',
    username: 'game_streamer',
    avatar: '🎮',
    content: 'Epic gaming moments compilation',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    likes: 2567,
    comments: 445,
    remixes: 234,
    watchPercentage: 92,
    createdAt: new Date('2024-01-13T14:30:00'),
    updatedAt: new Date('2024-01-13T14:30:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['gaming', 'highlights'],
    status: 'pending',
    jobId: 'job_cm_017_gaming_highlights',
    editLookId: 'edit_cm_017_epic_gaming',
    videoPrompt: 'Exciting gaming highlights compilation with dynamic editing and epic moments',
  },
  {
    id: 'cm_18',
    userId: 'user_cm_018',
    username: 'economics_teacher',
    avatar: '📊',
    content: 'Basic economics explained simply',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    likes: 1234,
    comments: 167,
    remixes: 78,
    watchPercentage: 83,
    createdAt: new Date('2024-01-13T13:15:00'),
    updatedAt: new Date('2024-01-13T13:15:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['education', 'economics'],
    status: 'approved',
    jobId: 'job_cm_018_basic_economics',
    editLookId: 'edit_cm_018_academic',
    videoPrompt: 'Clear economics education video with simple explanations and visual aids',
  },
  {
    id: 'cm_19',
    userId: 'user_cm_019',
    username: 'mental_health_advocate',
    avatar: '🧠',
    content: 'Self-care tips for busy professionals',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    likes: 1876,
    comments: 234,
    remixes: 89,
    watchPercentage: 94,
    createdAt: new Date('2024-01-13T12:00:00'),
    updatedAt: new Date('2024-01-13T12:00:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['wellness', 'self-care'],
    status: 'approved',
    jobId: 'job_cm_019_self_care',
    editLookId: 'edit_cm_019_wellness',
    videoPrompt: 'Self-care guide for professionals with practical tips and calming presentation',
  },
  {
    id: 'cm_20',
    userId: 'user_cm_020',
    username: 'astronomy_lover',
    avatar: '🌟',
    content: 'Stargazing guide for beginners',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 1567,
    comments: 189,
    remixes: 67,
    watchPercentage: 90,
    createdAt: new Date('2024-01-13T10:45:00'),
    updatedAt: new Date('2024-01-13T10:45:00'),
    isBoosted: false,
    isBlocked: false,
    tags: ['astronomy', 'stargazing'],
    status: 'pending',
    jobId: 'job_cm_020_stargazing',
    editLookId: 'edit_cm_020_cosmic',
    videoPrompt: 'Stargazing tutorial with beautiful night sky visuals and beginner-friendly guidance',
  }
]

// 视频卡片组件 - 与Testing Feeds UI一致但没有排名
interface VideoCardProps {
  post: Post
  onSelectPost: (post: Post) => void
  onAction: (postId: string, action: 'boost_good' | 'boost_feature' | 'approve' | 'block') => void
}

const VideoCard: React.FC<VideoCardProps> = ({ post, onSelectPost, onAction }) => {
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

  // 状态徽章 - 与Testing Feeds一致
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
                          {post.boostType === 'feature' ? '⭐ Featured' : '👍 Good'}
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
        
        {/* 状态徽章 - 左上角 */}
        <div className="absolute top-2 left-2">
          {getStatusBadge(post)}
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
      
      {/* Content Info - 与Testing Feeds完全一致 */}
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

        {/* Action Buttons - 与Testing Feeds完全一致 */}
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
              onClick={() => onAction(post.id, 'boost_good')}
            >
              👍 Good
            </button>
            <button
              className="px-2 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs rounded transition-colors"
              title="Boost Feature"
              onClick={() => onAction(post.id, 'boost_feature')}
            >
              ⭐ Feature
            </button>
            <button
              className="px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs rounded transition-colors"
              title="Approve"
              onClick={() => onAction(post.id, 'approve')}
            >
              ✓ Approve
            </button>
            <button
              className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs rounded transition-colors"
              title="Block"
              onClick={() => onAction(post.id, 'block')}
            >
              🚫 Block
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContentManagement() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [searchType, setSearchType] = useState<string>('username')
  const [searchValue, setSearchValue] = useState('')
  const [activeSearchValue, setActiveSearchValue] = useState('')
  const [activeSearchType, setActiveSearchType] = useState<string>('username')
  const [filterContentType, setFilterContentType] = useState<string>('waiting_for_review')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [minLikes, setMinLikes] = useState('')
  const [minComments, setMinComments] = useState('')
  const [minRemixes, setMinRemixes] = useState('')
  const [sortBy, setSortBy] = useState<string>('time')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // Apply filters functionality - 将filter应用状态分离
  const [appliedFilters, setAppliedFilters] = useState({
    searchQuery: '',
    searchType: 'username' as 'username' | 'post_id' | 'audio_id' | 'edit_look_id' | 'remix_id',
    dateFrom: '',
    dateTo: '',
    minLikes: '',
    minComments: '',
    minRemixes: '',
    contentType: 'waiting_for_review'
  })

  // Date validation helper
  const isValidDate = (dateString: string) => {
    if (!dateString) return true // Empty is valid
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) return false
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const handleSearch = () => {
    setActiveSearchValue(searchValue)
    setActiveSearchType(searchType)
  }

  const handleApplyFilters = () => {
    setAppliedFilters({
      searchQuery: searchValue,
      searchType: searchType as 'username' | 'post_id' | 'audio_id' | 'edit_look_id' | 'remix_id',
      dateFrom,
      dateTo,
      minLikes,
      minComments,
      minRemixes,
      contentType: appliedFilters.contentType // Keep current contentType, don't update it
    })
    alert('🔄 Filters applied successfully!')
  }

  const filteredAndSortedPosts = posts
    .filter(post => {
      // Search functionality using applied filters
      const matchesSearch = !appliedFilters.searchQuery || (() => {
        const searchTerm = appliedFilters.searchQuery.toLowerCase()
        const searchIds = searchTerm.split(',').map(id => id.trim()).filter(id => id.length > 0)
        
        switch (appliedFilters.searchType) {
          case 'username':
            return post.username.toLowerCase().includes(searchTerm)
          case 'post_id':
            return searchIds.some(id => post.id.toLowerCase().includes(id))
          case 'audio_id':
            return searchIds.some(id => post.id.toLowerCase().includes(id)) // Mock for now
          case 'edit_look_id':
            return searchIds.some(id => post.editLookId.toLowerCase().includes(id))
          case 'remix_id':
            return searchIds.some(id => post.id.toLowerCase().includes(id)) // Mock for now
          default:
            return true
        }
      })()

      // Content type filtering - instant effect (not using applied filters)
      const matchesContentType = (() => {
        switch (filterContentType) {
          case 'feature':
            return post.isBoosted && post.boostType === 'feature'
          case 'good':
            return post.isBoosted && post.boostType === 'good'
          case 'approved':
            return post.status === 'approved' && !post.isBoosted
          case 'none_approved':
            return post.status === 'pending' && !post.isBoosted
          case 'waiting_for_review':
            return post.status === 'pending'
          default:
            return true
        }
      })()

      // Date range filtering using applied filters
      const matchesDateRange = (() => {
        const postDate = post.boostedAt || post.createdAt
        
        // Validate and parse date inputs (YYYY-MM-DD format)
        if (appliedFilters.dateFrom) {
          const dateFromMatch = appliedFilters.dateFrom.match(/^(\d{4})-(\d{2})-(\d{2})$/)
          if (dateFromMatch) {
            const fromDate = new Date(appliedFilters.dateFrom)
            if (!isNaN(fromDate.getTime()) && fromDate > postDate) return false
          }
        }
        
        if (appliedFilters.dateTo) {
          const dateToMatch = appliedFilters.dateTo.match(/^(\d{4})-(\d{2})-(\d{2})$/)
          if (dateToMatch) {
            const toDate = new Date(appliedFilters.dateTo + 'T23:59:59') // End of day
            if (!isNaN(toDate.getTime()) && toDate < postDate) return false
          }
        }
        
        return true
      })()

      // Metrics filtering using applied filters
      const matchesLikes = !appliedFilters.minLikes || post.likes >= parseInt(appliedFilters.minLikes)
      const matchesComments = !appliedFilters.minComments || post.comments >= parseInt(appliedFilters.minComments)
      const matchesRemixes = !appliedFilters.minRemixes || post.remixes >= parseInt(appliedFilters.minRemixes)

      return matchesSearch && matchesContentType && matchesDateRange && matchesLikes && matchesComments && matchesRemixes
    })
    .sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'time':
          // Sort by moderation time (boostedAt) if available, otherwise by post time (createdAt)
          aValue = (a.boostedAt || a.createdAt).getTime()
          bValue = (b.boostedAt || b.createdAt).getTime()
          break
        case 'likes':
          aValue = a.likes
          bValue = b.likes
          break
        case 'comments':
          aValue = a.comments
          bValue = b.comments
          break
        case 'remixes':
          aValue = a.remixes
          bValue = b.remixes
          break
        default:
          aValue = (a.boostedAt || a.createdAt).getTime()
          bValue = (b.boostedAt || b.createdAt).getTime()
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

  const handleAction = (postId: string, action: 'boost_good' | 'boost_feature' | 'approve' | 'block') => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const now = new Date()
        switch (action) {
          case 'boost_good':
            return {
              ...post,
              isBoosted: true,
              boostType: 'good',
              boostedAt: now,
              boostExpiry: new Date(now.getTime() + 48 * 60 * 60 * 1000),
              status: 'approved' as const, // Boost implies approval but shows in boost category
              isBlocked: false
            }
          case 'boost_feature':
            return {
              ...post,
              isBoosted: true,
              boostType: 'feature',
              boostedAt: now,
              boostExpiry: new Date(now.getTime() + 48 * 60 * 60 * 1000),
              status: 'approved' as const, // Boost implies approval but shows in boost category
              isBlocked: false
            }
          case 'approve':
            return { 
              ...post, 
              status: 'approved' as const,
              isBlocked: false,
              // Clear boost status when manually approving
              isBoosted: false,
              boostType: undefined,
              boostedAt: undefined,
              boostExpiry: undefined
            }
          case 'block':
            return { 
              ...post, 
              status: 'blocked' as const,
              isBlocked: true,
              // Clear boost status when blocking
              isBoosted: false,
              boostType: undefined,
              boostedAt: undefined,
              boostExpiry: undefined
            }
          default:
            return post
        }
      }
      return post
    }))
  }

  const getStatusBadge = (post: Post) => {
    if (post.isBlocked) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          🚫 Blocked
        </span>
      )
    }
    if (post.isBoosted && post.boostType === 'feature') {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full flex items-center">
          ⭐ Featured
        </span>
      )
    }
    if (post.isBoosted && post.boostType === 'good') {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          👍 Good Boost
        </span>
      )
    }
    switch (post.status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
            ✓ Approved
          </span>
        )
      case 'blocked':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
            🚫 Blocked
          </span>
        )
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center">
            ⏳ Pending
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        
        {/* Enhanced Controls */}
        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
          {/* Clean and Modern Search */}
          <div className="flex items-stretch min-w-0 flex-1 lg:min-w-[500px]">
            <div className="flex bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-3 border-0 focus:ring-0 outline-none bg-gray-50 text-sm font-medium text-gray-700 rounded-l-lg cursor-pointer min-w-[120px]"
              >
                <option value="username">Username</option>
                <option value="post_id">Post ID</option>
                <option value="audio_id">Audio ID</option>
                <option value="edit_look_id">Edit Look ID</option>
                <option value="remix_id">Remix ID</option>
              </select>
              <input
                type="text"
                placeholder="Enter search value..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="px-4 py-3 min-w-0 flex-1 border-0 focus:ring-0 outline-none text-sm placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium border-r border-gray-300"
              >
                Search
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm font-medium rounded-r-lg"
              >
                🔄 Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Filters - Top Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date From */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="YYYY-MM-DD (e.g., 2024-01-15)"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm ${
                dateFrom && !isValidDate(dateFrom) 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary-500'
              }`}
              title="Enter date in YYYY-MM-DD format (e.g., 2024-01-15)"
            />
            {dateFrom && !isValidDate(dateFrom) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid date in YYYY-MM-DD format</p>
            )}
          </div>
          
          {/* Date To */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="YYYY-MM-DD (e.g., 2024-01-15)"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm ${
                dateTo && !isValidDate(dateTo) 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-primary-500'
              }`}
              title="Enter date in YYYY-MM-DD format (e.g., 2024-01-15)"
            />
            {dateTo && !isValidDate(dateTo) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid date in YYYY-MM-DD format</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Content Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Min Likes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Likes</label>
            <input
              type="number"
              placeholder="0"
              value={minLikes}
              onChange={(e) => setMinLikes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          
          {/* Min Comments */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Comments</label>
            <input
              type="number"
              placeholder="0"
              value={minComments}
              onChange={(e) => setMinComments(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          
          {/* Min Remixes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Remixes</label>
            <input
              type="number"
              placeholder="Min remixes"
              value={minRemixes}
              onChange={(e) => setMinRemixes(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Content Type Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Content Tag</label>
            <select
              value={filterContentType}
              onChange={(e) => setFilterContentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All Content</option>
              <option value="feature">Feature</option>
              <option value="good">Good</option>
              <option value="approved">Approved</option>
              <option value="none_approved">None Approved</option>
              <option value="waiting_for_review">Waiting for Review</option>
            </select>
          </div>
        </div>


      </div>

      {/* Content Header with Sort Control */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Content ({filteredAndSortedPosts.length})</h3>
        
        {/* Sort Control */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <span className="text-sm text-gray-600 whitespace-nowrap">Sort:</span>
          <select
            value={`${sortBy}_${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('_')
              setSortBy(field)
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="border-0 bg-transparent focus:ring-0 outline-none text-sm min-w-[120px] cursor-pointer"
          >
            <option value="time_desc">Time (Z→A)</option>
            <option value="time_asc">Time (A→Z)</option>
            <option value="likes_desc">Likes (Z→A)</option>
            <option value="likes_asc">Likes (A→Z)</option>
            <option value="comments_desc">Comments (Z→A)</option>
            <option value="comments_asc">Comments (A→Z)</option>
            <option value="remixes_desc">Remixes (Z→A)</option>
            <option value="remixes_asc">Remixes (A→Z)</option>
          </select>
        </div>
      </div>

      {/* TV Wall Grid Layout - Optimized for 9:16 videos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredAndSortedPosts.map((post: Post) => (
          <VideoCard key={post.id} post={post} onSelectPost={setSelectedPost} onAction={handleAction} />
        ))}
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
                  <div>{getStatusBadge(selectedPost)}</div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moderation Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    rows={3}
                    placeholder="Add moderation notes..."
                    defaultValue={selectedPost.moderationNotes}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(null)
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Save
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