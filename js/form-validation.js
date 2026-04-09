// Contact Form Validation for Les 4 Nations Gites
// Implements validation, visual feedback, rate limiting, and anti-spam

(function() {
    'use strict';
    
    // Use shared configuration
    const formConfig = window.GiteConfig.form;
    const animConfig = window.GiteConfig.animation;
    
    // State management
    let isSubmitting = false;
    let lastSubmissionTime = null;
    
    // Initialize when DOM is ready
    GiteUtils.ready(init);
    
    function init() {
        const form = document.querySelector('.contact-form form');
        if (!form) return;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Add real-time validation
        if (nameInput) {
            addValidation(nameInput, validateName);
        }
        
        if (emailInput) {
            addValidation(emailInput, validateEmail);
        }
        
        if (messageInput) {
            addValidation(messageInput, validateMessage);
            addCharacterCounter(messageInput);
        }
        
        // Form submission handler
        form.addEventListener('submit', handleSubmit);
    }
    
    // Add validation listeners to input
    function addValidation(input, validationFn) {
        // Validate on blur (when user leaves field)
        input.addEventListener('blur', function() {
            const error = validationFn(input.value);
            updateFieldStatus(input, error);
        });
        
        // Validate on input (real-time)
        input.addEventListener('input', function() {
            // Only show real-time validation if field has been touched
            if (input.classList.contains('touched')) {
                const error = validationFn(input.value);
                updateFieldStatus(input, error);
            }
        });
        
        // Mark as touched on first blur
        input.addEventListener('blur', function() {
            input.classList.add('touched');
        }, { once: true });
    }
    
    // Validation functions
    function validateName(value) {
        value = value.trim();
        
        if (!value) {
            return getErrorMessage('nameRequired');
        }
        
        if (value.length < formConfig.nameMinLength) {
            return getErrorMessage('nameTooShort');
        }
        
        // Check if name contains only letters, spaces, hyphens, and apostrophes
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
        if (!nameRegex.test(value)) {
            return getErrorMessage('nameInvalid');
        }
        
        return null; // Valid
    }
    
    function validateEmail(value) {
        value = value.trim();
        
        if (!value) {
            return getErrorMessage('emailRequired');
        }
        
        // More strict email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(value)) {
            return getErrorMessage('emailInvalid');
        }
        
        // Check for common typos in domains
        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const domain = value.split('@')[1];
        const suspiciousDomains = ['gmial.com', 'yahooo.com', 'hotmial.com'];
        
        if (suspiciousDomains.some(d => domain === d)) {
            return getErrorMessage('emailTypo');
        }
        
        return null; // Valid
    }
    
    function validateMessage(value) {
        value = value.trim();
        
        if (!value) {
            return getErrorMessage('messageRequired');
        }
        
        if (value.length < formConfig.messageMinLength) {
            return getErrorMessage('messageTooShort');
        }
        
        if (value.length > formConfig.messageMaxLength) {
            return getErrorMessage('messageTooLong');
        }
        
        // Suspicious pattern detection - count links
        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
        const links = value.match(urlRegex) || [];
        
        if (links.length > formConfig.maxLinksAllowed) {
            return getErrorMessage('tooManyLinks');
        }
        
        return null; // Valid
    }
    
    // Update field visual status
    function updateFieldStatus(input, errorMessage) {
        // Look for existing error message right after the input
        let errorElement = input.nextElementSibling;
        if (errorElement && !errorElement.classList.contains('error-message')) {
            errorElement = null;
        }
        
        // Remove existing error message
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Remove previous states
        input.classList.remove('valid', 'invalid');
        
        if (errorMessage) {
            // Invalid state
            input.classList.add('invalid');
            
            // Add error message right after the input using shared utility
            errorElement = GiteUtils.createElement('span', {
                className: 'error-message',
                textContent: errorMessage,
                attributes: {
                    'role': 'alert'
                }
            });
            input.insertAdjacentElement('afterend', errorElement);
        } else if (input.value.trim()) {
            // Valid state (only if field has content)
            input.classList.add('valid');
        }
    }
    
    // Add character counter to message textarea
    function addCharacterCounter(textarea) {
        // Create counter element using shared utility
        const counter = GiteUtils.createElement('div', {
            className: 'char-counter',
            attributes: {
                'aria-live': 'polite'
            }
        });
        updateCounter(textarea, counter);
        
        // Insert counter right after textarea
        textarea.insertAdjacentElement('afterend', counter);
        
        // Update on input
        textarea.addEventListener('input', function() {
            updateCounter(textarea, counter);
        });
    }
    
    function updateCounter(textarea, counter) {
        const length = textarea.value.length;
        const remaining = formConfig.messageMaxLength - length;
        
        counter.textContent = `${length} / ${formConfig.messageMaxLength} ${getErrorMessage('characters')}`;
        
        if (remaining < 100) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    }
    
    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Validate all fields
        const nameError = validateName(nameInput.value);
        const emailError = validateEmail(emailInput.value);
        const messageError = validateMessage(messageInput.value);
        
        updateFieldStatus(nameInput, nameError);
        updateFieldStatus(emailInput, emailError);
        updateFieldStatus(messageInput, messageError);
        
        // Check if any errors
        if (nameError || emailError || messageError) {
            // Focus first error field
            if (nameError) nameInput.focus();
            else if (emailError) emailInput.focus();
            else if (messageError) messageInput.focus();
            return;
        }
        
        // Rate limiting - check last submission time
        if (lastSubmissionTime) {
            const timeSinceLastSubmit = DformConfig.rateLimitMinutes) {
                const waitTime = Math.ceil(formConfignceLastSubmit / (1000 * 60);
            
            if (minutesSinceLastSubmit < CONFIG.rateLimitMinutes) {
                const waitTime = Math.ceil(CONFIG.rateLimitMinutes - minutesSinceLastSubmit);
                showNotification(getErrorMessage('rateLimited').replace('{minutes}', waitTime), 'error');
                return;
            }
        }
        
        // Prevent double submission
        if (isSubmitting) {
            return;
        }
        
        isSubmitting = true;
        submitButton.disabled = true;
        submitButton.textContent = getErrorMessage('sending');
        
        // Trim all values
        const formData = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            to_email: window.GiteConfig.emailjs.recipientEmail
        };
        
        // Send email using EmailJS
        const emailConfig = window.GiteConfig.emailjs;
        
        // Debug logging
        console.log('Form submission started');
        console.log('EmailJS available:', !!window.emailjs);
        console.log('Config:', { serviceId: emailConfig.serviceId, templateId: emailConfig.templateId });
        console.log('Form data:', formData);
        
        // Check if EmailJS is configured
        if (!window.emailjs) {
            console.error('EmailJS library not loaded! Check if emailjs.min.js is loaded correctly.');
            showNotification('Email service not available. Please check your internet connection or try again later.', 'error');
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.textContent = getErrorMessage('sendButton');
            return;
        }
        
        if (emailConfig.publicKey === 'YOUR_PUBLIC_KEY') {
            console.error('EmailJS not configured. Please update config.js with your EmailJS credentials.');
            showNotification(getErrorMessage('configError'), 'error');
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.textContent = getErrorMessage('sendButton');
            return;
        }
        
        // Send email via EmailJS
        console.log('Attempting to send email...');
        emailjs.send(emailConfig.serviceId, emailConfig.templateId, formData)
            .then(function(response) {
                console.log('Email sent successfully:', response.status, response.text);
                
                // Update last submission time
                lastSubmissionTime = Date.now();
                
                // Show success message
                showNotification(getErrorMessage('success'), 'success');
                
                // Reset form
                form.reset();
                
                // Clear validation states
                [nameInput, emailInput, messageInput].forEach(input => {
                    input.classList.remove('valid', 'invalid', 'touched');
                    const errorElement = input.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.remove();
                    }
                });
                
                // Reset submit button
                isSubmitting = false;
                submitButton.disabled = false;
                submitButton.textContent = getErrorMessage('sendButton');
                
                // Update character counter
                let counter = messageInput.nextElementSibling;
                while (counter) {
                    if (counter.classList.contains('char-counter')) {
                        updateCounter(messageInput, counter);
                        break;
                    }
                    counter = counter.nextElementSibling;
                }
            }, function(error) {
                console.error('Failed to send email:', error);
                console.error('Error details:', {
                    status: error.status,
                    text: error.text,
                    full: error
                });
                
                // Show detailed error message
                let errorMsg = getErrorMessage('sendError');
                if (error.text) {
                    errorMsg += ' (Error: ' + error.text + ')';
                }
                showNotification(errorMsg, 'error');
                
                // Reset submit button
                isSubmitting = false;
                submitButton.disabled = false;
                submitButton.textContent = getErrorMessage('sendButton');
            });
    }
    
    // Show notification message
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.form-notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = GiteUtils.createElement('div', {
            className: `form-notification ${type}`,
            textContent: message,
            attributes: {
                'role': 'status',
                'aria-live': 'polite'
            }
        });
        
        const form = document.querySelector('.contact-form form');
        form.parentElement.insertBefore(notification, form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), animConfig.fadeOutDuration);
        }, 5000);
    }
    
    // Get error messages (supports both English and French)
    function getErrorMessage(key) {
        const lang = GiteUtils.getLanguage();
        
        const messages = {
            en: {
                nameRequired: 'Please enter your name',
                nameTooShort: 'Name must be at least 2 characters',
                nameInvalid: 'Name can only contain letters, spaces, hyphens and apostrophes',
                emailRequired: 'Please enter your email address',
                emailInvalid: 'Please enter a valid email address',
                emailTypo: 'Please check your email address for typos',
                messageRequired: 'Please enter your message',
                messageTooShort: 'Message must be at least 10 characters',
                messageTooLong: 'Message cannot exceed 1000 characters',
                tooManyLinks: 'Message contains too many links (maximum 2 allowed)',
                characters: 'characters',
                rateLimited: 'Please wait {minutes} more minute(s) before submitting again',
                sending: 'Sending...',
                success: 'Message sent successfully! We will get back to you soon.',
                sendError: 'Failed to send message. Please try again or contact us directly.',
                configError: 'Email service not configured. Please contact the site administrator.',
                sendButton: 'Send'
            },
            fr: {
                nameRequired: 'Veuillez entrer votre nom',
                nameTooShort: 'Le nom doit contenir au moins 2 caractères',
                nameInvalid: 'Le nom ne peut contenir que des lettres, espaces, traits d\'union et apostrophes',
                emailRequired: 'Veuillez entrer votre adresse e-mail',
                emailInvalid: 'Veuillez entrer une adresse e-mail valide',
                emailTypo: 'Veuillez vérifier les fautes de frappe dans votre e-mail',
                messageRequired: 'Veuillez entrer votre message',
                messageTooShort: 'Le message doit contenir au moins 10 caractères',
                messageTooLong: 'Le message ne peut pas dépasser 1000 caractères',
                tooManyLinks: 'Le message contient trop de liens (maximum 2 autorisés)',
                characters: 'caractères',
                rateLimited: 'Veuillez patienter {minutes} minute(s) de plus avant de soumettre à nouveau',
                sending: 'Envoi en cours...',
                success: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
                sendError: 'Échec de l\'envoi du message. Veuillez réessayer ou nous contacter directement.',
                configError: 'Service e-mail non configuré. Veuillez contacter l\'administrateur du site.',
                sendButton: 'Envoyer'
            }
        };
        
        return messages[lang][key] || messages.en[key];
    }
})();
