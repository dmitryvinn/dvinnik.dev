/**
 * Post-build script: generates feed.xml (RSS 2.0) for articles and videos.
 * Outputs to dist/feed.xml for feed reader subscriptions.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const SITE_URL = "https://dvinnik.dev";
const AUTHOR = "Dmitry Vinnik";

const { articles, videos } = await import(
  resolve(__dirname, "..", "client", "src", "data", "content.ts")
);

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toUTCString();
}

// Merge articles and videos, sorted by date descending
const allItems = [
  ...articles.map((a) => ({ ...a, category: "articles", typeLabel: "Article" })),
  ...videos.map((v) => ({ ...v, category: "videos", typeLabel: "Video" })),
].sort((a, b) => b.date.localeCompare(a.date));

// Limit to 50 most recent items
const feedItems = allItems.slice(0, 50);

const items = feedItems.map((item) => {
  const slug = item.slug.endsWith("/") ? item.slug.slice(0, -1) : item.slug;
  const link = `${SITE_URL}${slug}`;
  const categories = item.tags
    .map((tag) => `      <category>${escapeXml(tag)}</category>`)
    .join("\n");

  return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toRfc822(item.date)}</pubDate>
      <description>${escapeXml(item.description)}</description>
      <author>dmitry@dvinnik.dev (${AUTHOR})</author>
${categories}
    </item>`;
});

const lastBuildDate = toRfc822(feedItems[0]?.date || new Date().toISOString().split("T")[0]);

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR} — Articles &amp; Videos</title>
    <link>${SITE_URL}</link>
    <description>Latest articles and videos by ${AUTHOR}, Lead Developer Advocate. Covering open source, testing, mobile development, and developer advocacy.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/profile_c72f6f18.jpg</url>
      <title>${AUTHOR}</title>
      <link>${SITE_URL}</link>
    </image>
${items.join("\n")}
  </channel>
</rss>
`;

writeFileSync(resolve(distDir, "feed.xml"), feed);
console.log(
  `✓ Generated feed.xml with ${feedItems.length} items (${articles.length} articles + ${videos.length} videos, showing latest 50)`
);
