# 🚀 部署指南 / Deployment Guide

本文档提供多种部署方式，选择最适合您的方案。

---

## 方式 1: GitHub Pages（推荐 - 免费）

### 步骤：

1. **创建 GitHub 仓库**
   ```bash
   # 在项目根目录初始化 git
   git init
   git add .
   git commit -m "Initial commit: Astro portfolio"
   ```

2. **推送到 GitHub**
   ```bash
   # 创建仓库后，执行：
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **配置 GitHub Actions 自动部署**
   
   创建 `.github/workflows/deploy.yml`：
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 等待部署完成

5. **访问网站**
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 方式 2: Vercel（推荐 - 免费 + 超快）

### 优点：
- ✨ 零配置部署
- ⚡ 全球 CDN 加速
- 🔄 自动预览每个 commit
- 🆓 免费套餐足够用

### 步骤：

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 自动检测到 Astro 项目
6. 点击 "Deploy"
7. 完成！自动获得一个 `.vercel.app` 域名

### 自定义域名（可选）：
- 在 Vercel 项目设置中添加自定义域名
- 按照提示配置 DNS 记录

---

## 方式 3: Netlify（免费 + 简单）

### 步骤：

1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录
3. 点击 "Add new site" → "Import an existing project"
4. 连接 GitHub 并选择仓库
5. 构建设置（自动检测）：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy"
7. 获得 `.netlify.app` 域名

---

## 方式 4: 传统服务器（自托管）

### 适用于：拥有自己的服务器或虚拟主机

### 步骤：

1. **本地构建**
   ```bash
   npm run build
   ```

2. **上传文件**
   - 将 `dist/` 文件夹中的所有内容上传到服务器
   - 通常上传到 `public_html/` 或 `/var/www/html/`

3. **配置服务器**
   - 确保服务器支持 HTML5 路由
   - 设置 404 页面重定向到 index.html（如需要）

### Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache (.htaccess) 示例：
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 方式 5: Cloudflare Pages（免费）

### 步骤：

1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 配置构建：
   - Build command: `npm run build`
   - Build output: `dist`
4. 部署
5. 获得 `.pages.dev` 域名

---

## 🎯 推荐选择

| 场景 | 推荐方案 | 理由 |
|------|----------|------|
| 个人作品集 | **Vercel** | 最快速度，自动预览 |
| 开源项目 | **GitHub Pages** | 免费，与代码在一起 |
| 需要表单/函数 | **Netlify** | 提供额外功能 |
| 已有服务器 | **自托管** | 完全控制 |
| 需要 CDN | **Cloudflare Pages** | 全球加速 |

---

## 📊 部署后检查清单

- [ ] 网站正常访问
- [ ] 所有页面链接正常
- [ ] 图片正常加载
- [ ] 语言切换功能正常
- [ ] 移动端显示正常
- [ ] SEO meta 标签正确
- [ ] Google Analytics（如果需要）

---

## 🔧 常见问题

### Q: 如何添加自定义域名？
A: 在部署平台（Vercel/Netlify）的设置中添加域名，然后在域名 DNS 设置中添加 CNAME 记录。

### Q: 如何启用 HTTPS？
A: Vercel、Netlify、GitHub Pages 都自动提供免费 SSL 证书。

### Q: 构建失败怎么办？
A: 检查 Node.js 版本（需要 18+），确保 `package.json` 正确，查看构建日志。

### Q: 如何更新网站内容？
A: 修改代码后 push 到 GitHub，自动触发重新部署（如果配置了自动部署）。

---

## 📞 需要帮助？

如果遇到部署问题，可以：
1. 查看平台文档（Vercel/Netlify/GitHub）
2. 检查 Astro 官方文档
3. 联系我：xuchy25@mail2.sysu.edu.cn

---

**祝部署顺利！🎉**
