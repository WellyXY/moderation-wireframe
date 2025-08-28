# Explore Content Management Feature Specification

## Overview

This feature adds an "Explore" content curation system to the existing moderation platform, allowing administrators to promote specific content with time-based weighting decay.

## User Story & Requirements Discussion

**Q: What does the Explore Page do?**
A: It's a manually curated content feed where moderators can handpick the best content to showcase. Think of it like a "featured" or "editor's choice" section.

**Q: How do moderators add content to Explore?**
A: On the Content Management page, there's an "Add to Explore" button for each post. Click it, and that content gets tagged for the Explore feed.

**Q: How is content ranked on the Explore Page?**
A: We use a smart ranking algorithm that considers both content quality (remix count) and freshness. New content gets a massive boost (5x) that gradually decays over 7 days, then everyone competes fairly.

**Q: What's the ranking formula?**
A: `ranking_score = LN(1 + remix_count) × 10 × time_boost`
Where time_boost starts at 5.0x for new content and decays to 1.0x after 7 days using exponential decay.

**Q: How does the Explore Page work for users?**
A: It shows all manually tagged content sorted by ranking score. Videos autoplay in the list, and it's an infinite scroll that loops back to the beginning when you reach the end.

**Q: Can moderators remove content from Explore?**
A: Yes, there's a "Remove" button on each item in the Explore Page that removes the manual tag.

## Feature Requirements

### 1. Content Management Page Enhancement

**Requirement**: Add "Add to Explore" button to existing content items in Content Management page.

**Details**:
- Button should be prominently displayed alongside existing actions
- Should be available for all content types currently managed
- Button state should reflect whether content is already in Explore
- Clicking should trigger the Explore flagging process

### 2. New Explore Page

**Requirement**: Create a dedicated Explore Page to display and manage all content flagged for Explore.

**Details**:
- Display all content currently flagged for Explore
- Show current ranking order based on weighted scores
- Provide "Remove Flag" functionality for each item
- Real-time ranking updates based on time decay

### 3. Time-Based Weight Decay System

**Requirement**: Implement automated time-based weighting system for Explore content.

**Weight Schedule**:
- **1-3 days**: 1.5x multiplier
- **3-7 days**: 1.0x multiplier  
- **7+ days**: 0.7x multiplier

**Details**:
- Weights automatically adjust based on time since content was flagged for Explore
- Original ranking score is multiplied by the appropriate time-based weight
- System should handle timezone considerations
- Weight changes should be reflected immediately in the Explore Page ranking

### 4. Ranking and Display System

**Requirement**: Implement ranking system that prioritizes Explore content while maintaining fair scoring.

**Details**:
- Base ranking score calculation remains unchanged
- Explore-flagged content receives time-based weight multiplication
- Final ranking order: Explore content (with weights) → Regular content
- Clear visual indication of Explore status in listings
- Display calculated weighted scores alongside original scores

## User Interface Requirements

### Content Management Page
- Add "Add to Explore" button with clear labeling
- Button should show current Explore status (e.g., "Added to Explore" vs "Add to Explore")
- Success feedback when content is successfully added to Explore

### Explore Page
- Tabbed interface or dedicated sidebar menu item
- List view showing all Explore content with:
  - Original content preview
  - Original ranking score
  - Time-based weight multiplier
  - Final weighted score
  - Time since added to Explore
  - "Remove Flag" action button
- Real-time updates as weights decay over time

## Technical Implementation Notes

### Data Structure
- Add `exploreFlag` boolean field to content objects
- Add `exploreFlaggedAt` timestamp field
- Calculate `weightMultiplier` dynamically based on time difference
- Store `originalScore` and calculate `weightedScore` on display

### API Endpoints
- `POST /api/content/{id}/explore` - Flag content for Explore
- `DELETE /api/content/{id}/explore` - Remove Explore flag
- `GET /api/explore` - Retrieve all Explore content with calculated weights

### Performance Considerations
- Cache calculated weights to avoid repeated calculations
- Update weights periodically rather than real-time for better performance
- Index database queries by `exploreFlag` and `exploreFlaggedAt` fields

## Success Criteria

1. Content can be successfully flagged for Explore from Content Management page
2. Explore Page displays correct ranking with time-based weights
3. Weight decay system functions according to specified schedule
4. Remove flag functionality works correctly
5. Performance remains acceptable with large content volumes
6. UI provides clear feedback and status indication

## Future Enhancements

- Customizable weight schedules
- Bulk Explore operations
- Analytics on Explore content performance
- A/B testing for different weight configurations

---

# Explore 内容管理功能规格说明

## 概述

该功能为现有的内容管理平台添加"Explore"内容策展系统，允许管理员推广特定内容并使用基于时间的权重衰减机制。

## 功能需求

### 1. 内容管理页面增强

**需求**: 在内容管理页面的现有内容项目中添加"Add to Explore"按钮。

**详细说明**:
- 按钮应与现有操作一起显著显示
- 应适用于当前管理的所有内容类型
- 按钮状态应反映内容是否已在 Explore 中
- 点击应触发 Explore 标记流程

### 2. 新增 Explore 页面

**需求**: 创建专门的 Explore 页面来显示和管理所有标记为 Explore 的内容。

**详细说明**:
- 显示所有当前标记为 Explore 的内容
- 基于加权分数显示当前排名顺序
- 为每个项目提供"移除标记"功能
- 基于时间衰减的实时排名更新

### 3. 基于时间的权重衰减系统

**需求**: 为 Explore 内容实现自动化的基于时间的权重系统。

**权重时间表**:
- **1-3天**: 1.5倍加权
- **3-7天**: 1.0倍加权  
- **7天以上**: 0.7倍加权

**详细说明**:
- 权重根据内容被标记为 Explore 后的时间自动调整
- 原始排名分数乘以相应的基于时间的权重
- 系统应处理时区考虑
- 权重变化应立即在 Explore 页面排名中反映

### 4. 排名和显示系统

**需求**: 实现优先显示 Explore 内容同时保持公平评分的排名系统。

**详细说明**:
- 基础排名分数计算保持不变
- 标记为 Explore 的内容获得基于时间的权重乘法
- 最终排名顺序：Explore 内容（带权重）→ 常规内容
- 在列表中清楚地视觉指示 Explore 状态
- 在原始分数旁边显示计算出的加权分数

## 用户界面需求

### 内容管理页面
- 添加带有清晰标签的"Add to Explore"按钮
- 按钮应显示当前 Explore 状态（例如："Added to Explore" vs "Add to Explore"）
- 内容成功添加到 Explore 时提供成功反馈

### Explore 页面
- 选项卡界面或专用侧边栏菜单项
- 显示所有 Explore 内容的列表视图，包含：
  - 原始内容预览
  - 原始排名分数
  - 基于时间的权重乘数
  - 最终加权分数
  - 添加到 Explore 后的时间
  - "移除标记"操作按钮
- 随着权重衰减的实时更新

## 技术实现说明

### 数据结构
- 向内容对象添加 `exploreFlag` 布尔字段
- 添加 `exploreFlaggedAt` 时间戳字段
- 基于时间差动态计算 `weightMultiplier`
- 存储 `originalScore` 并在显示时计算 `weightedScore`

### API 端点
- `POST /api/content/{id}/explore` - 标记内容为 Explore
- `DELETE /api/content/{id}/explore` - 移除 Explore 标记
- `GET /api/explore` - 检索所有带有计算权重的 Explore 内容

### 性能考虑
- 缓存计算出的权重以避免重复计算
- 定期更新权重而非实时更新以获得更好的性能
- 通过 `exploreFlag` 和 `exploreFlaggedAt` 字段索引数据库查询

## 成功标准

1. 可以从内容管理页面成功标记内容为 Explore
2. Explore 页面正确显示基于时间权重的排名
3. 权重衰减系统按指定时间表运行
4. 移除标记功能正常工作
5. 在大量内容情况下性能保持可接受
6. UI 提供清晰的反馈和状态指示

## 未来增强功能

- 可自定义的权重时间表
- 批量 Explore 操作
- Explore 内容性能分析
- 不同权重配置的 A/B 测试


