/**
 * Post-build script: copies index.html to 404.html for GitHub Pages SPA routing.
 * GitHub Pages serves 404.html for unknown routes, allowing client-side routing to work.
 */
import { copyFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const src = resolve(distDir, "index.html");
const dest = resolve(distDir, "404.html");

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log("✓ Copied index.html → 404.html for GitHub Pages SPA routing");
} else {
  console.error("✗ dist/index.html not found — run build first");
  process.exit(1);
}
