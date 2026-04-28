// Central Configuration for Les 4 Nations Gites
// All shared settings and constants

(function(window) {
    'use strict';
    
    window.GiteConfig = {
        // Animation durations (in milliseconds)
        animation: {
            scrollDuration: 600,
            scrollToTopDuration: 600,
            smoothScrollDuration: 800,
            fadeInDuration: 300,
            fadeOutDuration: 300
        },
        
        // Layout constants
        layout: {
            headerOffset: 80,
            scrollThreshold: 300,
            mobileBreakpoint: 768
        },
        
        // Form validation settings
        form: {
            nameMinLength: 2,
            messageMinLength: 10,
            messageMaxLength: 1000,
            maxLinksAllowed: 2,
            rateLimitMinutes: 2
        },
        
        // EmailJS Configuration
        // TO COMPLETE: Sign up at https://www.emailjs.com/ and replace these values
        emailjs: {
            publicKey: 'PpLFVuLX4TKktyUBT',  // Replace with your EmailJS public key
            serviceId: 'service_2u4daol',   // Replace with your EmailJS service ID
            templateId: {
                fr: 'template_2phaglq',     // French template ID
                en: 'template_3ukn6jv'      // English template ID
            },
            recipientEmail: 'adeline.bosquet@yahoo.com' // Your email address (used in template)
        },
        
        // Mobile menu settings
        mobileMenu: {
            width: 280,
            closeOnLinkClick: true,
            closeOnOutsideClick: true,
            closeOnEscape: true
        },
        
        // Color scheme (for dynamic use if needed)
        colors: {
            primary: '#5a6e5a',
            accent: '#23d689',
            error: '#f44336',
            success: '#4CAF50',
            warning: '#ff9800'
        }
    };
})(window);
