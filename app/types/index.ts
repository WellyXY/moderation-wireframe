export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  remixes: number;
  watchPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  boostedAt?: Date;
  boostExpiry?: Date;
  isBoosted: boolean;
  boostType?: 'good' | 'feature';
  isBlocked: boolean;
  tags: string[];
  status: 'pending' | 'approved' | 'blocked';
  moderationNotes?: string;
  isNewUserFriendly?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  jobId: string;
  editLookId: string;
  videoPrompt: string;
}

export interface StreamConfig {
  name: string;
  type: 'following' | 'trending' | 'for-you' | 'boosts';
  weights: {
    like: number;
    comment: number;
    remix: number;
    watch: number;
  };
  timeDecay: number;
  enabled: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  isNewUser: boolean;
  following: string[];
  watchHistory: string[];
}

export interface AlgorithmMetrics {
  totalPosts: number;
  boostedPosts: number;
  deboostedPosts: number;
  engagementRate: number;
  averageWatchTime: number;
}

export interface ModerationAction {
  id: string;
  postId: string;
  action: 'boost' | 'deboost' | 'approve' | 'reject';
  reason: string;
  moderatorId: string;
  timestamp: Date;
}

export interface LookItem {
  rank: number;
  postId: string;
  title?: string;
}

export interface SoundItem {
  rank: number;
  soundId: string;
  coverUrl?: string;
  author?: string;
  name?: string;
  durationSec?: number;
  remixCount?: number;
}

export interface SoundMeta {
  id: string;
  coverUrl: string;
  author: string;
  name: string;
  durationSec: number;
} 