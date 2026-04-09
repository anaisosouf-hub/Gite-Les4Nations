// Utility Functions for Les 4 Nations Gites
// Shared helpers used across multiple modules

(function(window) {
    'use strict';
    
    window.GiteUtils = {
        
        // DOM Ready helper
        ready: function(callback) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                callback();
            }
        },
        
        // Easing functions
        easing: {
            // Ease in-out quadratic
            easeInOutQuad: function(t) {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            },
            
            // Ease in-out cubic
            easeInOutCubic: function(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            },
            
            // Ease out
            easeOut: function(t) {
                return 1 - Math.pow(1 - t, 3);
            }
        },
        
        // Smooth scroll to position
        smoothScrollTo: function(targetY, duration, callback) {
            const startPosition = window.pageYOffset;
            const distance = targetY - startPosition;
            const startTime = performance.now();
            
            function animation(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easing = GiteUtils.easing.easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition + distance * easing);
                
                if (progress < 1) {
                    requestAnimationFrame(animation);
                } else if (callback) {
                    callback();
                }
            }
            
            requestAnimationFrame(animation);
        },
        
        // Smooth scroll to element with offset
        smoothScrollToElement: function(element, offset, duration) {
            offset = offset || 0;
            duration = duration || window.GiteConfig.animation.scrollDuration;
            
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            this.smoothScrollTo(targetPosition, duration);
        },
        
        // Create element with attributes
        createElement: function(tag, options) {
            const element = document.createElement(tag);
            
            if (options.className) element.className = options.className;
            if (options.id) element.id = options.id;
            if (options.innerHTML) element.innerHTML = options.innerHTML;
            if (options.textContent) element.textContent = options.textContent;
            
            if (options.attributes) {
                for (const key in options.attributes) {
                    element.setAttribute(key, options.attributes[key]);
                }
            }
            
            if (options.styles) {
                for (const key in options.styles) {
                    element.style[key] = options.styles[key];
                }
            }
            
            return element;
        },
        
        // Add class with animation delay
        addClass: function(element, className, delay) {
            if (delay) {
                setTimeout(() => element.classList.add(className), delay);
            } else {
                element.classList.add(className);
            }
        },
        
        // Remove class with animation delay
        removeClass: function(element, className, delay) {
            if (delay) {
                setTimeout(() => element.classList.remove(className), delay);
            } else {
                element.classList.remove(className);
            }
        },
        
        // Toggle class
        toggleClass: function(element, className) {
            element.classList.toggle(className);
        },
        
        // Debounce function
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        
        // Get current language from HTML
        getLanguage: function() {
            return document.documentElement.lang || 'en';
        },
        
        // Check if mobile device
        isMobile: function() {
            return window.innerWidth <= window.GiteConfig.layout.mobileBreakpoint;
        }
    };
})(window);
