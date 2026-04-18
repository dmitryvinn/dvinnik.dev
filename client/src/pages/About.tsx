/**
 * About Page — Nature Distilled
 * Full career narrative bridging Developer Advocacy and Engineering Leadership
 * Written in third person, timeline sourced from LinkedIn
 */
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/profile_c72f6f18.jpg";

const timeline = [
  {
    period: "Aug 2019 — Present",
    role: "Lead Developer Advocate, Open Source",
    company: "Meta",
    bullets: [
      "Lead a team of developer advocates and consulting agencies to drive adoption and community engagement for open source projects, including PyTorch, React Native, Jest, and Docusaurus.",
      "Collaborate with product teams on the WhatsApp Business Platform to develop developer-facing content and resources.",
      "Produced 45+ educational videos and 40+ technical articles, reaching millions of developers worldwide.",
      "Delivered 30+ presentations at major international tech conferences, including GitHub Universe, All Things Open, and Open Source Summit.",
      "Created comprehensive courses on Coursera covering open source, testing, and developer tools.",
      "Managed cross-functional relationships with engineering, product, and marketing teams to align developer advocacy strategy with business objectives.",
    ],
  },
  {
    period: "Mar 2016 — Jul 2019",
    role: "Lead Software Engineer & Scrum Master",
    company: "Salesforce",
    bullets: [
      "Led full-stack development for Salesforce's cloud-based platform, building scalable enterprise solutions using Java, JavaScript, and Salesforce technologies.",
      "Mentored junior engineers and conducted code reviews to maintain high code quality standards across the team.",
      "Designed and implemented RESTful APIs and microservices architecture to support platform integrations.",
      "Collaborated with product managers and UX designers to deliver features that improved customer satisfaction and platform adoption.",
    ],
  },
  {
    period: "Nov 2015 — Mar 2016",
    role: "Intermediate Software Engineer in Test",
    company: "Electronic Arts",
    bullets: [
      "Developed and maintained automated test frameworks for Electronic Arts' gaming platforms, ensuring quality and reliability across releases.",
      "Collaborated with development teams to identify, reproduce, and resolve software defects in a fast-paced Agile environment.",
      "Contributed to CI/CD pipeline improvements, reducing build and test cycle times.",
    ],
  },
  {
    period: "Jul 2014 — Nov 2015",
    role: "Java Developer",
    company: "ZE PowerGroup",
    bullets: [
      "Designed, developed, and implemented a MEAN stack web application which exposed major issues with certain aspects of core product and data collection.",
      "Created an application using Hibernate/Hibernate OGM to provide a full range of testing for a major component of the data integration engine.",
      "Provided complete automation of back-end performance testing using MyBatis and produced results with analytical graphs to assess scalability.",
    ],
  },
];

const expertise = [
  {
    area: "AI/ML & Developer Tools",
    skills: ["PyTorch", "AI Infrastructure", "Developer Experience", "ML Ops"],
  },
  {
    area: "Front-End Engineering",
    skills: ["React", "React Native", "Front-End Architecture", "Design Systems", "Frontend Performance"],
  },
  {
    area: "Developer Advocacy",
    skills: ["Technical Writing", "Conference Speaking", "Developer Education", "Community Building", "Open Source Strategy"],
  },
  {
    area: "Engineering Leadership",
    skills: ["Team Building", "Technical Strategy", "Cross-functional Leadership", "Mentorship", "Agile"],
  },
  {
    area: "Software Engineering",
    skills: ["TypeScript", "Python", "Java", "System Design", "Testing Infrastructure"],
  },
];

const education = [
  {
    school: "British Columbia Institute of Technology",
    degree: "Bachelor of Technology in Computer Systems",
    focus: "Wireless and Mobile Applications Development, Human-Computer Interaction",
    period: "2015 — 2018",
  },
  {
    school: "Langara College",
    degree: "Associate of Science",
    focus: "Bioinformatics",
    period: "2013 — 2014",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="About"
        description="Dmitry Vinnik is a Lead Developer Advocate specializing in AI/ML, developer tools, and front-end, with over a decade of experience championing open source, building teams, and speaking at conferences worldwide."
        path="/about"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/og-about-FLgLdtxTmq568Zrb8E4US5.png"
      />
      <main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span
              className="nd-link text-sm inline-flex items-center gap-1 mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="nd-accent-line mb-3" />
                <span className="nd-label">About</span>
                <h1 className="nd-heading text-3xl sm:text-4xl lg:text-5xl mt-3">
                  Developer Advocate. Open Source Champion. Technical Leader.
                </h1>
                <div className="mt-6 space-y-4">
                  <p className="nd-body text-base lg:text-lg">
                    Dmitry Vinnik is a Lead Developer Advocate with over a decade of experience championing open source, educating developers, and building bridges between developers and technology. He specializes in leading technical developer advocacy teams and producing high-impact developer content across AI/ML, developer tools, and front-end.
                  </p>
                  <p className="nd-body text-base lg:text-lg">
                    Dmitry currently leads several developer advocacy efforts for major open source projects including PyTorch, React Native, Jest, and Docusaurus. He also built and launched DevRel Academy (devrelacademy.com), a comprehensive learning platform with 2,800+ curated resources for developer advocates. His work spans the full spectrum of developer engagement — from creating educational content and delivering conference talks to collaborating with product teams on developer-facing resources for platforms like WhatsApp Business.
                  </p>
                  <p className="nd-body text-base lg:text-lg">
                    Dmitry is passionate about sharing knowledge and has delivered over 30 presentations at major tech conferences worldwide, including GitHub Universe, All Things Open, and Open Source Summit. His content portfolio includes 45+ educational videos, 40+ technical articles, and comprehensive courses on Coursera. He believes that open source is not just about code — it's about building communities that outlast any single project.
                  </p>
                  <p className="nd-body text-base lg:text-lg">
                    Previously, Dmitry held engineering roles where he honed his skills in software development, team leadership, and developer education — experience that gives him a unique perspective on how developers experience and adopt technology.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-5">
              <AnimatedSection delay={0.15}>
                <div className="relative">
                  <img
                    src={PROFILE_IMG}
                    alt="Dmitry Vinnik"
                    className="w-full max-w-sm aspect-[4/5] object-cover rounded-lg"
                    style={{
                      boxShadow: "0 20px 60px oklch(0.22 0.01 55 / 10%)",
                    }}
                  />
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 -z-10 rounded-lg"
                    style={{
                      background: "var(--color-nd-terracotta)",
                      opacity: 0.15,
                    }}
                  />
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 -z-10 rounded-lg"
                    style={{
                      background: "var(--color-nd-sage)",
                      opacity: 0.12,
                    }}
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <section style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="nd-accent-line mb-3" />
              <span className="nd-label">Career</span>
              <h2 className="nd-heading text-2xl lg:text-4xl mt-2 mb-10">
                Professional Journey
              </h2>
            </AnimatedSection>

            <StaggerContainer className="space-y-0">
              {timeline.map((item, index) => (
                <StaggerItem key={item.period}>
                  <div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-6"
                    style={{
                      borderBottom:
                        index < timeline.length - 1
                          ? "1px solid oklch(0.22 0.01 55 / 8%)"
                          : "none",
                    }}
                  >
                    <div className="lg:col-span-3">
                      <span
                        className="nd-meta"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <div className="lg:col-span-9">
                      <h3
                        className="text-lg font-medium"
                        style={{
                          fontFamily: "var(--font-serif)",
                          color: "var(--color-nd-charcoal)",
                        }}
                      >
                        {item.role}
                      </h3>
                      <span
                        className="nd-meta mt-1 block"
                        style={{ color: "var(--color-nd-terracotta)" }}
                      >
                        {item.company}
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="nd-body text-sm flex gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--color-nd-terracotta)", opacity: 0.6 }} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="nd-accent-line mb-3" />
              <span className="nd-label">Education</span>
              <h2 className="nd-heading text-2xl lg:text-4xl mt-2 mb-10">
                Academic Background
              </h2>
            </AnimatedSection>

            <StaggerContainer className="space-y-0">
              {education.map((item, index) => (
                <StaggerItem key={item.school}>
                  <div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-6"
                    style={{
                      borderBottom:
                        index < education.length - 1
                          ? "1px solid oklch(0.22 0.01 55 / 8%)"
                          : "none",
                    }}
                  >
                    <div className="lg:col-span-3">
                      <span
                        className="nd-meta"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <div className="lg:col-span-9">
                      <h3
                        className="text-lg font-medium"
                        style={{
                          fontFamily: "var(--font-serif)",
                          color: "var(--color-nd-charcoal)",
                        }}
                      >
                        {item.degree}
                      </h3>
                      <span
                        className="nd-meta mt-1 block"
                        style={{ color: "var(--color-nd-terracotta)" }}
                      >
                        {item.school}
                      </span>
                      <p className="nd-body text-sm mt-1">
                        {item.focus}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Expertise */}
        <section style={{ background: "var(--color-nd-sand)" }}>
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="nd-accent-line mb-3" />
              <span className="nd-label">Expertise</span>
              <h2 className="nd-heading text-2xl lg:text-4xl mt-2 mb-10">
                Areas of Focus
              </h2>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {expertise.map((item) => (
                <StaggerItem key={item.area}>
                  <div className="nd-card h-full">
                    <h3
                      className="text-lg font-medium mb-4"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "var(--color-nd-charcoal)",
                      }}
                    >
                      {item.area}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="nd-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="nd-section-sage">
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <div className="nd-quote" style={{ textAlign: "left" }}>
                  "Open source is not just about code — it's about building communities that outlast any single project. The most impactful technology is built by teams that deeply understand their users."
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="nd-card p-6" style={{ background: "var(--color-nd-sand)" }}>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-nd-charcoal)",
                    }}
                  >
                    Engineering Leadership Resources
                  </h3>
                  <p className="nd-body text-sm mb-4">
                    A curated collection of resources for engineering leaders and managers.
                  </p>
                  <a
                    href="https://github.com/dmitryvinn/awesome-engineering-leadership"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nd-link text-sm inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    View on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="nd-card p-6" style={{ background: "var(--color-nd-sand)" }}>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-nd-charcoal)",
                    }}
                  >
                    Developer Advocacy Resources
                  </h3>
                  <p className="nd-body text-sm mb-4">
                    900+ curated resources for developer advocates — books, blogs, videos, podcasts, tools, and communities.
                  </p>
                  <a
                    href="https://github.com/dmitryvinn/awesome-dev-advocacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nd-link text-sm inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    View on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <div className="mt-12 text-center">
              <AnimatedSection>
                <Link href="/contact">
                  <span className="nd-button">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
