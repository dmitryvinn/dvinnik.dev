/**
 * ContentDetail — Nature Distilled
 * Individual detail page for articles, videos, presentations, events, courses, conversations
 * Renders markdown body content with proper typography and embedded media
 */
import { useLocation } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Calendar, Play, BookOpen, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import RelatedContent from "@/components/RelatedContent";
import { findBySlug, type ContentItem } from "@/data/content";
import Breadcrumb, { buildContentBreadcrumbs } from "@/components/Breadcrumb";
import TagLink from "@/components/TagLink";
import BackToTop from "@/components/BackToTop";

const categoryLabels: Record<string, string> = {
  articles: "Article",
  videos: "Video",
  presentations: "Presentation",
  events: "Event",
  courses: "Course",
  conversations: "Conversation",
};

const categoryListPaths: Record<string, string> = {
  articles: "/articles",
  videos: "/videos",
  presentations: "/speaking",
  events: "/events",
  courses: "/courses",
  conversations: "/conversations",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/** Estimate reading time from body text (average 200 words per minute) */
function getReadingTime(body: string): number {
  // Strip markdown syntax for a cleaner word count
  const text = body
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[#*`_~>]/g, "") // markdown chars
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Simple markdown-to-HTML for body content */
function renderBody(body: string): string {
  let html = body;

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
    return `<pre class="nd-code-block"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="nd-inline-code">$1</code>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="nd-detail-h3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="nd-detail-h2">$1</h2>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="nd-link">$1</a>');

  // Paragraphs — split on double newlines
  html = html.split(/\n\n+/).map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Don't wrap blocks that are already HTML elements
    if (trimmed.startsWith('<pre') || trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<div')) {
      return trimmed;
    }
    return `<p class="nd-detail-p">${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return html;
}

export default function ContentDetail() {
  const [location] = useLocation();

  // Parse category from the URL path: /articles/2023/slug-name/ → category = "articles"
  const pathParts = location.split("/").filter(Boolean);
  const category = pathParts[0] || "";

  // The full slug is the location path, ensure trailing slash
  const slug = location.endsWith("/") ? location : location + "/";

  const item: ContentItem | undefined = findBySlug(category, slug);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
<main className="flex-1 container py-20">
          <AnimatedSection>
            <Link href={categoryListPaths[category] || "/"}>
              <span className="inline-flex items-center gap-2 nd-link text-sm mb-8 cursor-pointer">
                <ArrowLeft className="w-4 h-4" /> Back
              </span>
            </Link>
            <h1 className="nd-heading text-4xl mt-8">Content Not Found</h1>
            <p className="nd-body mt-4">
              The {categoryLabels[category] || "content"} you're looking for doesn't exist or has been moved.
            </p>
            <Link href={categoryListPaths[category] || "/"}>
              <span className="nd-button mt-8 inline-flex cursor-pointer">
                Browse All {categoryLabels[category] ? categoryLabels[category] + "s" : "Content"}
              </span>
            </Link>
          </AnimatedSection>
        </main>
</div>
    );
  }

  const youtubeId = item.youtubeUrl ? extractYouTubeId(item.youtubeUrl) : null;
  const listPath = categoryListPaths[category] || "/";
  const label = categoryLabels[category] || "Content";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={item.title}
        description={item.description || `${label} by Dmitry Vinnik — ${item.tags.slice(0, 3).join(", ")}`}
        path={slug}
        image={item.coverImage}
        type="article"
      />
      <JsonLd item={item} category={category} />
<main className="flex-1">
        {/* Header area */}
        <div style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-12 lg:py-20">
            <AnimatedSection>
              <Breadcrumb items={buildContentBreadcrumbs(category, label, listPath, item.title, slug)} />

              {/* Cover image */}
              {item.coverImage && (
                <div className="mt-8 mb-8 max-w-4xl overflow-hidden rounded-lg" style={{ border: "1px solid oklch(0.22 0.01 55 / 8%)" }}>
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
                    loading="eager"
                  />
                </div>
              )}

              <div className={item.coverImage ? "" : "mt-8"}>
                <div className="nd-accent-line mb-4" />
                <span className="nd-label">{label}</span>
                <h1 className="nd-heading text-3xl lg:text-5xl mt-3 max-w-4xl">{item.title}</h1>

                {item.description && (
                  <p className="nd-body text-lg mt-6 max-w-3xl">{item.description}</p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  {item.date && (
                    <span className="inline-flex items-center gap-1.5 nd-meta">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </span>
                  )}
                  {category === "articles" && item.body && (
                    <span className="inline-flex items-center gap-1.5 nd-meta">
                      <Clock className="w-3.5 h-3.5" />
                      {getReadingTime(item.body)} min read
                    </span>
                  )}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <TagLink key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {item.canonicalUrl && (
                    <a href={item.canonicalUrl} target="_blank" rel="noopener noreferrer" className="nd-button">
                      <BookOpen className="w-4 h-4" />
                      Read Original Article
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.youtubeUrl && (
                    <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="nd-button">
                      <Play className="w-4 h-4" />
                      Watch on YouTube
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.slideshareUrl && (
                    <a href={item.slideshareUrl} target="_blank" rel="noopener noreferrer" className="nd-button">
                      <BookOpen className="w-4 h-4" />
                      View Slides
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.links && item.links.length > 0 && !item.canonicalUrl && !item.youtubeUrl && !item.slideshareUrl && (
                    <a href={item.links[0]} target="_blank" rel="noopener noreferrer" className="nd-button">
                      <ExternalLink className="w-4 h-4" />
                      View Resource
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* YouTube embed */}
        {youtubeId && (
          <div className="container py-10">
            <AnimatedSection>
              <div className="relative w-full max-w-4xl" style={{ paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "1px solid oklch(0.22 0.01 55 / 8%)" }}
                />
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* Body content */}
        {item.body && (
          <div className="container py-10 lg:py-16">
            <AnimatedSection>
              <div
                className="nd-detail-content max-w-3xl"
                dangerouslySetInnerHTML={{ __html: renderBody(item.body) }}
              />
            </AnimatedSection>
          </div>
        )}

        {/* Related links for events/courses/conversations */}
        {item.links && item.links.length > 0 && (
          <div className="container pb-16">
            <AnimatedSection>
              <h3 className="nd-heading text-xl mb-4">Related Links</h3>
              <div className="flex flex-col gap-2">
                {item.links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 nd-link text-sm break-all"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    {link.length > 80 ? link.substring(0, 80) + "..." : link}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        )}

        {/* Related content suggestions */}
        <RelatedContent currentItem={item} category={category} />

        {/* Back navigation */}
        <div className="container pb-20">
          <Link href={listPath}>
            <span className="nd-button-outline cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              All {label}s
            </span>
          </Link>
        </div>
      </main>
<BackToTop />
    </div>
  );
}
