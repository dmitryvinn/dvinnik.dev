/**
 * RelatedContent — Shows related content suggestions at the bottom of detail pages.
 * Finds items with shared tags, prioritizing same-category content.
 * Nature Distilled design: warm palette, serif headings, terracotta accents.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getRelatedContent, type ContentItem } from "@/data/content";

const categoryLabels: Record<string, string> = {
  articles: "Article",
  videos: "Video",
  presentations: "Presentation",
  events: "Event",
  courses: "Course",
  conversations: "Conversation",
};

interface RelatedContentProps {
  currentItem: ContentItem;
  category: string;
}

export default function RelatedContent({ currentItem, category }: RelatedContentProps) {
  const related = getRelatedContent(currentItem, category, 4);

  if (related.length === 0) return null;

  return (
    <div className="container pb-16">
      <AnimatedSection>
        <div className="nd-divider mb-10" />
        <h2
          className="text-2xl mb-8"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
        >
          Related Content
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map(({ item, category: cat }) => (
            <Link key={item.slug} href={item.slug}>
              <div className="group cursor-pointer h-full flex flex-col overflow-hidden rounded-lg"
                style={{
                  background: "var(--color-nd-sand)",
                  border: "1px solid oklch(0.22 0.01 55 / 6%)",
                }}>
                {/* Cover image */}
                {item.coverImage && (
                  <div className="w-full h-32 overflow-hidden flex-shrink-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <span
                    className="text-[10px] font-medium tracking-widest uppercase mb-1.5"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-terracotta)" }}
                  >
                    {categoryLabels[cat] || "Content"}
                  </span>

                  <h3
                    className="text-sm font-medium leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed line-clamp-2 flex-1"
                    style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-stone)" }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3">
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-stone)" }}
                    >
                      {new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <ArrowRight
                      className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--color-nd-terracotta)" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
