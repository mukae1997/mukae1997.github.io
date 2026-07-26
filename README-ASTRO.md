# XU CHUYAN - Portfolio Website (Astro)

🎨 A modern, multi-page portfolio website built with Astro and indigo color theme.

## 🌟 Features

- ✨ **Multi-page Architecture** - Professional multi-page layout (not a single-page application)
- 🎨 **Indigo Color Theme** - Modern, elegant indigo color palette
- 🌐 **Bilingual Support** - Full English/Chinese language switching
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Lightning Fast** - Built with Astro for optimal performance
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🖼️ **Project Showcase** - Individual pages for each project
- 📚 **Research & Publications** - Dedicated section for academic work
- 🎓 **Experience Timeline** - Beautiful timeline layout for work history

## 📁 Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro      # Main layout with navigation & footer
├── pages/
│   ├── index.astro            # Home page
│   ├── about.astro            # About page
│   ├── contact.astro          # Contact page
│   ├── research.astro         # Research & publications
│   └── projects/
│       ├── index.astro        # Projects listing
│       └── 1001-nights.astro  # Example project detail page
├── components/                # Reusable components (add as needed)
└── styles/
    └── global.css             # Global styles with indigo theme

public/                        # Static assets (images, videos, etc.)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development Server

The development server runs at:
- **Local**: http://localhost:4321/
- **Network**: Use `--host` flag to expose

## 🎨 Color Theme

The website uses a professional indigo color palette:

- Primary: `#4f46e5` (indigo-600)
- Primary Hover: `#4338ca` (indigo-700)
- Accent: `#6366f1` (indigo-500)
- Light: `#e0e7ff` (indigo-100)

## 📄 Pages

1. **Home** (`/`) - Hero section with featured work and stats
2. **About** (`/about`) - Personal info, skills, and experience timeline
3. **Projects** (`/projects`) - Portfolio gallery with all projects
4. **Project Details** (`/projects/[slug]`) - Individual project pages
5. **Research** (`/research`) - Publications, exhibitions, and teaching
6. **Contact** (`/contact`) - Contact information and quick links

## 🛠️ Technologies Used

- **Astro** - Modern static site framework
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript** - Vanilla JS for interactions
- **Google Fonts** - Inter & JetBrains Mono

## 📦 Deployment Options

### GitHub Pages

```bash
# Build the site
npm run build

# The dist/ folder contains your static site
# Deploy dist/ to GitHub Pages
```

### Vercel / Netlify

Simply connect your GitHub repository - they auto-detect Astro projects!

### Manual Hosting

Upload the contents of `dist/` folder to any static hosting service.

## ✏️ Customization

### Adding New Projects

1. Create a new file in `src/pages/projects/your-project.astro`
2. Copy the structure from `1001-nights.astro`
3. Update content and metadata
4. Add a link in `src/pages/projects/index.astro`

### Changing Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-primary: #4f46e5;
  /* ... other colors */
}
```

### Adding Images

Place images in `public/` folder:

```html
<img src="/images/your-image.jpg" alt="Description">
```

## 📝 Content Management

All content supports bilingual text using `data-en` and `data-cn` attributes:

```html
<h1 data-en="English Text" data-cn="中文文本">English Text</h1>
```

The language toggle automatically switches between languages.

## 🔧 Configuration

Edit `astro.config.mjs` to customize:

- Site URL
- Base path
- Build options

## 📊 Performance

Astro generates static HTML with minimal JavaScript, resulting in:
- ⚡ Fast page loads
- 🎯 Perfect Lighthouse scores
- 📱 Excellent mobile performance
- ♿ Great accessibility

## 🤝 Contributing

This is a personal portfolio website. Feel free to use it as a template for your own site!

## 📧 Contact

- **Email**: xuchy25@mail2.sysu.edu.cn
- **Phone**: +86 156 9243 3173

## 📄 License

© 2026 XU CHUYAN. All rights reserved.

---

Built with ❤️ using Astro and modern web technologies.
