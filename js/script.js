/**
 * ===================================
 * SCRIPT.JS - CORE FUNCTIONALITY
 * ===================================
 * This file contains only non-animation related functionality.
 * All animations have been moved to animations.js for better organization.
 */

// ===================================
// DYNAMIC MONOLITH FETCHER
// Centralized Content Store with Ghost Frame System
// ===================================

/**
 * Global state for content cache
 */
const ContentStore = {
  products: null,
  projects: null,
  isLoading: false,
};

/**
 * Fetch content from JSON files
 * @param {string} type - 'products' or 'projects'
 * @returns {Promise<Array>} - Array of content items
 */
async function fetchContent(type) {
  // Return cached data if available
  if (ContentStore[type]) {
    return ContentStore[type];
  }

  const endpoint =
    type === "products"
      ? "assets/data/products.json"
      : "assets/data/projects.json";

  try {
    ContentStore.isLoading = true;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}: ${response.status}`);
    }

    const data = await response.json();
    ContentStore[type] = data[type] || [];
    ContentStore.isLoading = false;

    return ContentStore[type];
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    ContentStore.isLoading = false;
    return [];
  }
}

/**
 * Render Ghost Frames (Skeleton) for catalog
 * Creates placeholder frames while data is being fetched
 */
function renderGhostFrames(container, count = 4) {
  const ghostHTML = Array(count)
    .fill(0)
    .map(
      () => `
    <section class="monolith-row ghost-row">
      <div class="monolith-image-col">
        <div class="monolith-image-frame ghost-frame">
          <div class="ghost-text ghost-text-lg" style="height: 100%;"></div>
        </div>
      </div>
      <div class="monolith-text-col">
        <div class="monolith-text-content">
          <span class="ghost-text ghost-text-sm" style="display: block; width: 40px; height: 12px; margin-bottom: 20px;"></span>
          <span class="ghost-text ghost-text-lg" style="display: block; height: 40px; margin-bottom: 20px;"></span>
          <span class="ghost-text ghost-text-md" style="display: block; height: 60px; margin-bottom: 20px;"></span>
          <span class="ghost-text ghost-text-sm" style="display: block; width: 100px; height: 20px;"></span>
        </div>
      </div>
    </section>
  `
    )
    .join("");

  container.innerHTML = ghostHTML;
}

/**
 * Render a single product row
 * @param {Object} product - Product data
 * @param {number} index - Product index
 * @param {boolean} isReversed - Whether row should be reversed
 * @returns {string} - HTML string for the row
 */
function renderProductRow(product, index, isReversed = false) {
  const reversedClass = isReversed ? "reversed" : "";
  const imageSrc =
    product.images && product.images[0]
      ? product.images[0]
      : "assets/images/placeholder.jpg";

  return `
    <section class="monolith-row ${reversedClass}" data-category="${
    product.category
  }" data-product-id="${product.id}">
      <div class="monolith-image-col">
        <div class="monolith-image-frame" data-product-id="${product.id}">
          <img src="${imageSrc}" alt="${
    product.name
  }" class="monolith-product-image" loading="lazy" />
          <div class="portal-btn">
            <div class="portal-btn-circle">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="portal-btn-text">INQUIRE</span>
          </div>
        </div>
      </div>
      <div class="monolith-text-col">
        <div class="monolith-text-content">
          <span class="monolith-number">${
            product.number || String(index + 1).padStart(2, "0")
          }</span>
          <h2 class="monolith-product-name">${product.name}</h2>
          <p class="monolith-specs">${product.specs || ""}</p>
          <p class="monolith-material">${product.material || ""}</p>
          <button class="monolith-cta" data-product-id="${
            product.id
          }" data-product-name="${product.name}">
            <div class="cta-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="cta-text">INQUIRE</span>
          </button>
        </div>
      </div>
    </section>
  `;
}

/**
 * Render a project row
 * @param {Object} project - Project data
 * @param {number} index - Project index
 * @param {boolean} isReversed - Whether row should be reversed
 * @returns {string} - HTML string for the row
 */
function renderProjectRow(project, index, isReversed = false) {
  const reversedClass = isReversed ? "project-row-reverse" : "";
  const imageSrc =
    project.thumbnail ||
    (project.images && project.images[0]) ||
    "assets/images/placeholder.jpg";

  return `
    <article class="project-row ${reversedClass}" data-category="${project.category}" data-project-id="${project.id}">
      <div class="project-monolith-frame" data-project-id="${project.id}">
        <div class="frame-reveal-mask">
          <div class="frame-reveal-inner">
            <img src="${imageSrc}" alt="${project.title}" class="project-monolith-image" loading="lazy" />
            <div class="portal-overlay">
              <div class="portal-circle-large">
                <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-details">
        <div class="details-inner">
          <h2 class="project-title">${project.title}</h2>
          <div class="project-vibe">
            <span class="vibe-style">${project.style}</span>
            <span class="vibe-year">${project.year}</span>
          </div>
          <a href="#" class="portal-cta" data-project-id="${project.id}" data-project-title="${project.title}">
            <span class="portal-cta-text">STEP INSIDE</span>
            <span class="portal-cta-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initialize Catalog with Staggered Render
 * Fetches products and renders with staggered reveal
 */
async function initCatalogWithStaggeredRender() {
  const catalogContainer = document.querySelector(".monolith-catalog");
  if (!catalogContainer) return;

  // Show ghost frames while fetching
  renderGhostFrames(catalogContainer, 4);

  // Fetch products
  const products = await fetchContent("products");

  if (products.length === 0) {
    console.warn("No products found");
    return;
  }

  // Clear ghost frames
  catalogContainer.innerHTML = "";

  // Render products with staggered delay (domino effect)
  products.forEach((product, index) => {
    const isReversed = index % 2 !== 0;
    const rowHTML = renderProductRow(product, index, isReversed);

    // Create a container for each row
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = rowHTML;
    const rowElement = tempDiv.firstElementChild;

    // Start hidden for animation
    rowElement.style.opacity = "0";
    rowElement.style.transform = "translateY(40px)";

    catalogContainer.appendChild(rowElement);

    // Staggered reveal: 100ms delay between each item
    setTimeout(() => {
      rowElement.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      rowElement.style.opacity = "1";
      rowElement.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Initialize portal interactions after render
  setTimeout(() => {
    initProductPortalInteractions();
    initCatalogCategoryFilter();
  }, products.length * 100 + 200);
}

/**
 * Initialize Projects with Staggered Render
 * Fetches projects and renders with staggered reveal
 */
async function initProjectsWithStaggeredRender() {
  const projectsContainer = document.querySelector(".projects-stream");
  if (!projectsContainer) return;

  // Show ghost frames while fetching
  const ghostCount = document.querySelectorAll(".project-row").length;
  if (ghostCount > 0) {
    // Already has static content, skip dynamic loading
    return;
  }

  // Fetch projects
  const projects = await fetchContent("projects");

  if (projects.length === 0) {
    console.warn("No projects found");
    return;
  }

  // Render projects with staggered delay
  projects.forEach((project, index) => {
    const isReversed = index % 2 !== 0;
    const rowHTML = renderProjectRow(project, index, isReversed);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = rowHTML;
    const rowElement = tempDiv.firstElementChild;

    rowElement.style.opacity = "0";
    rowElement.style.transform = "translateY(40px)";

    projectsContainer.appendChild(rowElement);

    // Staggered reveal: 100ms delay
    setTimeout(() => {
      rowElement.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      rowElement.style.opacity = "1";
      rowElement.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Initialize project interactions
  setTimeout(() => {
    initProjectDeepDive();
  }, projects.length * 100 + 200);
}

// ===================================
// PROJECT DEEP DIVE (SHARED ELEMENT TRANSITIONS)
// ===================================

/**
 * Project Detail Overlay System
 * Handles click-to-expand with morphing animation
 */
class ProjectDeepDive {
  constructor() {
    this.overlay = null;
    this.isOpen = false;
    this.currentProject = null;
    this.init();
  }

  init() {
    this.createOverlay();
    this.bindEvents();
  }

  createOverlay() {
    const overlayHTML = `
      <div class="project-deep-dive-overlay" id="projectDeepDive">
        <button class="deep-dive-close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="deep-dive-content">
          <div class="deep-dive-image-container">
            <img src="" alt="" class="deep-dive-image" />
          </div>
          <div class="deep-dive-details">
            <span class="deep-dive-category"></span>
            <h2 class="deep-dive-title"></h2>
            <div class="deep-dive-meta">
              <span class="deep-dive-style"></span>
              <span class="deep-dive-location"></span>
              <span class="deep-dive-year"></span>
            </div>
            <p class="deep-dive-description"></p>
            <div class="deep-dive-features">
              <h3>Features</h3>
              <ul class="features-list"></ul>
            </div>
            <div class="deep-dive-cta">
              <a href="contacts.html" class="btn-inquire">
                <span>Inquire About This Project</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", overlayHTML);
    this.overlay = document.getElementById("projectDeepDive");

    // Add styles
    this.addStyles();
  }

  addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .project-deep-dive-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary, #f8f4e1);
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s ease, visibility 0.5s ease;
        overflow-y: auto;
      }
      
      .project-deep-dive-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .deep-dive-close {
        position: fixed;
        top: 30px;
        right: 30px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 2001;
        padding: 10px;
        color: var(--text-primary);
        transition: transform 0.3s ease;
      }
      
      .deep-dive-close:hover {
        transform: rotate(90deg);
      }
      
      .deep-dive-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;
      }
      
      .deep-dive-image-container {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: hidden;
      }
      
      .deep-dive-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .deep-dive-details {
        padding: 100px 60px 60px;
      }
      
      .deep-dive-category {
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--accent);
        display: block;
        margin-bottom: 20px;
      }
      
      .deep-dive-title {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 4vw, 3.5rem);
        font-weight: 400;
        color: var(--text-primary);
        margin: 0 0 30px;
        line-height: 1.1;
      }
      
      .deep-dive-meta {
        display: flex;
        gap: 30px;
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid var(--border);
      }
      
      .deep-dive-meta span {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      .deep-dive-description {
        font-size: 1rem;
        line-height: 1.8;
        color: var(--text-secondary);
        margin-bottom: 40px;
      }
      
      .deep-dive-features h3 {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        font-weight: 400;
        color: var(--text-primary);
        margin: 0 0 20px;
      }
      
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0 0 40px;
      }
      
      .features-list li {
        font-size: 0.9rem;
        color: var(--text-secondary);
        padding: 10px 0;
        border-bottom: 1px solid rgba(84, 51, 16, 0.1);
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .features-list li::before {
        content: "";
        width: 6px;
        height: 6px;
        background: var(--accent);
        border-radius: 50%;
      }
      
      .deep-dive-cta {
        margin-top: 40px;
      }
      
      .btn-inquire {
        display: inline-flex;
        align-items: center;
        gap: 15px;
        padding: 20px 40px;
        background: var(--accent);
        color: var(--bg-primary);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        transition: transform 0.3s ease, background 0.3s ease;
      }
      
      .btn-inquire:hover {
        transform: translateX(10px);
        background: var(--text-primary);
      }
      
      @media (max-width: 1024px) {
        .deep-dive-content {
          grid-template-columns: 1fr;
        }
        
        .deep-dive-image-container {
          position: relative;
          height: 50vh;
        }
        
        .deep-dive-details {
          padding: 40px 30px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    // Close button
    const closeBtn = this.overlay.querySelector(".deep-dive-close");
    closeBtn.addEventListener("click", () => this.close());

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Close on backdrop click (if needed)
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  async open(projectId, sourceElement) {
    // Get project data
    const projects = await fetchContent("projects");
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      console.error("Project not found:", projectId);
      return;
    }

    this.currentProject = project;

    // Capture source element coordinates for morph animation
    const rect = sourceElement.getBoundingClientRect();
    this.sourceCoords = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };

    // Populate overlay content
    const imageEl = this.overlay.querySelector(".deep-dive-image");
    imageEl.src =
      project.images && project.images[0]
        ? project.images[0]
        : project.thumbnail;
    imageEl.alt = project.title;

    this.overlay.querySelector(".deep-dive-category").textContent =
      project.category;
    this.overlay.querySelector(".deep-dive-title").textContent = project.title;
    this.overlay.querySelector(".deep-dive-style").textContent = project.style;
    this.overlay.querySelector(".deep-dive-location").textContent =
      project.location;
    this.overlay.querySelector(".deep-dive-year").textContent = project.year;
    this.overlay.querySelector(".deep-dive-description").textContent =
      project.description;

    // Populate features
    const featuresList = this.overlay.querySelector(".features-list");
    featuresList.innerHTML = project.features
      ? project.features.map((f) => `<li>${f}</li>`).join("")
      : "";

    // Show overlay
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    this.isOpen = true;

    // Animate from source position
    this.animateIn();
  }

  animateIn() {
    if (!this.sourceCoords) return;

    const imageEl = this.overlay.querySelector(".deep-dive-image");
    const detailsEl = this.overlay.querySelector(".deep-dive-details");

    // Set initial state from source
    gsap.set(imageEl, {
      position: "fixed",
      top: this.sourceCoords.y,
      left: this.sourceCoords.x,
      width: this.sourceCoords.width,
      height: this.sourceCoords.height,
      objectFit: "cover",
      zIndex: 2000,
    });

    // Animate to fullscreen
    gsap.to(imageEl, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(imageEl, {
          position: "relative",
          width: "100%",
          height: "100%",
        });
      },
    });

    // Fade in details
    gsap.fromTo(
      detailsEl,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
    );
  }

  close() {
    if (!this.isOpen) return;

    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
    this.isOpen = false;
  }
}

/**
 * Initialize Project Deep Dive functionality
 */
function initProjectDeepDive() {
  const deepDive = new ProjectDeepDive();

  // Bind click events to project items
  document.querySelectorAll("[data-project-id]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = item.dataset.projectId;
      deepDive.open(projectId, item);
    });
  });

  return deepDive;
}

// ===================================
// PRODUCT PORTAL INTERACTIONS
// ===================================

/**
 * Initialize product portal button interactions
 */
function initProductPortalInteractions() {
  const imageFrames = document.querySelectorAll(".monolith-image-frame");

  imageFrames.forEach((frame) => {
    const portalBtn = frame.querySelector(".portal-btn");
    if (!portalBtn) return;

    // Hover effects
    frame.addEventListener("mouseenter", () => {
      gsap.to(portalBtn, {
        opacity: 1,
        visibility: "visible",
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    });

    frame.addEventListener("mouseleave", () => {
      gsap.to(portalBtn, {
        opacity: 0,
        visibility: "hidden",
        scale: 0.8,
        duration: 0.3,
        ease: "power3.in",
      });
    });

    // Click to open panel
    frame.addEventListener("click", () => {
      const productId = frame.dataset.productId;
      openProductPanelFromId(productId);
    });
  });

  // CTA buttons
  const ctaButtons = document.querySelectorAll(".monolith-cta");
  ctaButtons.forEach((cta) => {
    cta.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = cta.dataset.productId;
      openProductPanelFromId(productId);
    });
  });
}

/**
 * Open product panel from ID
 */
async function openProductPanelFromId(productId) {
  const products = await fetchContent("products");
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const panel = document.getElementById("productPanel");
  if (!panel) return;

  // Update panel content
  const titleEl = panel.querySelector(".panel-title");
  const materialEl = panel.querySelector(".panel-material");
  const priceEl = panel.querySelector(".panel-price");
  const imageEl = panel.querySelector(".panel-main-image");

  if (titleEl) titleEl.textContent = product.name;
  if (materialEl) materialEl.textContent = product.material;
  if (priceEl) priceEl.textContent = product.price;
  if (imageEl && product.images && product.images[0]) {
    imageEl.src = product.images[0];
  }

  // Add inquiry message data attribute
  panel.dataset.inquiryMessage =
    product.inquiryMessage ||
    `Hello Abambas, I'm interested in ${product.name}. Can we discuss the lead time?`;

  // Open panel
  panel.classList.add("active");
  document.body.style.overflow = "hidden";

  gsap.fromTo(
    panel,
    { x: "100%" },
    { x: 0, duration: 0.6, ease: "power3.out" }
  );
}

/**
 * Initialize catalog category filtering
 */
function initCatalogCategoryFilter() {
  const filterBtns = document.querySelectorAll(".catalog-nav-btn");
  const rows = document.querySelectorAll(".monolith-row");

  if (filterBtns.length === 0 || rows.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      // Filter with staggered animation
      rows.forEach((row, index) => {
        const rowCategory = row.dataset.category;
        const shouldShow = category === "all" || rowCategory === category;

        if (shouldShow) {
          gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power3.out",
            onStart: () => {
              row.style.display = "";
              row.style.pointerEvents = "";
            },
          });
        } else {
          gsap.to(row, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
              row.style.display = "none";
              row.style.pointerEvents = "none";
            },
          });
        }
      });
    });
  });
}

// ===================================
// CORE FUNCTIONALITY INITIALIZATION
// ===================================

/**
 * Main initialization function
 * Called when DOM is fully loaded to set up all functionality
 */
function initApp() {
  console.log("Application initialized");

  // Initialize product categories interaction
  initProductCategories();

  // Initialize Contact Dual-Path functionality (Email + WhatsApp)
  initContactFunctionality();

  // Initialize Dynamic Monolith Fetcher for Catalog page
  initCatalogWithStaggeredRender();

  // Initialize Dynamic Monolith Fetcher for Projects page
  initProjectsWithStaggeredRender();

  // Animation system is initialized via animations.js
  // This file focuses on non-animation functionality
}

// Initialize application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// ===================================
// PRODUCT CATEGORIES INTERACTION
// ===================================

/**
 * Initialize Product Categories Hover Interaction
 * Handles hover events to switch category images
 */
function initProductCategories() {
  const categoryItems = document.querySelectorAll(".category-item");
  const categoryImages = document.querySelectorAll(".category-image");

  if (categoryItems.length === 0 || categoryImages.length === 0) return;

  categoryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const category = item.getAttribute("data-category");

      // Remove active class from all images
      categoryImages.forEach((img) => {
        img.classList.remove("active");
      });

      // Add active class to corresponding image
      const targetImage = document.querySelector(
        `.category-image[data-category="${category}"]`
      );
      if (targetImage) {
        targetImage.classList.add("active");
      }
    });
  });

  // Optional: Reset to default on mouse leave (first image)
  const categoriesList = document.querySelector(".categories-list");
  if (categoriesList) {
    categoriesList.addEventListener("mouseleave", () => {
      categoryImages.forEach((img) => {
        img.classList.remove("active");
      });
      // Set first image as active (default)
      const firstImage = document.querySelector(
        '.category-image[data-category="seating"]'
      );
      if (firstImage) {
        firstImage.classList.add("active");
      }
    });
  }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Utility function for checking if element exists
 * @param {string} selector - CSS selector to check
 * @returns {boolean} - True if element exists
 */
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Utility function for getting multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList} - List of matching elements
 */
function getElements(selector) {
  return document.querySelectorAll(selector);
}

// ===================================
// GLOBAL APPLICATION STATE
// ===================================

/**
 * Application state object
 * Stores global application variables and states
 */
const AppState = {
  isLoaded: false,
  currentSection: null,
  mobileMenuOpen: false,
};

// Export for potential use in other modules
window.AppState = AppState;

// ===================================
// CONTACT DUAL-PATH FUNCTIONALITY
// A. Email Integration (EmailJS) + B. WhatsApp Integration
// ===================================

/**
 * EmailJS Configuration
 * Replace with your actual EmailJS credentials
 */
const EmailJSConfig = {
  // Public Key from EmailJS dashboard
  publicKey: "YOUR_PUBLIC_KEY",
  // Service ID from EmailJS dashboard
  serviceId: "YOUR_SERVICE_ID",
  // Template ID from EmailJS dashboard
  templateId: "YOUR_TEMPLATE_ID",
};

/**
 * Get current page context for dynamic messaging
 * @returns {Object} - Current page context
 */
function getCurrentPageContext() {
  const path = window.location.pathname;
  const pageName = path.split("/").pop().replace(".html", "") || "home";

  // Try to get selected product/project from session storage
  const selectedItem = sessionStorage.getItem("selectedItem");

  return {
    page: pageName,
    product: selectedItem || null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Set selected item (product/project) when user clicks on items
 * @param {string} type - 'product' or 'project'
 * @param {string} id - Item ID
 * @param {string} name - Item name
 */
function setSelectedItem(type, id, name) {
  sessionStorage.setItem("selectedItemType", type);
  sessionStorage.setItem("selectedItemId", id);
  sessionStorage.setItem("selectedItemName", name);
}

/**
 * A. EMAIL SUBMISSION HANDLER (AJAX/Fetch)
 * Uses EmailJS for silent form submission
 */
async function handleEmailSubmission(formData) {
  // Add context to form data
  const context = getCurrentPageContext();
  const enrichedData = {
    ...formData,
    page: context.page,
    product: context.product,
    submittedAt: context.timestamp,
  };

  // If EmailJS is configured, use it
  if (EmailJSConfig.publicKey !== "YOUR_PUBLIC_KEY") {
    try {
      // Dynamically load EmailJS if not already loaded
      if (!window.emailjs) {
        await loadEmailJS();
      }

      window.emailjs.init(EmailJSConfig.publicKey);

      const response = await window.emailjs.send(
        EmailJSConfig.serviceId,
        EmailJSConfig.templateId,
        enrichedData
      );

      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("EmailJS Error:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again.",
      };
    }
  } else {
    // Fallback: Log to console (for development)
    console.log("Email Submission (simulated):", enrichedData);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      message: "Inquiry Logged. The Studio will respond shortly.",
    };
  }
}

/**
 * Load EmailJS library dynamically
 */
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Initialize Contact Form with Email Handler
 * Includes sending animation and success feedback
 */
function initContactForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const projectTypeInput = document.getElementById("projectType");
  const visionInput = document.getElementById("vision");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!submitBtn || !nameInput || !emailInput) return;

    // Collect form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      projectType: projectTypeInput?.value || "",
      vision: visionInput?.value || "",
      from_page: getCurrentPageContext().page,
    };

    // Add sending animation
    submitBtn.classList.add("sending");

    // Animate arrow movement (sending state)
    const btnCircle = submitBtn.querySelector(".btn-portal-circle");
    const btnText = submitBtn.querySelector(".btn-portal-text");

    if (btnCircle) {
      gsap.to(btnCircle, {
        x: 10,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Pulse effect
      gsap.to(btnCircle, {
        scale: 1.1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    try {
      // Submit to EmailJS
      const result = await handleEmailSubmission(formData);

      // Stop sending animation
      submitBtn.classList.remove("sending");
      submitBtn.classList.add("sent");

      if (btnCircle) {
        gsap.killTweensOf(btnCircle);
        gsap.to(btnCircle, { x: 0, scale: 1, duration: 0.3 });
      }

      if (btnText) {
        btnText.textContent = "SENT";
      }

      if (result.success) {
        // Fade out form, show success message
        gsap.to(form, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            form.style.display = "none";

            if (successMessage) {
              successMessage.classList.add("active");
              gsap.fromTo(
                successMessage,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
              );
            }
          },
        });

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          submitBtn.classList.remove("sent");
          if (btnText) btnText.textContent = "Send";

          gsap.to(form, { opacity: 1, duration: 0.4 });
          form.style.display = "block";

          if (successMessage) {
            successMessage.classList.remove("active");
          }
        }, 4000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      submitBtn.classList.remove("sending");
      alert("An error occurred. Please try again.");
    }
  });
}

/**
 * B. WHATSAPP BUSINESS API INTEGRATION
 * Dynamic message pre-filling based on current page/context
 */

// WhatsApp Business Number (replace with actual number)
const WHATSAPP_NUMBER = "2349097192285"; // Format: country code + number (without +)

/**
 * Get pre-filled WhatsApp message based on current context
 * @param {string} customMessage - Optional custom message override
 * @returns {string} - Encoded WhatsApp message
 */
function getWhatsAppMessage(customMessage = null) {
  const context = getCurrentPageContext();
  const selectedItemName = sessionStorage.getItem("selectedItemName");

  let message;

  if (customMessage) {
    message = customMessage;
  } else if (selectedItemName) {
    // Message based on selected product/project
    const itemType = sessionStorage.getItem("selectedItemType");

    if (itemType === "product") {
      message = `Hello Abambas, I'm interested in ${selectedItemName}. Can we discuss the lead time?`;
    } else if (itemType === "project") {
      message = `Hello Abambas, I'm interested in the ${selectedItemName} project. Can we discuss a similar project?`;
    } else {
      message = `Hello Abambas, I'm interested in ${selectedItemName}. Can we discuss further?`;
    }
  } else {
    // Default message based on current page
    switch (context.page) {
      case "catalog":
        message =
          "Hello Abambas, I'm browsing your catalogue and would like to inquire about some pieces.";
        break;
      case "projects":
        message =
          "Hello Abambas, I love your project portfolio! I'm interested in discussing a similar project.";
        break;
      case "services":
        message =
          "Hello Abambas, I'd like to learn more about your interior design services.";
        break;
      case "about":
        message =
          "Hello Abambas, I'd like to learn more about your studio and design philosophy.";
        break;
      default:
        message =
          "Hello Abambas, I'd like to start a conversation about an interior design project.";
    }
  }

  return encodeURIComponent(message);
}

/**
 * Open WhatsApp with pre-filled message
 * @param {string} customMessage - Optional custom message
 */
function openWhatsApp(customMessage = null) {
  const message = getWhatsAppMessage(customMessage);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappURL, "_blank");
}

/**
 * Initialize WhatsApp buttons
 * Adds click handlers to all WhatsApp CTA buttons
 */
function initWhatsAppButtons() {
  // Find all WhatsApp buttons
  const whatsappButtons = document.querySelectorAll("[data-whatsapp]");

  whatsappButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Get custom message if specified
      const customMessage = btn.dataset.whatsappMessage || null;

      openWhatsApp(customMessage);
    });
  });

  // Also initialize any buttons with specific WhatsApp classes
  const ctaButtons = document.querySelectorAll(".btn-whatsapp, .whatsapp-cta");
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openWhatsApp();
    });
  });
}

/**
 * Add WhatsApp CTA to product panel
 * Enhances the product detail panel with WhatsApp option
 */
function addWhatsAppToProductPanel() {
  const panel = document.getElementById("productPanel");
  if (!panel) return;

  // Add WhatsApp button after the main CTA
  const panelCta = panel.querySelector(".panel-cta");
  if (!panelCta) return;

  // Check if WhatsApp button already exists
  if (panel.querySelector(".btn-whatsapp-panel")) return;

  const whatsappBtn = document.createElement("button");
  whatsappBtn.className = "btn-whatsapp-panel";
  whatsappBtn.innerHTML = `
    <span class="whatsapp-btn-content">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.518.147-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.796.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.195 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.194 1.872.118.571-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <span>Chat on WhatsApp</span>
    </span>
  `;

  whatsappBtn.addEventListener("click", () => {
    const panel = document.getElementById("productPanel");
    const productName = panel?.querySelector(".panel-title")?.textContent;

    if (productName) {
      const message = `Hello Abambas, I'm interested in ${productName}. Can we discuss the lead time?`;
      openWhatsApp(message);
    } else {
      openWhatsApp();
    }
  });

  panelCta.insertAdjacentElement("afterend", whatsappBtn);

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
    .btn-whatsapp-panel {
      width: 100%;
      margin-top: 15px;
      padding: 20px;
      background: #25D366;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: transform 0.3s ease, background 0.3s ease;
    }
    
    .btn-whatsapp-panel:hover {
      transform: translateX(5px);
      background: #128C7E;
    }
    
    .whatsapp-btn-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize all contact functionality
 */
function initContactFunctionality() {
  initContactForm();
  initWhatsAppButtons();

  // Add WhatsApp to product panel after a delay
  setTimeout(addWhatsAppToProductPanel, 1000);
}
