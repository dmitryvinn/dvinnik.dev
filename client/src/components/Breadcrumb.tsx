/**
 * Breadcrumb — Renders breadcrumb navigation for detail pages.
 * Outputs both visible breadcrumbs and a Schema.org BreadcrumbList JSON-LD.
 * Nature Distilled design: subtle, warm, serif-accented.
 *
 * Example: Home > Events > 2022 > All Things Open 2022
 */
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const SITE_URL = "https://dvinnik.dev";

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Build JSON-LD BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-xs">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;

          return (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: "var(--color-nd-stone)" }}
                />
              )}
              {isLast || !crumb.href ? (
                <span
                  className="inline-flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: isLast ? "var(--color-nd-charcoal)" : "var(--color-nd-stone)",
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {i === 0 && <Home className="w-3 h-3" />}
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href}>
                  <span
                    className="inline-flex items-center gap-1 cursor-pointer hover:underline transition-colors"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-nd-terracotta)",
                    }}
                  >
                    {i === 0 && <Home className="w-3 h-3" />}
                    {crumb.label}
                  </span>
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

/**
 * Build breadcrumb items for a content detail page.
 * e.g., slug="/events/2022/allthingsopen/" → Home > Events > 2022 > All Things Open 2022
 */
export function buildContentBreadcrumbs(
  category: string,
  categoryLabel: string,
  listPath: string,
  title: string,
  slug: string
): BreadcrumbItem[] {
  // Extract year from slug: /events/2022/allthingsopen/ → "2022"
  const parts = slug.split("/").filter(Boolean);
  const year = parts.length >= 2 ? parts[1] : null;

  const crumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: `${categoryLabel}s`, href: listPath },
  ];

  if (year && /^\d{4}$/.test(year)) {
    crumbs.push({ label: year });
  }

  crumbs.push({ label: title });

  return crumbs;
}
