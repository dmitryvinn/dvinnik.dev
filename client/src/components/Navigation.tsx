/**
 * Navigation — Nature Distilled
 * Warm, clean top nav: serif name, sans nav links, terracotta active indicator
 * Includes global search trigger (icon + Cmd/Ctrl+K shortcut)
 */
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import SearchDialog from "./SearchDialog";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Speaking", href: "/speaking" },
  { label: "Videos", href: "/videos" },
  { label: "Events", href: "/events" },
  { label: "Courses", href: "/courses" },
  { label: "Conversations", href: "/conversations" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-background"
        }`}
        style={{ borderBottom: scrolled ? "1px solid oklch(0.22 0.01 55 / 6%)" : "1px solid transparent" }}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <span
              className="text-xl lg:text-2xl cursor-pointer transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
            >
              Dmitry Vinnik
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    location === link.href
                      ? "text-foreground font-medium"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {link.label}
                  {location === link.href && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5"
                      style={{ background: "var(--color-nd-terracotta)", borderRadius: "1px" }}
                    />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right side: search + social */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-black/[0.04]"
              style={{ border: "1px solid oklch(0.22 0.01 55 / 10%)" }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" style={{ color: "var(--color-nd-warm-gray)" }} />
              <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-warm-gray)" }}>
                Search
              </span>
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-nd-warm-gray)",
                  background: "oklch(0.22 0.01 55 / 5%)",
                  border: "1px solid oklch(0.22 0.01 55 / 8%)",
                }}
              >
                ⌘K
              </kbd>
            </button>

            <a
              href="https://github.com/dmitryvinn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/dmitry-vinnik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://twitter.com/DmitryVinnik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground/60 hover:text-foreground transition-colors p-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground/60 hover:text-foreground transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background pb-4">
            <div className="container flex flex-col pt-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 text-sm transition-colors ${
                      location === link.href
                        ? "text-foreground font-medium"
                        : "text-foreground/50 hover:text-foreground/80"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <a href="https://github.com/dmitryvinn" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground/70 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/dmitry-vinnik/" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground/70 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://twitter.com/DmitryVinnik" target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground/70 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Search dialog */}
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
