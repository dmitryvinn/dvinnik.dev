/**
 * Lightweight page view analytics — sends a single POST to the Cloudflare Worker.
 * Privacy-friendly: no cookies, no fingerprinting, no PII.
 * Fails silently so it never impacts user experience.
 */
import { useEffect } from "react";

const WORKER_URL = "https://api.dvinnik.dev";

export function usePageView(path: string) {
  useEffect(() => {
    // Don't track in development
    if (window.location.hostname === "localhost") return;

    const controller = new AbortController();

    fetch(`${WORKER_URL}/api/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || "",
      }),
      signal: controller.signal,
    }).catch(() => {
      // Silently fail — analytics should never break the site
    });

    return () => controller.abort();
  }, [path]);
}
