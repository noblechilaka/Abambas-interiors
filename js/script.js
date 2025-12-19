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
  
  // Animation system is initialized via animations.js
  // This file focuses on non-animation functionality
}

// Initialize application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

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
