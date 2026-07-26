// ========================================
// Language Switcher
// ========================================

let currentLang = 'en';

const translations = {
    en: {},
    cn: {}
};

// Get all elements with data attributes
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
    initMediaGalleries();
    initLightbox();
});

function initLanguageSwitcher() {
    const langEnBtn = document.getElementById('lang-en');
    const langCnBtn = document.getElementById('lang-cn');

    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langCnBtn.addEventListener('click', () => switchLanguage('cn'));
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-cn').classList.toggle('active', lang === 'cn');

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-en][data-cn]');
    elements.forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-cn');
        
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });

    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    }
});

// ========================================
// Smooth Scroll
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .publication-card, .exhibition-item, .teaching-item');
    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ========================================
// Active Navigation Link
// ========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Media Gallery
// ========================================

function initMediaGalleries() {
    const galleries = document.querySelectorAll('.project-media');
    
    galleries.forEach(gallery => {
        const mediaItems = gallery.querySelectorAll('.media-item');
        const prevBtn = gallery.querySelector('.media-prev');
        const nextBtn = gallery.querySelector('.media-next');
        const indicatorsContainer = gallery.querySelector('.media-indicators');
        
        let currentIndex = 0;
        
        // Create indicators
        mediaItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'media-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showMedia(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = gallery.querySelectorAll('.media-indicator');
        
        function showMedia(index) {
            // Pause all videos
            gallery.querySelectorAll('video').forEach(video => {
                video.pause();
            });
            
            // Update active states
            mediaItems[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            mediaItems[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
        }
        
        function nextMedia() {
            const nextIndex = (currentIndex + 1) % mediaItems.length;
            showMedia(nextIndex);
        }
        
        function prevMedia() {
            const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            showMedia(prevIndex);
        }
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevMedia();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextMedia();
        });
        
        // Auto-play slideshow (optional, pauses on hover)
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(nextMedia, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        gallery.addEventListener('mouseenter', stopAutoplay);
        gallery.addEventListener('mouseleave', startAutoplay);
        
        // Start autoplay initially
        startAutoplay();
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        });
        
        gallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextMedia();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevMedia();
            }
        }
    });
}

// ========================================
// Lightbox
// ========================================

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentGallery = null;
    let currentMediaIndex = 0;
    let allMedia = [];
    
    // Click on media to open lightbox
    document.querySelectorAll('.media-item img, .media-item video').forEach((media) => {
        media.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Get all media from this gallery
            const gallery = media.closest('.project-media');
            allMedia = Array.from(gallery.querySelectorAll('.media-item img, .media-item video'));
            currentMediaIndex = allMedia.indexOf(media);
            currentGallery = gallery;
            
            openLightbox(media);
        });
    });
    
    function openLightbox(media) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (media.tagName === 'IMG') {
            lightboxImg.src = media.src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
        } else if (media.tagName === 'VIDEO') {
            lightboxVideo.querySelector('source').src = media.querySelector('source').src;
            lightboxVideo.load();
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxVideo.pause();
    }
    
    function showNextMedia() {
        currentMediaIndex = (currentMediaIndex + 1) % allMedia.length;
        openLightbox(allMedia[currentMediaIndex]);
    }
    
    function showPrevMedia() {
        currentMediaIndex = (currentMediaIndex - 1 + allMedia.length) % allMedia.length;
        openLightbox(allMedia[currentMediaIndex]);
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextMedia);
    lightboxPrev.addEventListener('click', showPrevMedia);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevMedia();
                break;
            case 'ArrowRight':
                showNextMedia();
                break;
        }
    });
}

// ========================================
// Particle Background (Optional Enhancement)
// ========================================

function createParticles() {
    const heroBackground = document.querySelector('.hero-background');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroBackground.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Uncomment to enable particles
// createParticles();

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Print/Download Resume (Optional)
// ========================================

function printResume() {
    window.print();
}

// ========================================
// Copy Email to Clipboard
// ========================================

document.querySelectorAll('.contact-link[href^="mailto"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent.trim();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!');
            });
        }
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ========================================
// Mobile Menu (if needed in future)
// ========================================

function initMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be implemented if needed
}

// ========================================
// Theme Toggle (Optional Dark Mode)
// ========================================

function initThemeToggle() {
    // Placeholder for dark mode toggle
    // Can be implemented if needed
}

// ========================================
// Performance Optimization
// ========================================

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Analytics (Optional)
// ========================================

// Add Google Analytics or other analytics here if needed

console.log('Portfolio website loaded successfully! 🚀');
