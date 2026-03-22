import { useEffect, useRef, useState } from "react";
import "../styles/table-of-contents.css";

interface Heading {
  id: string;
  level: number; // 1, 2, 3
  text: string;
}

interface TableOfContentsProps {
  contentSelector?: string; // CSS selector for the content element
}

/**
 * TableOfContents: Auto-generates table of contents from document headings
 * 
 * This component:
 * - Automatically extracts h1, h2, h3 headings from a content container
 * - Generates anchor IDs for headings that don't have them
 * - Implements scroll spy using IntersectionObserver (no scroll listeners!)
 * - Highlights the current section as user scrolls
 * - Supports smooth scrolling on TOC link clicks
 * - Hierarchically indents h2/h3 under h1
 * 
 * Features:
 * - Minimal CSS, respects theme colors
 * - Performance optimized (IntersectionObserver, no scroll listeners)
 * - Responsive (hides on small screens)
 * - Accessibility friendly (proper ARIA, semantic HTML)
 * 
 * Usage:
 * ```
 * <TableOfContents contentSelector=".doc-content" />
 * ```
 * 
 * Props:
 * - contentSelector: CSS selector for content container
 *   Default: ".doc-content"
 *   The component will look for h1, h2, h3 inside this element
 * 
 * How it works:
 * 1. Mount: Extracts all h1, h2, h3 from content container
 * 2. Assign IDs: Gives unique IDs to headings without them (heading-0, heading-1, etc)
 * 3. Setup observer: IntersectionObserver watches when each heading enters/exits viewport
 * 4. Highlight: Active heading is highlighted in TOC as user scrolls
 * 5. Click: Smooth scroll to heading when TOC link is clicked
 */
const TableOfContents = ({ contentSelector = ".doc-content" }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  // Function to extract headings and rebuild TOC
  const rebuildTOC = (contentElement: Element) => {
    // Disconnect old intersection observer
    observerRef.current?.disconnect();

    // Extract headings and assign IDs
    const headingElements = contentElement.querySelectorAll("h1, h2, h3");
    const extractedHeadings: Heading[] = [];

    headingElements.forEach((el, index) => {
      const level = parseInt(el.tagName[1]);
      const text = el.textContent || "";

      // Create or use existing ID
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      extractedHeadings.push({
        id: el.id,
        level,
        text,
      });
    });

    setHeadings(extractedHeadings);
    setActiveId(""); // Reset active heading when content changes

    // Setup Intersection Observer for scroll spy
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
    headingElements.forEach((el) => {
      observerRef.current?.observe(el);
    });
  };

  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    // Initial TOC generation
    rebuildTOC(contentElement);

    // Setup MutationObserver to detect content changes
    // This catches when React updates the markdown content
    const mutationOptions: MutationObserverInit = {
      childList: true, // Watch for added/removed nodes
      subtree: true, // Watch entire subtree
      characterData: false, // Don't need to watch text changes
    };

    const handleMutation = () => {
      rebuildTOC(contentElement);
    };

    mutationObserverRef.current = new MutationObserver(handleMutation);
    mutationObserverRef.current.observe(contentElement, mutationOptions);

    return () => {
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
    };
  }, [contentSelector]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="toc-container">
      <p className="toc-title">On this page</p>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item toc-level-${heading.level}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`toc-link ${activeId === heading.id ? "toc-active" : ""}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
