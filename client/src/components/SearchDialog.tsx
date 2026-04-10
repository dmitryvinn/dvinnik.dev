/**
 * SearchDialog — Nature Distilled
 * Global search across all content types using the Worker API
 * Triggered by search icon in nav or Cmd+K / Ctrl+K
 */
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Search, FileText, Video, Mic2, Calendar, BookOpen, MessageCircle, ArrowRight, Loader2 } from "lucide-react";

const API_BASE = "https://api.dvinnik.dev";

interface SearchResult {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

const categoryConfig: Record<string, { label: string; icon: typeof FileText; color: string }> = {
  articles: { label: "Article", icon: FileText, color: "var(--color-nd-terracotta)" },
  videos: { label: "Video", icon: Video, color: "#c2410c" },
  presentations: { label: "Presentation", icon: Mic2, color: "var(--color-nd-sage)" },
  events: { label: "Event", icon: Calendar, color: "#6d7c5a" },
  courses: { label: "Course", icon: BookOpen, color: "#8b6914" },
  conversations: { label: "Conversation", icon: MessageCircle, color: "#7c6050" },
};

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced API search
  useEffect(() => {
    if (!open) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setTotal(0);
      setSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      // Abort previous request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `${API_BASE}/api/search?q=${encodeURIComponent(trimmed)}&limit=20`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Search failed");
        const data: SearchResponse = await res.json();
        setResults(data.results);
        setTotal(data.total);
        setSearched(true);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
          setResults([]);
          setTotal(0);
          setSearched(true);
        }
      } finally {
        setLoading(false);
      }
    }, 250); // 250ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setTotal(0);
      setSearched(false);
      setLoading(false);
      if (abortRef.current) abortRef.current.abort();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSelect = useCallback(
    (slug: string) => {
      onClose();
      navigate(slug);
    },
    [navigate, onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-2xl mx-4 rounded-xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--color-nd-cream)",
          border: "1px solid oklch(0.22 0.01 55 / 10%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid oklch(0.22 0.01 55 / 8%)" }}>
          {loading ? (
            <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" style={{ color: "var(--color-nd-terracotta)" }} />
          ) : (
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-nd-terracotta)" }} />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, talks, videos, events..."
            autoFocus
            className="flex-1 bg-transparent outline-none text-base placeholder:text-foreground/30"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
          />
          <kbd
            className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-nd-warm-gray)",
              background: "oklch(0.22 0.01 55 / 5%)",
              border: "1px solid oklch(0.22 0.01 55 / 8%)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && searched && results.length === 0 && !loading && (
            <div className="px-5 py-10 text-center">
              <p className="nd-body text-sm" style={{ color: "var(--color-nd-warm-gray)" }}>
                No results found for "{query}"
              </p>
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-8 text-center">
              <p className="nd-body text-sm" style={{ color: "var(--color-nd-warm-gray)" }}>
                Start typing to search across 200+ content items
              </p>
            </div>
          )}

          {results.map((item) => {
            const config = categoryConfig[item.category];
            const Icon = config?.icon || FileText;

            return (
              <button
                key={item.slug}
                onClick={() => handleSelect(item.slug)}
                className="w-full text-left px-5 py-3.5 flex items-start gap-3 transition-colors hover:bg-black/[0.03] group"
                style={{ borderBottom: "1px solid oklch(0.22 0.01 55 / 4%)" }}
              >
                <div
                  className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${config?.color || "var(--color-nd-terracotta)"}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: config?.color || "var(--color-nd-terracotta)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] uppercase tracking-wider font-medium"
                      style={{ fontFamily: "var(--font-sans)", color: config?.color || "var(--color-nd-warm-gray)" }}
                    >
                      {config?.label || item.category}
                    </span>
                    {item.date && (
                      <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "var(--color-nd-warm-gray)" }}>
                        {item.date.substring(0, 4)}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm font-medium mt-0.5 truncate"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-warm-gray)" }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowRight
                  className="w-4 h-4 mt-2 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-nd-charcoal)" }}
                />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div
            className="px-5 py-2.5 flex items-center justify-between"
            style={{
              borderTop: "1px solid oklch(0.22 0.01 55 / 8%)",
              background: "oklch(0.22 0.01 55 / 2%)",
            }}
          >
            <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-warm-gray)" }}>
              {results.length} of {total} result{total !== 1 ? "s" : ""}
            </span>
            <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-nd-warm-gray)" }}>
              Click to open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
