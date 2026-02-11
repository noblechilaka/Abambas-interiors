/**
 * ===================================
 * ANIMATIONS.JS - COMPREHENSIVE ANIMATION SYSTEM
 * ===================================
 * This file contains all animation-related code for the website,
 * organized into logical sections for better maintainability.
 */

// ===================================
// SMOOTH SCROLL SYSTEM
// ===================================

/**
 * Lenis Smooth Scroll Initialization
 * Provides buttery smooth scrolling experience across the website
 */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

/**
 * Animation frame loop for Lenis integration
 * Ensures smooth 60fps scrolling performance
 */
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/**
 * Global ScrollTrigger refresh
 * Ensures all scroll triggers are properly calculated after DOM changes
 */
ScrollTrigger.refresh();

// ===================================
// NAVIGATION ANIMATIONS
// ===================================

/**
 * Navigation Scroll State Management
 * Adds 'scrolled' class to navigation based on scroll position
 */
const nav = document.querySelector(".main-nav");
lenis.on("scroll", ({ scroll }) => {
  if (scroll > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

/**
 * Enhanced Smooth Scroll for Navigation Links
 * Handles both desktop and mobile menu anchor links
 */
function setupSmoothScrollLinks() {
  document
    .querySelectorAll(".nav-menu a, .btn-circle, .btn-link")
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target, { offset: -80 });
          }
        }
      });
    });
}

/**
 * Mobile Menu Link Smooth Scroll
 * Enhanced version for mobile menu with menu close functionality
 */
function setupMobileMenuLinks(mobileMenu) {
  document.querySelectorAll(".mobile-nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && mobileMenu) {
          // Close menu first
          if (mobileMenu.isOpen) {
            mobileMenu.close();
          }

          // Then scroll with delay
          setTimeout(() => {
            lenis.scrollTo(target, { offset: -80 });
          }, 300);
        }
      }
    });
  });
}

// ===================================
// HERO SECTION ANIMATIONS
// ===================================

/**
 * Hero Section Entrance Animation Timeline
 * Coordinates multiple elements for a cohesive entrance effect
 */
function initHeroAnimations() {
  const heroTimeline = gsap.timeline();

  // Set initial states for button text and arrow animation
  gsap.set(".btn-text", {
    opacity: 0,
    x: -30,
  });

  gsap.set(".btn-circle-outline", {
    opacity: 0,
    scale: 0.8,
  });

  heroTimeline
    // Animate hero text lines with stagger effect
    .to(".hero-line", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })

    // Fade in hero image container
    .to(
      ".hero-image",
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.3"
    )
    // Scale hero image to full size
    .to(
      ".hero-image img",
      {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1"
    )
    // Button text slides in from left while arrow moves right - LAST ANIMATION
    .to(
      ".btn-text",
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    )
    .to(
      ".btn-circle-outline",
      {
        opacity: 1,
        scale: 1,
        x: 15,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );
}

/**
 * Navbar Entrance Animation
 * Staggered reveal of navbar elements for a sophisticated entrance
 * Timing: Starts after hero text begins animating for cohesive flow
 */
function initNavbarAnimations() {
  // Create a timeline that starts after hero text begins
  // The first hero line appears at around 0.5-0.8s, so we start navbar animation then
  const navTimeline = gsap.timeline({
    delay: 0.8, // Start after first hero line appears
  });

  // Animate logo in first
  navTimeline
    .to(".logo", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    // Animate nav menu items with stagger
    .to(
      ".nav-menu li",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1, // Each item appears 0.1s after the previous
        ease: "power2.out",
      },
      "-=0.2" // Start slightly before logo animation completes
    )
    // Animate phone number last
    .to(
      ".nav-phone",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.1" // Start slightly before nav items complete
    );
}

// ===================================
// MOBILE MENU ANIMATIONS
// ===================================

/**
 * Mobile Menu Manager with GSAP Animations
 * Handles mobile menu open/close with smooth transitions
 */
class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.mobileMenu = document.querySelector(".mobile-menu-overlay");
    this.mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    this.body = document.body;

    this.isOpen = false;
    this.animationTimeline = null;

    this.init();
  }

  init() {
    if (!this.hamburger || !this.mobileMenu) return;

    this.bindEvents();
    this.setupAccessibility();
  }

  bindEvents() {
    // Hamburger click
    this.hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Navigation link clicks
    this.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Allow normal anchor behavior but close menu after
        setTimeout(() => this.close(), 300);
      });
    });

    // Click outside to close
    this.mobileMenu.addEventListener("click", (e) => {
      if (e.target === this.mobileMenu) {
        this.close();
      }
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      if (this.isOpen) {
        this.close();
      }
    });
  }

  setupAccessibility() {
    // Update hamburger ARIA attributes
    this.hamburger.setAttribute("aria-expanded", "false");
    this.hamburger.setAttribute("aria-label", "Open mobile menu");

    // Set initial menu ARIA state
    this.mobileMenu.setAttribute("aria-hidden", "true");
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.body.classList.add("menu-open");
    this.hamburger.classList.add("active");
    this.hamburger.setAttribute("aria-expanded", "true");
    this.hamburger.setAttribute("aria-label", "Close mobile menu");
    this.mobileMenu.setAttribute("aria-hidden", "false");

    // Add to browser history
    history.pushState({ mobileMenuOpen: true }, "", window.location.href);

    // GSAP Animation Timeline
    this.animationTimeline = gsap.timeline({
      onComplete: () => {
        // Focus first navigation link for accessibility
        if (this.mobileNavLinks.length > 0) {
          this.mobileNavLinks[0].focus();
        }
      },
    });

    // Animate menu overlay - smoother, minimal animation
    this.animationTimeline.to(
      this.mobileMenu,
      {
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
        duration: 0.7,
        ease: "power3.out",
      },
      0
    );

    // Stagger animate navigation items - tighter timing
    this.animationTimeline.to(
      ".mobile-nav-item",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.15
    );

    // Animate footer
    this.animationTimeline.to(
      ".mobile-menu-footer",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      0.35
    );
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.body.classList.remove("menu-open");
    this.hamburger.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.hamburger.setAttribute("aria-label", "Open mobile menu");
    this.mobileMenu.setAttribute("aria-hidden", "true");

    // Remove from browser history
    if (history.state && history.state.mobileMenuOpen) {
      history.back();
    }

    // GSAP Reverse Animation
    this.animationTimeline = gsap.timeline({
      onComplete: () => {
        // Return focus to hamburger
        this.hamburger.focus();
      },
    });

    // Reverse animations - smoother, minimal timing
    this.animationTimeline
      .to(
        ".mobile-menu-footer",
        {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power3.in",
        },
        0
      )
      .to(
        ".mobile-nav-item",
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.in",
        },
        0.08
      )
      .to(
        this.mobileMenu,
        {
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(-10px)",
          duration: 0.5,
          ease: "power3.in",
        },
        0.15
      );
  }
}

// ===================================
// CATEGORY SECTION ANIMATIONS
// ===================================
gsap.set(".category", {
  y: 50,
  clipPath: "inset(100% 0% 0% 0%)",
});

gsap.to(".category", {
  y: 0,
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 1.1,
  ease: "power4.out",
  stagger: 0.16,
  scrollTrigger: {
    trigger: ".categories",
    start: "top 75%",
  },
});

gsap.to(".category", {
  scale: 1,
  scrollTrigger: {
    trigger: ".category",
    start: "left center",
    end: "right center",
    scrub: true,
  },
});

ScrollTrigger.matchMedia({
  "(max-width: 1023px)": function () {
    gsap.from(".category", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".categories",
        start: "top 85%",
      },
    });
  },
});
// ===================================
// SCROLL-TRIGGERED SECTION ANIMATIONS
// ===================================

/**
 * About Section Animations
 * Content and image reveal animations
 */
function initAboutAnimations() {
  // About content animation
  gsap.to(".about-content", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    ease: "power2.out",
  });

  // Section label animation
  gsap.fromTo(
    ".section-label",
    {
      opacity: 0,
      y: 10,
    },
    {
      scrollTrigger: {
        trigger: ".section-label",
        start: "top 85%",
      },
      opacity: 0.8,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }
  );

  // About image animation
  gsap.to(".about-image", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });

  // About image scale animation
  gsap.to(".about-image img", {
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
    },
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
  });
}

/**
 * Stats Section Animations
 * Single trigger for entire stats section to prevent repeated motion
 */
function initStatsAnimations() {
  // Create a single scroll trigger for the entire stats section
  ScrollTrigger.create({
    trigger: ".stats",
    start: "top 70%",
    once: true,
    onEnter: () => {
      // Animate all stat items with stagger
      gsap.to(".stat-item", {
        opacity: 1,
        y: -8,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
  });
}

/**
 * Services Section Animations
 * Service items reveal animation with stagger
 */
function initServicesAnimations() {
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: ".services",
        start: "top 70%",
      },
      opacity: 1,
      y: -8,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
    });
  });
}

/**
 * Work Section Animations
 * Work images reveal and scale animations
 */
function initWorkAnimations() {
  gsap.to(".work-image", {
    scrollTrigger: {
      trigger: ".our-work",
      start: "top 65%",
    },
    opacity: 1,
    y: -8,
    duration: 0.8,
    ease: "power2.out",
  });

  gsap.to(".work-image img", {
    scrollTrigger: {
      trigger: ".our-work",
      start: "top 65%",
    },
    scale: 1,
    duration: 1.2,
    ease: "power2.out",
  });
}

/**
 * Process Section Animations
 * Process items reveal animation
 */
function initProcessAnimations() {
  const processItems = document.querySelectorAll(".process-item");
  processItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
      },
      opacity: 1,
      y: -8,
      duration: 0.8,
      ease: "power2.out",
    });
  });
}

/**
 * Projects Section Animations
 * Project items reveal animation with parallax
 */
function initProjectsAnimations() {
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
      },
      opacity: 1,
      y: -8,
      duration: 1,
      ease: "power2.out",
    });

    // Add subtle parallax to project images
    const image = item.querySelector(".project-image img");
    if (image) {
      gsap.to(image, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        y: -20,
        ease: "none",
      });
    }
  });
}

/**
 * Product Categories Section Animations
 * Category items reveal animation with stagger
 */
function initProductCategoriesAnimations() {
  const categoryItems = document.querySelectorAll(".category-item");
  categoryItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: ".product-categories",
        start: "top 70%",
      },
      opacity: 1,
      y: -8,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power2.out",
    });
  });

  // Animate categories intro
  gsap.to(".categories-intro", {
    scrollTrigger: {
      trigger: ".product-categories",
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out",
  });

  // Animate categories image
  gsap.to(".categories-image", {
    scrollTrigger: {
      trigger: ".product-categories",
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });

  // Animate CTA buttons
  gsap.to(".categories-cta", {
    scrollTrigger: {
      trigger: ".product-categories",
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
  });
}

/**
 * CTA Button Animation System
 * Fade and settle buttons into view when entering viewport
 */
function initCTAAnimations() {
  const ctaContainers = [
    ".hero-button",
    ".service-button",
    ".project-button-container",
    ".form-button-container",
    ".categories-cta",
  ];

  ctaContainers.forEach((selector) => {
    const containers = document.querySelectorAll(selector);
    containers.forEach((container, index) => {
      const triggerElement =
        container.closest(".hero") ||
        container.closest(".services") ||
        container.closest(".projects") ||
        container.closest(".discussion") ||
        container.closest(".product-categories") ||
        container;

      gsap.to(container, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 70%",
        },
        opacity: 1,
        y: -8,
        duration: 0.8,
        delay: 0.3 + index * 0.1,
        ease: "power2.out",
      });
    });
  });
}

/**
 * Discussion Section Animations
 * Discussion image reveal and scale animations
 */
function initDiscussionAnimations() {
  gsap.to(".discussion-image", {
    scrollTrigger: {
      trigger: ".discussion",
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  });

  gsap.to(".discussion-image img", {
    scrollTrigger: {
      trigger: ".discussion",
      start: "top 70%",
    },
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
  });
}

/**
 * Footer Section Animations
 * Footer image and contact items reveal animations
 */
function initFooterAnimations() {
  gsap.to(".footer-image", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".footer-image img", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 70%",
    },
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
  });

  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 70%",
      },
      opacity: 1,
      y: -8,
      duration: 0.8,
      delay: 0.3 + index * 0.15,
      ease: "power2.out",
    });
  });
}

// ===================================
// CINEMATIC CAROUSEL ANIMATIONS
// ===================================

/**
 * Cinematic Carousel Implementation
 * Advanced carousel with GSAP animations, touch support, and autoplay
 */
class CinematicCarousel {
  constructor() {
    this.carousel = document.querySelector(".cinematic-carousel");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.progressLine = document.querySelector(".progress-line");
    this.prevBtn = document.querySelector(".carousel-prev");
    this.nextBtn = document.querySelector(".carousel-next");

    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoplayInterval = null;
    this.isAnimating = false;
    this.autoplayDuration = 7000; // 7 seconds
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (!this.carousel || this.totalSlides === 0) return;

    this.setupEventListeners();
    this.startAutoplay();
    this.setupScrollInteraction();
    this.setupProgressAnimation();
  }

  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Touch events for mobile
    this.carousel.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.carousel.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );

    // Pause autoplay on hover
    this.carousel.addEventListener("mouseenter", () => this.pauseAutoplay());
    this.carousel.addEventListener("mouseleave", () => this.startAutoplay());

    // Pause autoplay when not visible
    this.observeVisibility();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAutoplay();
          } else {
            this.pauseAutoplay();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.carousel);
  }

  setupScrollInteraction() {
    // Scroll-triggered slide advancement
    ScrollTrigger.create({
      trigger: this.carousel,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        if (this.isAnimating) return;

        const progress = self.progress;
        const slideProgress = progress * this.totalSlides;
        const targetSlide = Math.floor(slideProgress) % this.totalSlides;

        if (targetSlide !== this.currentSlide && !this.isAnimating) {
          this.goToSlide(targetSlide, false); // false = don't restart autoplay
        }
      },
    });
  }

  setupProgressAnimation() {
    // Reset progress line on slide change
    const originalGoToSlide = this.goToSlide.bind(this);
    this.goToSlide = (index, restartAutoplay = true) => {
      if (this.isAnimating) return;

      originalGoToSlide(index, restartAutoplay);

      // Reset and animate progress line
      if (this.progressLine) {
        this.progressLine.style.transition = "none";
        this.progressLine.style.width = "0%";

        // Force reflow
        this.progressLine.offsetHeight;

        // Animate progress
        this.progressLine.style.transition = `width ${this.autoplayDuration}ms ease-in-out`;
        this.progressLine.style.width = "100%";
      }
    };
  }

  nextSlide() {
    if (this.isAnimating) return;
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    if (this.isAnimating) return;
    const prevIndex =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  goToSlide(index, restartAutoplay = true) {
    if (this.isAnimating || index === this.currentSlide) return;

    this.isAnimating = true;

    const currentSlideEl = this.slides[this.currentSlide];
    const targetSlideEl = this.slides[index];

    // GSAP cross-fade transition
    gsap
      .timeline({
        onComplete: () => {
          this.currentSlide = index;
          this.isAnimating = false;
          if (restartAutoplay) {
            this.startAutoplay();
          }
        },
      })
      .to(currentSlideEl, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .set(currentSlideEl, { zIndex: 0 })
      .set(targetSlideEl, { zIndex: 1 })
      .fromTo(
        targetSlideEl,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.4"
      );
  }

  startAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }

    this.autoplayInterval = setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, this.autoplayDuration);
  }

  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// ===================================
// COUNTER ANIMATIONS
// ===================================

/**
 * Animated Counter Function
 * Creates counting animation for statistics numbers
 * @param {HTMLElement} element - The element to animate
 */
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Stats Counter Animation Setup
 * Triggers counter animations when stats section becomes visible
 */
function initCounterAnimations() {
  ScrollTrigger.create({
    trigger: ".stats",
    start: "top 70%",
    onEnter: () => {
      document.querySelectorAll(".stat-number").forEach(animateCounter);
    },
    once: true,
  });
}

// ===================================
// FORM INTERACTION HANDLING
// ===================================

/**
 * Contact Form Submission Handler
 * Handles contact form submission with basic validation and feedback
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      };

      console.log("Form submitted:", formData);

      alert("Thank you for your message! We will get back to you soon.");
      form.reset();
    });
  }
}

/**
 * Newsletter Subscription Handler
 * Handles newsletter form submission
 */
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector("input[type='email']").value;

      console.log("Newsletter subscription:", email);

      alert(
        "Thank you for subscribing! You'll receive our latest updates soon."
      );
      newsletterForm.reset();
    });
  }
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize Mobile Menu
 * Creates mobile menu instance and sets up mobile navigation links
 */
function initMobileMenu() {
  const mobileMenu = new MobileMenu();
  setupMobileMenuLinks(mobileMenu);
  return mobileMenu;
}

/**
 * Initialize Cinematic Carousel
 * Creates carousel instance when DOM is ready
 */
function initCarousel() {
  new CinematicCarousel();
}

/**
 * Main Animation Initialization
 * Called when DOM is fully loaded to initialize all animations
 */
function initAnimations() {
  // Check if mobile and adjust animation durations
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Reduce animation durations by 30% for mobile
    gsap.globalTimeline.timeScale(0.7);
  }

  // Initialize all animation systems
  setupSmoothScrollLinks();
  initHeroAnimations();
  initNavbarAnimations(); // Navbar staggered entrance (starts after hero text)
  initAboutAnimations();
  initStatsAnimations();
  initServicesAnimations();
  initWorkAnimations();
  initProcessAnimations();
  initProjectsAnimations();
  initProductCategoriesAnimations();
  initCTAAnimations();
  initDiscussionAnimations();
  initFooterAnimations();
  initCounterAnimations();
  initContactForm();
  initNewsletterForm();

  // Initialize new magnetic portal CTAs
  initMagneticPortalCTAs();
}

/**
 * Magnetic Portal CTA System
 * Creates magnetic pull effect for portal-style CTAs
 */
function initMagneticPortalCTAs() {
  const portalCTAs = document.querySelectorAll(".btn-portal");

  portalCTAs.forEach((cta) => {
    const circle = cta.querySelector(".btn-portal-circle");
    if (!circle) return;

    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let ctaX = 0;
    let ctaY = 0;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Get CTA position
    const updatePosition = () => {
      const rect = circle.getBoundingClientRect();
      ctaX = rect.left + rect.width / 2;
      ctaY = rect.top + rect.height / 2;
    };

    // Magnetic pull effect
    const applyMagneticPull = () => {
      if (!isHovering) return;

      const distance = Math.sqrt(
        Math.pow(mouseX - ctaX, 2) + Math.pow(mouseY - ctaY, 2)
      );

      // Only apply magnetism within 100px radius
      if (distance < 100) {
        const strength = (100 - distance) / 100; // 0 to 1
        const pullX = (mouseX - ctaX) * strength * 0.3;
        const pullY = (mouseY - ctaY) * strength * 0.3;

        gsap.to(circle, {
          x: pullX,
          y: pullY,
          duration: 0.1,
          ease: "power2.out",
        });
      } else {
        // Return to original position
        gsap.to(circle, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Hover events
    cta.addEventListener("mouseenter", () => {
      isHovering = true;
      cta.classList.add("magnetic");
      updatePosition();
    });

    cta.addEventListener("mouseleave", () => {
      isHovering = false;
      cta.classList.remove("magnetic");
      gsap.to(circle, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    // Continuous magnetic effect while hovering
    const magneticLoop = () => {
      if (isHovering) {
        updatePosition();
        applyMagneticPull();
      }
      requestAnimationFrame(magneticLoop);
    };
    magneticLoop();
  });
}

/**
 * DOM Content Loaded Event Listeners
 * Ensures animations initialize after DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousel when DOM is ready
  initCarousel();

  // Initialize mobile menu and other DOM-dependent functionality
  const mobileMenu = initMobileMenu();

  // Initialize all animations
  initAnimations();

  // Initialize luxury cursor
  new LuxuryCursor();

  // Initialize text reveal animations
  initTextReveals();

  // Initialize Abambas Method process section
  initAbambasMethod();

  // Initialize example modals
  initExampleModals();

  // Initialize comparison slider
  new ComparisonSlider();

  // Initialize project hover stats
  initProjectHoverStats();

  // Initialize parallax effects
  initParallaxEffects();

  // Initialize multi-step inquiry form
  new MultiStepForm("inquiryForm");

  // Handle reduced motion preference
  initReducedMotion();
});

// ===================================
// CUSTOM LUXURY CURSOR
// ===================================

/**
 * Custom Cursor Implementation
 * Elegant ring cursor with buttery smooth interpolation
 */
class LuxuryCursor {
  constructor() {
    this.cursor = document.getElementById("customCursor");
    this.cursorDot = document.getElementById("customCursorDot");
    this.hoverElements = [
      "a",
      "button",
      ".btn-link",
      ".btn-circle",
      ".btn-circle-outline",
      ".btn-circle-solid",
      ".project-item",
      ".category",
      ".service-item",
      ".process-item",
      ".contact-item",
      ".stat-item",
      ".nav-menu a",
      ".mobile-nav-link",
      ".social-icon",
      ".category-item",
      ".option-card",
      ".btn-next",
      ".btn-back",
      ".btn-submit",
      ".btn-book-calendar",
      ".phase-cta",
      ".example-link",
    ];

    // Cursor position tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.dotX = 0;
    this.dotY = 0;

    // Smooth interpolation factor (lower = smoother/slower)
    this.lerpFactor = 0.1;

    this.isVisible = false;
    this.isHovering = false;

    this.init();
  }

  init() {
    if (!this.cursor || !this.cursorDot) return;

    // Check for touch device
    if ("ontouchstart" in window) {
      this.cursor.style.display = "none";
      this.cursorDot.style.display = "none";
      return;
    }

    this.bindEvents();
    this.animate();
  }

  bindEvents() {
    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      this.isVisible = true;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Show cursor immediately on first move
      this.cursor.style.opacity = "1";
      this.cursorDot.style.opacity = "1";
    });

    // Mouse leave window
    document.addEventListener("mouseleave", () => {
      this.isVisible = false;
      this.cursor.style.opacity = "0";
      this.cursorDot.style.opacity = "0";
    });

    // Mouse enter window
    document.addEventListener("mouseenter", () => {
      this.isVisible = true;
      this.cursor.style.opacity = "1";
      this.cursorDot.style.opacity = "1";
    });

    // Hover states
    this.hoverElements.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => this.expand());
        el.addEventListener("mouseleave", () => this.shrink());
      });
    });

    // Handle iframe interactions
    document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.addEventListener("mouseenter", () => this.hide());
      iframe.addEventListener("mouseleave", () => this.show());
    });
  }

  expand() {
    this.isHovering = true;
    this.cursor.classList.add("hover");
  }

  shrink() {
    this.isHovering = false;
    this.cursor.classList.remove("hover");
  }

  hide() {
    this.cursor.classList.add("hidden");
    this.cursorDot.classList.add("hidden");
  }

  show() {
    this.cursor.classList.remove("hidden");
    this.cursorDot.classList.remove("hidden");
  }

  // Linear interpolation for smooth movement
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  animate() {
    // Smoothly interpolate cursor position towards mouse position
    this.cursorX = this.lerp(this.cursorX, this.mouseX, this.lerpFactor);
    this.cursorY = this.lerp(this.cursorY, this.mouseY, this.lerpFactor);

    // Dot follows faster (higher lerp factor)
    this.dotX = this.lerp(this.dotX, this.mouseX, 0.25);
    this.dotY = this.lerp(this.dotY, this.mouseY, 0.25);

    // Apply positions
    if (this.cursor) {
      this.cursor.style.left = `${this.cursorX}px`;
      this.cursor.style.top = `${this.cursorY}px`;
    }

    if (this.cursorDot) {
      this.cursorDot.style.left = `${this.dotX}px`;
      this.cursorDot.style.top = `${this.dotY}px`;
    }

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
}

// ===================================
// TEXT REVEAL ANIMATIONS
// ===================================

/**
 * Text Reveal Animation System
 * Headings float up from 0% opacity as they enter viewport
 * Uses GSAP native animation for smooth, performant reveals
 */
function initTextReveals() {
  // Select all headings and elements that need reveal animation
  const revealElements = document.querySelectorAll(
    ".section-title, .hero-title, .stat-number, .section-label, " +
      ".process-title, .service-title, .project-title, .phase-title, " +
      ".about-text, .service-description, .process-description, " +
      ".project-description, .discussion-text, .newsletter-title, " +
      ".step-question, .inquiry-intro, .phase-description"
  );

  // Set initial hidden state for all elements
  gsap.set(revealElements, {
    y: 30,
    opacity: 0,
  });

  // Animate each element when it enters viewport
  revealElements.forEach((el, index) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: index * 0.05,
    });
  });
}

// ===================================
// PREFERS REDUCED MOTION
// ===================================

/**
 * Handle prefers-reduced-motion preference
 */
function initReducedMotion() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Disable all enhanced animations
    document
      .querySelectorAll(".custom-cursor, .grain-overlay")
      .forEach((el) => {
        el.style.display = "none";
      });

    // Reset all animated elements
    document.querySelectorAll(".text-reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
}

// ===================================
// BEFORE/AFTER COMPARISON SLIDER
// ===================================

/**
 * Comparison Slider Implementation
 * Draggable before/after transformation reveal
 */
class ComparisonSlider {
  constructor() {
    this.slider = document.getElementById("comparisonSlider");
    this.beforeImage = this.slider?.querySelector(".comparison-before");
    this.afterImage = this.slider?.querySelector(".comparison-after");
    this.handle = this.slider?.querySelector(".comparison-handle");

    this.isDragging = false;
    this.init();
  }

  init() {
    if (!this.slider || !this.beforeImage || !this.afterImage || !this.handle)
      return;

    // Mouse events
    this.slider.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.endDrag());

    // Touch events
    this.slider.addEventListener("touchstart", (e) => this.startDrag(e), {
      passive: true,
    });
    document.addEventListener("touchmove", (e) => this.drag(e), {
      passive: true,
    });
    document.addEventListener("touchend", () => this.endDrag());

    // Click to position
    this.slider.addEventListener("click", (e) => {
      if (!this.isDragging) {
        this.setPosition(e.clientX || e.touches?.[0]?.clientX);
      }
    });
  }

  startDrag(e) {
    this.isDragging = true;
    this.setPosition(e.clientX || e.touches?.[0]?.clientX);
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.setPosition(e.clientX || e.touches?.[0]?.clientX);
  }

  endDrag() {
    this.isDragging = false;
  }

  setPosition(x) {
    const rect = this.slider.getBoundingClientRect();
    let percentage = ((x - rect.left) / rect.width) * 100;

    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    this.afterImage.style.width = `${percentage}%`;
    this.handle.style.left = `${percentage}%`;

    // Move handle vertically to center
    const handleHeight = 50;
    this.handle.style.top = `calc(50% - ${handleHeight / 2}px)`;
  }
}

/**
 * Project Hover Stats Overlay
 * Shows stats on project card hover
 */
function initProjectHoverStats() {
  const projectCards = document.querySelectorAll(".project-item");

  projectCards.forEach((card) => {
    const overlay = card.querySelector(".project-stats-overlay");
    if (!overlay) return;

    // Create overlay if it doesn't exist
    if (overlay.children.length === 0) {
      // Stats are now visible on hover for featured project
    }

    card.addEventListener("mouseenter", () => {
      overlay.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0";
    });
  });
}

/**
 * Parallax Image Effect
 * Creates depth by moving images at different speeds
 */
function initParallaxEffects() {
  const parallaxContainers = document.querySelectorAll(".parallax-container");

  if (parallaxContainers.length === 0) return;

  parallaxContainers.forEach((container) => {
    const image = container.querySelector(".parallax-image");
    if (!image) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const translateY = (progress - 0.5) * 40; // -20px to 20px
        image.style.transform = `translateY(${translateY}px)`;
      },
    });
  });
}

/**
 * Multi-Step Inquiry Form
 * Concierge-style qualifying form
 */
class MultiStepForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.steps = this.form?.querySelectorAll(".form-step");
    this.progressSteps = this.form?.querySelectorAll(".progress-step");
    this.currentStep = 1;
    this.totalSteps = this.steps?.length || 3;

    if (!this.form || !this.steps) return;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateProgress();
  }

  bindEvents() {
    // Next buttons
    this.form.querySelectorAll(".btn-next").forEach((btn) => {
      btn.addEventListener("click", () => this.nextStep());
    });

    // Back buttons
    this.form.querySelectorAll(".btn-back").forEach((btn) => {
      btn.addEventListener("click", () => this.prevStep());
    });

    // Radio inputs - enable next button
    this.form.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", (e) => {
        this.enableNextButton();
      });
    });

    // Form submit
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  goToStep(stepNumber) {
    // Hide current step
    this.steps[this.currentStep - 1]?.classList.remove("active");
    this.progressSteps[this.currentStep - 1]?.classList.remove("active");

    // Show target step
    this.currentStep = stepNumber;
    this.steps[this.currentStep - 1]?.classList.add("active");
    this.progressSteps[this.currentStep - 1]?.classList.add("active");

    this.updateProgress();

    // Scroll to form on mobile
    if (window.innerWidth < 768) {
      const formTop =
        this.form.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: formTop, behavior: "smooth" });
    }
  }

  updateProgress() {
    this.progressSteps.forEach((step, index) => {
      if (index + 1 <= this.currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    // Disable next button if no selection
    const currentStepEl = this.steps[this.currentStep - 1];
    const nextBtn = currentStepEl?.querySelector(".btn-next");
    const hasSelection = currentStepEl?.querySelector(
      'input[type="radio"]:checked'
    );

    if (nextBtn) {
      nextBtn.disabled = !hasSelection && this.currentStep < this.totalSteps;
    }
  }

  enableNextButton() {
    const currentStepEl = this.steps[this.currentStep - 1];
    const nextBtn = currentStepEl?.querySelector(".btn-next");

    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      space: this.form.querySelector('input[name="space"]:checked')?.value,
      timeline: this.form.querySelector('input[name="timeline"]:checked')
        ?.value,
      vision: this.form.querySelector('textarea[name="vision"]')?.value,
      name: this.form.querySelector('input[name="name"]')?.value,
      email: this.form.querySelector('input[name="email"]')?.value,
      phone: this.form.querySelector('input[name="phone"]')?.value,
    };

    console.log("Inquiry form submitted:", formData);

    // Hide all steps
    this.steps.forEach((step) => step.classList.remove("active"));
    this.progressSteps.forEach((step) => step.classList.remove("active"));
    this.form.querySelector(".form-progress")?.classList.add("hidden");
    this.form.querySelector(".booking-cta")?.classList.add("hidden");

    // Show success message
    this.form.querySelector(".form-success")?.classList.add("active");

    // In production, you would send this data to your server
    // Example: sendToServer(formData);
  }
}

// ===================================
// ABAMBAS METHOD - PROCESS SECTION
// ===================================

/**
 * Abambas Method Phase Scroll Highlighting
 * Phases glow when active, desaturate when inactive
 */
function initAbambasMethod() {
  const phases = document.querySelectorAll(".phase");
  const phaseDots = document.querySelectorAll(".phase-dot");

  if (phases.length === 0) return;

  // Create scroll triggers for each phase
  phases.forEach((phase, index) => {
    ScrollTrigger.create({
      trigger: phase,
      start: "top 65%",
      end: "bottom center",
      onEnter: () => activatePhase(index + 1),
      onEnterBack: () => activatePhase(index + 1),
      onLeave: () => deactivatePhase(index + 1),
      onLeaveBack: () => {},
    });
  });

  function activatePhase(phaseNumber) {
    // Update phases
    phases.forEach((phase, index) => {
      if (index + 1 === phaseNumber) {
        phase.classList.add("active");
      } else {
        phase.classList.remove("active");
      }
    });

    // Update dots
    phaseDots.forEach((dot, index) => {
      if (index + 1 === phaseNumber) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function deactivatePhase(phaseNumber) {
    // Optional: Keep phase active while visible
  }
}

/**
 * Example Modal System
 * Handles "See an Example" popup functionality
 */
function initExampleModals() {
  const exampleLinks = document.querySelectorAll(".example-link");
  const modals = document.querySelectorAll(".example-modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  if (exampleLinks.length === 0) return;

  // Open modal on link click
  exampleLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const exampleType = link.getAttribute("data-example");
      const modal = document.getElementById(`${exampleType}-modal`);

      if (modal) {
        openModal(modal);
      }
    });
  });

  // Close modal on button click
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".example-modal");
      closeModal(modal);
    });
  });

  // Close modal on backdrop click
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.classList.contains("active")) {
          closeModal(modal);
        }
      });
    }
  });

  function openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    setTimeout(() => {
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Export for use in other files if needed
window.AnimationSystem = {
  MobileMenu,
  CinematicCarousel,
  initAnimations,
  initMobileMenu,
  LuxuryCursor,
  initTextReveals,
  initReducedMotion,
  initAbambasMethod,
  initExampleModals,
};
