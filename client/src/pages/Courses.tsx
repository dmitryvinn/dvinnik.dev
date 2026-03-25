/**
 * Courses Page — Nature Distilled
 */
import { ArrowLeft, ArrowRight, GraduationCap, BookOpen } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { courses } from "@/data/content";
import TagLink from "@/components/TagLink";

export default function Courses() {
  const featured = courses[0];
  const rest = courses.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Courses & Learning Paths"
        description={`${courses.length} structured learning paths by Dmitry Vinnik on the WhatsApp Business Platform, published on Coursera and Meta Blueprint.`}
        path="/courses"
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
            label="Education"
            title="Courses & Learning Paths"
            description={`${courses.length} structured learning paths on the WhatsApp Business Platform, published on Coursera and Meta Blueprint.`}
          />

          {/* Featured Course */}
          <AnimatedSection className="mb-12">
            <Link href={featured.slug}>
              <div
                className="group nd-card cursor-pointer overflow-hidden !p-0"
                style={{ background: "var(--color-nd-sage-light)", borderColor: "transparent" }}
              >
                {featured.coverImage && (
                  <div className="w-full h-48 lg:h-56 overflow-hidden">
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
                      style={{ background: "var(--color-nd-terracotta)" }}
                    >
                      <GraduationCap className="w-6 h-6" style={{ color: "var(--color-nd-cream)" }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="nd-tag nd-tag-active">Featured</span>
                        <span className="nd-meta">{featured.platform}</span>
                      </div>
                      <h3
                        className="text-xl lg:text-2xl font-medium group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                      >
                        {featured.title}
                      </h3>
                      <p className="nd-body mt-3 max-w-2xl">{featured.description}</p>
                      <span className="nd-link text-sm mt-4 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* Other Courses */}
          <AnimatedSection className="mb-6">
            <div className="nd-accent-line mb-3" />
            <h3 className="nd-heading text-xl">All Courses</h3>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((course) => (
              <StaggerItem key={course.slug}>
                <Link href={course.slug}>
                  <div className="nd-card h-full flex flex-col group cursor-pointer overflow-hidden !p-0">
                    {course.coverImage && (
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-3.5 h-3.5" style={{ color: "var(--color-nd-terracotta)" }} />
                        <span className="nd-meta">{course.platform}</span>
                        <span className="ml-auto">
                          <ArrowRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary transition-colors" />
                        </span>
                      </div>
                      <h4
                        className="text-base font-medium leading-snug group-hover:text-primary transition-colors mb-2"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                      >
                        {course.title}
                      </h4>
                      <p className="nd-body text-sm flex-1">{course.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {course.tags.map(tag => (
                          <TagLink key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
