/**
 * SearchDialog — Nature Distilled
 * Global search across all content types using cmdk dialog
 * Triggered by search icon in nav or Cmd+K / Ctrl+K
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, FileText, Video, Mic2, Calendar, BookOpen, MessageCircle, ArrowRight } from "lucide-react";

// Lazy import content data to avoid loading it until search is opened
let contentCache: typeof import("@/data/content") | null = null;
async function getContent() {
  if (!contentCache) {
    contentCache = await import("@/data/content");
  }
  return contentCache;
}

interface SearchResult {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
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
  const [allContent, setAllContent] = useState<SearchResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load content data when dialog opens
  useEffect(() => {
    if (open && !loaded) {
      getContent().then((mod) => {
        const all: SearchResult[] = [];
        const categories = [
          { key: "articles", data: mod.articles },
          { key: "videos", data: mod.videos },
          { key: "presentations", data: mod.presentations },
          { key: "events", data: mod.events },
          { key: "courses", data: mod.courses },
          { key: "conversations", data: mod.conversations },
        ];
        for (const cat of categories) {
          for (const item of cat.data) {
            all.push({
              title: item.title,
              description: item.description,
              slug: item.slug,
              category: cat.key,
              date: item.date,
              tags: item.tags,
            });
          }
        }
        setAllContent(all);
        setLoaded(true);
      });
    }
  }, [open, loaded]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) setQuery("");
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

  // Search logic
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    return allContent
      .filter((item) => {
        const searchable = `${item.title} ${item.description} ${item.tags.join(" ")} ${item.category}`.toLowerCase();
        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 20); // Limit to 20 results
  }, [query, allContent]);

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
          <Search className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-nd-terracotta)" }} />
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
          {query.trim() && results.length === 0 && loaded && (
            <div className="px-5 py-10 text-center">
              <p className="nd-body text-sm" style={{ color: "var(--color-nd-warm-gray)" }}>
                No results found for "{query}"
              </p>
            </div>
          )}

          {query.trim() && !loaded && (
            <div className="px-5 py-10 text-center">
              <p className="nd-body text-sm" style={{ color: "var(--color-nd-warm-gray)" }}>
                Loading content...
              </p>
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-8 text-center">
              <p className="nd-body text-sm" style={{ color: "var(--color-nd-warm-gray)" }}>
                Start typing to search across {allContent.length || "200+"} content items
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
              {results.length} result{results.length !== 1 ? "s" : ""}
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
