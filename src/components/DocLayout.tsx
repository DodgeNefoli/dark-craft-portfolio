import { ReactNode } from "react";
import "../styles/doc-layout.css";

interface DocLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  sidebar?: ReactNode;
  toc?: ReactNode;
}

/**
 * DocLayout: 3-column documentation layout
 * 
 * A flexible, responsive layout for documentation pages with:
 * - Left sidebar: Navigation or related content
 * - Center: Main content (auto-sized with max constraints)
 * - Right sidebar: Table of contents or additional info
 * 
 * Features:
 * - Sticky sidebars (remain visible while scrolling)
 * - Responsive (sidebars hide below 1024px, full stack on mobile)
 * - Minimal CSS, doesn't override theme
 * - Works with existing prose styles
 * 
 * Usage:
 * ```
 * <DocLayout
 *   title="Page Title"
 *   description="Optional subtitle"
 *   sidebar={<Sidebar />}
 *   toc={<TableOfContents />}
 * >
 *   <YourContent />
 * </DocLayout>
 * ```
 * 
 * Props:
 * - children: Main content (required)
 * - title: Page heading (required)
 * - description: Optional subtitle/description
 * - sidebar: Left navigation component (optional)
 * - toc: Right sidebar for TOC or metadata (optional)
 */
const DocLayout = ({ children, title, description, sidebar, toc }: DocLayoutProps) => {
  return (
    <div className="doc-layout">
      {/* Left Sidebar: Navigation */}
      {sidebar && <aside className="doc-sidebar-left">{sidebar}</aside>}

      {/* Main Content */}
      <main className="doc-main">
        <header className="doc-header">
          <h1 className="doc-title">{title}</h1>
          {description && <p className="doc-description">{description}</p>}
        </header>
        <div className="doc-content">{children}</div>
      </main>

      {/* Right Sidebar: Table of Contents */}
      {toc && <aside className="doc-sidebar-right">{toc}</aside>}
    </div>
  );
};

export default DocLayout;
