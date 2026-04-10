/**
 * Projects / Case Studies Page — Nature Distilled
 * Showcases key initiatives spanning AI/ML, developer tools, front-end, and open source
 */
import { ArrowLeft, ArrowRight, ExternalLink, Play, BookOpen, Users, Code, Layers, BarChart3, MessageCircle, Mic, Heart, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: string;
  overview: string;
  challenge: string;
  approach: string;
  impact: string[];
  technologies: string[];
  relatedContent: { label: string; href: string }[];
  icon: React.ReactNode;
  accentColor: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "eli5",
    title: "Explain Like I'm 5",
    tagline: "Making complex open source accessible to every developer",
    category: "Developer Education · Video Series",
    overview:
      "Created and hosted a multi-season video series that broke down complex open source projects into digestible, 5-minute explanations. The series spanned 20+ projects across React, React Native, PyTorch, Docusaurus, Jest, Yoga, Metro, CacheLib, and more — covering the full spectrum from front-end frameworks to AI/ML infrastructure.",
    challenge:
      "Open source projects often have steep learning curves. Developers needed a fast, approachable way to understand what each project does, why it matters, and how to get started — without reading thousands of lines of documentation.",
    approach:
      "Designed a consistent format: each episode distills a project's core value proposition, architecture, and getting-started path into a concise, visual explanation. Collaborated with project maintainers to ensure technical accuracy while keeping the content accessible to developers at any level.",
    impact: [
      "20+ projects covered across 3 seasons",
      "Spanned front-end frameworks (React, Litho, ComponentKit), dev tools (Jest, Flipper, Metro), and AI/ML (PyTorch MMF, Bean Machine)",
      "Published on Meta Open Source channels reaching hundreds of thousands of developers",
      "Became a go-to onboarding resource for new contributors to open source projects",
    ],
    technologies: ["React", "React Native", "PyTorch", "Docusaurus", "Jest", "Flipper", "Yoga", "Metro", "CacheLib"],
    relatedContent: [
      { label: "ELI5: React", href: "/videos/2021/eli5-react/" },
      { label: "ELI5: Docusaurus", href: "/videos/2021/eli5-docusaurus/" },
      { label: "ELI5: React DevTools", href: "/videos/2021/eli5-react-devtools/" },
      { label: "Season 3 Launch", href: "/videos/2021/eli5-series-season-3-launch/" },
    ],
    icon: <Play className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  {
    id: "whatsapp-dev",
    title: "WhatsApp Business Platform Developer Education",
    tagline: "Empowering developers to build on the world's most popular messaging platform",
    category: "Developer Education · Business Messaging",
    overview:
      "Led the creation of a comprehensive developer education program for the WhatsApp Business Platform, producing courses, video content, and technical guides that help developers integrate, manage, and troubleshoot WhatsApp Business APIs. The program covers the full developer journey — from initial setup to advanced management and debugging.",
    challenge:
      "The WhatsApp Business Platform serves millions of businesses worldwide, but developers integrating with the APIs faced a fragmented learning experience. Technical documentation alone wasn't enough — developers needed structured, hands-on education to successfully build and scale their integrations.",
    approach:
      "Designed a multi-format education program: structured Coursera courses for deep learning, short-form video content for quick onboarding, and written guides for reference. Each piece was built to stand alone while fitting into a cohesive learning path from platform overview to advanced troubleshooting.",
    impact: [
      "6 comprehensive courses published covering the full WhatsApp Business Platform lifecycle",
      "Courses span setup, implementation, management API, and troubleshooting",
      "Launched 'WhatsUp with WhatsApp' developer show for ongoing platform updates",
      "Reached developers across 180+ countries building on the WhatsApp Business Platform",
    ],
    technologies: ["WhatsApp Business API", "Cloud API", "Business Management API", "Webhooks", "REST APIs"],
    relatedContent: [
      { label: "WhatsApp Business Platform for Developers", href: "/courses/whatsapp-business-platform-for-developers/" },
      { label: "Implement the WhatsApp Business Platform", href: "/courses/implement-the-whatsapp-business-platform/" },
      { label: "WhatsUp with WhatsApp", href: "/videos/2023/whatsup-with-whatsapp/" },
      { label: "Troubleshoot the WhatsApp Business Platform", href: "/courses/troubleshoot-the-whatsapp-business-platform/" },
    ],
    icon: <MessageCircle className="w-5 h-5" />,
    accentColor: "var(--color-nd-sage)",
  },
  {
    id: "oss-health",
    title: "Open Source Project Health Framework",
    tagline: "Data-driven approach to measuring and improving open source communities",
    category: "Engineering Leadership · Open Source Strategy",
    overview:
      "Developed and evangelized a comprehensive methodology for measuring the health of open source projects at scale. The framework provided actionable metrics that guided DevRel prioritization and resource allocation across a portfolio of 600+ open source repositories.",
    challenge:
      "With hundreds of open source projects, teams needed a systematic way to assess which projects were thriving, which needed attention, and where to focus limited DevRel resources. Traditional metrics like star counts were insufficient — a more nuanced, multi-dimensional health model was needed.",
    approach:
      "Built a framework inspired by personal health metaphors — just as human health requires multiple vital signs, project health requires measuring community engagement, contributor diversity, documentation quality, issue response time, and ecosystem integration. Presented the methodology at 8+ international conferences to share learnings with the broader open source community.",
    impact: [
      "Presented at 8+ major conferences including Open Source Summit, All Things Open, and DevTalks",
      "Framework adopted for prioritizing DevRel focus across 600+ repositories",
      "Press coverage from Business Insider, The Recursive, and PR Newswire",
      "Helped establish data-driven DevRel as a practice within the organization",
    ],
    technologies: ["Data Analytics", "Community Metrics", "Open Source Governance", "DevRel Strategy"],
    relatedContent: [
      { label: "Conference Talk", href: "/presentations/2021/10000-steps-of-open-source-project-health/" },
      { label: "Open Source: 2021 Year in Review", href: "/articles/2021/open-source-year-in-review-2021/" },
      { label: "Open Source: 2020 Year in Review", href: "/articles/2020/open-source-year-in-review-2020/" },
    ],
    icon: <BarChart3 className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  {
    id: "conference-speaking",
    title: "Global Conference Speaking Program",
    tagline: "30+ talks across 6 continents, from keynotes to hands-on workshops",
    category: "Developer Advocacy · Public Speaking",
    overview:
      "Built and sustained a global conference speaking program spanning 30+ presentations at major international tech conferences. Topics range from open source strategy and testing infrastructure to developer wellness and engineering leadership — reaching developer communities across North America, Europe, Asia, and beyond.",
    challenge:
      "Developer advocacy at scale requires more than publishing content — it demands face-to-face engagement with developer communities worldwide. Each conference audience has different needs, technical depth expectations, and cultural context, requiring talks to be both technically rigorous and broadly accessible.",
    approach:
      "Developed a diverse talk portfolio covering multiple technical domains and soft skills, allowing each conference appearance to be tailored to the audience. Combined keynote-style thought leadership talks with hands-on workshops where developers could build alongside the presenter. Prioritized conferences that serve underrepresented developer communities.",
    impact: [
      "30+ presentations at conferences including GitHub Universe, All Things Open, FOSDEM, and DjangoCon",
      "Hands-on workshops delivered at TechBash, WeAreDevelopers, and Porto Tech Hub",
      "Talks span 5+ technical domains: testing, open source, mobile, wellness, and leadership",
      "Consistent speaker at both large-scale events (5,000+ attendees) and intimate community meetups",
    ],
    technologies: ["Public Speaking", "Workshop Design", "Technical Storytelling", "Developer Relations"],
    relatedContent: [
      { label: "All Talks", href: "/speaking" },
      { label: "Hands-on React Native Workshop", href: "/presentations/2021/hands-on-react-native/" },
      { label: "Stress Driven Development", href: "/presentations/2019/stress-driven-development/" },
      { label: "Modern Web Testing", href: "/presentations/2019/modern-web-testing/" },
    ],
    icon: <Mic className="w-5 h-5" />,
    accentColor: "var(--color-nd-sage)",
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Front-End & Developer Tooling",
    tagline: "Championing tools that let developers build once, deploy everywhere",
    category: "Front-End · Dev Tools · Mobile",
    overview:
      "Led developer advocacy for a suite of cross-platform front-end frameworks and developer tools — including React Native, Yoga (cross-platform CSS layout engine), Flipper (mobile debugger), and Metro (JavaScript bundler). Built hands-on workshops, conference talks, and educational content that helped developers adopt these tools at scale.",
    challenge:
      "Mobile and cross-platform development involves a fragmented ecosystem of tools, platforms, and debugging workflows. Developers building for iOS, Android, and web simultaneously needed better tooling, clearer documentation, and practical guidance on architecture decisions.",
    approach:
      "Created a comprehensive advocacy program spanning multiple tools in the cross-platform stack: from layout engines (Yoga) to bundlers (Metro) to debuggers (Flipper) to the framework itself (React Native). Each initiative combined hands-on conference workshops, video tutorials, and written guides — meeting developers where they were in their adoption journey.",
    impact: [
      "React Native talk featured in Business Insider coverage of the framework's enterprise adoption",
      "Hands-on React Native workshop delivered at 4+ major conferences (All Things Open, TechBash, WeAreDevelopers)",
      "Flipper debugging talk helped developers adopt modern mobile debugging practices",
      "Yoga cross-platform CSS talk demonstrated front-end code reuse across React Native and Android",
    ],
    technologies: ["React Native", "Yoga", "Flipper", "Metro", "Android", "iOS", "TypeScript"],
    relatedContent: [
      { label: "Hands-on React Native", href: "/presentations/2021/hands-on-react-native/" },
      { label: "Cross-Platform CSS with Yoga", href: "/presentations/2021/cross-platform-css-with-yoga/" },
      { label: "Mobile Debugging with Flipper", href: "/presentations/2021/mobile-debugging-with-flipper/" },
      { label: "ELI5: Metro", href: "/articles/2021/eli5-metro/" },
    ],
    icon: <Layers className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  {
    id: "testing-at-scale",
    title: "Testing Infrastructure & Visual QA",
    tagline: "Building testing strategies that scale across enterprise platforms",
    category: "Dev Tools · Quality Engineering",
    overview:
      "Drove the adoption of modern testing practices across enterprise organizations, from building testing infrastructure at Salesforce to advocating for visual regression testing and AI-powered QA tools. Published extensively on testing strategies and spoke at major QA conferences worldwide.",
    challenge:
      "Enterprise applications with complex front-ends and frequent releases need testing strategies that are both comprehensive and maintainable. Traditional assertion-based testing couldn't keep up with the pace of front-end changes, and teams needed scalable approaches to visual regression testing.",
    approach:
      "Pioneered the integration of visual AI testing into enterprise workflows, demonstrating how tools like Applitools could reduce test maintenance while increasing coverage. Combined this with deep expertise in testing frameworks (Jest, Cypress, Selenium) to build end-to-end testing strategies that balanced speed with confidence.",
    impact: [
      "Published definitive guides on visual regression testing for mobile and web platforms",
      "Spoke at 10+ QA-focused conferences including SeleniumConf, Nordic Testing Days, and Agile Testing Days",
      "Testing at Scale talk bridged enterprise testing practices across multiple organizations",
      "Helped teams transition from brittle assertion-based tests to AI-powered visual validation",
    ],
    technologies: ["Jest", "Cypress", "Selenium", "Applitools", "Visual AI", "TestZeus", "CI/CD"],
    relatedContent: [
      { label: "Testing at Scale", href: "/presentations/2022/testing-at-scale/" },
      { label: "Visual Regression Testing", href: "/articles/2019/visual-regression-testing/" },
      { label: "Lightning Fast Testing for Salesforce", href: "/articles/2023/lightning-fast-testing-for-salesforce-with-applitools-and-testzeus/" },
    ],
    icon: <Code className="w-5 h-5" />,
    accentColor: "var(--color-nd-sage)",
  },
  {
    id: "developer-wellness",
    title: "Developer Wellness & Sustainable Engineering",
    tagline: "Advocating for healthier, more sustainable ways of building software",
    category: "Engineering Culture · Developer Wellness",
    overview:
      "Developed a body of work around developer wellness and sustainable engineering practices, challenging the industry's burnout culture through conference talks, articles, and community engagement. The 'Stress Driven Development' talk became one of the most-requested presentations, delivered at conferences across multiple continents.",
    challenge:
      "The tech industry's 'always-on' culture leads to burnout, reduced productivity, and talent attrition. While most developer advocacy focuses on tools and frameworks, few advocates address the human side of software development — the mental health, work-life balance, and sustainable practices that determine long-term career success.",
    approach:
      "Combined personal experience with research-backed strategies to create talks and content that resonated with developers at every career stage. Used humor and storytelling to make wellness topics approachable in technical conference settings, and partnered with conference organizers to normalize wellness content alongside technical tracks.",
    impact: [
      "Delivered 'Stress Driven Development' at 8+ conferences including Devoxx, VoxxedDays, HackConf, and AgentConf",
      "Spoke on developer productivity and the 'Science of Lost Time' at multiple events",
      "Helped normalize wellness conversations in traditionally technical conference settings",
      "Reached thousands of developers with actionable strategies for sustainable engineering careers",
    ],
    technologies: ["Public Speaking", "Developer Experience", "Engineering Culture", "Productivity"],
    relatedContent: [
      { label: "Stress Driven Development", href: "/presentations/2019/stress-driven-development/" },
      { label: "Science of Lost Time", href: "/presentations/2020/towards-productivity-science-of-lost-time/" },
      { label: "Overcoming Remote Work Challenges", href: "/videos/2020/overcoming-challenges-facing-remote-employees/" },
    ],
    icon: <Heart className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  {
    id: "coursera-education",
    title: "Coursera Developer Education Program",
    tagline: "Structured learning paths for developers at every level",
    category: "Developer Education · Online Learning",
    overview:
      "Designed and produced comprehensive courses on Coursera covering open source, testing, developer tools, and the WhatsApp Business Platform. These structured learning paths provide developers with a guided curriculum that goes deeper than blog posts or conference talks — combining video instruction, hands-on exercises, and assessments.",
    challenge:
      "While blog posts and conference talks are effective for awareness, developers adopting new platforms and tools need structured, progressive learning experiences. The gap between 'I've heard of this' and 'I can build with this' requires guided education that scales beyond one-on-one mentorship.",
    approach:
      "Created multi-module courses that follow a progressive learning model: each course builds from foundational concepts to advanced implementation. Combined video lectures with practical exercises, real-world scenarios, and assessments to ensure developers can apply what they learn. Partnered with product teams to keep course content aligned with the latest platform capabilities.",
    impact: [
      "Multiple courses published on Coursera reaching a global developer audience",
      "Courses cover open source fundamentals, testing strategies, and platform-specific development",
      "WhatsApp Business Platform courses provide the definitive learning path for platform developers",
      "Structured curriculum format enables self-paced learning for developers in 180+ countries",
    ],
    technologies: ["Coursera", "Curriculum Design", "Video Production", "Assessment Design"],
    relatedContent: [
      { label: "WhatsApp Business Platform for Developers", href: "/courses/whatsapp-business-platform-for-developers/" },
      { label: "Set up the WhatsApp Business Platform", href: "/courses/set-up-the-whatsapp-business-platform/" },
      { label: "All Courses", href: "/courses" },
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    accentColor: "var(--color-nd-sage)",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Projects"
        description="Case studies and key initiatives by Dmitry Vinnik spanning AI/ML, developer tools, front-end frameworks, and open source — from the Explain Like I'm 5 series to enterprise testing infrastructure."
        path="/projects"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/og-projects-3Bd2iELkcFnRMBaNG6SgaM.png"
      />
      <main className="flex-1">
        {/* Hero */}
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span
              className="nd-link text-sm inline-flex items-center gap-1 mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <AnimatedSection>
            <div className="nd-accent-line mb-3" />
            <span className="nd-label">Projects</span>
            <h1 className="nd-heading text-3xl sm:text-4xl lg:text-5xl mt-3 max-w-3xl">
              Building at the intersection of developer tools, education, and open source
            </h1>
            <p className="nd-body text-base lg:text-lg mt-6 max-w-2xl">
              A selection of initiatives that represent the breadth of Dmitry's work — from creating developer education programs reaching hundreds of thousands of developers, to building frameworks for measuring open source health at scale.
            </p>
          </AnimatedSection>
        </div>

        {/* Case Studies */}
        {caseStudies.map((study, index) => (
          <section
            key={study.id}
            style={{
              background: index % 2 === 1 ? "var(--color-nd-sand)" : undefined,
            }}
          >
            {index > 0 && <div className="nd-divider" />}
            <div className="container py-16 lg:py-24">
              <AnimatedSection>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg"
                      style={{
                        background: study.accentColor,
                        opacity: 0.15,
                      }}
                    >
                      <span style={{ color: study.accentColor }}>{study.icon}</span>
                    </div>
                    <span className="nd-label">{study.category}</span>
                  </div>
                  <h2 className="nd-heading text-2xl lg:text-4xl">{study.title}</h2>
                  <p
                    className="mt-2 text-lg"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      color: "var(--color-nd-terracotta)",
                    }}
                  >
                    {study.tagline}
                  </p>
                </div>

                {/* Overview */}
                <div className="mt-8">
                  <p className="nd-body text-base lg:text-lg leading-relaxed max-w-3xl">
                    {study.overview}
                  </p>
                </div>

                {/* Challenge & Approach */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                  <div>
                    <h3
                      className="text-base font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "var(--color-nd-charcoal)",
                      }}
                    >
                      The Challenge
                    </h3>
                    <p className="nd-body text-sm leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3
                      className="text-base font-medium mb-3"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "var(--color-nd-charcoal)",
                      }}
                    >
                      The Approach
                    </h3>
                    <p className="nd-body text-sm leading-relaxed">{study.approach}</p>
                  </div>
                </div>

                {/* Impact */}
                <div className="mt-10">
                  <h3
                    className="text-base font-medium mb-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-nd-charcoal)",
                    }}
                  >
                    Impact & Outcomes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {study.impact.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 py-3 px-4"
                        style={{
                          background:
                            index % 2 === 1
                              ? "oklch(0.99 0.005 85 / 60%)"
                              : "var(--color-nd-sand)",
                          borderRadius: "6px",
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ background: study.accentColor }}
                        />
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-nd-charcoal)",
                            lineHeight: "1.6",
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies & Related Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                  <div>
                    <h4 className="nd-meta mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <span key={tech} className="nd-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="nd-meta mb-3">Related Content</h4>
                    <div className="flex flex-col gap-2">
                      {study.relatedContent.map((link) => (
                        <Link key={link.href} href={link.href}>
                          <span
                            className="nd-link text-sm inline-flex items-center gap-1"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {link.label} <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="nd-section-sage">
          <div className="container py-16 lg:py-24">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <div className="nd-quote" style={{ textAlign: "left" }}>
                  "The best developer tools don't just solve problems — they change how developers think about what's possible."
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href="/speaking">
                    <span className="nd-button">
                      View Talks <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="nd-button-outline">
                      Get in Touch <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  );
}
