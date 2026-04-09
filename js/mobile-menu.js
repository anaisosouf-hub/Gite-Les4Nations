// Mobile Navigation Menu for Les 4 Nations Gites
// Hamburger menu with smooth slide-in animation

(function() {
    'use strict';
    
    // Use shared configuration
    const menuConfig = window.GiteConfig.mobileMenu;
    
    // Initialize when DOM is ready
    GiteUtils.ready(init);
    
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
        
        // Close menu when clicking a link (if configured)
        if (menuConfig.closeOnLinkClick) {
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMenu(hamburger, navMenu);
                });
            });
        }
        
        // Close menu when clicking outside (if configured)
        if (menuConfig.closeOnOutsideClick) {
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target)) {
                    closeMenu(hamburger, navMenu);
                }
            });
        }
        
        // Close menu on escape key (if configured)
        if (menuConfig.closeOnEscape) {
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMenu(hamburger, navMenu);
                }
            });
        }
        
        // Close menu when resizing to desktop
        const handleResize = GiteUtils.debounce(function() {
            // Close menu if resizing to desktop
            if (!GiteUtils.isMobile()) {
                closeMenu(hamburger, navMenu);
            }
        }, 250);
        
        window.addEventListener('resize', handleResize);
    }
    
    // Create hamburger button element
    function createHamburgerButton() {
        return GiteUtils.createElement('button', {
            className: 'hamburger-menu',
            attributes: {
                'aria-label': 'Toggle navigation menu',
                'aria-expanded': 'false'
            },
            innerHTML: `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `
        });
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
