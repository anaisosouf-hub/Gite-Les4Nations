// Scroll to Top Button for Les 4 Nations Gites
// Appears after scrolling down and provides quick return to top

(function() {
    'use strict';
    
    // Configuration
    const SCROLL_THRESHOLD = 300; // Show button after scrolling 300px
    const SCROLL_DURATION = 600; // Smooth scroll duration in ms
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Create the scroll-to-top button
        const scrollButton = createScrollButton();
        document.body.appendChild(scrollButton);
        
        // Show/hide button based on scroll position
        let isVisible = false;
        window.addEventListener('scroll', function() {
            const shouldShow = window.pageYOffset > SCROLL_THRESHOLD;
            
            if (shouldShow && !isVisible) {
                scrollButton.classList.add('visible');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                scrollButton.classList.remove('visible');
                isVisible = false;
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', scrollToTop);
    }
    
    // Create the button element
    function createScrollButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        button.setAttribute('title', 'Back to top');
        
        // Add arrow icon (SVG)
        button.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;
        
        return button;
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        
        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / SCROLL_DURATION, 1);
            
            // Easing function (ease-in-out)
            const easing = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            window.scrollTo(0, startPosition * (1 - easing));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
})();
