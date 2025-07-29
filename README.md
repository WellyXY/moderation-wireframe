# Content Moderation Dashboard

A modern video content moderation and recommendation algorithm testing system built with Next.js 14 and React 18.

## Features

### Content Management
- **TV Wall Style Interface**: Optimized 9:16 aspect ratio video grid layout
- **Advanced Search**: Search by username, post ID, audio ID, edit look ID, remix ID
- **Smart Filtering**: Filter by date range, like count, comment count, remix count, content type
- **Content Moderation**: Boost (good/feature), approve, block, and label video content
- **Dynamic Sorting**: Sort by time, likes, comments, remixes (ascending/descending)

### Testing Feeds
- **Real-time Algorithm Testing**: Live parameter adjustment for recommendation algorithms
- **Video Playback**: Auto-playing videos with muted start, sound on hover
- **Parameter Control**: Adjust Following/Recent/For You weights, engagement weights, time decay
- **Content Filtering**: Same content tag filters as Content Management for consistency
- **Live Preview**: Instantly see how parameter changes affect content ranking

## Video Features

### 🎥 Auto-Playing Videos
- **Silent Auto-play**: Videos start playing automatically in muted mode
- **Hover Audio**: Sound activates when hovering over video cards
- **Real Video Content**: Uses actual video URLs for testing
- **Responsive Design**: 9:16 aspect ratio optimized for mobile content

### 🎛️ Algorithm Testing
- **Feed Weight Distribution**: Following (40%), Recent (20%), For You (40%)
- **Engagement Weights**: Customizable multipliers for likes, comments, remixes, watch time
- **Time Decay**: Configurable time-based content ranking decay
- **Boost System**: Priority scoring for featured and boosted content

## Content Categories

### Unified Content Tags (both pages)
- **All Content**: View all content regardless of status
- **Feature**: Content boosted with feature priority
- **Good**: Content boosted with good rating
- **Approved**: Content approved for general distribution
- **None Approved**: Pending content without boosts
- **Waiting for Review**: All content pending review

## Algorithm Formula
```
Score = (a×likes + b×comments + c×remixes + d×watch_%) × time_decay + boost_bonus
```

## Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Video**: HTML5 video with auto-play and hover controls
- **State Management**: React Hooks (useState, useMemo, useRef)
- **UI Components**: Custom components with emoji icons
- **Responsive Design**: Mobile-first approach with grid layouts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Page Navigation

- **📹 Content Management**: Main moderation interface
- **🧪 Testing Feeds**: Algorithm parameter testing with video playback

## Video Implementation

### Auto-Play Behavior
```typescript
// Videos start muted and auto-play
video.muted = true
video.loop = true
video.play()

// Sound activates on hover
onMouseEnter: video.muted = false
onMouseLeave: video.muted = true
```

### Video Sources
- Uses Google Cloud Storage sample videos for testing
- 6 different video samples across various content types
- Optimized for web playback with `playsInline` attribute

## Design Principles

- **Simplified Navigation**: Only essential pages for core functionality
- **Video-First Design**: Prioritizes video content consumption experience
- **Real-time Feedback**: Immediate response to algorithm parameter changes
- **Intuitive Controls**: Clear action buttons and filtering options
- **Performance Optimized**: Efficient video loading and playback

## Core Functionality

### Content Management
1. **Review Content**: Large video display with full context
2. **Apply Filters**: Date, engagement metrics, content status
3. **Moderation Actions**: Boost, approve, block decisions
4. **Search System**: Multi-type ID search with comma separation

### Testing Feeds
1. **Algorithm Tuning**: Real-time parameter adjustment
2. **Content Filtering**: Same categories as Content Management
3. **Video Playback**: Auto-play with hover audio control
4. **Ranking Preview**: Immediate visual feedback on changes

## Browser Compatibility

- **Chrome/Edge**: Full video auto-play support
- **Safari**: Requires user interaction for audio (hover still works)
- **Firefox**: Full functionality with auto-play enabled
- **Mobile**: Optimized `playsInline` for iOS/Android 