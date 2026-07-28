# XU CHUYAN Portfolio

Astro 静态个人作品集网站。

## 技术栈

- Astro (static mode)
- 纯 CSS (Scoped `<style>` in `.astro` files + `src/styles/global.css`)
- 数据源: CSV (`src/data/projects-master.csv`, `src/data/publications.csv`)

## 数据架构

```
Notion DB → sync-from-notion.cjs → projects-master.csv
                                      ↓
                          src/lib/csv.ts (loadAllProjects, etc.)
                                      ↓
                          .astro 页面在 build time 读取
```

**CSV 是结构化元数据的唯一数据源**（title, year, technologies, publications 等）。**Markdown** 仅用于重点项目的长文介绍（见下）。

## Markdown 项目介绍 Workflow

为部分重点项目提供图文并茂的详情页。流程：**写 `.md` → 构建 → 页面自动生成**。

### 关键文件

| 文件 | 作用 |
|------|------|
| `src/content/config.ts` | Zod schema — 定义 markdown frontmatter 的结构 |
| `src/content/projects/{slug}.md` | 每个重点项目一个文件 |
| `src/pages/projects/[slug].astro` | 详情页模板 — 渲染 markdown + 媒体画廊 + 技术栈 |
| `src/pages/projects/index.astro` | 项目列表 — 有 `.md` 的行可点击，没有的灰色不可点击 |

### 规则

1. **只有** `src/content/projects/` 下有 `.md` 的项目才会有 `/projects/{slug}` 详情页。没有 `.md` 的项目 `getStaticPaths()` 不会生成路由，访问会 404 或重定向到 `/projects`。
2. **slug 来自文件名**（如 `hyborg-agency.md` → `/projects/hyborg-agency`），必须与 CSV 中的 slug 一致才能关联到 CSV 的结构化数据。
3. **图片引用**用绝对路径指向已有的 `public/images/projects/{slug}/` 目录：`![alt](/images/projects/{slug}/file.jpg)`。不需要复制图片文件。
4. **封面图**由 frontmatter 的 `cover` 字段指定，默认 `cover.png`。
5. **首页精选**：首页只展示 `public/images/projects/{slug}/home/` 子目录下的图片。如果没有 `home/` 目录，则 fallback 使用项目根目录下的所有图片。
5. **技术栈**从 markdown frontmatter 和 CSV 两边合并，去重（大小写不敏感）。
6. **媒体画廊**从 `public/images/projects/{slug}/` 自动读取，显示所有图片文件。markdown 正文中也可以单独引用。

### 如何新增项目介绍

在 `src/content/projects/` 下新建 `{slug}.md`：

```markdown
---
title: Project Title
titleCN: 项目中文名
year: 2025
featured: false
category: Research
domain: AI, Web
role: Creative Technologist
tagline: One-line description
cover: cover.png
technologies:
  - Unity
  - C#
  - JavaScript
demoUrl: https://store.steampowered.com/app/...
exhibition: Exhibition name and venue
awards: Best in Show — Some Festival 2025
publication: publication-id-in-csv
---

*Project Name* is ... (英文段落，1-3 句).

中文段落（对应英文，1-3 句）.

Additional English details or second paragraph.

对应的中文补充段落。

![Image description](/images/projects/{slug}/screenshot.jpg)
```

写完直接 `astro build` 或 `astro dev` 即可。

### 书写规范

**原则：用作品集 PDF 原文，不要自己编。**

- **语气**：作品集风格，描述项目本身。**不要出现"本人""我""I"等第一人称**，不要写成简历。
- **正文**：中英对照，每段都是英文一段 + 中文一段交替。不加 `##` 小节标题。每段 1-3 句。
- **图片**：穿插 1-2 张关键图即可，不用每段都配图。
- **链接**：在线演示、Steam 页面等用 `[英文标签](url)` 和 `[中文标签](url)` 分别标注。
- **强调**：项目名首次出现用 `*Italic*` 包裹。

**Frontmatter 注意**：
- `technologies` 用 YAML 多行列表格式（`- Unity`），不用 inline `[a, b]`
- 含冒号的值（如 `awards`）必须加引号
- `domain` 直接写逗号分隔，不加引号

**必须覆盖的 key-value 信息**（有则写，优先级从高到低）：
- `demoUrl` — 在线公开地址
- `technologies` — 技术关键词
- `exhibition` — 展览名称/场馆/年份
- `awards` — 获奖信息
- `publication` — 论文 ID（对应 publicaitions.csv）


**语言**：中英对照。正文段用英文优先，重要段落中英各一段。frontmatter 的 `title` 写英文，`titleCN` 写中文。`tagline` 写英文一句话描述。

### Frontmatter Schema

## 共享库

- `src/lib/csv.ts` — CSV 解析、Project 类型、normalizeProject、loadAllProjects、loadAllPublications、getProjectPublications
- `src/lib/media.ts` — getImageRatio、getMediaShape、getProjectMedia

这些库替换了之前在多个 `.astro` 文件中重复的内联 CSV 解析和图像处理代码。

## 样式约定

- 全局样式在 `src/styles/global.css`，用 `.site-page` 前缀约束到子页面
- 页面级样式用 Astro scoped `<style>` 标签
- 设计系统：Inter 字体、`--ink` (#101010)、`--muted` (#777)、`--line` (#d9d9d9)
- 所有子页面通过 `global.css` 强制统一为一致的 "canvas" 视觉

## 常用命令

```bash
npx astro dev        # 开发服务器
npx astro build      # 构建到 dist/
node sync-from-notion.cjs  # 从 Notion 同步 CSV
```

# 信息来源 SOURCE OF TRUTH

 

项目 经历库
 https://app.notion.com/p/2ef17ada815280088be8dd3de4e9141a?v=2ef17ada815280608475000c5d59bc55&source=copy_link

工作经历库[职位导向]
 https://app.notion.com/p/2ef17ada81528061a548fb1b7d9a4d70?v=2ef17ada815280cbba0f000caedfdca0&source=copy_link

论文发表信息
 https://app.notion.com/p/publications_APA-35e17ada815280f78ebdfba2c69e840c?source=copy_link
