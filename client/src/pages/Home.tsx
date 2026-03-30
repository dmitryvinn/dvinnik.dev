/**
 * Home — Nature Distilled
 * Warm, organic, human-centered. Generous whitespace, serif headings, terracotta accents.
 * Asymmetric two-column hero, soft cards, sage/terracotta color pops.
 */
import SEOHead from "@/components/SEOHead";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import { articles, videos, presentations, stats, courses } from "@/data/content";
import TagLink from "@/components/TagLink";

const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/profile_c72f6f18.jpg";

const homeStats = [
  { number: `${stats.articles}+`, label: "Articles" },
  { number: `${stats.events}+`, label: "Events" },
  { number: `${stats.presentations}+`, label: "Talks" },
  { number: "10+", label: "Years" },
];

const featuredArticles = articles.slice(0, 3);
const featuredTalks = presentations.slice(0, 3);
const eli5Videos = videos.filter(v => v.title.includes("Explain Like I")).slice(0, 3);
const featuredCourses = courses.slice(0, 4);

const openSourceProjects = [
  "React Native", "Jest", "PyTorch", "Docusaurus", "Flipper", "Fresco", "Litho", "Buck", "CacheLib", "Folly",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Dmitry Vinnik — Lead Developer Advocate at Meta"
        description=" Lead Developer Advocate at Meta. Over a decade of championing open source, educating developers, and speaking at conferences worldwide."
        path="/"
      />
<main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="container py-16 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <span className="nd-label">Developer Advocate · Meta</span>
                <h1 className="nd-heading text-4xl sm:text-5xl lg:text-[4.25rem] mt-4 leading-[1.05]">
                  Building bridges between developers &amp; technology
                </h1>
                <p className="nd-body mt-6 text-lg lg:text-xl max-w-xl">
                  Lead Developer Advocate at Meta. Over a decade of championing open source, educating developers, and speaking at conferences worldwide.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/articles">
                    <span className="nd-button">
                      Read Articles <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/speaking">
                    <span className="nd-button-outline">
                      View Talks
                    </span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right — profile + quote */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.15}>
                <div className="relative">
                  <img
                    src={PROFILE_IMG}
                    alt="Dmitry Vinnik"
                    className="w-full max-w-sm aspect-[4/5] object-cover rounded-lg"
                    style={{ boxShadow: "0 20px 60px oklch(0.22 0.01 55 / 10%)" }}
                  />
                  {/* Decorative terracotta block */}
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 -z-10 rounded-lg"
                    style={{ background: "var(--color-nd-terracotta)", opacity: 0.15 }}
                  />
                  {/* Decorative sage block */}
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 -z-10 rounded-lg"
                    style={{ background: "var(--color-nd-sage)", opacity: 0.12 }}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-12 lg:py-16">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {homeStats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <span className="nd-stat text-4xl lg:text-5xl">{stat.number}</span>
                    <p className="nd-meta mt-2">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== FEATURED ARTICLES ===== */}
        <section className="container py-16 lg:py-24">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Writing</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">Latest Articles</h2>
              </div>
              <Link href="/articles">
                <span className="nd-link text-sm hidden sm:inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                  All Articles <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredArticles.map((article) => (
              <StaggerItem key={article.title}>
                <Link href={article.slug}>
                  <div className="nd-card h-full flex flex-col group cursor-pointer overflow-hidden !p-0">
                    {article.coverImage && (
                      <div className="w-full h-40 overflow-hidden">
                        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <TagLink key={tag} tag={tag} />
                      ))}
                    </div>
                    <h3
                      className="text-lg font-medium leading-snug mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="nd-body text-sm flex-1">{article.description}</p>
                    <span className="nd-link text-xs mt-3 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-6 sm:hidden">
            <Link href="/articles">
              <span className="nd-link text-sm inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                All Articles <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </section>

        <div className="nd-divider" />

        {/* ===== SPEAKING ===== */}
        <section className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <AnimatedSection>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Speaking</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">Conference Talks</h2>
                <p className="nd-body mt-4 text-sm">
                  Regular speaker at major tech conferences worldwide, covering topics from open source and testing to mobile development and AI/ML.
                </p>
                <Link href="/speaking">
                  <span className="nd-link text-sm mt-4 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                    All Talks <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-8">
              <StaggerContainer>
                {featuredTalks.map((talk) => (
                  <StaggerItem key={talk.title}>
                    <Link href={talk.slug}>
                      <div className="py-5 border-b border-border flex items-start justify-between gap-4 group cursor-pointer">
                        <div>
                          <h3
                            className="text-base lg:text-lg font-medium leading-snug group-hover:text-primary transition-colors"
                            style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                          >
                            {talk.title}
                          </h3>
                          <p className="nd-meta mt-1">{talk.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                          {talk.tags.slice(0, 2).map(tag => (
                            <TagLink key={tag} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* ===== OPEN SOURCE — sage background ===== */}
        <section className="nd-section-sage">
          <div className="container py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-6">
                <AnimatedSection>
                  <div className="nd-accent-line mb-3" />
                  <span className="nd-label">Open Source</span>
                  <h2 className="nd-heading text-2xl lg:text-4xl mt-2">
                    Championing Open Source at Scale
                  </h2>
                  <p className="nd-body mt-4">
                    From React Native and Jest to PyTorch and Docusaurus — advocating for Meta's open source projects and helping developers worldwide build better software.
                  </p>
                  <a
                    href="https://github.com/dmitryvinn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nd-link text-sm mt-5 inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    View GitHub Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-6">
                <AnimatedSection delay={0.1}>
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {openSourceProjects.map((project) => (
                      <span key={project} className="nd-tag">{project}</span>
                    ))}
                  </div>
                  <div className="nd-quote">
                    "Open source is not just about code — it's about building communities that outlast any single project."
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ELI5 VIDEOS ===== */}
        <section className="container py-16 lg:py-24">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Video Series</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">Explain Like I'm 5</h2>
              </div>
              <Link href="/videos">
                <span className="nd-link text-sm hidden sm:inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                  All Videos <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {eli5Videos.map((video) => (
              <StaggerItem key={video.title}>
                <Link href={video.slug}>
                  <div className="nd-card h-full group cursor-pointer overflow-hidden !p-0">
                    {/* Video thumbnail */}
                    <div className="relative w-full h-40 overflow-hidden">
                      {video.coverImage ? (
                        <img src={video.coverImage} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full" style={{ background: "var(--color-nd-sand)" }} />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-12 h-12 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform"
                          style={{ background: "var(--color-nd-terracotta)", opacity: 0.85 }}
                        >
                          <Play className="w-5 h-5 ml-0.5" style={{ color: "var(--color-nd-cream)", fill: "var(--color-nd-cream)" }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                    <h3
                      className="text-base font-medium leading-snug mb-1 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                    >
                      {video.title}
                    </h3>
                    <p className="nd-meta">{video.description}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <div className="nd-divider" />

        {/* ===== COURSES ===== */}
        <section className="container py-16 lg:py-24">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Education</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">Courses &amp; Learning</h2>
              </div>
              <Link href="/courses">
                <span className="nd-link text-sm hidden sm:inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                  All Courses <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredCourses.map((course) => (
              <StaggerItem key={course.title}>
                <Link href={course.slug}>
                  <div className="nd-card flex items-start justify-between gap-4 group cursor-pointer">
                    <h3
                      className="text-base font-medium leading-snug group-hover:text-primary transition-colors"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                    >
                      {course.title}
                    </h3>
                    <span className="nd-tag flex-shrink-0">{course.platform}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ===== CTA ===== */}
        <section style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-16 lg:py-24 text-center">
            <AnimatedSection>
              <div className="nd-accent-line mx-auto mb-3" />
              <span className="nd-label">Get in Touch</span>
              <h2 className="nd-heading text-3xl lg:text-5xl mt-3 max-w-lg mx-auto">
                Interested in collaborating?
              </h2>
              <p className="nd-body mt-4 text-lg max-w-md mx-auto">
                Whether it's a conference talk, podcast appearance, open source collaboration, or a conversation about developer advocacy.
              </p>
              <div className="flex justify-center gap-3 mt-8">
                <Link href="/contact">
                  <span className="nd-button">
                    Let's Connect <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
</div>
  );
}
