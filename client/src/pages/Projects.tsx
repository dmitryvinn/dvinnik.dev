/**
 * Projects / Case Studies Page — Nature Distilled
 * Showcases key initiatives spanning developer education, open source, front-end, and engineering culture
 *
 * Ordering rationale (strongest narrative arc):
 * 1. Engineering Leadership Hub — newest product, leads with current work
 * 2. DevRel Academy — flagship DevRel product
 * 3. ELI5 — signature series, most recognizable, hooks the reader
 * 4. Cross-Platform Front-End — deep technical credibility
 * 5. WhatsApp Business Platform — platform-scale impact
 * 6. The Diff Podcast — storytelling & community voice
 * 7. Meet the Developers — humanizing open source
 * 8. Open Source Health Framework — strategic / data-driven leadership
 * 9. Testing Infrastructure — enterprise engineering depth
 * 10. Global Conference Speaking — reach & influence
 * 11. Coursera Education — structured learning at scale
 * 12. Developer Wellness — closes on the human note, memorable ending
 * 13. Year in Review — longitudinal retrospective
 */
import { ArrowLeft, ArrowRight, ExternalLink, Play, BookOpen, Users, Code, Layers, BarChart3, MessageCircle, Mic, Heart, GraduationCap, Radio, TrendingUp, Globe, Crown } from "lucide-react";
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
  coverImage?: string;
}

const caseStudies: CaseStudy[] = [
  // 1. Engineering Leadership Hub — newest product, leads with current work
  {
    id: "engineering-leadership-hub",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-engleader-PqNxQFMnFrqoqpg62H5o8g.webp",
    title: "Engineering Leadership Hub",
    tagline: "1,000+ curated resources for engineering managers, directors, VPs, and CTOs",
    category: "Product · Engineering Leadership · Community",
    overview:
      "Built and launched Engineering Leadership Hub (engleader.dev), a comprehensive learning platform for engineering leaders at every level. The platform curates 1,000+ resources — books, articles, podcasts, and tools — organized into structured learning paths covering the full leadership journey from IC-to-manager transition through CTO-level strategy.",
    challenge:
      "Engineering leadership resources are scattered across hundreds of blogs, books, and conference talks. New and experienced engineering managers had no single place to find curated, structured materials covering the full spectrum — from first-time manager fundamentals to VP-level organizational design and CTO-level technical strategy.",
    approach:
      "Organized resources around five pillars of engineering leadership excellence: The Leadership Path, People & Culture, Engineering Operations, Strategy & Architecture, and Business & Communication. Created 12+ structured learning paths for specific career transitions (IC to Manager, Staff+ Engineer, Director & VP Track, CTO Track) and practical skills (AI-Native Leadership, Platform Engineering, Team Scaling). Added a dedicated section for sharing resources with engineering teams.",
    impact: [
      "1,000+ curated resources across books, articles, podcasts, tools, and guides",
      "12+ structured learning paths from IC-to-Manager through CTO/Head of Engineering",
      "AI Skills section covering AI-native engineering leadership and AI-augmented workflows",
      "For Your Engineers section with team-shareable paths on user stories, technical communication, and agile delivery",
    ],
    technologies: ["React", "TypeScript", "Cloudflare Workers", "Open Source", "Community Curation"],
    relatedContent: [
      { label: "Engineering Leadership Hub", href: "https://engleader.dev" },
      { label: "Learning Paths", href: "https://engleader.dev/learn" },
      { label: "AI Skills", href: "https://engleader.dev/ai-skills" },
    ],
    icon: <Crown className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  // 2. DevRel Academy — flagship DevRel product
  {
    id: "devrel-academy",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-devrel-academy-i3CoKyteNKe6MWQUupzWPi.webp",
    title: "DevRel Academy",
    tagline: "The home of DevRel learning — 2,800+ curated resources for developer advocates",
    category: "Product · Developer Relations · Community",
    overview:
      "Built and launched DevRel Academy (devrelacademy.com), a comprehensive learning platform for developer advocates. The platform curates 2,800+ community-vetted resources — books, articles, videos, podcasts, tools, courses, and guides — organized into structured learning paths. It also features a CFP Tracker with 780+ conferences across 6 regions, and Agent Skills for AI-powered developer workflows.",
    challenge:
      "Developer Relations is a rapidly growing field, but learning resources are scattered across hundreds of blogs, podcasts, and conference talks. Aspiring and practicing developer advocates had no single place to find curated, community-vetted materials organized by skill area — from technical writing and public speaking to content creation and community building.",
    approach:
      "Built on the foundation of the awesome-dev-advocacy open source project, DevRel Academy evolved from a curated list into a full-featured learning platform. Resources are organized by skill taxonomy (Developer Advocacy, Technical Writing, Content Creation, Public Speaking), with structured learning paths for different career stages. The CFP Tracker aggregates open calls-for-papers across global conferences, and Agent Skills integrate DevRel workflows into AI coding assistants like Claude Code and Codex CLI.",
    impact: [
      "2,800+ curated resources across 9 categories: books, blogs, videos, podcasts, communities, tools, courses, guides, and agent skills",
      "CFP Tracker covering 780+ conferences with 280+ open CFPs across 6 global regions",
      "Structured learning paths for aspiring developer advocates at every career stage",
      "Agent Skills for Claude Code, Codex CLI, and ChatGPT — bringing DevRel into AI-powered workflows",
    ],
    technologies: ["React", "TypeScript", "Cloudflare Workers", "Open Source", "Community Curation"],
    relatedContent: [
      { label: "DevRel Academy", href: "https://devrelacademy.com" },
      { label: "CFP Tracker", href: "https://devrelacademy.com/cfp-tracker" },
      { label: "Learning Paths", href: "https://devrelacademy.com/learn" },
    ],
    icon: <Globe className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  // 2. Signature series — hooks the reader
  {
    id: "eli5",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-eli5-mxA3n9YK28ivXzj47wHkYA.webp",
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
      "Published on official open source channels reaching hundreds of thousands of developers",
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
  // 3. Deep technical credibility
  {
    id: "cross-platform",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-cross-platform-YGfcvDtDCooviWRhrJ4E2k.webp",
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
    accentColor: "var(--color-nd-sage)",
  },
  // 4. Platform-scale impact
  {
    id: "whatsapp-dev",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-whatsapp-SfPxidG8M4WVpbm2wkN3nf.webp",
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
    accentColor: "var(--color-nd-terracotta)",
  },
  // 5. Storytelling & community voice
  {
    id: "the-diff-podcast",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-the-diff-6fKSBPgj9jYvkoTYu4VhMe.webp",
    title: "The Diff Podcast",
    tagline: "Long-form conversations with the engineers shaping open source",
    category: "Podcasts & Interviews · Developer Storytelling",
    overview:
      "Hosted The Diff, a podcast spotlighting the people and stories behind major open source projects. Each episode features an in-depth conversation with an engineer — exploring their technical journey, the projects they maintain, and the broader impact of open source on the developer ecosystem. The show also served as a platform for fireside chats on open source strategy and leadership.",
    challenge:
      "Developer podcasts often stay surface-level, covering news and announcements without diving into the human stories behind the code. Engineers working on foundational open source projects rarely get a platform to share their motivations, challenges, and the decisions that shaped the tools millions of developers rely on.",
    approach:
      "Created a long-form interview format that balances technical depth with personal storytelling. Each episode is structured around the guest's journey — from how they entered open source to the specific architectural and community decisions they've made. Complemented the podcast with short-form video clips for social distribution, maximizing reach across platforms.",
    impact: [
      "3 full-length episodes featuring engineers behind React Native, React, Litho, and Flipper",
      "Fireside chat on open source strategy at Meta reached leadership and community audiences",
      "Audio, video, and clip formats distributed across podcast platforms, YouTube, and social media",
      "Provided a model for humanizing open source through developer-focused audio storytelling",
    ],
    technologies: ["Podcast Production", "Audio Engineering", "Video Editing", "Content Distribution"],
    relatedContent: [
      { label: "From Linux to React Native with Nicola Corti", href: "/conversations/2022/the-diff-episode-13/" },
      { label: "All Things React with Rachel Nabors", href: "/conversations/2022/the-diff-episode-12/" },
      { label: "Mobile Open Source with Pascal Hartig", href: "/conversations/2022/the-diff-episode-11/" },
      { label: "Fireside Chat: Open Source at Meta", href: "/conversations/2022/open-source-at-meta/" },
    ],
    icon: <Radio className="w-5 h-5" />,
    accentColor: "var(--color-nd-sage)",
  },
  // 6. Humanizing open source
  {
    id: "meet-the-developers",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-meet-devs-CCjajKu6BLESQtCJNso3g3.webp",
    title: "Meet the Developers",
    tagline: "Humanizing open source by spotlighting the engineers behind the code",
    category: "Community Building · Developer Storytelling",
    overview:
      "Created and produced the 'Meet the Developers' interview series, featuring in-depth conversations with mobile engineers working on some of the most widely used open source projects. The series put a human face on open source — showcasing the people, motivations, and career journeys behind the code.",
    challenge:
      "Open source communities often feel impersonal. Developers contribute to projects without knowing who else is building alongside them, what motivates maintainers, or what career paths led engineers to their current roles. This disconnect makes it harder to build the sense of belonging that sustains healthy communities.",
    approach:
      "Designed a long-form interview format that goes beyond technical topics to explore each engineer's personal journey — how they got into mobile development, what excites them about open source, and what advice they'd give to aspiring developers. Each profile combines storytelling with practical insights, making the content both inspiring and actionable.",
    impact: [
      "4-part interview series featuring mobile engineers across different specializations",
      "Covered engineers working on Android, iOS, React Native, and cross-platform tooling",
      "Humanized open source contributions by highlighting personal stories and career journeys",
      "Provided mentorship-style advice reaching developers exploring mobile engineering careers",
    ],
    technologies: ["Android", "iOS", "React Native", "Mobile Engineering", "Open Source"],
    relatedContent: [
      { label: "Vadims Savjolovs Interview", href: "/articles/2022/meet-the-developers-mobile-edition-with-vadims/" },
      { label: "Pritesh Nandgaonkar Interview", href: "/articles/2022/meet-the-developers-mobile-edition-with-pritesh/" },
      { label: "Derick Zhang Interview", href: "/articles/2022/meet-the-developers-mobile-edition-with-derick/" },
      { label: "Aleksandr Sergeev Interview", href: "/articles/2022/meet-the-developers-mobile-edition-with-aleksandr/" },
    ],
    icon: <Users className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  // 7. Strategic / data-driven leadership
  {
    id: "oss-health",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-oss-health-hQ6JziGeUTj3oHK4tZbpwU.webp",
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
    accentColor: "var(--color-nd-sage)",
  },
  // 8. Enterprise engineering depth
  {
    id: "testing-at-scale",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-testing-Lwk96WZEubk42L5FKXZR24.webp",
    title: "Testing Infrastructure & Visual QA",
    tagline: "Building testing strategies that scale across enterprise platforms",
    category: "Dev Tools · Quality Engineering",
    overview:
      "Drove the adoption of modern testing practices across enterprise organizations, from building testing infrastructure to advocating for visual regression testing and AI-powered QA tools. Published extensively on testing strategies and spoke at major QA conferences worldwide.",
    challenge:
      "Enterprise applications with complex front-ends and frequent releases need testing strategies that are both comprehensive and maintainable. Traditional assertion-based testing couldn't keep up with the pace of front-end changes, and teams needed scalable approaches to visual regression testing.",
    approach:
      "Pioneered the integration of visual AI testing into enterprise workflows, demonstrating how modern tools could reduce test maintenance while increasing coverage. Combined this with deep expertise in testing frameworks (Jest, Cypress, Selenium) to build end-to-end testing strategies that balanced speed with confidence.",
    impact: [
      "Published definitive guides on visual regression testing for mobile and web platforms",
      "Spoke at 10+ QA-focused conferences including SeleniumConf, Nordic Testing Days, and Agile Testing Days",
      "Testing at Scale talk bridged enterprise testing practices across multiple organizations",
      "Helped teams transition from brittle assertion-based tests to AI-powered visual validation",
    ],
    technologies: ["Jest", "Cypress", "Selenium", "Visual AI", "TestZeus", "CI/CD"],
    relatedContent: [
      { label: "Testing at Scale", href: "/presentations/2022/testing-at-scale/" },
      { label: "Visual Regression Testing", href: "/articles/2019/visual-regression-testing/" },
      { label: "Lightning Fast Testing with Visual AI", href: "/articles/2023/lightning-fast-testing-for-salesforce-with-applitools-and-testzeus/" },
    ],
    icon: <Code className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
  // 9. Reach & influence
  {
    id: "conference-speaking",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-speaking-8SVR4hLNbybe7y3MNsaXKu.webp",
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
      "30+ presentations at conferences including GitHub Universe, All Things Open, Open Source Summit, and DjangoCon",
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
  // 10. Structured learning at scale
  {
    id: "coursera-education",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-coursera-mYMa38NarmqNL3KSNC9gkT.webp",
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
    accentColor: "var(--color-nd-terracotta)",
  },
  // 11. Closes on the human note — memorable ending
  {
    id: "developer-wellness",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-wellness-Q79dwC6biAp7KruvbRArbC.webp",
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
    accentColor: "var(--color-nd-sage)",
  },
  // 12. Longitudinal impact — annual retrospective
  {
    id: "year-in-review",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/cover-year-review-kd92MdYPGGhHQZEqw96Swn.webp",
    title: "Open Source Year in Review",
    tagline: "Chronicling the evolution of open source across four consecutive years",
    category: "Open Source Strategy · Annual Retrospective",
    overview:
      "Authored a multi-year series of comprehensive annual retrospectives documenting the state of open source — covering project launches, community growth, ecosystem trends, and strategic milestones. Each edition synthesizes a full year of activity across hundreds of repositories into a single, authoritative narrative that serves as both a historical record and a strategic planning resource.",
    challenge:
      "Open source ecosystems move fast. With hundreds of projects shipping releases, communities growing, and new initiatives launching throughout the year, it's easy to lose sight of the bigger picture. Teams and the broader community needed a way to understand not just what happened, but what it means for the trajectory of open source.",
    approach:
      "Created a recurring editorial format that combines quantitative data (release counts, contributor growth, adoption metrics) with qualitative analysis (strategic shifts, community highlights, ecosystem trends). Each edition follows a consistent structure — making year-over-year comparisons possible — while adapting to cover the most significant developments of that particular year.",
    impact: [
      "4 consecutive annual retrospectives published (2019, 2020, 2021, 2022)",
      "Covered the evolution of 600+ open source projects across AI/ML, mobile, web, and infrastructure",
      "Became a reference document for strategic planning and DevRel prioritization",
      "Provided the broader community with a longitudinal view of open source trends and growth",
    ],
    technologies: ["Data Analysis", "Technical Writing", "Open Source Governance", "Community Metrics"],
    relatedContent: [
      { label: "2022 Year in Review", href: "/articles/2023/open-source-year-in-review-2022/" },
      { label: "2021 Year in Review", href: "/articles/2022/open-source-year-in-review-2021/" },
      { label: "2020 Year in Review", href: "/articles/2021/open-source-year-in-review-2020/" },
      { label: "2019 Year in Review", href: "/articles/2020/open-source-year-in-review-2019/" },
    ],
    icon: <TrendingUp className="w-5 h-5" />,
    accentColor: "var(--color-nd-terracotta)",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Projects"
        description="Case studies and key initiatives by Dmitry Vinnik — from Engineering Leadership Hub and DevRel Academy to the Explain Like I'm 5 series, developer education, open source, and engineering culture."
        path="/projects"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/og-devrel-academy-SRSFfukzmvSsMEAgLNttXJ.png"
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
              A selection of initiatives that represent the breadth of my work — from creating developer education programs reaching hundreds of thousands of developers, to hosting podcasts with the engineers behind the code.
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

                {/* Cover Image */}
                {study.coverImage && (
                  <div className="mt-8 overflow-hidden" style={{ borderRadius: "8px" }}>
                    <img
                      src={study.coverImage}
                      alt={study.title}
                      className="w-full object-contain"
                      style={{ maxHeight: "320px", width: "100%" }}
                      loading="lazy"
                    />
                  </div>
                )}

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
                        link.href.startsWith("http") ? (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                            <span
                              className="nd-link text-sm inline-flex items-center gap-1"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {link.label} <ExternalLink className="w-3 h-3" />
                            </span>
                          </a>
                        ) : (
                          <Link key={link.href} href={link.href}>
                            <span
                              className="nd-link text-sm inline-flex items-center gap-1"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {link.label} <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
                        )
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
