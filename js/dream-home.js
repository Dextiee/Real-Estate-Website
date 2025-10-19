// Dream Home Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('property-search-form');
    const searchBtn = document.querySelector('.search-btn');
    
    // Form validation and submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            searchBtn.classList.add('loading');
            searchBtn.innerHTML = '<span class="search-btn-icon">⏳</span> Searching...';
            
            // Simulate search process
            setTimeout(() => {
                // Get form data
                const formData = new FormData(searchForm);
                const searchParams = {};
                
                for (let [key, value] of formData.entries()) {
                    if (value.trim() !== '') {
                        searchParams[key] = value;
                    }
                }
                
                // Log search parameters (in real app, this would be sent to server)
                console.log('Search Parameters:', searchParams);
                
                // Show success message
                showSearchResults(searchParams);
                
                // Reset button
                searchBtn.classList.remove('loading');
                searchBtn.innerHTML = '<span class="search-btn-icon">🔍</span> Search Now';
                
            }, 2000);
        });
    }
    
    // Form field interactions
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        // Add focus/blur effects
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Real-time validation for number inputs
        if (control.type === 'number') {
            control.addEventListener('input', function() {
                validatePriceRange();
            });
        }
    });
    
    // Price range validation
    function validatePriceRange() {
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        
        if (minPrice.value && maxPrice.value) {
            if (parseInt(minPrice.value) > parseInt(maxPrice.value)) {
                minPrice.classList.add('error');
                maxPrice.classList.add('error');
            } else {
                minPrice.classList.remove('error');
                maxPrice.classList.remove('error');
            }
        } else {
            minPrice.classList.remove('error');
            maxPrice.classList.remove('error');
        }
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            field.classList.add('error');
            field.classList.remove('success');
        } else if (value) {
            field.classList.remove('error');
            field.classList.add('success');
        } else {
            field.classList.remove('error', 'success');
        }
    }
    
    // Show search results (placeholder)
    function showSearchResults(params) {
        // Create a simple modal or alert to show results
        const resultCount = Math.floor(Math.random() * 50) + 10; // Random number between 10-60
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Search Results</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Found <strong>${resultCount}</strong> properties matching your criteria!</p>
                    <div class="search-summary">
                        <h4>Your Search:</h4>
                        <ul>
                            ${Object.entries(params).map(([key, value]) => 
                                `<li><strong>${key.replace('_', ' ').toUpperCase()}:</strong> ${value}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <p class="note">This is a demo. In a real application, this would redirect to a listings page with actual results.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="this.closest('.search-results-modal').remove()">Close</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .search-results-modal .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #f69314;
            }
            .search-results-modal .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            .search-results-modal .search-summary {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
            }
            .search-results-modal .search-summary ul {
                list-style: none;
                padding: 0;
                margin: 0.5rem 0 0 0;
            }
            .search-results-modal .search-summary li {
                padding: 0.25rem 0;
                color: #666;
            }
            .search-results-modal .note {
                font-style: italic;
                color: #999;
                font-size: 0.9rem;
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe form elements for animation
    const animatedElements = document.querySelectorAll('.search-form-container, .dream-home-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add keyboard navigation
    searchForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            e.preventDefault();
            const formElements = Array.from(searchForm.querySelectorAll('input, select'));
            const currentIndex = formElements.indexOf(e.target);
            const nextElement = formElements[currentIndex + 1];
            
            if (nextElement) {
                nextElement.focus();
            } else {
                searchBtn.click();
            }
        }
    });
    
    // Add form reset functionality
    function resetForm() {
        searchForm.reset();
        formControls.forEach(control => {
            control.classList.remove('error', 'success', 'focused');
        });
    }
    
    // Add reset button (optional)
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-secondary';
    resetBtn.textContent = 'Reset';
    resetBtn.style.cssText = `
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        margin-left: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    resetBtn.addEventListener('click', resetForm);
    resetBtn.addEventListener('mouseenter', function() {
        this.style.background = '#5a6268';
        this.style.transform = 'translateY(-2px)';
    });
    resetBtn.addEventListener('mouseleave', function() {
        this.style.background = '#6c757d';
        this.style.transform = 'translateY(0)';
    });
    
    // Add reset button to form
    const buttonContainer = document.querySelector('.search-button-container');
    if (buttonContainer) {
        buttonContainer.appendChild(resetBtn);
    }
});

// Utility functions
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
window.DreamHomeSearch = {
    resetForm: () => {
        const form = document.getElementById('property-search-form');
        if (form) form.reset();
    },
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
