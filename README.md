# Gîtes & Spa - Les 4 Nations

> A beautiful, fully-featured website for a countryside cottage and spa retreat in Normandy, France.

[![Live Site](https://gitesles4nations.vercel.app/)]

## 📖 About

Les 4 Nations is a collection of charming cottages with spa facilities located in Saint-Martin-de-Fresnay, Saint-Pierre-en-Auge, Normandy. This website serves as the digital presence for the business, providing potential guests with detailed information about accommodations, amenities, and booking options.

## ✨ Features

### 🌐 Multilingual Support
- Full English and French translations
- Language switcher on every page
- SEO-optimized with proper hreflang tags

### 📱 Responsive Design
- Mobile-first approach
- Hamburger navigation menu for mobile devices
- Optimized layouts for all screen sizes

### 🎨 Interactive Components
- **Image Lightbox**: Full-screen image viewer with navigation and captions
- **Contact Form Validation**: Real-time validation with visual feedback
  - Name, email, and message validation
  - Character counter (10-1000 characters)
  - Rate limiting (2-minute intervals)
  - Spam detection (link counting)
  - Anti-double submission
- **Smooth Scroll Navigation**: Animated scrolling to page sections
- **Scroll to Top Button**: Appears after scrolling with smooth animation
- **Mobile Menu**: Slide-in navigation with hamburger icon

### 🎯 User Experience
- Skip to main content link for accessibility
- ARIA labels and semantic HTML
- Sticky navigation header
- Professional animations and transitions

### 📄 Pages
- Home (`index.html` / `index-en.html`)
- Rooms & Accommodations (`rooms-fr.html` / `rooms-en.html`)
- Spa & Wellness Services (`services-fr.html` / `services-en.html`)
- Photo Gallery (`gallery-fr.html` / `gallery-en.html`)
- Surroundings & Attractions (`about-fr.html` / `about-en.html`)
- Contact & Booking (`contact-fr.html` / `contact-en.html`)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styling with responsive design, animations, and transitions
- **Vanilla JavaScript**: No frameworks - all features built with pure JS
- **AVIF Images**: Modern image format for optimal performance
- **Google Maps**: Embedded location map
- **SEO**: Sitemap, robots.txt, meta descriptions, structured data

## 📁 Project Structure

```
Gite-Les4Nations/
├── css/
│   └── style.css                 # All styles in one file
├── js/
│   ├── config.js                # Central configuration (shared settings)
│   ├── utils.js                 # Shared utility functions
│   ├── loader.js                # Conditional script loader (optional)
│   ├── lightbox.js              # Image lightbox functionality
│   ├── form-validation.js       # Contact form validation
│   ├── mobile-menu.js           # Hamburger menu for mobile
│   ├── smooth-scroll.js         # Smooth scroll navigation
│   └── scroll-to-top.js         # Scroll to top button
├── images/
│   ├── Gite - Le Pressoir/      # Photos for cottage 1
│   ├── Gite- Le pommier/        # Photos for cottage 2
│   ├── Gite-Le Puit/            # Photos for cottage 3
│   └── Photo_Adeline.jpeg       # Owner profile photo
├── *.html                        # French pages (default)
├── *-en.html                     # English pages
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)

## 💻 JavaScript Architecture

### Modular Design

The JavaScript is organized into a **modular architecture** with shared utilities:

**Core Files:**
- **`config.js`**: Central configuration for all modules (durations, offsets, colors, etc.)
- **`utils.js`**: Shared utility functions (DOM helpers, animations, easing, etc.)

**Feature Modules:**

**Feature Modules:**
- **`lightbox.js`**: Full-screen image viewer with keyboard navigation
- **`form-validation.js`**: Comprehensive form validation (bilingual)
- **`mobile-menu.js`**: Responsive hamburger menu
- **`smooth-scroll.js`**: Smooth scrolling with header offset
- **`scroll-to-top.js`**: Floating button with fade-in animation

All modules use **IIFE (Immediately Invoked Function Expression)** pattern for encapsulation and access shared utilities via `window.GiteConfig` and `window.GiteUtils`.

### Benefits of This Architecture

1. **DRY Principle**: Shared code (animations, easing functions) in one place
2. **Centralized Configuration**: Change settings in `config.js` without touching individual modules
3. **Easy Maintenance**: Update utility functions once, all modules benefit
4. **Performance**: Conditional loading - only load scripts needed per page
5. **Consistency**: All modules use same animation timings and offsets

### Example Configuration

Edit `js/config.js` to customize:
```javascript
window.GiteConfig = {
    animation: {
        scrollDuration: 600,        // Change all scroll speeds at once
        fadeInDuration: 300
    },
    layout: {
        headerOffset: 80,           // Adjust for header height
        scrollThreshold: 300
    },
    form: {
        messageMaxLength: 1000,     // Adjust form limits
        rateLimitMinutes: 2
    }
};
```

## 🎨 Customization

### Colors
Main color scheme is defined in `css/style.css`:
- Primary green: `#5a6e5a` (earthy green)
- Accent green: `#23d689` (bright green)
- Background: `#fdfdfd` (off-white)
- Accent beige: `#E8E2D9`

### Configuration
JavaScript modules have configuration objects at the top for easy customization:
```javascript
// Now centralized in config.js!
window.GiteConfig.form.nameMinLength = 3;
window.GiteConfig.animation.scrollDuration = 800;
```

### Shared Utilities Available

The `utils.js` provides helpers used across modules:
- `GiteUtils.ready(callback)` - DOM ready helper
- `GiteUtils.smoothScrollTo(targetY, duration)` - Smooth scroll to position
- `GiteUtils.smoothScrollToElement(element, offset, duration)` - Scroll to element
- `GiteUtils.createElement(tag, options)` - Create elements with attributes
- `GiteUtils.debounce(func, wait)` - Debounce function calls
- `GiteUtils.throttle(func, limit)` - Throttle function calls
- `GiteUtils.easing.*` - Various easing functions
- `GiteUtils.isMobile()` - Check if mobile viewport
- `GiteUtils.getLanguage()` - Get current page language

## 🔍 SEO Features

- Meta descriptions on all pages
- Proper heading hierarchy (H1-H6)
- Image alt attributes
- Sitemap.xml for search engines
- Robots.txt configuration
- Hreflang tags for multilingual content
- Social media meta tags ready

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a private business website, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

---
