# XU CHUYAN - Personal Portfolio Website

A modern, bilingual (English/Chinese) portfolio website for Creative Technologist XU CHUYAN.

## 🌟 Features

- 📱 Fully responsive design
- 🌐 Bilingual support (English/中文)
- 🎨 Modern UI with smooth animations
- 🚀 Optimized for performance
- 📊 Showcase of projects, publications, and experience
- 💼 Perfect for job applications

## 🛠️ Technologies Used

- HTML5
- CSS3 (with custom properties and animations)
- Vanilla JavaScript
- Google Fonts (Inter & JetBrains Mono)

## 🚀 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `<your-username>.github.io` (e.g., `xuchy25.github.io`)
3. Make it public
4. Do NOT initialize with README (we already have one)

### Step 2: Push Your Code

Open terminal/command prompt in this directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Personal portfolio website"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes, then visit `https://<your-username>.github.io`

## 📝 Customization

### Update Content

All content is in `index.html`. The bilingual content uses `data-en` and `data-cn` attributes:

```html
<h1 data-en="English Text" data-cn="中文文本">English Text</h1>
```

### Modify Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other colors */
}
```

### Add Projects

Add new project cards in the Projects section of `index.html`:

```html
<div class="project-card">
    <!-- Project content -->
</div>
```

## 📧 Contact

- Email: xuchy25@mail2.sysu.edu.cn
- Phone: +86 156 9243 3173

## 📄 License

© 2026 XU CHUYAN. All rights reserved.

---

Built with ❤️ for creative technology
