import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allPosts, Post } from "@/lib/content";

interface SearchResult {
  post: Post;
  matches: string[];
  location: string;
}

function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  return allPosts
    .map((post) => {
      const matches: string[] = [];

      if (post.title.toLowerCase().includes(q)) matches.push("title");
      if (post.description.toLowerCase().includes(q)) matches.push("description");
      if (post.content.toLowerCase().includes(q)) matches.push("content");
      if (post.slug.toLowerCase().includes(q)) matches.push("slug");

      if (matches.length === 0) return null;

      const folder = post.category === "note" ? "notes" : "writeups";
      return {
        post,
        matches,
        location: `/content/${folder}/${post.slug}.md`,
      };
    })
    .filter(Boolean) as SearchResult[];
}

function getSnippet(content: string, query: string): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, 120) + "…";
  const start = Math.max(0, idx - 40);
  const end = Math.min(content.length, idx + query.length + 80);
  let snippet = content.slice(start, end);
  if (start > 0) snippet = "…" + snippet;
  if (end < content.length) snippet = snippet + "…";
  return snippet;
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => searchContent(query), [query]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const navigateToResult = useCallback((result: SearchResult) => {
    const folder = result.post.category === "note" ? "notes" : "writeups";
    navigate(`/${folder}/${result.post.slug}`);
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) {
        navigateToResult(results[activeIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const activeEl = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div
        className="relative mx-auto mt-[15vh] w-full max-w-xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search size={18} className="flex-shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search notes, writeups, content…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
              ESC
            </kbd>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground sm:hidden">
              <X size={16} />
            </button>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Start typing to search…
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results for "<span className="text-foreground">{query}</span>"
              </div>
            ) : (
              <div className="py-2">
                <p className="px-4 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {results.length} result{results.length > 1 ? "s" : ""} found
                </p>
                {results.map((r, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={r.post.slug}
                      data-index={index}
                      onClick={() => navigateToResult(r)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`group flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors ${
                        isActive ? "bg-muted/70" : "hover:bg-muted/50"
                      }`}
                    >
                      <FileText size={16} className={`mt-0.5 flex-shrink-0 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{r.post.title}</span>
                          <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {r.post.category}
                          </span>
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                          {r.location}
                        </p>
                        {r.matches.includes("content") && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {getSnippet(r.post.content, query)}
                          </p>
                        )}
                      </div>
                      <ArrowRight size={14} className={`mt-1 flex-shrink-0 text-muted-foreground transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">↑</kbd>
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">↓</kbd>
                <span className="font-mono text-[10px] text-muted-foreground">navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">↵</kbd>
                <span className="font-mono text-[10px] text-muted-foreground">open</span>
              </div>
            </div>
            <div className="hidden items-center gap-1 sm:flex">
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
              <span className="font-mono text-[10px] text-muted-foreground">to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
