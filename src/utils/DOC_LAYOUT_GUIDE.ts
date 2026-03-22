/**
 * FLOATING DOCUMENTATION LAYOUT SYSTEM GUIDE
 * ==========================================
 * 
 * This file documents the 3-column layout system for your portfolio.
 * The system is modular, lightweight, and preserves your existing theme.
 * 
 * QUICK START
 * ===========
 * Components are located in:
 * - src/components/DocLayout.tsx (main container)
 * - src/components/TableOfContents.tsx (auto-generated TOC with scroll spy)
 * - src/components/WriteupsSidebar.tsx (writeups navigation)
 * 
 * CSS is in:
 * - src/styles/doc-layout.css (grid layout, sticky positioning)
 * - src/styles/table-of-contents.css (TOC styling)
 * - src/styles/writeups-sidebar.css (sidebar styling)
 * 
 * USAGE IN POSTPAGE
 * =================
 * PostPage.tsx has been updated to use the new layout with all three components.
 * The layout automatically displays on writeup and note pages.
 * 
 * RESPONSIVE BEHAVIOR
 * ===================
 * - Desktop (>1024px): 3-column layout (sidebar | content | TOC)
 * - Tablet (768-1024px): 2-column layout (sidebar | content)
 * - Mobile (<768px): Single column (content only)
 * 
 * CUSTOMIZATION
 * ==============
 * 
 * To change column widths in doc-layout.css:
 * Look for: grid-template-columns: minmax(0, 250px) 1fr minmax(0, 280px);
 * Adjust the px values to make sidebars wider or narrower
 * 
 * To change sticky top offset (if you have a fixed navbar):
 * Look for: position: sticky; top: 2rem;
 * Change 2rem to match your navbar height + spacing
 * 
 * To customize TOC appearance:
 * Edit src/styles/table-of-contents.css
 * - .toc-active: currently highlighted heading style
 * - .toc-link: hover effects and padding
 * - .toc-level-2, .toc-level-3: indentation for h2/h3
 * 
 * To customize sidebar appearance:
 * Edit src/styles/writeups-sidebar.css
 * - .writeups-link-active: highlight for current page
 * - .writeups-icon: emoji icon sizing
 * - .writeups-year-label: year heading style
 * 
 * EXTENDING THE SYSTEM
 * ====================
 * 
 * Create custom sidebars like WriteupsSidebar:
 * 1. Make a new component in /src/components/
 * 2. Import into your page
 * 3. Pass as sidebar prop to DocLayout
 * 
 * Create custom TOC components:
 * 1. Make a new component
 * 2. Use same selector pattern as TableOfContents
 * 3. Pass as toc prop to DocLayout
 * 
 * Example custom sidebar patterns to follow:
 * - Group by category (like WriteupsSidebar groups by year)
 * - Get current page from useLocation() hook
 * - Use Link from react-router-dom for navigation
 * - Return null if no items (TOC does this)
 * 
 * PERFORMANCE NOTES
 * =================
 * - Uses IntersectionObserver for scroll spy (no scroll event listeners)
 * - Native CSS Grid for layout (hardware accelerated)
 * - Sticky positioning (optimized in modern browsers)
 * - Minimal CSS, scoped to layout components
 * - Small JavaScript footprint (~150 lines for TableOfContents)
 * 
 * BROWSER SUPPORT
 * ===============
 * Works on all modern browsers (2020+):
 * - Firefox, Chrome, Safari, Edge all support required features
 * - CSS Grid: supported everywhere
 * - Sticky positioning: supported everywhere
 * - IntersectionObserver: supported everywhere
 * - CSS custom properties (--variables): supported everywhere
 * 
 * TROUBLESHOOTING
 * ===============
 * 
 * TOC not showing headings?
 * - Check that headings are h1, h2, or h3 (h4+ not included)
 * - Verify content selector matches your HTML (.doc-content by default)
 * - Check browser console for JavaScript errors
 * 
 * Sidebar not sticky?
 * - May not work if parent has overflow: hidden
 * - Check that sidebar has enough space (max-height: calc(100vh - 4rem))
 * - Test on actual device, browser zoom may differ
 * 
 * Layout broken on mobile?
 * - Verify viewport meta tag in HTML head
 * - Check CSS media queries are loading (DevTools Network tab)
 * - Test using browser DevTools responsive design mode
 * 
 * FURTHER CUSTOMIZATION
 * ======================
 * 
 * Mobile hamburger menu:
 * In doc-layout.css, the .doc-sidebar-left has styles for showing/hiding.
 * You can add a hamburgermenu button and toggle a class to show the sidebar.
 * 
 * Collapsible year groups:
 * Modify WriteupsSidebar.tsx to add expand/collapse state for each year.
 * Save preference to localStorage to remember user's choice.
 * 
 * TOC search filter:
 * Add an input to TableOfContents component to filter headings as user types.
 * Useful for long documents.
 * 
 * Keyboard navigation:
 * Add arrow key support to navigate TOC items.
 * Add keyboard shortcuts to jump to sections.
 * 
 * Analytics:
 * Track which sections users scroll through.
 * Use IntersectionObserver callback to know when users reach each section.
 * 
 * All components are fully commented with clear logic.
 * CSS is simple and well-organized for easy customization.
 * Reach out if you need help extending the system!
 */

export {};

