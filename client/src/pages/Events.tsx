/**
 * Events Page — Nature Distilled
 */
import { useMemo } from "react";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { events } from "@/data/content";

export default function Events() {
  // Group events by year, sorted descending
  const eventsByYear = useMemo(() => {
    const grouped: Record<string, typeof events> = {};
    for (const event of events) {
      const year = new Date(event.date + "T00:00:00").getFullYear().toString();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(event);
    }
    const sorted: [string, typeof events][] = Object.entries(grouped).sort(
      ([a], [b]) => parseInt(b) - parseInt(a)
    );
    for (const [, yearEvents] of sorted) {
      yearEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return sorted;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Events & Conferences"
        description={`${events.length} events and conferences where Dmitry Vinnik has spoken or participated, spanning major tech conferences worldwide.`}
        path="/events"
      />
<main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Events"
            title="Conference Appearances"
            description={`${events.length} events attended and spoken at worldwide, spanning from 2015 to present.`}
          />

          {/* Year navigation */}
          <AnimatedSection className="mb-10">
            <div className="flex flex-wrap gap-2">
              {eventsByYear.map(([year, yearEvents]) => (
                <a
                  key={year}
                  href={`#year-${year}`}
                  className="nd-tag hover:nd-tag-active transition-colors"
                >
                  {year} ({yearEvents.length})
                </a>
              ))}
            </div>
          </AnimatedSection>

          <div className="space-y-14">
            {eventsByYear.map(([year, yearEvents]) => (
              <div key={year} id={`year-${year}`}>
                <AnimatedSection>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="nd-heading text-2xl lg:text-3xl">{year}</span>
                    <div className="flex-1 nd-divider" />
                    <span className="nd-meta">{yearEvents.length} events</span>
                  </div>
                </AnimatedSection>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {yearEvents.map((event) => (
                    <StaggerItem key={event.slug + event.date}>
                      <ContentCard
                        slug={event.slug}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        tags={event.tags}
                        coverImage={event.coverImage}
                        icon={<Calendar className="w-3.5 h-3.5" style={{ color: "var(--color-nd-terracotta)" }} />}
                        dateFormat={{ month: "short", day: "numeric" }}
                        meta={event.location}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            ))}
          </div>
        </div>
      </main>
</div>
  );
}
