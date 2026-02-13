# Mobile Menu Implementation - TODO

## Overview

Implementing a sophisticated "Architectural" mobile menu with the following features:

- Architectural Hamburger (2 unequal lines with symmetrical cross animation)
- Vertical Unfold entrance with cream background
- Numbered Monolith links with large serif typography
- Touch Ripple portal effect
- Concierge footer with socials, location, and inquire CTA
- Split-fold closing animation matching preloader

---

## Tasks

### Phase 1: CSS Updates (`css/styles.css`)

- [ ] 1.1 Replace hamburger with architectural 2-line design
- [ ] 1.2 Implement symmetrical cross rotation animation
- [ ] 1.3 Add vertical unfold background animation
- [ ] 1.4 Create Numbered Monolith link styling
- [ ] 1.5 Implement Touch Ripple portal effect
- [ ] 1.6 Style Concierge footer (socials, location, inquire CTA)
- [ ] 1.7 Add animation sequence timing classes

### Phase 2: HTML Updates (`index.html`)

- [ ] 2.1 Update hamburger SVG to 2 unequal lines
- [ ] 2.2 Add monolith line element for menu
- [ ] 2.3 Format mobile nav links as numbered monolith
- [ ] 2.4 Update footer with concierge styling

### Phase 3: JavaScript Updates (`js/animations.js`)

- [ ] 3.1 Update MobileMenu class animation timeline
- [ ] 3.2 Implement Touch Ripple effect
- [ ] 3.3 Add split-fold closing animation

### Phase 4: Testing & Polish

- [ ] 4.1 Test hamburger animation
- [ ] 4.2 Test menu entrance animations
- [ ] 4.3 Test touch ripple effect
- [ ] 4.4 Test closing animation
- [ ] 4.5 Verify mobile responsiveness

---

## Animation Sequence Timing

| Time | Element       | Animation                           |
| ---- | ------------- | ----------------------------------- |
| 0.0s | Background    | Cream overlay unfolds vertically    |
| 0.2s | Monolith Line | 1px vertical line draws down center |
| 0.4s | Links         | Mask-reveal upward, staggered       |
| 0.6s | Footer        | Inquire Portal fades in             |

---

## Reference

See original task description in `<task>` section for complete design specifications.
