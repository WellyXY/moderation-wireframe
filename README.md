# Content Moderation Dashboard

一个现代化的内容审核管理后台，基于Next.js 14 + React 18 + TypeScript + Tailwind CSS构建。

## 🚀 在线演示

**Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app) (部署后更新)

## ✨ 功能特性

### 📹 内容管理 (Content Management)
- **智能过滤系统**: 支持用户名、Post ID、Audio ID、Edit Look ID、Remix ID多种搜索方式
- **高级筛选**: 日期范围、点赞数、评论数、转发数等多维度筛选
- **内容标签**: All Content、Feature、Good、Approved、Waiting for Review
- **Apply/Reset过滤器**: 实时应用过滤条件，提升用户体验
- **内容标记**: 支持Good、Feature、Approve、Block四种操作
- **详情查看**: 完整的内容详情弹窗

### 🧪 测试Feeds (Testing Feeds)  
- **算法测试**: 模拟Feed推荐算法效果
- **参数调整**: 支持权重和参数实时调整（开发中）
- **排名显示**: 显示内容在算法中的排名
- **一致UI**: 与Content Management保持统一的卡片设计

### 🎥 视频体验
- **9:16竖屏比例**: 适配现代短视频格式  
- **智能播放**: 自动静音播放，悬停播放声音
- **TV墙布局**: 响应式网格布局，最佳视觉体验
- **实时指标**: 观看百分比、互动数据实时显示

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI库**: React 18 + TypeScript
- **样式方案**: Tailwind CSS
- **状态管理**: React Hooks
- **图标方案**: Emoji (轻量化)
- **视频处理**: HTML5 Video API
- **部署平台**: Vercel

## 📦 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/WellyXY/moderation.git
cd moderation

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🚀 Vercel部署

### 自动部署 (推荐)

1. **连接GitHub仓库**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project" 
   - 选择 `WellyXY/moderation` 仓库

2. **配置设置**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build` (自动检测)
   - Output Directory: `.next` (自动检测)
   - Install Command: `npm install` (自动检测)

3. **部署**
   - 点击 "Deploy" 开始自动部署
   - 部署完成后获得线上地址

### 手动部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署到Vercel
vercel --prod
```

## 📁 项目结构

```
moderation/
├── app/                    # Next.js App Router
│   ├── components/         # React组件
│   │   ├── ContentManagement.tsx    # 内容管理页面
│   │   ├── ExperimentRanking.tsx   # 测试Feeds页面  
│   │   ├── Header.tsx              # 顶部导航
│   │   └── Sidebar.tsx             # 侧边栏导航
│   ├── types/             # TypeScript类型定义
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── public/                # 静态资源
├── vercel.json           # Vercel配置
├── next.config.js        # Next.js配置
├── tailwind.config.js    # Tailwind配置
└── package.json          # 项目依赖
```

## 🎯 核心功能详解

### Apply Filters 功能
- **实时过滤**: 用户设置过滤条件后点击Apply按钮应用
- **状态管理**: 分离过滤器设置状态和应用状态
- **用户反馈**: 操作成功后显示友好提示
- **重置功能**: 一键清空所有过滤条件

### 视频播放体验
- **自动播放**: 页面加载时自动静音播放所有视频
- **交互音频**: 鼠标悬停时启用音频，离开时静音
- **性能优化**: 使用`playsInline`属性优化移动端体验

### 内容审核工作流
```
Content → Waiting for Review → [Good/Feature/Approve/Block] → Final Status
```

## 🔧 环境配置

### 开发环境
- Node.js >= 18.0.0
- npm >= 8.0.0

### 生产环境
- 自动优化构建
- CDN加速静态资源
- 服务端渲染(SSR)支持

## 📈 性能优化

- **代码分割**: 自动按路由分割代码
- **图片优化**: Next.js Image组件自动优化
- **CSS优化**: Tailwind CSS按需加载
- **构建优化**: 生产环境自动Tree Shaking

## 🤝 贡献指南

欢迎提交Issue和Pull Request来完善这个项目！

## 📄 开源协议

MIT License

---

**🎉 现在就部署到Vercel，体验现代化的内容审核管理！** 