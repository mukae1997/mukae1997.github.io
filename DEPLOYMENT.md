# GitHub Pages 部署指南 / Deployment Guide

## 中文说明

### 方法一：通过 GitHub 网页界面（推荐新手）

1. **创建 GitHub 仓库**
   - 登录 [GitHub](https://github.com)
   - 点击右上角的 "+" 号，选择 "New repository"
   - 仓库名称填写：`你的用户名.github.io`（例如：`xuchy25.github.io`）
   - 设置为 Public（公开）
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

2. **上传文件**
   - 在新创建的仓库页面，点击 "uploading an existing file"
   - 将 `index.html`、`styles.css`、`script.js`、`README.md` 等所有文件拖拽到页面
   - 在底部填写 commit 信息，例如："Initial commit"
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库的 Settings（设置）
   - 在左侧菜单找到 "Pages"
   - 在 "Source" 下选择 "main" 分支
   - 点击 "Save"
   - 等待几分钟后，访问 `https://你的用户名.github.io`

### 方法二：通过命令行（推荐有经验的用户）

在项目文件夹中打开终端/命令提示符，执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 个人作品集网站"

# 添加远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

然后按照方法一的第3步启用 GitHub Pages。

### 访问你的网站

部署成功后，你的网站将在以下地址可访问：
- `https://你的用户名.github.io`

例如：`https://xuchy25.github.io`

### 更新网站内容

当你需要更新网站内容时：

**网页界面：**
1. 在 GitHub 仓库中找到要修改的文件
2. 点击文件，然后点击铅笔图标（Edit）
3. 修改内容后，点击 "Commit changes"

**命令行：**
```bash
git add .
git commit -m "更新内容描述"
git push
```

等待几分钟，更改就会反映在网站上。

---

## English Instructions

### Method 1: Via GitHub Web Interface (Recommended for beginners)

1. **Create GitHub Repository**
   - Log in to [GitHub](https://github.com)
   - Click the "+" icon in the top right, select "New repository"
   - Repository name: `your-username.github.io` (e.g., `xuchy25.github.io`)
   - Set to Public
   - **Do NOT** check "Initialize this repository with a README"
   - Click "Create repository"

2. **Upload Files**
   - On the new repository page, click "uploading an existing file"
   - Drag and drop all files (`index.html`, `styles.css`, `script.js`, `README.md`, etc.)
   - Fill in commit message at the bottom, e.g., "Initial commit"
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Find "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait a few minutes, then visit `https://your-username.github.io`

### Method 2: Via Command Line (Recommended for experienced users)

Open terminal/command prompt in the project folder and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Personal portfolio website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow step 3 from Method 1 to enable GitHub Pages.

### Access Your Website

After successful deployment, your website will be available at:
- `https://your-username.github.io`

For example: `https://xuchy25.github.io`

### Update Website Content

When you need to update your website:

**Web Interface:**
1. Find the file to modify in your GitHub repository
2. Click the file, then click the pencil icon (Edit)
3. After making changes, click "Commit changes"

**Command Line:**
```bash
git add .
git commit -m "Description of updates"
git push
```

Wait a few minutes and the changes will be reflected on your website.

---

## 🎯 Tips / 小贴士

### Adding a Custom Domain / 添加自定义域名

If you have a custom domain:

1. Create a file named `CNAME` in the root directory
2. Add your domain (e.g., `www.yourname.com`)
3. Configure DNS settings with your domain provider

如果你有自定义域名：

1. 在根目录创建名为 `CNAME` 的文件
2. 添加你的域名（例如：`www.yourname.com`）
3. 在域名提供商处配置 DNS 设置

### Adding Google Analytics / 添加谷歌分析

Add this code before the closing `</head>` tag in `index.html`:

在 `index.html` 的 `</head>` 标签前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

### Performance Optimization / 性能优化

- Images: Compress images before uploading / 上传前压缩图片
- Consider using a CDN for fonts / 考虑使用 CDN 加载字体
- Minify CSS/JS for production / 生产环境压缩 CSS/JS

---

## 🆘 Troubleshooting / 故障排除

**Website not showing up?**
- Wait 5-10 minutes after pushing
- Check Settings > Pages to ensure it's enabled
- Make sure repository is public

**网站没有显示？**
- 推送后等待 5-10 分钟
- 检查 Settings > Pages 确保已启用
- 确保仓库是公开的

**Changes not reflecting?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check if commit was successful
- Wait a few minutes for GitHub to rebuild

**更改没有生效？**
- 清除浏览器缓存（Ctrl+F5 或 Cmd+Shift+R）
- 检查提交是否成功
- 等待几分钟让 GitHub 重新构建

---

Good luck with your portfolio! 祝你求职顺利！🚀
