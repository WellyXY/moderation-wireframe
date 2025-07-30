# Content Moderation System Specification

## Overview

A comprehensive content moderation dashboard for video content management with three main modules: Content Management, For You Feed, and Trending Feed. The system provides intuitive video content review, algorithmic feed optimization, and comprehensive content labeling capabilities.

---

## 🎥 **Page Architecture**

### Navigation Structure
- **Content Management** - Primary content moderation interface
- **For You** - Personalized content feed with algorithm tuning
- **Trending Feeds** - Trending content with specialized algorithm parameters

---

## 📋 **Content Management Page**

### **Video Display System**

#### Video Player Features
- **Auto-play**: Videos automatically start playing upon page entry
- **Audio Control**: 
  - Muted by default
  - Audio plays when mouse hovers over video
  - Visual audio indicator (🔇/🔊) in bottom-right corner
- **Aspect Ratio**: 9:16 (portrait format) for optimal mobile content viewing
- **TV Wall Layout**: Grid-based display for multiple videos simultaneously

#### Card Information Display
**Always Visible on Card:**
- User avatar (emoji-based)
- Username and User ID
- Content description
- Engagement metrics (👍 Likes, 💬 Comments, 🔄 Remixes)
- Content type badge (🚀 Boost / 📄 Normal)

### **Content Type System**

#### Available Tags
1. **All** - Display all content (default selection)
2. **Boost** - Content marked for promotion
3. **Normal** - Regular content without boost

#### Content Actions
- **Boost** (⬆️) - Promote content for increased visibility
- **Deboost** (⬇️) - Remove boost status from content
- **Smart Button Display**: Shows appropriate action based on current content state

### **Search Functionality**

#### Search Types (Dropdown Selection)
- User name
- Post ID  
- Audio ID
- Edit Look ID
- Remix ID

#### Search Features
- **Multi-ID Support**: Comma-separated ID lists (e.g., `id1,id2,id3`)
- **Search Button**: Explicit search execution
- **Real-time Results**: Instant filtering on search execution

### **Filter System**

#### Date Range Filter
- **Input Method**: Manual text input (YYYY-MM-DD format)
- **Validation**: Client-side date format validation with visual feedback
- **Range Selection**: From date and To date options

#### Engagement Filters
- **Like Count**: Set minimum number of likes
- **Comment Count**: Set minimum number of comments  
- **Remix Count**: Set minimum number of remixes

#### Filter Application
- **Content Type**: Instant filtering (no Apply button needed)
- **Search & Engagement**: Require "Apply Filters" button for execution

### **Sorting & Ranking**

#### Default Sorting
- **Primary**: Time-based (newest to oldest)
- **Time Priority**: Boost time (`boostedAt`) if available, otherwise creation time (`createdAt`)

#### Sort Options
- Time (ascending/descending)
- Like count (ascending/descending)
- Comment count (ascending/descending)
- Remix count (ascending/descending)

### **View Details Modal**

#### Information Displayed
- **Basic Info**: Content, Username, User ID
- **Status**: Current boost/normal state with visual badge
- **Technical Details**: Job ID, Post ID, Edit Look ID
- **Video Prompt**: AI generation prompt used
- **Metrics**: Likes, Comments, Remixes, Watch Rate
- **Moderation Notes**: Editable text area for review notes

---

## ✨ **For You Page**

### **Content Feed System**

#### Content Type Categories
1. **All** - Display all content types (default selection)
2. **Follow** - Content from followed users (simulated: user_001-005)
3. **For You** - Recommended content (boosted content + high engagement >1000 likes)
4. **Recent** - Content from last 24 hours

#### Smart Content Badges
- **👥 Follow** (Blue) - Content from followed users
- **✨ For You** (Orange) - Algorithmically recommended content
- **🕒 Recent** (Green) - Recently posted content

### **Algorithm Parameter Control**

#### Feed Algorithm Formula
```
Score = (a×likes + b×comments + c×remixes + d×watch%) × time_decay + (like_count > T) + boost_bonus
```

#### Adjustable Parameters
- **a (Like Weight)**: Coefficient for like count impact
- **b (Comment Weight)**: Coefficient for comment count impact  
- **c (Remix Weight)**: Coefficient for remix count impact
- **d (Watch % Weight)**: Coefficient for watch completion rate
- **Time Decay**: Time-based content degradation factor (0-1)
- **T (Like Threshold)**: Minimum likes for threshold bonus

#### Real-time Updates
- **Automatic Application**: Parameter changes immediately affect feed ordering
- **Reset Function**: One-click return to default values
- **Visual Feedback**: Live indicator showing parameter application

### **Dual View Modes**

#### Grid View (TV Wall)
- **Layout**: Responsive grid (2-6 columns based on screen size)
- **Video Size**: Optimized for quick browsing
- **Auto-play**: All videos play automatically with muted audio

#### List View (Algorithm Data Table)
- **Video Size**: Large format (w-60 h-96) for detailed viewing
- **Algorithm Transparency**: Display calculated scores and parameters
- **Data Columns**: Rank, Video, Post ID, Final Score, Engagement Rates, Decay Factor, Status

### **Content Operations**
- **Boost/Deboost**: Same functionality as Content Management
- **View Details**: Enhanced with algorithm parameter display

---

## 🔥 **Trending Feeds Page**

### **Trending Content System**

#### Content Type Categories
1. **All** - All trending content (default selection)
2. **Boost** - Boosted trending content only
3. **Normal** - Non-boosted trending content only

#### Trending Algorithm Formula
```
Score = (a×likes + b×comments + c×remixes + d×watch%) × time_decay + (like_count > T) + trending_bonus
```

#### Trending-Specific Features
- **Trending Bonus**: Dynamic bonus based on boost freshness
- **Boost Time Tracking**: Monitoring boost duration and decay
- **Enhanced Scoring**: Additional factors for viral content identification

### **Algorithm Parameter Control**

#### Same Base Parameters as For You
- All standard algorithm parameters (a, b, c, d, time_decay, T)
- **Orange Theme**: Visual distinction from For You (orange focus rings)

#### Trending-Specific Calculations
- **Trending Bonus**: `Max(1000 - (boost_hours × 10), 200)`
- **Boost Time Display**: Timestamp of when content was boosted
- **Decay Tracking**: Real-time monitoring of content freshness

### **Dual View Modes**
- **Grid View**: Identical to For You with trending-specific data
- **List View**: Trending-optimized table with boost time and trending bonus columns

---

## 🔧 **Technical Specifications**

### **Video Technology**
- **Format Support**: MP4 via Google Cloud Storage URLs
- **Playback**: HTML5 video with autoplay, loop, muted, playsInline
- **Responsive**: Adaptive sizing across different screen resolutions
- **Performance**: Optimized loading and playback for multiple simultaneous videos

### **Data Management**
- **Mock Data**: 20 entries per page with realistic engagement metrics
- **State Management**: React hooks for real-time updates
- **Type Safety**: Full TypeScript implementation with defined interfaces

### **Algorithm Implementation**
- **Real-time Calculation**: Live score computation based on current parameters
- **Mathematical Precision**: Accurate decimal handling for scoring algorithms
- **Performance Optimization**: Memoized calculations for efficiency

### **UI/UX Standards**
- **Design System**: Consistent color palette and component styling
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Loading States**: Smooth transitions and user feedback

---

## 📊 **Data Structures**

### **Post Interface**
```typescript
interface Post {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  videoUrl: string
  likes: number
  comments: number
  remixes: number
  watchPercentage: number
  createdAt: Date
  updatedAt: Date
  boostedAt?: Date
  boostExpiry?: Date
  isBoosted: boolean
  boostType?: 'feature'
  isBlocked: boolean
  status: 'pending' | 'approved' | 'blocked'
  jobId: string
  editLookId: string
  videoPrompt: string
}
```

### **Algorithm Parameters**
```typescript
interface FeedParams {
  likeWeight: number      // a coefficient
  commentWeight: number   // b coefficient  
  remixWeight: number     // c coefficient
  watchWeight: number     // d coefficient
  timeDecay: number       // time decay factor
  likeThreshold: number   // T threshold
}
```

---

## 🎯 **User Workflows**

### **Content Moderation Workflow**
1. **Entry**: Land on Content Management with "All" content displayed
2. **Review**: Browse video content with auto-play and hover audio
3. **Filter**: Apply search and filter criteria as needed
4. **Action**: Boost or Deboost content based on quality assessment
5. **Detail**: Use View Details for comprehensive content information
6. **Navigation**: Switch between content type tabs for focused review

### **Algorithm Tuning Workflow**
1. **For You Entry**: Access personalized feed optimization
2. **Parameter Adjustment**: Modify algorithm weights and thresholds
3. **Real-time Preview**: Observe immediate changes in content ranking
4. **View Mode Toggle**: Switch between Grid and List views for different perspectives
5. **Data Analysis**: Use List view to understand algorithm impact on specific content

### **Trending Analysis Workflow**  
1. **Trending Entry**: Access trending content analysis
2. **Algorithm Tuning**: Adjust trending-specific parameters
3. **Boost Analysis**: Monitor boost effectiveness and timing
4. **Performance Tracking**: Use detailed algorithm data for trend optimization

---

## 🔒 **System Requirements**

### **Performance Standards**
- **Load Time**: <2 seconds for initial page load
- **Video Playback**: Smooth auto-play with minimal buffering
- **Real-time Updates**: <100ms response time for parameter changes
- **Concurrent Videos**: Support for 20+ simultaneous video streams

### **Browser Support**
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **Video Codec**: H.264 MP4 for maximum compatibility

### **Scalability Considerations**
- **Content Volume**: Designed for thousands of videos with pagination
- **User Load**: Multi-user concurrent access support
- **Algorithm Complexity**: Efficient calculation for complex scoring algorithms
- **Real-time Features**: WebSocket capability for live updates (future enhancement)

---

## 📈 **Success Metrics**

### **Moderation Efficiency**
- **Review Speed**: Average time per content review
- **Action Accuracy**: Boost/deboost decision effectiveness  
- **Coverage Rate**: Percentage of content reviewed within target timeframe

### **Algorithm Performance**
- **Engagement Lift**: Improvement in user engagement from algorithm tuning
- **Content Distribution**: Balanced representation across content types
- **Trending Accuracy**: Prediction accuracy for viral content

### **User Experience**
- **Interface Responsiveness**: UI response time metrics
- **Feature Adoption**: Usage rates for different system features
- **Error Rates**: System reliability and error handling effectiveness 