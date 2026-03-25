/**
 * Post-build script: generates sitemap.xml from all content slugs.
 * Outputs to dist/sitemap.xml for search engine discovery.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const SITE_URL = "https://dvinnik.dev";

// Import all content data
const { articles, videos, presentations, events, courses, conversations, getAllTags } =
  await import(resolve(__dirname, "..", "client", "src", "data", "content.ts"));

// Static pages
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/articles", priority: "0.8", changefreq: "weekly" },
  { path: "/videos", priority: "0.8", changefreq: "weekly" },
  { path: "/presentations", priority: "0.8", changefreq: "monthly" },
  { path: "/events", priority: "0.8", changefreq: "monthly" },
  { path: "/courses", priority: "0.7", changefreq: "monthly" },
  { path: "/conversations", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
];

// Collect all content slugs with their dates
const contentItems = [
  ...articles.map((a) => ({ slug: a.slug, date: a.date, priority: "0.6" })),
  ...videos.map((v) => ({ slug: v.slug, date: v.date, priority: "0.6" })),
  ...presentations.map((p) => ({
    slug: p.slug,
    date: p.date,
    priority: "0.5",
  })),
  ...events.map((e) => ({ slug: e.slug, date: e.date, priority: "0.5" })),
  ...courses.map((c) => ({ slug: c.slug, date: c.date, priority: "0.5" })),
  ...conversations.map((c) => ({
    slug: c.slug,
    date: c.date,
    priority: "0.5",
  })),
];

// Build XML
const urls = [];

for (const page of staticPages) {
  urls.push(`  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
}

for (const item of contentItems) {
  const slug = item.slug.endsWith("/") ? item.slug.slice(0, -1) : item.slug;
  urls.push(`  <url>
    <loc>${SITE_URL}${slug}</loc>
    <lastmod>${item.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>${item.priority}</priority>
  </url>`);
}

// Tag aggregation pages
const allTags = getAllTags();
for (const tag of allTags) {
  urls.push(`  <url>
    <loc>${SITE_URL}/tag/${encodeURIComponent(tag)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
console.log(
  `✓ Generated sitemap.xml with ${urls.length} URLs (${staticPages.length} static + ${contentItems.length} content + ${allTags.length} tags)`
);
