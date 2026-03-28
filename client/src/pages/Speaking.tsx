/**
 * Speaking Page — Nature Distilled
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import TagLink from "@/components/TagLink";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { presentations, events } from "@/data/content";

const allTags = Array.from(new Set(presentations.flatMap(p => p.tags))).sort();

const majorEventNames = Array.from(new Set(events.map(e => e.title)))
  .filter(name => [
    "Open Source Summit", "GitHub Universe", "Python Web Conf", "DevTalks",
    "GDG DevFest UK & Ireland", "Open Source Festival", "Developer Week",
    "Future of Testing Forum", "Testμ Conference", "GitHub InFocus",
    "All Things Open", "React Summit", "FOSDEM", "SeleniumConf",
  ].some(notable => name.includes(notable)))
  .slice(0, 12);

export default function Speaking() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Presentations & Talks"
        description={`${presentations.length} presentations by Dmitry Vinnik delivered at major tech conferences worldwide, covering open source, testing, mobile development, and developer advocacy.`}
        path="/speaking"
      />
<main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Speaking"
            title="Presentations & Talks"
            description={`${presentations.length} presentations delivered at major tech conferences worldwide, covering open source, testing, mobile development, and developer advocacy.`}
          />

          {/* Notable Events */}
          <AnimatedSection className="mb-12">
            <h3 className="nd-heading text-xl mb-5">Notable Events</h3>
            <div className="flex flex-wrap gap-2">
              {majorEventNames.map((event) => (
                <span key={event} className="nd-tag">{event}</span>
              ))}
              <span className="nd-meta flex items-center px-3">+{events.length - majorEventNames.length} more events</span>
            </div>
          </AnimatedSection>

          <div className="nd-divider mb-12" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map(tag => (
              <TagLink key={tag} tag={tag} />
            ))}
          </div>

          {/* Presentations Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {presentations.map((pres) => (
              <StaggerItem key={pres.slug}>
                <ContentCard
                  slug={pres.slug}
                  title={pres.title}
                  description={pres.description}
                  date={pres.date}
                  tags={pres.tags}
                  coverImage={pres.coverImage}
                  dateFormat={{ year: "numeric", month: "short" }}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
</div>
  );
}
