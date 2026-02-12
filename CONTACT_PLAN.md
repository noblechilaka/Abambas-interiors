# Abambas Contact Page Redesign Plan

## Following the Monolith Design Philosophy

---

## Information Gathered

### Existing Design System

- **Color Palette**: Cream (#f8f4e1), Earthy browns (#543310, #74512d), Accent (#af8f6f)
- **Typography**: DM Serif Display (headings), Montserrat (body)
- **Animations**: GSAP + ScrollTrigger already integrated
- **Existing Components**: Portal CTA, Magnetic CTAs, Mobile menu, Smooth scroll (Lenis)

### Current Contact Page

- Basic footer-based layout with Google Maps embed
- Simple form without the Monolith styling
- No hero section or dramatic opening

---

## Implementation Plan

### Phase 1: HTML Structure (contacts.html)

#### 1.1 Header Section - "BEGIN THE DIALOGUE"

```html
<section class="contact-hero">
  <div class="contact-hero-mask">
    <h1 class="contact-hero-title">BEGIN THE DIALOGUE</h1>
  </div>
  <p class="contact-hero-subtitle">
    CURRENTLY ACCEPTING COMMISSIONS FOR LATE 2026.
  </p>
</section>
```

#### 1.2 Monolith Split Section

```html
<section class="monolith-split">
  <div class="split-container">
    <!-- Left: Studio Information -->
    <div class="split-left">
      <div class="studio-info">
        <div class="info-item">
          <span class="info-label">STUDIO</span>
          <p class="info-value">Port Harcourt, Nigeria</p>
        </div>
        <div class="info-item">
          <span class="info-label">INQUIRIES</span>
          <a href="mailto:hello@abambas.com" class="info-link"
            >hello@abambas.com</a
          >
        </div>
        <div class="info-item">
          <span class="info-label">SOCIAL</span>
          <div class="social-links-secondary">
            <a href="#" class="btn-secondary-cta">Instagram</a>
            <a href="#" class="btn-secondary-cta">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Inquiry Form -->
    <div class="split-right">
      <form class="inquiry-form" id="inquiryForm">
        <div class="form-group-underline">
          <input type="text" id="name" placeholder="YOUR NAME" required />
        </div>
        <div class="form-group-underline">
          <input type="email" id="email" placeholder="EMAIL ADDRESS" required />
        </div>
        <div class="form-group-underline">
          <input
            type="text"
            id="projectType"
            placeholder="PROJECT TYPE"
            required
          />
        </div>
        <div class="form-group-underline">
          <textarea id="vision" placeholder="YOUR VISION" rows="4"></textarea>
        </div>

        <!-- Portal Submit CTA -->
        <button type="submit" class="btn-portal portal-submit">
          <span class="btn-portal-text">SEND</span>
          <span class="btn-portal-circle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </form>
    </div>
  </div>
</section>
```

#### 1.3 Atmosphere Frame (Map)

```html
<section class="atmosphere-frame">
  <div class="frame-container">
    <div class="frame-mask">
      <div class="map-wrapper">
        <iframe src="..." class="studio-map"></iframe>
        <div class="map-marker"></div>
      </div>
    </div>
  </div>
</section>
```

#### 1.4 Sensory Closing

```html
<section class="sensory-closing">
  <div class="closing-image">
    <img src="assets/images/detail-shot.jpg" alt="Abambas signature detail" />
  </div>
  <p class="closing-quote">Every detail is a decision.</p>
</section>
```

---

### Phase 2: CSS Styling (contacts.css)

#### 2.1 Hero Section

```css
.contact-hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  position: relative;
}

.contact-hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  overflow: hidden;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
}

.contact-hero-title .char {
  transform: translateY(100%);
}

.contact-hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-top: 40px;
  opacity: 0;
}
```

#### 2.2 Monolith Split

```css
.monolith-split {
  padding: var(--spacing-xl) 0;
}

.split-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: start;
}

.studio-info {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-label {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}

.info-value,
.info-link {
  font-family: var(--font-heading);
  font-size: clamp(1.3rem, 2vw, 1.6rem);
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: var(--accent);
}

.social-links-secondary {
  display: flex;
  gap: 30px;
}
```

#### 2.3 Underline Form Inputs

```css
.form-group-underline {
  position: relative;
  margin-bottom: 40px;
}

.form-group-underline input,
.form-group-underline textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 300;
  color: var(--text-primary);
  transition: all 0.5s ease;
}

.form-group-underline input:focus,
.form-group-underline textarea:focus {
  outline: none;
  border-bottom-color: var(--accent);
}

.form-group-underline input::placeholder,
.form-group-underline textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}
```

#### 2.4 Portal Submit CTA

```css
.portal-submit {
  margin-top: 20px;
}

.btn-portal-circle {
  width: 80px;
  height: 80px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-portal-circle svg {
  width: 24px;
  height: 24px;
}

/* Fly-out animation on click */
.portal-submit.clicked .btn-portal-circle {
  background: var(--accent);
  color: var(--bg-primary);
}

.portal-submit.clicked .btn-portal-circle svg {
  transform: translateX(30px);
  opacity: 0;
}

.portal-submit.clicked .btn-portal-text::after {
  content: "SENT";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

#### 2.5 Atmosphere Frame (Map)

```css
.atmosphere-frame {
  padding: var(--spacing-lg) 0;
}

.frame-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 40px;
}

.frame-mask {
  overflow: hidden;
  aspect-ratio: 3 / 4;
}

.map-wrapper {
  height: 100%;
  transform: translateY(100%);
}

.studio-map {
  width: 100%;
  height: 100%;
  border: none;
  filter: sepia(30%) saturate(60%) contrast(95%);
  transition: filter 0.5s ease;
}

.studio-map:hover {
  filter: sepia(15%) saturate(80%) contrast(100%);
}
```

#### 2.6 Sensory Closing

```css
.sensory-closing {
  padding: var(--spacing-lg) 0 var(--spacing-xl);
  text-align: center;
}

.closing-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  border-radius: 50%;
  overflow: hidden;
}

.closing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.closing-quote {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
}
```

---

### Phase 3: JavaScript Animations (animations.js)

#### 3.1 Hero Masked Reveal

```javascript
function initContactHeroAnimations() {
  const title = document.querySelector(".contact-hero-title");
  const subtitle = document.querySelector(".contact-hero-subtitle");

  if (!title || !subtitle) return;

  // Split title into characters for masked reveal
  const titleText = title.textContent;
  title.innerHTML = titleText
    .split("")
    .map(
      (char) =>
        `<span class="hero-char">${char === " " ? "&nbsp;" : char}</span>`
    )
    .join("");

  const chars = title.querySelectorAll(".hero-char");

  gsap.set(chars, {
    y: "100%",
    opacity: 0,
  });

  gsap.set(subtitle, {
    opacity: 0,
    y: 20,
  });

  // Animate characters up
  gsap.to(chars, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.03,
    ease: "power4.out",
  });

  // Subtitle fades in after
  gsap.to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.8,
  });
}
```

#### 3.2 Portal Magnetic Submit

```javascript
function initPortalSubmitAnimation() {
  const submitBtn = document.querySelector(".portal-submit");

  if (!submitBtn) return;

  const circle = submitBtn.querySelector(".btn-portal-circle");
  const text = submitBtn.querySelector(".btn-portal-text");

  let isHovering = false;
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (isHovering) {
      applyMagneticPull();
    }
  });

  // Get circle position
  const updateCirclePosition = () => {
    const rect = circle.getBoundingClientRect();
    circleX = rect.left + rect.width / 2;
    circleY = rect.top + rect.height / 2;
  };

  // Magnetic pull effect
  const applyMagneticPull = () => {
    const distance = Math.sqrt(
      Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2)
    );

    if (distance < 120) {
      const strength = (120 - distance) / 120;
      const pullX = (mouseX - circleX) * strength * 0.35;
      const pullY = (mouseY - circleY) * strength * 0.35;

      gsap.to(circle, {
        x: pullX,
        y: pullY,
        duration: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(circle, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  submitBtn.addEventListener("mouseenter", () => {
    isHovering = true;
    updateCirclePosition();
  });

  submitBtn.addEventListener("mouseleave", () => {
    isHovering = false;
    gsap.to(circle, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });

  // Fly-out animation on click
  submitBtn.addEventListener("click", () => {
    submitBtn.classList.add("clicked");

    gsap.to(circle, {
      backgroundColor: "var(--accent)",
      color: "var(--bg-primary)",
      duration: 0.3,
    });

    gsap.to(circle.querySelector("svg"), {
      x: 40,
      opacity: 0,
      duration: 0.3,
    });

    setTimeout(() => {
      submitBtn.classList.remove("clicked");
      gsap.to(circle, {
        backgroundColor: "transparent",
        duration: 0.3,
      });
      gsap.to(circle.querySelector("svg"), {
        x: 0,
        opacity: 1,
        duration: 0.3,
      });
    }, 2000);
  });
}
```

#### 3.3 Frame Reveal Animation

```javascript
function initFrameRevealAnimations() {
  const frames = document.querySelectorAll(".frame-mask, .map-wrapper");

  frames.forEach((frame, index) => {
    ScrollTrigger.create({
      trigger: frame,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(frame, {
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: index * 0.2,
        });
      },
    });
  });
}
```

#### 3.4 Form Input Color Transition

```javascript
function initFormInputAnimations() {
  const inputs = document.querySelectorAll(
    ".form-group-underline input, .form-group-underline textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      gsap.to(input, {
        borderBottomColor: "var(--accent)",
        duration: 0.5,
        ease: "power2.out",
      });
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        gsap.to(input, {
          borderBottomColor: "var(--border)",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  });
}
```

---

### Phase 4: Mobile Responsiveness

```css
@media (max-width: 1024px) {
  .split-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .frame-mask {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    min-height: 60vh;
    padding-top: 100px;
  }

  .studio-info {
    gap: 30px;
  }

  .portal-submit {
    margin-top: 10px;
  }

  .closing-image {
    width: 150px;
    height: 150px;
  }
}
```

---

## Files to Create/Modify

1. **contacts.html** - Complete restructure with new sections
2. **css/contacts.css** - New CSS file with all Monolith styles
3. **js/animations.js** - Add new animation functions
4. **assets/images/** - Add detail shot for sensory closing

---

## Animation Timeline

| Element               | Animation              | Duration | Delay    |
| --------------------- | ---------------------- | -------- | -------- |
| Hero Title Characters | Masked reveal up       | 1.2s     | 0s       |
| Hero Subtitle         | Fade in + slide up     | 1s       | 0.8s     |
| Studio Info Items     | Staggered fade in      | 0.8s     | 0.3s     |
| Form Inputs           | Underline color change | 0.5s     | On focus |
| Map Frame             | Slide up reveal        | 1.2s     | 0s       |
| Closing Image         | Fade in + scale        | 1s       | 0s       |
| Closing Quote         | Fade in                | 0.8s     | 0.5s     |

---

## Testing Checklist

- [ ] Hero masked reveal works smoothly
- [ ] Form inputs transition from gray to bronze on focus
- [ ] Portal submit button has magnetic effect
- [ ] Map frame reveals on scroll
- [ ] Mobile layout stacks correctly
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Form validation and submission work
- [ ] Social links open correctly

---

## Estimated Time

- HTML Structure: 1-2 hours
- CSS Styling: 2-3 hours
- Animations: 2-3 hours
- Testing & Refinement: 1-2 hours
- **Total: 6-10 hours**
