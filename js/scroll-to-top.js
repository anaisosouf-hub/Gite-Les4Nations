// Scroll to Top Button for Les 4 Nations Gites
// Appears after scrolling down and provides quick return to top

(function() {
    'use strict';
    
    // Use shared configuration
    const config = window.GiteConfig.layout;
    const animConfig = window.GiteConfig.animation;
    
    // Initialize when DOM is ready
    GiteUtils.ready(init);
    
    function init() {
        // Create the scroll-to-top button
        const scrollButton = createScrollButton();
        document.body.appendChild(scrollButton);
        
        // Show/hide button based on scroll position
        let isVisible = false;
        window.addEventListener('scroll', function() {
            const shouldShow = window.pageYOffset > config.scrollThreshold;
            
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
        return GiteUtils.createElement('button', {
            className: 'scroll-to-top',
            attributes: {
                'aria-label': 'Scroll to top',
                'title': 'Back to top'
            },
            innerHTML: `
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                </svg>
            `
        });
    }
    
    // Smooth scroll to top using shared utility
    function scrollToTop() {
        GiteUtils.smoothScrollTo(0, animConfig.scrollToTopDuration);
    }
})();
