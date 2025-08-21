"use client"

import React, { useMemo, useState } from 'react'
import { LookItem, SoundItem, Post, SoundMeta } from '../types'

// Mock data for posts (used by search and preview)
const mockPosts: Post[] = [
  {
    id: 'cm_1', userId: 'user_cm_001', username: 'creative_artist', avatar: '🎨',
    content: 'Digital art creation process timelapse',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1456, comments: 234, remixes: 89, watchPercentage: 92,
    createdAt: new Date('2024-01-15T10:30:00'), updatedAt: new Date('2024-01-15T10:30:00'),
    isBoosted: false, isBlocked: false, tags: ['art', 'digital'], status: 'approved',
    jobId: 'job_cm_001_digital_art', editLookId: 'edit_cm_001_artistic', videoPrompt: '...'
  },
  {
    id: 'cm_2', userId: 'user_cm_002', username: 'cooking_master', avatar: '👨‍🍳',
    content: 'Authentic pasta making from scratch',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 2345, comments: 187, remixes: 67, watchPercentage: 88,
    createdAt: new Date('2024-01-15T09:15:00'), updatedAt: new Date('2024-01-15T09:15:00'),
    boostedAt: new Date('2024-01-15T11:00:00'), boostExpiry: new Date('2024-01-17T11:00:00'),
    isBoosted: true, boostType: 'feature', isBlocked: false, tags: ['cooking', 'italian'], status: 'approved',
    jobId: 'job_cm_002_pasta_making', editLookId: 'edit_cm_002_warm_kitchen', videoPrompt: '...'
  },
  {
    id: 'cm_3', userId: 'user_cm_003', username: 'adventure_seeker', avatar: '🧗‍♂️',
    content: 'Mountain climbing adventure tips',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 1890, comments: 145, remixes: 45, watchPercentage: 95,
    createdAt: new Date('2024-01-15T08:45:00'), updatedAt: new Date('2024-01-15T08:45:00'),
    isBoosted: true, boostType: 'good', boostedAt: new Date('2024-01-15T10:30:00'), boostExpiry: new Date('2024-01-17T10:30:00'),
    isBlocked: false, tags: ['adventure', 'outdoors'], status: 'approved',
    jobId: 'job_cm_003_mountain_climbing', editLookId: 'edit_cm_003_adventure', videoPrompt: '...'
  },
]

const mockSounds: SoundMeta[] = [
  { id: 'snd_1001', coverUrl: '', author: 'DJ Alpha', name: 'Sample Beat', durationSec: 92 },
  { id: 'snd_1002', coverUrl: '', author: 'LoFi Lab', name: 'LoFi Breeze', durationSec: 128 },
]

// Fallback assets
const FALLBACK_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const FALLBACK_COVER = 'https://picsum.photos/seed/cover/200/200'

const defaultLooks: LookItem[] = [
  { rank: 1, postId: 'cm_1', title: 'Intro to Looks' },
  { rank: 2, postId: 'cm_2', title: 'Featured Look' },
]

const defaultSounds: SoundItem[] = [
  { rank: 1, soundId: 'snd_1001', coverUrl: '', author: 'DJ Alpha', name: 'Sample Beat', durationSec: 92, remixCount: 156 },
  { rank: 2, soundId: 'snd_1002', coverUrl: '', author: 'LoFi Lab', name: 'LoFi Breeze', durationSec: 128, remixCount: 89 },
]

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<'looks' | 'sounds'>('looks')

  const [looks, setLooks] = useState<LookItem[]>(defaultLooks)
  const [sounds, setSounds] = useState<SoundItem[]>(defaultSounds)
  // Look rank edit modal
  const [lookRankEdit, setLookRankEdit] = useState<{ open: boolean; index: number | null }>({ open: false, index: null })
  const [rowEdit, setRowEdit] = useState<{ open: boolean; type: 'looks' | 'sounds'; index: number | null }>({ open: false, type: 'looks', index: null })
  
  // Add Look modal
  const [addLookModalOpen, setAddLookModalOpen] = useState(false)
  const [postSearchQuery, setPostSearchQuery] = useState('')
  
  // Add Sound modal - two step process
  const [addSoundStep, setAddSoundStep] = useState<'search' | 'form'>('search')
  const [addSoundModalOpen, setAddSoundModalOpen] = useState(false)
  const [selectedPostForSound, setSelectedPostForSound] = useState<Post | null>(null)
  const [soundSearchQuery, setSoundSearchQuery] = useState('')
  
  // Sound creation/editing state
  const [soundFormOpen, setSoundFormOpen] = useState(false)
  const [soundFormData, setSoundFormData] = useState<{
    soundId: string;
    name: string;
    author: string;
    coverFile: File | null;
    coverUrl: string;
    durationSec: number;
  }>({
    soundId: '',
    name: '',
    author: '',
    coverFile: null,
    coverUrl: '',
    durationSec: 0
  })
  const [soundFormMode, setSoundFormMode] = useState<'add' | 'edit'>('add')
  const [soundFormIndex, setSoundFormIndex] = useState<number | null>(null)

  const sortedLooks = useMemo(
    () => [...looks].sort((a, b) => a.rank - b.rank),
    [looks]
  )

  const sortedSounds = useMemo(
    () => [...sounds].sort((a, b) => a.rank - b.rank),
    [sounds]
  )

  const handleAddLook = () => {
    setPostSearchQuery('')
    setAddLookModalOpen(true)
  }

  const addLookByPostId = (postId: string) => {
    const nextRank = looks.length ? Math.max(...looks.map(l => l.rank)) + 1 : 1
    const newLook: LookItem = {
      rank: nextRank,
      postId: postId,
      title: ''
    }
    setLooks(prev => [...prev, newLook])
    setAddLookModalOpen(false)
  }

  const handleLookRerank = (index: number) => {
    setLookRankEdit({ open: true, index })
  }

  const handleLookRemove = (index: number) => {
    setLooks(prev => prev.filter((_, i) => i !== index))
  }

  const filteredPosts = mockPosts.filter(post => 
    post.id.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
    post.username.toLowerCase().includes(postSearchQuery.toLowerCase())
  )

  const filteredSoundPosts = mockPosts.filter(post => 
    post.id.toLowerCase().includes(soundSearchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(soundSearchQuery.toLowerCase()) ||
    post.username.toLowerCase().includes(soundSearchQuery.toLowerCase())
  )

  const handleAddSound = () => {
    setAddSoundStep('search')
    setSoundSearchQuery('')
    setSelectedPostForSound(null)
    setAddSoundModalOpen(true)
  }

  const proceedToSoundForm = (post: Post) => {
    setSelectedPostForSound(post)
    // Auto-detect duration from video (mock: 60-180 seconds)
    const autoDuration = Math.floor(Math.random() * 120) + 60
    setSoundFormData({
      soundId: `snd_${post.id}_${Date.now()}`,
      name: '',
      author: post.username,
      coverFile: null,
      coverUrl: '',
      durationSec: autoDuration
    })
    setAddSoundStep('form')
  }

  const handleSoundFormCancel = () => {
    if (addSoundStep === 'form') {
      setAddSoundStep('search')
    } else {
      setAddSoundModalOpen(false)
    }
  }

  // Look update function moved to direct state updates

  const handleUpdateSound = (index: number, field: keyof SoundItem, value: string | number) => {
    setSounds(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  // Look remove function moved to handleLookRemove

  const handleRemoveSound = (index: number) => {
    setSounds(prev => prev.filter((_, i) => i !== index))
  }

  // Simplified add functions without search

  const handleSoundFormSubmit = () => {
    if (soundFormMode === 'add') {
      if (!soundFormData.name.trim()) {
        alert('Please enter Sound Name')
        return
      }
      if (!soundFormData.coverUrl) {
        alert('Please upload a cover image')
        return
      }
      
      const nextRank = sounds.length ? Math.max(...sounds.map(s => s.rank)) + 1 : 1
      const newSound: SoundItem = {
        rank: nextRank,
        soundId: soundFormData.soundId || `snd_${Date.now()}`,
        name: soundFormData.name,
        author: soundFormData.author,
        coverUrl: soundFormData.coverUrl,
        durationSec: soundFormData.durationSec,
        remixCount: Math.floor(Math.random() * 200) + 10 // Random remix count 10-210
      }
      setSounds(prev => [...prev, newSound])
      setAddSoundModalOpen(false)
    } else if (soundFormMode === 'edit' && soundFormIndex !== null) {
      setSounds(prev => prev.map((s, i) => 
        i === soundFormIndex 
          ? {
              ...s,
              name: soundFormData.name,
              coverUrl: soundFormData.coverUrl || s.coverUrl
            }
          : s
      ))
    }
    setSoundFormOpen(false)
  }

  const handleEditSound = (index: number) => {
    const sound = sounds[index]
    setSoundFormData({
      soundId: sound.soundId,
      name: sound.name || '',
      author: sound.author || '',
      coverFile: null,
      coverUrl: sound.coverUrl || '',
      durationSec: sound.durationSec || 0
    })
    setSoundFormMode('edit')
    setSoundFormIndex(index)
    setSoundFormOpen(true)
  }

  const handleSoundRerank = (index: number) => {
    setRowEdit({ open: true, type: 'sounds', index })
  }

  const handleSoundRemove = (index: number) => {
    setSounds(prev => prev.filter((_, i) => i !== index))
  }

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSoundFormData(prev => ({
        ...prev,
        coverFile: file,
        coverUrl: url
      }))
    }
  }

  // Removed modal selection functions

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Page</h2>
        <p className="text-gray-600">Configure content ranking for Popular Looks and Popular Sounds in the app Discover page</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center border-b border-gray-200 px-4">
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'looks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('looks')}
          >
            Popular Looks
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'sounds' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('sounds')}
          >
            Popular Sounds
          </button>
        </div>

        {activeTab === 'looks' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Looks Configuration</h3>
              <button onClick={handleAddLook} className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Look</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs">
                <thead>
                  <tr>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Rank</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Video</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Post ID</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Look ID</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Author</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Video ID</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Remix Count</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLooks.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-200 px-2 py-1 text-gray-800 font-medium">{item.rank}</td>
                      <td className="border border-gray-200 px-2 py-1">
                        {(() => {
                          const p = mockPosts.find(mp => mp.id === item.postId)
                          const url = p?.videoUrl || FALLBACK_VIDEO
                          return <video src={url} className="w-24 h-36 object-cover rounded bg-gray-900" muted playsInline loop autoPlay />
                        })()}
                      </td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-800">{item.postId}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{mockPosts.find(p => p.id === item.postId)?.editLookId || '-'}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{mockPosts.find(p => p.id === item.postId)?.username || '-'}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{mockPosts.find(p => p.id === item.postId)?.jobId || '-'}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700 font-medium">{mockPosts.find(p => p.id === item.postId)?.remixes || 0}</td>
                      <td className="border border-gray-200 px-2 py-1 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleLookRerank(looks.findIndex(l => l === item))} 
                            className="px-2 py-1 text-xs bg-blue-100 border border-blue-300 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Rerank
                          </button>
                          <button 
                            onClick={() => handleLookRemove(looks.findIndex(l => l === item))} 
                            className="px-2 py-1 text-xs bg-red-100 border border-red-300 text-red-700 rounded hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sounds' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sounds Configuration</h3>
              <button onClick={handleAddSound} className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Sound</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-xs">
                <thead>
                  <tr>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Rank</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Cover</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Sound ID</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Name</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Author</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Duration</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Remix Count</th>
                    <th className="border border-gray-200 px-2 py-1 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSounds.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-200 px-2 py-1 text-gray-800 font-medium">{item.rank}</td>
                      <td className="border border-gray-200 px-2 py-1">
                        {(() => {
                          const url = item.coverUrl || mockSounds.find(ms => ms.id === item.soundId)?.coverUrl || FALLBACK_COVER
                          return <img src={url} alt={item.name || 'cover'} className="w-20 h-20 rounded object-cover" />
                        })()}
                      </td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-800">{item.soundId}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{item.name || mockSounds.find(s => s.id === item.soundId)?.name || '-'}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{item.author || mockSounds.find(s => s.id === item.soundId)?.author || '-'}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700">{(() => { const d = item.durationSec || mockSounds.find(s => s.id === item.soundId)?.durationSec; return d ? `${Math.floor(d/60)}:${String(Math.floor(d%60)).padStart(2,'0')}` : '-' })()}</td>
                      <td className="border border-gray-200 px-2 py-1 text-gray-700 font-medium">{item.remixCount || 0}</td>
                      <td className="border border-gray-200 px-2 py-1 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleSoundRerank(sounds.findIndex(s => s === item))} 
                            className="px-2 py-1 text-xs bg-blue-100 border border-blue-300 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Rerank
                          </button>
                          <button 
                            onClick={() => handleEditSound(sounds.findIndex(s => s === item))} 
                            className="px-2 py-1 text-xs bg-green-100 border border-green-300 text-green-700 rounded hover:bg-green-200"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleSoundRemove(sounds.findIndex(s => s === item))} 
                            className="px-2 py-1 text-xs bg-red-100 border border-red-300 text-red-700 rounded hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Sound Modal */}
      {addSoundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">
                {addSoundStep === 'search' ? 'Select Post for Sound' : 'Add Sound Details'}
              </h3>
              <button onClick={() => setAddSoundModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            
            {addSoundStep === 'search' && (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter Post ID, content, or username to search..."
                    value={soundSearchQuery}
                    onChange={(e) => setSoundSearchQuery(e.target.value)}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredSoundPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <video 
                            src={post.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
                            className="w-16 h-24 object-cover rounded bg-gray-900" 
                            muted 
                            playsInline 
                            loop 
                            autoPlay 
                          />
                          <div>
                            <div className="font-medium text-sm">{post.id}</div>
                            <div className="text-gray-600 text-xs">{post.username}</div>
                            <div className="text-gray-500 text-xs truncate max-w-xs">{post.content}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => proceedToSoundForm(post)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                    {filteredSoundPosts.length === 0 && soundSearchQuery && (
                      <div className="text-center py-8 text-gray-500">
                        No posts found matching "{soundSearchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {addSoundStep === 'form' && selectedPostForSound && (
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <video 
                    src={selectedPostForSound.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
                    className="w-16 h-24 object-cover rounded bg-gray-900" 
                    muted 
                    playsInline 
                    loop 
                    autoPlay 
                  />
                  <div>
                    <div className="font-medium text-sm">Selected Post: {selectedPostForSound.id}</div>
                    <div className="text-gray-600 text-xs">by {selectedPostForSound.username}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sound Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter sound name"
                    value={soundFormData.name}
                    onChange={(e) => setSoundFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverFileChange}
                          className="sr-only"
                        />
                        Choose File
                      </label>
                      <span className="text-sm text-gray-500">
                        {soundFormData.coverFile ? soundFormData.coverFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>
                  {soundFormData.coverUrl && (
                    <div className="mt-2">
                      <img src={soundFormData.coverUrl} alt="Cover preview" className="w-20 h-20 rounded object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
                  <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-600">
                    {soundFormData.durationSec || 'Auto-detected from video'}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleSoundFormCancel}
                    className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSoundFormSubmit}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Sound
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Look Modal */}
      {addLookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Add Look by Post ID</h3>
              <button onClick={() => setAddLookModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter Post ID, content, or username to search..."
                  value={postSearchQuery}
                  onChange={(e) => setPostSearchQuery(e.target.value)}
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <video 
                          src={post.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
                          className="w-16 h-24 object-cover rounded bg-gray-900" 
                          muted 
                          playsInline 
                          loop 
                          autoPlay 
                        />
                        <div>
                          <div className="font-medium text-sm">{post.id}</div>
                          <div className="text-gray-600 text-xs">{post.username}</div>
                          <div className="text-gray-500 text-xs truncate max-w-xs">{post.content}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addLookByPostId(post.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                  {filteredPosts.length === 0 && postSearchQuery && (
                    <div className="text-center py-8 text-gray-500">
                      No posts found matching "{postSearchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Look Rank Edit Modal */}
      {lookRankEdit.open && lookRankEdit.index !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Edit Look Rank</h3>
              <button onClick={() => setLookRankEdit({ open: false, index: null })} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={looks[lookRankEdit.index].rank}
                  onChange={(e) => {
                    const newRank = Number(e.target.value) || 0
                    setLooks(prev => prev.map((l, i) => 
                      i === lookRankEdit.index ? { ...l, rank: newRank } : l
                    ))
                  }}
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setLookRankEdit({ open: false, index: null })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sound Rank Edit Modal */}
      {rowEdit.open && rowEdit.index !== null && rowEdit.type === 'sounds' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Edit Sound Rank</h3>
              <button onClick={() => setRowEdit({ open: false, type: rowEdit.type, index: null })} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={sounds[rowEdit.index].rank}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0
                    handleUpdateSound(rowEdit.index!, 'rank', v)
                  }}
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setRowEdit({ open: false, type: rowEdit.type, index: null })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sound Edit Modal (Cover & Name only) */}
      {soundFormOpen && soundFormMode === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="font-semibold">Edit Sound</h3>
              <button onClick={() => setSoundFormOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sound Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={soundFormData.name}
                  onChange={(e) => setSoundFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter sound name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileChange}
                        className="sr-only"
                      />
                      Choose File
                    </label>
                    <span className="text-sm text-gray-500">
                      {soundFormData.coverFile ? soundFormData.coverFile.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                {soundFormData.coverUrl && (
                  <div className="mt-2">
                    <img src={soundFormData.coverUrl} alt="Cover preview" className="w-20 h-20 rounded object-cover" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSoundFormOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSoundFormSubmit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}