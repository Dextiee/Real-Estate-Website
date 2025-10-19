// Photo Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const gallerySection = document.getElementById('gallery-section');
    const galleryCarousel = document.querySelector('.gallery-carousel');
    const gallerySlide = document.querySelector('.gallery-slide');
    const galleryImage = document.querySelector('.gallery-image');
    const galleryOverlay = document.querySelector('.gallery-overlay-content');
    const galleryNavPrev = document.querySelector('.gallery-prev');
    const galleryNavNext = document.querySelector('.gallery-next');
    const galleryDots = document.querySelector('.gallery-dots');
    const galleryPlayBtn = document.querySelector('.gallery-play-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let galleryPreviewPrev, galleryPreviewNext;
    let lastDirection = null;
    
    // Gallery data
    const galleryImages = [
        {
            src: 'images/pic1.webp',
            alt: 'Beautiful Modern Home',
            title: 'Modern Residence',
            subtitle: 'Contemporary Design',
            icon: '🏠',
            category: 'residential'
        },
        {
            src: 'images/pic2.webp',
            alt: 'Commercial Building',
            title: 'Office Complex',
            subtitle: 'Business District',
            icon: '🏢',
            category: 'commercial'
        },
        {
            src: 'images/pic3.webp',
            alt: 'Luxury Property',
            title: 'Luxury Estate',
            subtitle: 'Premium Living',
            icon: '✨',
            category: 'luxury'
        },
        {
            src: 'images/pic4.webp',
            alt: 'Family Home',
            title: 'Family Home',
            subtitle: 'Perfect for Families',
            icon: '👨‍👩‍👧‍👦',
            category: 'residential'
        },
        {
            src: 'images/pic5.webp',
            alt: 'Retail Space',
            title: 'Retail Space',
            subtitle: 'Prime Location',
            icon: '🛍️',
            category: 'commercial'
        },
        {
            src: 'images/pic6.webp',
            alt: 'Penthouse View',
            title: 'Penthouse',
            subtitle: 'City Views',
            icon: '🌆',
            category: 'luxury'
        },
        {
            src: 'images/pic7.webp',
            alt: 'Suburban Home',
            title: 'Suburban Home',
            subtitle: 'Peaceful Living',
            icon: '🌳',
            category: 'residential'
        }
    ];
    
    let currentImageIndex = 0;
    let isAutoPlay = true;
    let autoPlayInterval;
    let isLightboxOpen = false;
    
    // Initialize gallery
    initGallery();
    
    function initGallery() {
        // Create preview elements
        createPreviews();
        
        // Initialize carousel
        createDots();
        updateSlide();
        startAutoPlay();
        
        // Add navigation controls
        if (galleryNavPrev) {
            galleryNavPrev.addEventListener('click', () => {
                showPreviousImage();
            });
        }
        
        if (galleryNavNext) {
            galleryNavNext.addEventListener('click', () => {
                showNextImage();
            });
        }
        
        // Add play/pause button
        if (galleryPlayBtn) {
            galleryPlayBtn.addEventListener('click', toggleAutoPlay);
        }
        
        // Remove click to open lightbox - image is not clickable
        
        // Add lightbox controls
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', () => {
                showPreviousImage();
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', () => {
                showNextImage();
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Add intersection observer for animations
        initScrollAnimations();
        
        // Add touch gestures for mobile
        initTouchGestures();
    }
    
    // Create preview image elements
    function createPreviews() {
        if (!galleryCarousel) return;
        
        // Create previous preview
        galleryPreviewPrev = document.createElement('div');
        galleryPreviewPrev.className = 'gallery-preview gallery-preview-prev';
        galleryPreviewPrev.innerHTML = '<img src="" alt="Previous" />';
        galleryPreviewPrev.addEventListener('click', () => {
            showPreviousImage();
        });
        
        // Create next preview
        galleryPreviewNext = document.createElement('div');
        galleryPreviewNext.className = 'gallery-preview gallery-preview-next';
        galleryPreviewNext.innerHTML = '<img src="" alt="Next" />';
        galleryPreviewNext.addEventListener('click', () => {
            showNextImage();
        });
        
        // Insert before and after the main slide
        galleryCarousel.insertBefore(galleryPreviewPrev, gallerySlide);
        galleryCarousel.appendChild(galleryPreviewNext);
    }
    
    // Carousel functions
    function createDots() {
        if (!galleryDots) return;
        
        galleryDots.innerHTML = '';
        galleryImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            if (index === currentImageIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(index));
            galleryDots.appendChild(dot);
        });
    }
    
    function updateSlide() {
        const currentImage = galleryImages[currentImageIndex];
        if (!currentImage) return;
        
        // Create wrapper if it doesn't exist
        let wrapper = gallerySlide.querySelector('.gallery-slide-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'gallery-slide-wrapper';
            
            // Move existing content into wrapper
            while (gallerySlide.firstChild) {
                wrapper.appendChild(gallerySlide.firstChild);
            }
            gallerySlide.appendChild(wrapper);
        }
        
        // Add blur/darken transition
        if (lastDirection) {
            wrapper.classList.add('transitioning');
            
            // Update content at the midpoint of the animation (when most blurred)
            setTimeout(() => {
                // Update main slide
                const img = wrapper.querySelector('.gallery-image');
                if (img) {
                    img.src = currentImage.src;
                    img.alt = currentImage.alt;
                }
                
                // Update overlay content
                const overlay = wrapper.querySelector('.gallery-overlay-content');
                if (overlay) {
                    overlay.innerHTML = `
                        <h3 class="gallery-item-title">${currentImage.title}</h3>
                        <p class="gallery-item-subtitle">${currentImage.subtitle}</p>
                    `;
                }
            }, 200); // Midpoint of 400ms animation
            
            // Clean up animation class after completion
            setTimeout(() => {
                wrapper.classList.remove('transitioning');
            }, 400);
        } else {
            // Initial load - no animation
            const img = wrapper.querySelector('.gallery-image');
            if (img) {
                img.src = currentImage.src;
                img.alt = currentImage.alt;
            }
            
            const overlay = wrapper.querySelector('.gallery-overlay-content');
            if (overlay) {
                overlay.innerHTML = `
                    <h3 class="gallery-item-title">${currentImage.title}</h3>
                    <p class="gallery-item-subtitle">${currentImage.subtitle}</p>
                `;
            }
        }
        
        // Update preview images
        updatePreviews();
        
        // Update dots
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });
    }
    
    function updatePreviews() {
        // Get previous and next indices
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        
        // Update previous preview
        if (galleryPreviewPrev) {
            const prevImg = galleryPreviewPrev.querySelector('img');
            if (prevImg) {
                prevImg.src = galleryImages[prevIndex].src;
                prevImg.alt = galleryImages[prevIndex].alt;
            }
        }
        
        // Update next preview
        if (galleryPreviewNext) {
            const nextImg = galleryPreviewNext.querySelector('img');
            if (nextImg) {
                nextImg.src = galleryImages[nextIndex].src;
                nextImg.alt = galleryImages[nextIndex].alt;
            }
        }
    }
    
    function goToSlide(index) {
        currentImageIndex = index;
        updateSlide();
        trackGalleryEvent('slide', index);
    }
    
    function showNextImage() {
        lastDirection = 'next';
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateSlide();
        trackGalleryEvent('next', currentImageIndex);
    }
    
    function showPreviousImage() {
        lastDirection = 'prev';
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateSlide();
        trackGalleryEvent('previous', currentImageIndex);
    }
    
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        if (isAutoPlay) {
            autoPlayInterval = setInterval(showNextImage, 4000); // 4 seconds
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function toggleAutoPlay() {
        isAutoPlay = !isAutoPlay;
        if (isAutoPlay) {
            startAutoPlay();
            if (galleryPlayBtn) {
                galleryPlayBtn.textContent = 'Pause';
                galleryPlayBtn.classList.remove('paused');
            }
        } else {
            stopAutoPlay();
            if (galleryPlayBtn) {
                galleryPlayBtn.textContent = 'Play';
                galleryPlayBtn.classList.add('paused');
            }
        }
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        isLightboxOpen = true;
        stopAutoPlay(); // Pause auto-play when lightbox opens
        
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateLightboxContent();
            
            // Focus management for accessibility
            if (lightboxClose) lightboxClose.focus();
        }
        
        // Track analytics
        trackGalleryEvent('open', index);
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            isLightboxOpen = false;
            startAutoPlay(); // Resume auto-play when lightbox closes
        }
        
        // Track analytics
        trackGalleryEvent('close', currentImageIndex);
    }
    
    function updateLightboxContent() {
        const currentImage = galleryImages[currentImageIndex];
        if (!currentImage) return;
        
        if (lightboxImage) {
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;
        }
        
        if (lightboxTitle) {
            lightboxTitle.textContent = currentImage.title;
        }
        
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentImageIndex + 1} of ${galleryImages.length}`;
        }
    }
    
    
    function handleKeyboardNavigation(e) {
        if (!isLightboxOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
    
    
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Stagger animation for gallery items
                    if (entry.target.classList.contains('gallery-grid')) {
                        const items = entry.target.querySelectorAll('.gallery-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.gallery-header, .gallery-grid, .gallery-filters');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Initialize gallery items with staggered animation
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.9)';
            item.style.transition = 'all 0.4s ease';
        });
    }
    
    function initTouchGestures() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        let isGallerySwipe = false;
        
        // Touch events for gallery slide navigation (tablet and mobile)
        if (gallerySlide) {
            gallerySlide.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
                isGallerySwipe = true;
                e.preventDefault();
            });
            
            gallerySlide.addEventListener('touchmove', (e) => {
                if (!isDragging || !isGallerySwipe) return;
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
                e.preventDefault();
            });
            
            gallerySlide.addEventListener('touchend', (e) => {
                if (!isDragging || !isGallerySwipe) return;
                isDragging = false;
                isGallerySwipe = false;
                
                const diffX = startX - currentX;
                const diffY = startY - currentY;
                
                // Horizontal swipe for navigation
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        showNextImage();
                    } else {
                        showPreviousImage();
                    }
                }
                
                e.preventDefault();
            });
        }
        
        // Touch events for lightbox navigation
        if (lightbox) {
            lightbox.addEventListener('touchstart', (e) => {
                if (isGallerySwipe) return;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
            });
            
            lightbox.addEventListener('touchmove', (e) => {
                if (!isDragging || isGallerySwipe) return;
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            });
            
            lightbox.addEventListener('touchend', () => {
                if (!isDragging || isGallerySwipe) return;
                isDragging = false;
                
                const diffX = startX - currentX;
                const diffY = startY - currentY;
                
                // Horizontal swipe for navigation
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        showNextImage();
                    } else {
                        showPreviousImage();
                    }
                }
                
                // Vertical swipe down to close
                if (diffY > 100 && Math.abs(diffX) < 50) {
                    closeLightbox();
                }
            });
        }
    }
    
    // Lazy loading for images
    function initLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('.gallery-image[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Preload next/previous images for better performance
    function preloadAdjacentImages() {
        if (!isLightboxOpen) return;
        
        const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        const nextIndex = (currentImageIndex + 1) % filteredImages.length;
        
        const prevImg = filteredImages[prevIndex]?.querySelector('.gallery-image');
        const nextImg = filteredImages[nextIndex]?.querySelector('.gallery-image');
        
        if (prevImg && prevImg.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = prevImg.src;
            document.head.appendChild(link);
        }
        
        if (nextImg && nextImg.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = nextImg.src;
            document.head.appendChild(link);
        }
    }
    
    // Performance optimization
    function optimizePerformance() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            galleryItems.forEach(item => {
                item.style.transition = 'transform 0.2s ease';
            });
        }
        
        // Disable hover effects on touch devices
        if ('ontouchstart' in window) {
            galleryItems.forEach(item => {
                item.classList.add('no-hover');
            });
        }
    }
    
    // Initialize performance optimizations
    optimizePerformance();
    
    // Analytics tracking
    function trackGalleryEvent(action, data) {
        // In a real application, this would send data to analytics
        console.log(`Gallery Analytics: ${action}`, data);
        
        // Example: Google Analytics event
        // gtag('event', action, {
        //     'event_category': 'Gallery',
        //     'event_label': data
        // });
    }
    
    // Accessibility improvements
    function initAccessibility() {
        galleryItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `View image ${index + 1} in lightbox`);
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });
        
        // Add focus management
        if (lightbox) {
            lightbox.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = lightbox.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }
    
    // Initialize accessibility features
    initAccessibility();
    
    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (isLightboxOpen) {
            updateLightboxContent();
        }
    }, 250));
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Export for potential use in other scripts
    window.Gallery = {
        openLightbox: openLightbox,
        closeLightbox: closeLightbox,
        filterImages: filterImages,
        trackEvent: trackGalleryEvent
    };
});
