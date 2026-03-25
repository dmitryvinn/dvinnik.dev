/**
 * TagPage — Aggregates all content across categories for a given tag.
 * Nature Distilled design: warm palette, serif headings, terracotta accents.
 * URL pattern: /tag/:tagName
 */
import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { Tag, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import { getContentByTag, getAllTags } from "@/data/content";

const categoryLabels: Record<string, string> = {
  articles: "Article",
  videos: "Video",
  presentations: "Presentation",
  events: "Event",
  courses: "Course",
  conversations: "Conversation",
};

export default function TagPage() {
  const [location] = useLocation();

  // Extract tag from URL: /tag/open-source → "open-source", then decode
  const rawTag = decodeURIComponent(location.replace(/^\/tag\//, "").replace(/\/$/, ""));

  // Find the actual tag (case-insensitive match)
  const allTags = getAllTags();
  const matchedTag = allTags.find(t => t.toLowerCase() === rawTag.toLowerCase()) || rawTag;

  const allResults = useMemo(() => getContentByTag(matchedTag), [matchedTag]);

  // Category filter
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Get unique categories from results
  const categories = useMemo(() => {
    const cats = new Set(allResults.map(r => r.category));
    return Array.from(cats).sort();
  }, [allResults]);

  const filteredResults = useMemo(() => {
    if (activeCategory === "all") return allResults;
    return allResults.filter(r => r.category === activeCategory);
  }, [allResults, activeCategory]);

  if (allResults.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <SEOHead
          title={`Tag: ${rawTag}`}
          description={`No content found for tag "${rawTag}" on Dmitry Vinnik's portfolio.`}
          path={`/tag/${encodeURIComponent(rawTag)}`}
        />
        <main className="flex-1 container py-20">
          <AnimatedSection>
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-sm cursor-pointer transition-colors"
                style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-terracotta)" }}>
                <ArrowLeft className="w-4 h-4" /> Home
              </span>
            </Link>
            <h1 className="nd-heading text-4xl mt-8">Tag Not Found</h1>
            <p className="nd-body mt-4">
              No content found for the tag "{rawTag}".
            </p>
            <Link href="/">
              <span className="nd-button mt-8 inline-flex cursor-pointer">
                Back to Home
              </span>
            </Link>
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={`${matchedTag} — All Content`}
        description={`Browse all ${allResults.length} articles, videos, presentations, events, courses, and conversations tagged with "${matchedTag}" by Dmitry Vinnik.`}
        path={`/tag/${encodeURIComponent(matchedTag)}`}
      />
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <div style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-12 lg:py-20">
            <AnimatedSection>
              <Link href="/">
                <span className="inline-flex items-center gap-2 text-sm cursor-pointer transition-colors"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-terracotta)" }}>
                  <ArrowLeft className="w-4 h-4" /> Home
                </span>
              </Link>

              <div className="mt-8">
                <div className="nd-accent-line mb-4" />
                <div className="flex items-center gap-3 mb-3">
                  <Tag className="w-5 h-5" style={{ color: "var(--color-nd-terracotta)" }} />
                  <span className="nd-label">Tag</span>
                </div>
                <h1 className="nd-heading text-3xl lg:text-5xl">{matchedTag}</h1>
                <p className="nd-body text-lg mt-4">
                  {allResults.length} item{allResults.length !== 1 ? "s" : ""} across {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="container pt-10">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={activeCategory === "all" ? "nd-tag nd-tag-active" : "nd-tag"}
              >
                All ({allResults.length})
              </button>
              {categories.map(cat => {
                const count = allResults.filter(r => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={activeCategory === cat ? "nd-tag nd-tag-active" : "nd-tag"}
                  >
                    {categoryLabels[cat] || cat}s ({count})
                  </button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Results grid */}
        <div className="container py-10 pb-20">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map(({ item, category }) => (
              <StaggerItem key={item.slug}>
                <ContentCard
                  slug={item.slug}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  tags={item.tags}
                  coverImage={item.coverImage}
                  meta={categoryLabels[category] || category}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredResults.length === 0 && (
            <AnimatedSection>
              <p className="nd-body text-center py-12">
                No {categoryLabels[activeCategory]?.toLowerCase() || activeCategory} content found for this tag.
              </p>
            </AnimatedSection>
          )}
        </div>

        {/* Browse all tags */}
        <div className="container pb-20">
          <AnimatedSection>
            <div className="nd-divider mb-10" />
            <h2
              className="text-2xl mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
            >
              Browse All Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                  <span className={tag === matchedTag ? "nd-tag nd-tag-active cursor-pointer" : "nd-tag cursor-pointer"}>
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
