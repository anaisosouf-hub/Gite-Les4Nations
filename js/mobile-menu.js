// Mobile Navigation Menu for Les 4 Nations Gites
// Hamburger menu with smooth slide-in animation

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const nav = document.querySelector('header nav');
        if (!nav) return;
        
        // Create hamburger button
        const hamburger = createHamburgerButton();
        nav.insertBefore(hamburger, nav.firstChild);
        
        const navMenu = nav.querySelector('ul');
        
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu(hamburger, navMenu);
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu(hamburger, navMenu);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                closeMenu(hamburger, navMenu);
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu(hamburger, navMenu);
            }
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close menu if resizing to desktop
                if (window.innerWidth > 768) {
                    closeMenu(hamburger, navMenu);
                }
            }, 250);
        });
    }
    
    // Create hamburger button element
    function createHamburgerButton() {
        const button = document.createElement('button');
        button.className = 'hamburger-menu';
        button.setAttribute('aria-label', 'Toggle navigation menu');
        button.setAttribute('aria-expanded', 'false');
        
        // Create hamburger icon (3 lines)
        button.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        return button;
    }
    
    // Toggle menu open/close
    function toggleMenu(hamburger, menu) {
        const isOpen = hamburger.classList.contains('active');
        
        if (isOpen) {
            closeMenu(hamburger, menu);
        } else {
            openMenu(hamburger, menu);
        }
    }
    
    // Open menu
    function openMenu(hamburger, menu) {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        menu.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
    
    // Close menu
    function closeMenu(hamburger, menu) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('mobile-menu-open');
        document.body.style.overflow = ''; // Restore scrolling
    }
})();
