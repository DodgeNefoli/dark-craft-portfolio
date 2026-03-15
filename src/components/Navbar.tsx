import { useState, useEffect } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Notes", href: "#notes" },
  { label: "Writeups", href: "#writeups" },
  { label: "Certs", href: "#certs" },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-foreground" />
          <span className="text-sm font-medium tracking-tight text-foreground">
            Your Name
          </span>
          <button
            onClick={toggleTheme}
            className="nav-link ml-1"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Right — desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="nav-link"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-link md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-border bg-background px-6 py-3">
          <div className="mx-auto max-w-5xl">
            <input
              type="text"
              placeholder="Search…"
              autoFocus
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
