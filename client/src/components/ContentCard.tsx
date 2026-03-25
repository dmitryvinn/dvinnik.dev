/**
 * ContentCard — Reusable card component with optional cover image thumbnail
 * Nature Distilled design: warm cards, serif titles, terracotta accents
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { ReactNode } from "react";
import TagLink from "@/components/TagLink";

interface ContentCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  icon?: ReactNode;
  dateFormat?: Intl.DateTimeFormatOptions;
  meta?: string; // optional extra metadata (e.g., platform name)
}

export default function ContentCard({
  slug,
  title,
  description,
  date,
  tags,
  coverImage,
  icon,
  dateFormat = { year: "numeric", month: "short", day: "numeric" },
  meta,
}: ContentCardProps) {
  return (
    <Link href={slug}>
      <div className="nd-card h-full flex flex-col group cursor-pointer overflow-hidden !p-0">
        {/* Cover image thumbnail */}
        {coverImage && (
          <div className="w-full h-40 overflow-hidden flex-shrink-0">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="nd-meta">
              {new Date(date + "T00:00:00").toLocaleDateString("en-US", dateFormat)}
            </span>
            {meta && <span className="nd-meta">· {meta}</span>}
            <ArrowRight className="w-3.5 h-3.5 ml-auto text-foreground/20 group-hover:text-primary transition-colors flex-shrink-0" />
          </div>

          <h3
            className="text-base font-medium leading-snug mb-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
          >
            {title}
          </h3>

          <p className="nd-body text-sm flex-1 line-clamp-3">{description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map(tag => (
                <TagLink key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
