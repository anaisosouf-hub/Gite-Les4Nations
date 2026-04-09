// Conditional Script Loader for Les 4 Nations Gites
// Loads only necessary scripts based on page content

(function() {
    'use strict';
    
    // Core scripts that should load on all pages
    const coreScripts = [
        './js/config.js',
        './js/utils.js',
        './js/mobile-menu.js',
        './js/smooth-scroll.js',
        './js/scroll-to-top.js'
    ];
    
    // Conditional scripts based on page features
    const conditionalScripts = {
        lightbox: {
            selector: 'main img',
            script: './js/lightbox.js'
        },
        formValidation: {
            selector: '.contact-form form',
            script: './js/form-validation.js'
        }
    };
    
    // Load a script dynamically
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Maintain order
        
        if (callback) {
            script.onload = callback;
        }
        
        document.body.appendChild(script);
    }
    
    // Load scripts in sequence
    function loadScriptsSequentially(scripts, callback) {
        if (scripts.length === 0) {
            if (callback) callback();
            return;
        }
        
        const script = scripts.shift();
        loadScript(script, function() {
            loadScriptsSequentially(scripts, callback);
        });
    }
    
    // Initialize
    function init() {
        const scriptsToLoad = [...coreScripts];
        
        // Check for conditional features
        for (const feature in conditionalScripts) {
            const config = conditionalScripts[feature];
            if (document.querySelector(config.selector)) {
                scriptsToLoad.push(config.script);
            }
        }
        
        // Load all required scripts
        loadScriptsSequentially(scriptsToLoad);
    }
    
    // Start loading when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
