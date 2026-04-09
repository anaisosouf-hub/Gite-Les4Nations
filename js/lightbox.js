// Image Lightbox functionality for Les 4 Nations Gites
// This creates a full-screen image viewer with navigation

(function() {
    'use strict';
    
    // Variables to track the current state
    let currentIndex = 0;
    let images = [];
    let lightboxElement = null;
    let imageElement = null;
    let captionElement = null;
    let currentRoomImages = []; // For scoped navigation on rooms pages
    
    // Initialize when DOM is ready
    GiteUtils.ready(init);
    
    // Initialize the lightbox when the page loads
    function init() {
        // Create the lightbox HTML structure
        createLightbox();
        
        // Find all images in the main content (excluding logo and icons)
        const mainContent = document.querySelector('main');
        if (mainContent) {
            const imgElements = mainContent.querySelectorAll('img');
            // Filter out avatar/profile images
            images = Array.from(imgElements).filter(img => 
                !img.src.includes('Photo_Adeline.jpeg') && 
                !img.alt.toLowerCase().includes('propriétaire') &&
                !img.alt.toLowerCase().includes('owner')
            );
            
            // Add click event to each image
            images.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    // On rooms pages, scope to room-listing
                    const isRoomsPage = window.location.pathname.includes('room');
                    if (isRoomsPage) {
                        const roomListing = img.closest('.room-listing');
                        if (roomListing) {
                            currentRoomImages = Array.from(roomListing.querySelectorAll('img'));
                            const roomIndex = currentRoomImages.indexOf(img);
                            openLightbox(roomIndex, true);
                            return;
                        }
                    }
                    openLightbox(index);
                });
            });
        }
    }
    
    // Create the lightbox overlay and controls
    function createLightbox() {
        // Create the overlay container
        lightboxElement = document.createElement('div');
        lightboxElement.id = 'lightbox';
        lightboxElement.className = 'lightbox';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close lightbox');
        closeBtn.onclick = closeLightbox;
        
        // Create previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.setAttribute('aria-label', 'Previous image');
        prevBtn.onclick = showPrevImage;
        
        // Create next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.setAttribute('aria-label', 'Next image');
        nextBtn.onclick = showNextImage;
        
        // Create image element
        imageElement = document.createElement('img');
        imageElement.className = 'lightbox-image';
        imageElement.alt = '';
        
        // Create caption element
        captionElement = document.createElement('div');
        captionElement.className = 'lightbox-caption';
        
        // Create counter element (e.g., "1 / 10")
        const counterElement = document.createElement('div');
        counterElement.className = 'lightbox-counter';
        counterElement.id = 'lightbox-counter';
        
        // Assemble the lightbox
        lightboxElement.appendChild(closeBtn);
        lightboxElement.appendChild(prevBtn);
        lightboxElement.appendChild(nextBtn);
        lightboxElement.appendChild(imageElement);
        lightboxElement.appendChild(captionElement);
        lightboxElement.appendChild(counterElement);
        
        // Add to page
        document.body.appendChild(lightboxElement);
        
        // Close lightbox when clicking outside the image
        lightboxElement.addEventListener('click', function(e) {
            if (e.target === lightboxElement) {
                closeLightbox();
            }
        });
    }
    
    // Open the lightbox and show the selected image
    function openLightbox(index, isScoped = false) {
        currentIndex = index;
        lightboxElement.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        lightboxElement.setAttribute('data-scoped', isScoped);
        showImage(isScoped);
        
        // Hide navigation buttons on index pages (only 2 images, can be confusing)
        const isIndexPage = window.location.pathname.includes('index');
        const prevBtn = lightboxElement.querySelector('.lightbox-prev');
        const nextBtn = lightboxElement.querySelector('.lightbox-next');
        const counter = lightboxElement.querySelector('.lightbox-counter');
        
        if (isIndexPage) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            counter.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            counter.style.display = 'block';
        }
        
        // Add keyboard event listener
        document.addEventListener('keydown', handleKeyPress);
    }
    
    // Close the lightbox
    function closeLightbox() {
        lightboxElement.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleKeyPress);
    }
    
    // Display the current image
    function showImage(isScoped = false) {
        const imageArray = isScoped ? currentRoomImages : images;
        if (imageArray.length === 0) return;
        
        const currentImg = imageArray[currentIndex];
        imageElement.src = currentImg.src;
        imageElement.alt = currentImg.alt;
        captionElement.textContent = currentImg.alt;
        
        // Update counter
        const counter = document.getElementById('lightbox-counter');
        counter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        
        // Add fade-in animation
        imageElement.style.opacity = '0';
        setTimeout(() => {
            imageElement.style.opacity = '1';
        }, 50);
    }
    
    // Show the next image
    function showNextImage() {
        const isScoped = lightboxElement.getAttribute('data-scoped') === 'true';
        const imageArray = isScoped ? currentRoomImages : images;
        currentIndex = (currentIndex + 1) % imageArray.length;
        showImage(isScoped);
    }
    
    // Show the previous image
    function showPrevImage() {
        const isScoped = lightboxElement.getAttribute('data-scoped') === 'true';
        const imageArray = isScoped ? currentRoomImages : images;
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
        showImage(isScoped);
    }
    
    // Handle keyboard shortcuts
    function handleKeyPress(e) {
        const isIndexPage = window.location.pathname.includes('index');
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                if (!isIndexPage) showNextImage();
                break;
            case 'ArrowLeft':
                if (!isIndexPage) showPrevImage();
                break;
        }
    }
    
    // Start the lightbox when the page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
