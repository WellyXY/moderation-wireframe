# Content Moderation Dashboard

A modern content moderation management system built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app) *(Update after deployment)*

## ✨ Features

### 📹 Content Management
- **Smart Search System**: Search by username, Post ID, Audio ID, Edit Look ID, Remix ID
- **Advanced Filtering**: Date range, like count, comment count, remix count filters
- **Content Categories**: All Content, Feature, Good, Approved, None Approved, Waiting for Review
- **Apply Filters**: Real-time filter application for improved user experience
- **Content Moderation**: Support for Good, Feature, Approve, Block actions
- **Detail View**: Comprehensive content detail popup

### 🧪 Testing Feeds
- **Algorithm Testing**: Simulate Feed recommendation algorithm effects
- **Parameter Adjustment**: Real-time weight and parameter tuning *(in development)*
- **Ranking Display**: Show content ranking in algorithm
- **Consistent UI**: Unified card design with Content Management

### 🎥 Video Experience
- **9:16 Portrait Format**: Optimized for modern short video format
- **Smart Playback**: Auto-muted playback with hover sound activation
- **TV Wall Layout**: Responsive grid layout for optimal visual experience
- **Real-time Metrics**: Live display of watch percentage and engagement data

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Icons**: Emoji (lightweight)
- **Video Processing**: HTML5 Video API
- **Deployment**: Vercel

## 📦 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/WellyXY/moderation.git
cd moderation

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build production version
npm run build

# Start production server
npm start
```

## 🚀 Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select `WellyXY/moderation` repository

2. **Configure Settings**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build` *(auto-detected)*
   - Output Directory: `.next` *(auto-detected)*
   - Install Command: `npm install` *(auto-detected)*

3. **Deploy**
   - Click "Deploy" to start automatic deployment
   - Get live URL after deployment completion

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
moderation/
├── app/                    # Next.js App Router
│   ├── components/         # React Components
│   │   ├── ContentManagement.tsx    # Content Management page
│   │   ├── ExperimentRanking.tsx   # Testing Feeds page
│   │   ├── Header.tsx              # Top navigation
│   │   └── Sidebar.tsx             # Sidebar navigation
│   ├── types/             # TypeScript type definitions
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
├── vercel.json           # Vercel configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Project dependencies
```

## 🎯 Core Features

### Apply Filters Functionality
- **Real-time Filtering**: Users set filter conditions and click Apply button to apply
- **State Management**: Separate filter setting state from applied state
- **User Feedback**: Friendly notifications after successful operations
- **Streamlined UI**: Apply button integrated into search area for better UX

### Video Playback Experience
- **Auto-play**: All videos auto-play muted on page load
- **Interactive Audio**: Audio enabled on hover, muted when leaving
- **Performance Optimized**: Uses `playsInline` attribute for mobile optimization

### Content Moderation Workflow
```
Content → Waiting for Review → [Good/Feature/Approve/Block] → Final Status
```

## 🔧 Environment Requirements

### Development Environment
- Node.js >= 18.0.0
- npm >= 8.0.0

### Production Environment
- Automatic build optimization
- CDN-accelerated static resources
- Server-side rendering (SSR) support

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component auto-optimization
- **CSS Optimization**: Tailwind CSS on-demand loading
- **Build Optimization**: Production environment automatic Tree Shaking

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project!

## 📄 License

MIT License

---

**🎉 Deploy to Vercel now and experience modern content moderation management!** 