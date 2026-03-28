# dvinnik.dev

Personal portfolio and content hub for **Dmitry Vinnik** — Lead Developer Advocate at Meta. The site showcases articles, conference talks, videos, events, courses, and podcast conversations spanning AI/ML, open source, developer relations, and software testing.

**Live site:** [https://dvinnik.dev](https://dvinnik.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Routing | Wouter (client-side SPA) |
| Styling | Tailwind CSS 4 + custom design tokens |
| UI Components | shadcn/ui (Radix primitives) |
| Animations | Framer Motion (page transitions + scroll reveals) |
| Build Tool | Vite 7 |
| Language | TypeScript 5.6 |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Features

### Content Management

All 214 content items are stored as typed data in `client/src/data/content.ts` — no CMS or database required. Content spans six categories:

| Category | Count | Description |
|----------|-------|-------------|
| Articles | 37 | Blog posts and technical articles |
| Videos | 37 | Conference recordings and ELI5 explainer series |
| Events | 89 | Conference appearances with year-suffixed titles |
| Presentations | 32 | Slide decks and talk abstracts |
| Courses | 6 | Online courses and workshops |
| Conversations | 13 | Podcast episodes and interviews |

### SEO and Discoverability

- **SEO meta tags** with Open Graph and Twitter Card support on every page
- **JSON-LD structured data** (Schema.org) on all detail pages — Article, VideoObject, Event, PresentationDigitalDocument, Course, PodcastEpisode
- **Breadcrumb navigation** with BreadcrumbList JSON-LD for Google rich results
- **Sitemap** (`/sitemap.xml`) with 254 URLs auto-generated at build time
- **RSS feed** (`/feed.xml`) with the 50 most recent articles and videos
- **robots.txt** with sitemap reference
- **Preload hints** for critical JS, CSS, and CDN connections injected at build time

### Navigation and UX

- **Full-text search** across all content via `Cmd+K` / `Ctrl+K` search dialog
- **Tag system** with clickable tags linking to `/tag/:tagName` aggregation pages (32 tags)
- **Related content** suggestions at the bottom of every detail page (up to 4 items, ranked by shared tags)
- **Smooth page transitions** using Framer Motion AnimatePresence crossfade
- **Scroll-to-top** on every route change
- **Back to Top button** on detail pages (appears after 400px scroll)
- **Reading time estimates** on article detail pages
- **Responsive design** with mobile-first approach

### Design

The site follows a **"Nature Distilled"** design philosophy — an organic, botanical aesthetic with warm earth tones, serif display headings (Instrument Serif), and clean sans-serif body text (DM Sans). The color palette draws from forest greens, warm creams, and terracotta accents.

---

## Project Structure

```
dvinnik-portfolio/
├── client/
│   ├── index.html              # Entry HTML with OG/Twitter meta tags
│   ├── public/
│   │   ├── CNAME               # Custom domain (dvinnik.dev)
│   │   ├── favicon.ico
│   │   └── robots.txt
│   └── src/
│       ├── App.tsx              # Routes, scroll-to-top, page transitions
│       ├── index.css            # Global styles and design tokens
│       ├── main.tsx             # React entry point
│       ├── components/
│       │   ├── AnimatedSection.tsx   # Scroll-reveal animations
│       │   ├── BackToTop.tsx         # Floating back-to-top button
│       │   ├── Breadcrumb.tsx        # Breadcrumb nav with JSON-LD
│       │   ├── ContentCard.tsx       # Reusable content card with cover image
│       │   ├── Footer.tsx            # Site footer with RSS link
│       │   ├── JsonLd.tsx            # Schema.org structured data
│       │   ├── Navigation.tsx        # Top navigation bar
│       │   ├── RelatedContent.tsx    # Related items suggestions
│       │   ├── SEOHead.tsx           # Per-page meta tag management
│       │   ├── SearchDialog.tsx      # Cmd+K search overlay
│       │   ├── SectionHeader.tsx     # Consistent section headings
│       │   └── TagLink.tsx           # Clickable tag linking to /tag/:tag
│       ├── data/
│       │   └── content.ts       # All 214 content items + utility functions
│       └── pages/
│           ├── Home.tsx         # Landing page with featured content
│           ├── Articles.tsx     # Articles listing
│           ├── Videos.tsx       # Videos listing (incl. ELI5 series)
│           ├── Events.tsx       # Events listing with year filters
│           ├── Speaking.tsx     # Presentations listing
│           ├── Courses.tsx      # Courses listing
│           ├── Conversations.tsx # Podcast episodes listing
│           ├── ContentDetail.tsx # Dynamic detail page for all categories
│           ├── TagPage.tsx      # Tag aggregation page
│           ├── Contact.tsx      # Contact information
│           └── NotFound.tsx     # 404 page
├── scripts/
│   ├── copy-404.mjs            # Copies index.html → 404.html for SPA routing
│   ├── inject-preload.mjs      # Injects preload/preconnect hints into HTML
│   ├── generate-sitemap.mjs    # Generates sitemap.xml from content data
│   └── generate-feed.mjs       # Generates RSS feed.xml
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** 22+
- **pnpm** 10+ (specified in `packageManager` field)

### Development

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Type check
pnpm check

# Format code
pnpm format
```

### Production Build

```bash
pnpm build
```

The build pipeline runs four post-build steps automatically:

1. **copy-404.mjs** — Copies `index.html` to `404.html` for GitHub Pages SPA routing
2. **inject-preload.mjs** — Injects preload hints for critical assets into both HTML files
3. **generate-sitemap.mjs** — Generates `sitemap.xml` with all 254 URLs
4. **generate-feed.mjs** — Generates `feed.xml` with the 50 most recent items

Output is written to `dist/`.

### Preview Production Build

```bash
pnpm preview
```

---

## Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages on every push to `main`.

### Setup

1. Push the repository to GitHub
2. Go to **Settings > Pages**
3. Set the source to **"GitHub Actions"**
4. Every push to `main` will trigger an automatic build and deploy

### Custom Domain

The `CNAME` file in `client/public/` is set to `dvinnik.dev`. To use a custom domain, configure DNS:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<username>.github.io` |

---

## Adding Content

All content lives in `client/src/data/content.ts`. Each item follows the `ContentItem` interface:

```typescript
interface ContentItem {
  title: string;
  slug: string;          // URL path segment (e.g., "2023/my-article")
  category: "article" | "video" | "event" | "presentation" | "course" | "conversation";
  date: string;          // ISO date (YYYY-MM-DD)
  description: string;
  body: string;          // Detail page content (supports line breaks)
  tags: string[];
  coverImage?: string;   // CDN URL for cover image
  externalUrl?: string;  // Link to original source
  platform?: string;
  location?: string;
}
```

After adding items, run `pnpm build` to regenerate the sitemap and RSS feed.

---

## License

MIT
