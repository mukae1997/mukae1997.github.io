# 📸 图片添加指南 / Image Guide

## 📁 文件夹结构

```
public/
└── images/
    ├── profile/              # 个人照片
    │   └── avatar.jpg
    ├── projects/             # 项目图片
    │   ├── 1001-nights/
    │   │   ├── cover.jpg
    │   │   ├── screenshot1.jpg
    │   │   ├── screenshot2.jpg
    │   │   └── demo.mp4
    │   ├── xixi/
    │   │   ├── cover.jpg
    │   │   └── ...
    │   └── hyborg-agency/
    │       └── ...
    ├── research/             # 研究相关图片
    │   └── ...
    └── background/           # 背景图片（可选）
        └── hero-bg.jpg
```

---

## 🎯 如何添加图片

### 步骤 1: 准备图片

1. **优化图片大小**
   - 项目封面：建议 1200x675px（16:9）
   - 项目详情图：建议 1920x1080px 或更大
   - 头像：建议 400x400px（正方形）
   - 格式：JPG/PNG/WebP

2. **命名规范**
   - 使用小写字母和连字符
   - ✅ 好的命名：`project-screenshot-1.jpg`
   - ❌ 不好的命名：`项目截图 1.JPG`

### 步骤 2: 放置图片

将图片复制到对应的文件夹：

```bash
# Windows 资源管理器操作：
# 1. 打开项目文件夹
# 2. 进入 public/images/ 文件夹
# 3. 选择对应的子文件夹（如 projects/1001-nights/）
# 4. 粘贴你的图片
```

---

## 💻 在代码中使用图片

### 方式 1: 在首页添加项目封面

编辑 `src/pages/index.astro`，找到对应项目卡片：

**之前（占位符）：**
```html
<div class="featured-image">
  <div class="placeholder-image">
    <span>🎮</span>
  </div>
</div>
```

**之后（使用真实图片）：**
```html
<div class="featured-image">
  <img src="/images/projects/1001-nights/cover.jpg" alt="1001 Nights Game Screenshot" loading="lazy">
</div>
```

### 方式 2: 在项目列表页添加图片

编辑 `src/pages/projects/index.astro`：

**之前：**
```html
<div class="project-image">
  <div class="placeholder-image">
    <span>🎮</span>
  </div>
  <div class="project-tags">...</div>
</div>
```

**之后：**
```html
<div class="project-image">
  <img src="/images/projects/1001-nights/cover.jpg" alt="1001 Nights" loading="lazy">
  <div class="project-tags">...</div>
</div>
```

### 方式 3: 在项目详情页添加多张图片

编辑 `src/pages/projects/1001-nights.astro`：

**单张图片：**
```html
<div class="project-main-image">
  <img src="/images/projects/1001-nights/screenshot1.jpg" alt="Game Interface" loading="lazy">
</div>
```

**图片画廊（多张图片）：**
```html
<div class="project-gallery">
  <img src="/images/projects/1001-nights/screenshot1.jpg" alt="Screenshot 1" loading="lazy">
  <img src="/images/projects/1001-nights/screenshot2.jpg" alt="Screenshot 2" loading="lazy">
  <img src="/images/projects/1001-nights/screenshot3.jpg" alt="Screenshot 3" loading="lazy">
</div>
```

### 方式 4: 添加视频

```html
<video controls poster="/images/projects/1001-nights/video-poster.jpg">
  <source src="/images/projects/1001-nights/demo.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>
```

### 方式 5: 添加个人头像（关于页面）

编辑 `src/pages/about.astro`，在页面头部添加：

```html
<div class="profile-section">
  <img src="/images/profile/avatar.jpg" alt="XU CHUYAN" class="profile-avatar">
</div>
```

添加 CSS 样式：
```css
.profile-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-primary);
  margin: 0 auto 2rem;
  display: block;
}
```

---

## 🎨 图片样式技巧

### 1. 响应式图片
```html
<img 
  src="/images/projects/project.jpg" 
  alt="Project"
  style="width: 100%; height: auto; border-radius: 1rem;"
  loading="lazy"
>
```

### 2. 带阴影的图片
```html
<img 
  src="/images/projects/project.jpg" 
  alt="Project"
  style="box-shadow: var(--shadow-xl); border-radius: 1rem;"
  loading="lazy"
>
```

### 3. 悬停放大效果
```css
.project-image img {
  transition: transform 0.3s ease;
}

.project-image img:hover {
  transform: scale(1.05);
}
```

### 4. 图片加载优化
```html
<!-- 懒加载：适合页面下方的图片 -->
<img src="/image.jpg" loading="lazy" alt="...">

<!-- 预加载：适合首屏重要图片 -->
<link rel="preload" as="image" href="/images/hero.jpg">
```

---

## 🔧 实用示例

### 完整的项目卡片（带图片）

```html
<a href="/projects/1001-nights" class="project-card reveal">
  <!-- 项目封面图 -->
  <div class="project-image">
    <img 
      src="/images/projects/1001-nights/cover.jpg" 
      alt="1001 Nights AI Narrative Game"
      loading="lazy"
      style="width: 100%; height: 100%; object-fit: cover;"
    >
    <div class="project-tags">
      <span class="tag">Unity</span>
      <span class="tag">AI/LLM</span>
    </div>
  </div>
  
  <!-- 项目信息 -->
  <div class="project-content">
    <h3>1001 Nights</h3>
    <p class="project-role">Lead Implementation Engineer</p>
    <p class="project-desc">AI-driven narrative game...</p>
  </div>
</a>
```

### 完整的图片画廊

```html
<div class="image-gallery">
  <div class="gallery-grid">
    <img src="/images/projects/1001-nights/img1.jpg" alt="Screenshot 1" loading="lazy">
    <img src="/images/projects/1001-nights/img2.jpg" alt="Screenshot 2" loading="lazy">
    <img src="/images/projects/1001-nights/img3.jpg" alt="Screenshot 3" loading="lazy">
    <img src="/images/projects/1001-nights/img4.jpg" alt="Screenshot 4" loading="lazy">
  </div>
</div>

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .gallery-grid img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .gallery-grid img:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-lg);
  }
</style>
```

---

## 📐 推荐的图片尺寸

| 用途 | 尺寸（像素） | 比例 | 格式 |
|------|-------------|------|------|
| 项目封面（首页） | 800x450 | 16:9 | JPG/WebP |
| 项目封面（列表页） | 1200x675 | 16:9 | JPG/WebP |
| 项目详情大图 | 1920x1080 | 16:9 | JPG/WebP |
| 个人头像 | 400x400 | 1:1 | JPG/PNG |
| 图标 | 200x200 | 1:1 | PNG/SVG |
| 背景图 | 1920x1080+ | 任意 | JPG/WebP |

---

## 🚀 图片优化工具

在添加图片前，建议先压缩优化：

### 在线工具（免费）
- **TinyPNG**: https://tinypng.com/ （推荐，压缩率高）
- **Squoosh**: https://squoosh.app/ （Google 出品，功能强大）
- **Compressor.io**: https://compressor.io/

### 命令行工具
```bash
# 安装 ImageMagick
# 批量压缩 JPG
magick mogrify -quality 85 -resize 1920x1080 *.jpg

# 批量转换为 WebP
magick mogrify -format webp -quality 85 *.jpg
```

---

## ❓ 常见问题

### Q1: 图片不显示怎么办？
**检查清单：**
- ✅ 图片路径是否正确（记得以 `/` 开头）
- ✅ 文件名大小写是否匹配
- ✅ 图片是否在 `public/` 文件夹中
- ✅ 开发服务器是否重启（修改 public 文件夹后需重启）

### Q2: 图片太大加载慢怎么办？
**解决方案：**
1. 使用图片压缩工具
2. 添加 `loading="lazy"` 属性
3. 使用 WebP 格式
4. 提供不同尺寸的图片

### Q3: 如何让图片在暗色模式下更好看？
```css
@media (prefers-color-scheme: dark) {
  img {
    opacity: 0.9;
    filter: brightness(0.9);
  }
}
```

### Q4: 如何添加图片点击放大功能？
可以使用现有的 lightbox 功能，或者添加一个简单的 JavaScript：

```javascript
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    window.open(img.src, '_blank');
  });
});
```

---

## 📝 完整示例：更新首页项目卡片

假设您已经将图片放在 `public/images/projects/1001-nights/cover.jpg`

**编辑 `src/pages/index.astro`：**

找到这部分代码（第58-76行左右）：
```html
<div class="featured-image">
  <div class="placeholder-image">
    <span>🎮</span>
  </div>
</div>
```

替换为：
```html
<div class="featured-image">
  <img 
    src="/images/projects/1001-nights/cover.jpg" 
    alt="1001 Nights - AI Narrative Game"
    loading="lazy"
  >
</div>
```

然后在 `<style>` 标签中添加样式：
```css
.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-image img:hover {
  transform: scale(1.05);
}
```

保存后刷新浏览器，图片就会显示了！

---

## 🎯 快速开始

1. **准备 3 个项目的封面图**，命名为 `cover.jpg`
2. **放入对应文件夹**：
   - `public/images/projects/1001-nights/cover.jpg`
   - `public/images/projects/xixi/cover.jpg`
   - `public/images/projects/hyborg-agency/cover.jpg`
3. **按照上面的示例代码更新页面**
4. **刷新浏览器查看效果**

---

需要我帮您修改某个具体页面吗？比如把某个占位符替换成真实图片？
