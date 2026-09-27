import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { writeups } from "@/lib/content";
import PostCover from "@/components/PostCover";
import "../styles/writeups-sidebar.css";

/**
 * WriteupsSidebar: Navigation sidebar for writeups/notes
 * 
 * This component:
 * - Lists all writeups/notes grouped by year (descending)
 * - Shows current active page with visual highlight
 * - Displays emoji icons with titles
 * - Sticky positioning keeps it visible while scrolling
 * - Lightweight, minimal styling
 * 
 * Features:
 * - Automatic year grouping from post dates
 * - Active page highlighting
 * - Responsive (hides on mobile at <1024px)
 * - Theme-aware colors
 * 
 * Usage:
 * ```
 * <WriteupsSidebar />
 * ```
 * 
 * No props needed - uses React Router location and content data.
 * 
 * How it works:
 * 1. Get all writeups from content library
 * 2. Group by year extracted from date (YYYY-MM-DD format)
 * 3. Sort years in descending order (newest first)
 * 4. Check current URL path to highlight active page
 * 5. Render with Icons and titles, no extra UI chrome
 */
const WriteupsSidebar = () => {
  const location = useLocation();
  const currentSlug = location.pathname.split("/").pop();

  // Group writeups by year
  const groupedWriteups = useMemo(() => {
    const groups: Record<string, typeof writeups> = {};

    writeups.forEach((writeup) => {
      // Extract year from date (format: YYYY-MM-DD)
      const year = writeup.date.split("-")[0];
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(writeup);
    });

    // Sort years in descending order (newest first)
    return Object.entries(groups).sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
  }, []);

  return (
    <nav className="writeups-sidebar">
      <div className="writeups-nav-header">
        <p className="writeups-nav-title">Writeups</p>
      </div>

      <div className="writeups-nav-content">
        {groupedWriteups.map(([year, yearWriteups]) => (
          <div key={year} className="writeups-year-group">
            <h3 className="writeups-year-label">{year}</h3>
            <ul className="writeups-list">
              {yearWriteups.map((writeup) => (
                <li key={writeup.slug}>
                  <Link
                    to={`/writeups/${writeup.slug}`}
                    className={`writeups-link ${
                      currentSlug === writeup.slug ? "writeups-link-active" : ""
                    }`}
                  >
                    <PostCover
                      imagePath={writeup.coverImage}
                      fallback={writeup.icon}
                      alt={`${writeup.title} cover`}
                      className="writeups-icon"
                      imageClassName="h-7 w-7 rounded-full border border-border object-cover"
                    />
                    <span className="writeups-title">{writeup.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default WriteupsSidebar;
