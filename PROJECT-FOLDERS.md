# 📁 项目文件夹命名对照表

## 当前项目文件夹结构

```
public\images\projects\
├── 1001-nights\          ← 1001 Nights 项目
├── xixi\                 ← XiXi 项目
├── hyborg-agency\        ← Hyborg Agency 项目
├── ai-nushu\             ← AI 女书项目
├── journey-immortals\    ← 寻仙记项目
└── vr-diving\            ← VR 潜水仿真项目
```

---

## 📋 项目名称 → 文件夹命名对照

| 项目全名 | 文件夹名称 | 页面路径 |
|---------|-----------|---------|
| **1001 Nights** - AI-Native Narrative Game | `1001-nights` | `/projects/1001-nights` |
| **XiXi** - AI Chatbot Virtual Character App | `xixi` | `/projects/xixi` |
| **Hyborg Agency** - Web-based AI Chatbot | `hyborg-agency` | `/projects/hyborg-agency` |
| **AI Nüshu** - Interactive Art | `ai-nushu` | `/projects/ai-nushu` |
| **Journey to Seek the Immortals** - 寻仙记 | `journey-immortals` | `/projects/journey-immortals` |
| **VR Diving Simulation** | `vr-diving` | `/projects/vr-diving` |

---

## 🎯 命名规则

### ✅ 正确的命名方式
- **全小写字母**
- **用连字符 `-` 连接单词**
- **简短且有意义**
- **与页面路径保持一致**

### 示例：
- ✅ `1001-nights`
- ✅ `ai-nushu`
- ✅ `hyborg-agency`

### ❌ 不推荐的命名：
- ❌ `1001Nights` （不要用驼峰命名）
- ❌ `1001_nights` （不要用下划线）
- ❌ `AI Nushu` （不要用空格）
- ❌ `一千零一夜` （不要用中文）

---

## 📸 如何为每个项目添加图片

### 步骤 1: 准备图片文件

为每个项目准备以下图片：

```
项目文件夹/
├── cover.jpg          # 封面图（必需）- 用于首页和列表页
├── screenshot1.jpg    # 项目截图 1（可选）
├── screenshot2.jpg    # 项目截图 2（可选）
├── screenshot3.jpg    # 项目截图 3（可选）
├── demo.mp4          # 演示视频（可选）
└── video-poster.jpg   # 视频封面（如果有视频）
```

### 步骤 2: 放置图片

#### 示例 1: 为 "1001 Nights" 添加图片

```
public\images\projects\1001-nights\
├── cover.jpg           ← 项目封面
├── screenshot1.jpg     ← 游戏截图 1
├── screenshot2.jpg     ← 游戏截图 2
└── demo.mp4           ← 演示视频
```

**在代码中使用：**
```html
<!-- 首页 -->
<img src="/images/projects/1001-nights/cover.jpg" alt="1001 Nights">

<!-- 项目详情页 -->
<img src="/images/projects/1001-nights/screenshot1.jpg" alt="Game Screenshot 1">
<img src="/images/projects/1001-nights/screenshot2.jpg" alt="Game Screenshot 2">

<!-- 视频 -->
<video controls>
  <source src="/images/projects/1001-nights/demo.mp4" type="video/mp4">
</video>
```

#### 示例 2: 为 "XiXi" 添加图片

```
public\images\projects\xixi\
├── cover.jpg           ← App 封面
├── screenshot1.jpg     ← App 截图 1
└── screenshot2.jpg     ← App 截图 2
```

**在代码中使用：**
```html
<img src="/images/projects/xixi/cover.jpg" alt="XiXi App">
```

---

## 🔄 完整的图片路径映射

| 项目 | 图片位置 | 代码中的路径 |
|------|---------|-------------|
| 1001 Nights 封面 | `public\images\projects\1001-nights\cover.jpg` | `/images/projects/1001-nights/cover.jpg` |
| XiXi 封面 | `public\images\projects\xixi\cover.jpg` | `/images/projects/xixi/cover.jpg` |
| Hyborg Agency 封面 | `public\images\projects\hyborg-agency\cover.jpg` | `/images/projects/hyborg-agency/cover.jpg` |
| AI Nüshu 封面 | `public\images\projects\ai-nushu\cover.jpg` | `/images/projects/ai-nushu/cover.jpg` |
| Journey Immortals 封面 | `public\images\projects\journey-immortals\cover.jpg` | `/images/projects/journey-immortals/cover.jpg` |
| VR Diving 封面 | `public\images\projects\vr-diving\cover.jpg` | `/images/projects/vr-diving/cover.jpg` |

---

## 📝 快速添加图片模板

### 在首页添加项目封面（`src/pages/index.astro`）

找到对应的项目卡片，替换占位符：

```html
<!-- 之前 -->
<div class="featured-image">
  <div class="placeholder-image">
    <span>🎮</span>
  </div>
</div>

<!-- 之后 -->
<div class="featured-image">
  <img 
    src="/images/projects/1001-nights/cover.jpg" 
    alt="1001 Nights - AI Narrative Game"
    loading="lazy"
    style="width: 100%; height: 100%; object-fit: cover;"
  >
</div>
```

### 在项目列表页添加封面（`src/pages/projects/index.astro`）

```html
<!-- 之前 -->
<div class="project-image">
  <div class="placeholder-image">
    <span>🎮</span>
  </div>
  <div class="project-tags">...</div>
</div>

<!-- 之后 -->
<div class="project-image">
  <img 
    src="/images/projects/1001-nights/cover.jpg" 
    alt="1001 Nights"
    loading="lazy"
    style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;"
  >
  <div class="project-tags">...</div>
</div>
```

---

## 🎨 推荐的图片规格

| 图片类型 | 推荐尺寸 | 比例 | 最大文件大小 |
|---------|---------|------|------------|
| 项目封面 (cover.jpg) | 1200 x 675 px | 16:9 | < 500 KB |
| 项目截图 | 1920 x 1080 px | 16:9 | < 1 MB |
| 个人头像 | 400 x 400 px | 1:1 | < 200 KB |
| 视频 | 1920 x 1080 px | 16:9 | < 50 MB |

---

## ⚡ 重要提示

1. **图片文件名不要有空格或特殊字符**
   - ✅ `cover.jpg`, `screenshot-1.jpg`
   - ❌ `封面图片.jpg`, `screenshot 1.jpg`

2. **图片路径在代码中必须以 `/` 开头**
   - ✅ `/images/projects/1001-nights/cover.jpg`
   - ❌ `images/projects/1001-nights/cover.jpg`

3. **修改 public 文件夹后需要重启开发服务器**
   ```bash
   # 按 Ctrl+C 停止
   # 然后重新运行
   npm run dev
   ```

4. **建议先压缩图片再上传**
   - 使用 TinyPNG: https://tinypng.com/
   - 或 Squoosh: https://squoosh.app/

---

## 🚀 现在就开始！

1. **准备 6 张项目封面图**（每个项目一张）
2. **重命名为 `cover.jpg`**
3. **分别放入对应的项目文件夹**
4. **按照上面的模板修改代码**
5. **刷新浏览器查看效果**

---

## 📞 需要帮助？

如果您想让我帮您修改某个具体页面来添加图片，随时告诉我！
