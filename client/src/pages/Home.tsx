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
  { number: "10+", label: "Years in Tech" },
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
        title="Dmitry Vinnik — Engineering Leader"
        description="Dmitry Vinnik is an Engineering Leader specializing in AI/ML, developer tools, and front-end. Over a decade of championing open source, educating developers, and speaking at conferences worldwide."
        path="/"
      />
<main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="container py-16 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <span className="nd-label">Engineering Leader · AI/ML · Dev Tools · Front-End</span>
                <h1 className="nd-heading text-4xl sm:text-5xl lg:text-[4.25rem] mt-4 leading-[1.05]">
                  Building teams that build bridges between developers &amp; technology
                </h1>
                <p className="nd-body mt-6 text-lg lg:text-xl max-w-xl">
                  Engineering Leader specializing in AI/ML, developer tools, and front-end. Over a decade of championing open source, educating developers, and speaking at conferences worldwide.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/about">
                    <span className="nd-button">
                      About Me <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/projects">
                    <span className="nd-button-outline">
                      View Projects
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

        {/* ===== LEADERSHIP & AI/ML ===== */}
        <section className="container py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <AnimatedSection>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Leadership</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">
                  Developer Advocacy & Technical Leadership
                </h2>
                <p className="nd-body mt-4">
                  Dmitry leads developer advocacy efforts at the intersection of AI/ML and developer experience. From PyTorch to developer tools and platform infrastructure — building the teams and content that help developers succeed.
                </p>
                <Link href="/about">
                  <span className="nd-link text-sm mt-5 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                    Learn More <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7">
              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="nd-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: "var(--color-nd-sage-light)" }}>
                        <svg className="w-5 h-5" style={{ color: "var(--color-nd-sage)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}>
                        Team Building
                      </h3>
                    </div>
                    <p className="nd-body text-sm">Builds and scales high-performing developer advocacy teams focused on developer tools and AI/ML infrastructure.</p>
                  </div>

                  <div className="nd-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: "var(--color-nd-sage-light)" }}>
                        <svg className="w-5 h-5" style={{ color: "var(--color-nd-sage)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}>
                        AI/ML
                      </h3>
                    </div>
                    <p className="nd-body text-sm">Deep expertise in AI/ML ecosystems including PyTorch, creating educational content and building developer experiences.</p>
                  </div>

                  <div className="nd-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: "var(--color-nd-sage-light)" }}>
                        <svg className="w-5 h-5" style={{ color: "var(--color-nd-sage)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                      </div>
                      <h3 className="text-base font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}>
                        Developer Advocacy
                      </h3>
                    </div>
                    <p className="nd-body text-sm">Over a decade of building bridges between engineering teams and developer communities through education and advocacy.</p>
                  </div>

                  <div className="nd-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: "var(--color-nd-sage-light)" }}>
                        <svg className="w-5 h-5" style={{ color: "var(--color-nd-sage)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <h3 className="text-base font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}>
                        Dev Tools & Front-End
                      </h3>
                    </div>
                    <p className="nd-body text-sm">Developer tools and front-end frameworks at scale — from React Native and Jest to design systems and frontend architecture.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <div className="nd-divider" />

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
                  Dmitry is a regular speaker at major tech conferences worldwide, covering topics from open source and testing to mobile development and AI/ML.
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
                    From React Native and Jest to PyTorch and Docusaurus — Dmitry leads teams that build and advocate for open source projects, helping developers worldwide build better software.
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

        {/* ===== FEATURED PROJECTS ===== */}
        <section className="container py-16 lg:py-24">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">Case Studies</span>
                <h2 className="nd-heading text-2xl lg:text-4xl mt-2">Featured Projects</h2>
              </div>
              <Link href="/projects">
                <span className="nd-link text-sm hidden sm:inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                  All Projects <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Explain Like I'm 5",
                tagline: "Making complex open source accessible",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-eli5-mxA3n9YK28ivXzj47wHkYA.webp",
                category: "Developer Education",
              },
              {
                title: "WhatsApp Business Platform",
                tagline: "Developer education at platform scale",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-whatsapp-SfPxidG8M4WVpbm2wkN3nf.webp",
                category: "Business Messaging",
              },
              {
                title: "Global Conference Speaking",
                tagline: "30+ talks across 6 continents",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-speaking-8SVR4hLNbybe7y3MNsaXKu.webp",
                category: "Public Speaking",
              },
              {
                title: "The Diff Podcast",
                tagline: "Stories behind open source projects",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-the-diff-6fKSBPgj9jYvkoTYu4VhMe.webp",
                category: "Podcasts & Interviews",
              },
            ].map((project) => (
              <StaggerItem key={project.title}>
                <Link href="/projects">
                  <div className="nd-card h-full group cursor-pointer overflow-hidden !p-0">
                    <div className="relative w-full h-36 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="nd-meta text-xs uppercase tracking-wider">{project.category}</span>
                      <h3
                        className="text-base font-medium leading-snug mt-1 group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="nd-body text-sm mt-1">{project.tagline}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-6 sm:hidden">
            <Link href="/projects">
              <span className="nd-link text-sm inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                All Projects <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </section>

        <div className="nd-divider" />

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
                  <div className="nd-card flex flex-col gap-3 group cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className="text-base font-medium leading-snug group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                      >
                        {course.title}
                      </h3>
                      <span className="nd-tag flex-shrink-0">{course.platform}</span>
                    </div>
                    {course.description && (
                      <p className="nd-meta text-sm leading-relaxed">{course.description}</p>
                    )}
                    <span className="nd-link text-xs inline-flex items-center gap-1" style={{ fontFamily: "var(--font-sans)" }}>
                      View Course <ArrowRight className="w-3 h-3" />
                    </span>
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
                Whether it's a conference talk, podcast appearance, open source collaboration, or a conversation about building great developer experiences.
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
