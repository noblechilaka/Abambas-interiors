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

// ===================================
// GSAP & SCROLLTRIGGER SETUP
// ===================================

/**
 * GSAP and ScrollTrigger Registration
 * Core animation libraries setup and configuration
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Integration of Lenis with GSAP ScrollTrigger
 * Allows scroll-triggered animations to work with smooth scroll
 */
lenis.on("scroll", ScrollTrigger.update);

/**
 * GSAP Ticker Configuration
 * Synchronizes GSAP animations with Lenis smooth scroll
 */
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

/**
 * Lag smoothing optimization for better performance
 * Reduces animation lag for smoother experience
 */
gsap.ticker.lagSmoothing(0);

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
    x: -30
  });
  
  gsap.set(".btn-circle-outline", {
    opacity: 0,
    scale: 0.8
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

    // Animate menu overlay
    this.animationTimeline.to(
      this.mobileMenu,
      {
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
        duration: 0.6,
        ease: "power2.out",
      },
      0
    );

    // Stagger animate navigation items
    this.animationTimeline.to(
      ".mobile-nav-item",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      0.2
    );

    // Animate footer
    this.animationTimeline.to(
      ".mobile-menu-footer",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0.4
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

    // Reverse animations
    this.animationTimeline
      .to(
        ".mobile-menu-footer",
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".mobile-nav-item",
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in",
        },
        0.1
      )
      .to(
        this.mobileMenu,
        {
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(-20px)",
          duration: 0.5,
          ease: "power2.in",
        },
        0.2
      );
  }
}

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
 * Counter animation with stagger effect
 */
function initStatsAnimations() {
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: ".stats",
        start: "top 70%",
      },
      opacity: 1,
      y: -8,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
    });
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
      start: "top 70%",
    },
    opacity: 1,
    y: -8,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".work-image img", {
    scrollTrigger: {
      trigger: ".our-work",
      start: "top 70%",
    },
    scale: 1,
    duration: 1.5,
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
 * Project items reveal animation
 */
function initProjectsAnimations() {
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
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
  // Initialize all animation systems
  setupSmoothScrollLinks();
  initHeroAnimations();
  initAboutAnimations();
  initStatsAnimations();
  initServicesAnimations();
  initWorkAnimations();
  initProcessAnimations();
  initProjectsAnimations();
  initDiscussionAnimations();
  initFooterAnimations();
  initCounterAnimations();
  initContactForm();
  initNewsletterForm();
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
});

// Export for use in other files if needed
window.AnimationSystem = {
  MobileMenu,
  CinematicCarousel,
  initAnimations,
  initMobileMenu,
};
