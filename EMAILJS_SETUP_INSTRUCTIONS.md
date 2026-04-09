# EmailJS Setup Instructions

Your contact form has been configured to use EmailJS to send emails to **skyla_melisse@msn.com**.

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (It's free - 200 emails/month on the free plan)
3. Create your account

### 2. Add an Email Service

1. Once logged in, click on **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider (recommended: Gmail, Outlook, or Yahoo)
4. Follow the instructions to connect your email account (**skyla_melisse@msn.com**)
5. **Copy the Service ID** (you'll need this later)

### 3. Create an Email Template

1. Click on **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Use the following template settings:

**Template Name:** `contact_form` (or any name you prefer)

**Template Content:**
```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

**Important Template Variables:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address
- `{{message}}` - The message content
- `{{to_email}}` - Your recipient email (skyla_melisse@msn.com)

4. **Copy the Template ID** (you'll need this later)

### 4. Get Your Public Key

1. Click on **"Account"** in the left sidebar
2. Go to the **"General"** tab
3. Find your **Public Key** (also called API Key)
4. **Copy the Public Key**

### 5. Update Your Configuration

Open the file `js/config.js` and replace the EmailJS configuration with your actual values:

```javascript
emailjs: {
    publicKey: 'YOUR_PUBLIC_KEY',     // Replace with your actual Public Key
    serviceId: 'YOUR_SERVICE_ID',      // Replace with your actual Service ID
    templateId: 'YOUR_TEMPLATE_ID',    // Replace with your actual Template ID
    recipientEmail: 'skyla_melisse@msn.com'
},
```

**Example:**
```javascript
emailjs: {
    publicKey: 'aBcDeFgHiJkLmNoPqR',
    serviceId: 'service_abc1234',
    templateId: 'template_xyz5678',
    recipientEmail: 'skyla_melisse@msn.com'
},
```

### 6. Test Your Contact Form

1. Save the `config.js` file
2. Open your website
3. Go to the Contact page
4. Fill out the form and submit
5. Check your email (skyla_melisse@msn.com) for the message

## Troubleshooting

### Form says "Email service not configured"
- Make sure you updated `config.js` with your actual EmailJS credentials
- Check that all three values (publicKey, serviceId, templateId) are replaced

### Email not received
- Check your EmailJS dashboard for any errors
- Verify your email service is properly connected in EmailJS
- Check spam/junk folder
- Make sure the template is using the correct variable names

### "Failed to send message" error
- Check browser console for detailed error messages (F12 → Console tab)
- Verify your EmailJS service is active
- Check that you haven't exceeded the free tier limit (200 emails/month)

## Security Note

Your email address (skyla_melisse@msn.com) is configured server-side in the template and is not directly exposed in the browser. However, your EmailJS Public Key and Service/Template IDs are visible in the browser source code - this is normal and expected for client-side email services.

## Files Modified

The following files have been updated to integrate EmailJS:
- `js/config.js` - EmailJS configuration
- `js/form-validation.js` - Email sending functionality
- `contact-fr.html` - Added EmailJS SDK
- `contact-en.html` - Added EmailJS SDK

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Pricing](https://www.emailjs.com/pricing/)

---

**Need Help?** If you encounter any issues during setup, refer to the EmailJS documentation or their support resources.
