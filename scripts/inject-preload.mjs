/**
 * inject-preload.mjs
 * Post-build script that adds <link rel="modulepreload"> hints for critical
 * JS/CSS chunks into index.html and 404.html so the browser starts fetching
 * them before the main entry script is parsed.
 *
 * Also preloads Google Fonts to avoid render-blocking.
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const DIST = join(import.meta.dirname, "..", "dist");
const assetsDir = join(DIST, "assets");

// Find the main JS entry and CSS
const files = readdirSync(assetsDir);
const mainJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const mainCss = files.find((f) => f.startsWith("index-") && f.endsWith(".css"));

// Build preload tags
const preloadTags = [];

// Preconnect to Google Fonts (before the stylesheet loads)
preloadTags.push(
  `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
  `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
);

// Preconnect to CDN for cover images
preloadTags.push(
  `<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" crossorigin />`
);

// Modulepreload the main JS (browser starts parsing + compiling early)
if (mainJs) {
  preloadTags.push(
    `<link rel="modulepreload" href="/assets/${mainJs}" />`
  );
}

// Preload the CSS
if (mainCss) {
  preloadTags.push(
    `<link rel="preload" href="/assets/${mainCss}" as="style" />`
  );
}

const preloadBlock = `    <!-- Preload hints for faster initial load -->\n    ${preloadTags.join("\n    ")}`;

// Inject into both index.html and 404.html
for (const filename of ["index.html", "404.html"]) {
  const filepath = join(DIST, filename);
  let html = readFileSync(filepath, "utf-8");

  // Insert preload hints right after <meta charset>
  if (!html.includes("modulepreload")) {
    html = html.replace(
      '<meta charset="UTF-8" />',
      `<meta charset="UTF-8" />\n${preloadBlock}`
    );
    writeFileSync(filepath, html);
    console.log(`✓ Injected preload hints into ${filename}`);
  } else {
    console.log(`⏭ ${filename} already has preload hints, skipping`);
  }
}
