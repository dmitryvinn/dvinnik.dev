/**
 * Articles Page — Nature Distilled
 * Warm cards with cover image thumbnails, sage tags, terracotta accents
 */
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { articles } from "@/data/content";

const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

export default function Articles() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? articles.filter(a => a.tags.includes(activeTag)) : articles;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Articles & Technical Writing"
        description={`${articles.length} in-depth articles by Dmitry Vinnik on open source technologies, developer tools, and engineering best practices.`}
        path="/articles"
      />
      <Navigation />
      <main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Writing"
            title="Articles & Technical Writing"
            description={`${articles.length} in-depth articles on open source technologies, developer tools, and engineering best practices.`}
          />

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`nd-tag ${!activeTag ? "nd-tag-active" : ""}`}
            >
              All ({articles.length})
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`nd-tag ${activeTag === tag ? "nd-tag-active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <StaggerItem key={article.slug}>
                <ContentCard
                  slug={article.slug}
                  title={article.title}
                  description={article.description}
                  date={article.date}
                  tags={article.tags}
                  coverImage={article.coverImage}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
