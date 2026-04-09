// Smooth Scroll Navigation for Les 4 Nations Gites
// Smooth scrolling to page sections with offset for sticky header

(function() {
    'use strict';
    
    // Use shared configuration
    const config = window.GiteConfig.layout;
    const animConfig = window.GiteConfig.animation;
    
    // Initialize when DOM is ready
    GiteUtils.ready(init);
    
    function init() {
        // Find all anchor links that point to sections on the same page
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip empty anchors or single #
            if (!href || href === '#') return;
            
            link.addEventListener('click', function(e) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                // Only prevent default and smooth scroll if target exists
                if (targetElement) {
                    e.preventDefault();
                    
                    // Use shared utility for smooth scrolling
                    GiteUtils.smoothScrollToElement(targetElement, config.headerOffset, animConfig.smoothScrollDuration);
                    
                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                    
                    // Set focus to target for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            });
        });
        
        // Handle initial page load with hash
        if (window.location.hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    GiteUtils.smoothScrollToElement(targetElement, config.headerOffset, animConfig.smoothScrollDuration);
                }
            }, 100);
        }
    }
})();
