# Typography Implementation Plan

## Information Gathered
- Current heading font: "Playfair Display", serif
- Current body font: "Inter", sans-serif
- Font loading from Google Fonts in HTML head
- 89 font-family references found across the CSS file
- Typography hierarchy needs complete overhaul

## Typography Changes Required

### Font Replacement
- **Headings (H1-H3)**: Replace with "Carves" 
- **Body/Navigation/Buttons/UI**: Replace with "Montserrat"
- **Remove fallback fonts** as specified

### Typography Hierarchy
- **H1-H3 Elements**: Carves only (hero-title, section-title, category-title, service-title, process-title, project-title, newsletter-title, stat-number, logo, mobile-nav-link)
- **Body Elements**: Montserrat only (about-text, service-description, process-description, project-description, discussion-text, newsletter-text, contact-value, nav-menu a, nav-phone a, mobile-contact-value, form inputs, btn-text, footer-bottom p)

### Responsive Typography Rules
- **Desktop**: Tighter letter-spacing
- **Tablet**: Neutral spacing  
- **Mobile**: Slightly increased line-height for readability

### Spacing Adjustments
- **Headings**: Tighten line-height to 1.05-1.15
- **Body text**: Use slightly relaxed spacing
- **Never center long paragraphs**
- **Headlines**: May center only in hero and CTA sections

## Implementation Steps

### Step 1: Update Font Loading
- [x] Replace Google Fonts link to include "Carves" and "Montserrat"
- [x] Remove fallback fonts from font declarations

### Step 2: Update CSS Variables
- [x] Update --font-heading variable to "Carves"
- [x] Update --font-body variable to "Montserrat"

### Step 3: Verify Font Hierarchy
- [x] Ensure all heading elements use --font-heading (Carves)
- [x] Ensure all body/nav/UI elements use --font-body (Montserrat)
- [x] Remove any inline font-family declarations that override variables

### Step 4: Adjust Line Heights
- [x] Tighten heading line-heights to 1.05-1.15
- [x] Apply slightly relaxed spacing for body text
- [x] Update responsive media queries for proper spacing

### Step 5: Implement Responsive Rules
- [x] Add tighter letter-spacing for desktop
- [x] Maintain neutral spacing for tablet
- [x] Increase line-height for mobile readability

### Step 6: Validate Typography Feel
- [ ] Ensure typography feels: Architectural, Calm, Premium, Editorial, Minimal
- [ ] Check that no decorative styles are introduced
- [ ] Verify proper hierarchy is maintained

## Files to Edit
1. `/Users/mac/Desktop/Abambas/index.html` - Update Google Fonts link ✅
2. `/Users/mac/Desktop/Abambas/css/styles.css` - Complete typography overhaul ✅

## Follow-up Steps
- [ ] Test typography changes across different screen sizes
- [ ] Verify font loading and rendering
- [ ] Ensure no decorative typography styles are present
- [ ] Confirm typography hierarchy feels architectural, calm, premium, editorial, and minimal
