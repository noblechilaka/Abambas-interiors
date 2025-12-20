/**
 * ===================================
 * SCRIPT.JS - CORE FUNCTIONALITY
 * ===================================
 * This file contains only non-animation related functionality.
 * All animations have been moved to animations.js for better organization.
 */

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
