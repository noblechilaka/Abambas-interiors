# Implementation TODO - Dynamic Monolith & Contact Functionality

## Phase 1: Dynamic Monolith Fetcher ✅ COMPLETE

- [x] 1.1 Add Ghost Frame (skeleton) CSS styles - Added in css/catalog.css
- [x] 1.2 Create async fetchContent() function in script.js
- [x] 1.3 Implement staggered reveal with 100ms delay

## Phase 2: Project Deep Dive (Shared Element Transitions) ✅ COMPLETE

- [x] 2.1 Add project click handler with coordinate capture
- [x] 2.2 Create project detail overlay HTML (dynamically injected)
- [x] 2.3 Implement GSAP morph animation

## Phase 3: Contact Dual-Path Logic ✅ COMPLETE

### A. Email Integration (EmailJS)

- [x] 3.1 Add EmailJS configuration in script.js
- [x] 3.2 Create form submission with sending animation
- [x] 3.3 Add success/failure UI feedback

> ⚠️ **EmailJS Configuration Required**: To enable email functionality, replace the placeholder values in `js/script.js`:
>
> ```javascript
> const EmailJSConfig = {
>   publicKey: "wIB2M-AkPaeyGRJigmb", // Get from emailjs.com
>   serviceId: "service_8h23v9m", // Get from emailjs.com
>   templateId: "template_iqsy4ju", // Get from emailjs.com
> };
> ```

### B. WhatsApp Integration

- [x] 3.4 Add WhatsApp button to contacts.html with CSS styling
- [x] 3.5 Implement dynamic message pre-filling based on current page
- [x] 3.6 Add WhatsApp buttons to catalog/product items (injected dynamically)

> ℹ️ **WhatsApp Number**: The WhatsApp number is configured in `js/script.js` as `WHATSAPP_NUMBER`. Update it with the correct business number.

## Phase 4: Testing & Refinement 📋

- [ ] 4.1 Test ghost frame rendering
- [ ] 4.2 Test staggered reveal animation
- [ ] 4.3 Test project deep dive transitions
- [ ] 4.4 Test email form submission (after EmailJS config)
- [ ] 4.5 Test WhatsApp pre-filled messages

## Implementation Summary

### Features Implemented:

1. **Dynamic Monolith Fetcher**

   - Async data fetching from JSON files
   - Ghost frame (skeleton) system during load
   - Staggered render with 100ms delay (domino effect)

2. **Project Deep Dive**

   - Click handler captures element coordinates
   - Full-screen overlay with morphing animation
   - GSAP-powered transitions

3. **Contact Dual-Path**
   - **Email**: AJAX form submission with EmailJS integration, sending animation (arrow movement + circle pulse), success message
   - **WhatsApp**: Business API integration with dynamic message pre-filling based on current page context

### Files Modified:

- `js/script.js` - Core functionality (fetch, contact handlers)
- `css/catalog.css` - Ghost frame skeleton styles
- `css/contacts.css` - WhatsApp CTA styles
- `contacts.html` - WhatsApp direct CTA button
