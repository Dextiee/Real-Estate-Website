// Partners Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const partnersSection = document.getElementById('partners-section');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const partnersTrack = document.querySelector('.partners-track');
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for partner logos
                if (entry.target.classList.contains('partners-grid')) {
                    const logos = entry.target.querySelectorAll('.partner-logo');
                    logos.forEach((logo, index) => {
                        setTimeout(() => {
                            logo.style.opacity = '1';
                            logo.style.transform = 'translateY(0) scale(1)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.partners-header, .partners-grid, .partners-carousel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize partner logos with staggered animation
    partnerLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px) scale(0.9)';
        logo.style.transition = 'all 0.4s ease';
    });
    
    // Partner logo hover effects
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect
        logo.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            }, 100);
            
            // Log partner click (in real app, this would track analytics)
            const partnerName = this.querySelector('img').alt;
            console.log(`Partner clicked: ${partnerName}`);
        });
    });
    
    // Ripple effect function
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(246, 147, 20, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Carousel functionality for mobile
    if (partnersTrack) {
        let isPaused = false;
        
        // Pause on hover
        partnersTrack.addEventListener('mouseenter', () => {
            isPaused = true;
            partnersTrack.style.animationPlayState = 'paused';
        });
        
        partnersTrack.addEventListener('mouseleave', () => {
            isPaused = false;
            partnersTrack.style.animationPlayState = 'running';
        });
        
        // Touch support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        partnersTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            partnersTrack.style.animationPlayState = 'paused';
        });
        
        partnersTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            partnersTrack.style.transform = `translateX(${-diffX}px)`;
        });
        
        partnersTrack.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            partnersTrack.style.animationPlayState = 'running';
            partnersTrack.style.transform = '';
        });
    }
    
    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe all partner images
    const partnerImages = document.querySelectorAll('.partner-logo img');
    partnerImages.forEach(img => {
        if (img.loading === 'lazy') {
            imageObserver.observe(img);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && partnersSection.contains(document.activeElement)) {
            const focusedLogo = document.activeElement.closest('.partner-logo');
            if (focusedLogo) {
                focusedLogo.style.outline = '2px solid #f69314';
                focusedLogo.style.outlineOffset = '4px';
            }
        }
    });
    
    // Remove outline on blur
    partnerLogos.forEach(logo => {
        logo.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        partnerLogos.forEach(logo => {
            logo.style.transition = 'transform 0.2s ease';
        });
    }
    
    // Accessibility: Announce partner names to screen readers
    partnerLogos.forEach(logo => {
        logo.setAttribute('role', 'button');
        logo.setAttribute('tabindex', '0');
        logo.setAttribute('aria-label', `View ${logo.querySelector('img').alt} details`);
        
        logo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logo.click();
            }
        });
    });
    
    // Analytics tracking (placeholder)
    function trackPartnerInteraction(partnerName, action) {
        // In a real application, this would send data to analytics
        console.log(`Analytics: ${action} - ${partnerName}`);
        
        // Example: Google Analytics event
        // gtag('event', action, {
        //     'event_category': 'Partners',
        //     'event_label': partnerName
        // });
    }
    
    // Track partner interactions
    partnerLogos.forEach(logo => {
        const partnerName = logo.querySelector('img').alt;
        
        logo.addEventListener('mouseenter', () => {
            trackPartnerInteraction(partnerName, 'hover');
        });
        
        logo.addEventListener('click', () => {
            trackPartnerInteraction(partnerName, 'click');
        });
    });
});

// Utility function to refresh carousel animation
function refreshPartnersCarousel() {
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        partnersTrack.style.animation = 'none';
        partnersTrack.offsetHeight; // Trigger reflow
        partnersTrack.style.animation = 'scroll 20s linear infinite';
    }
}

// Export for potential use in other scripts
window.PartnersSection = {
    refreshCarousel: refreshPartnersCarousel,
    trackInteraction: function(partnerName, action) {
        console.log(`Custom tracking: ${action} - ${partnerName}`);
    }
};
