/**
 * SEOHead — sets document title, meta description, and Open Graph tags
 * Uses useEffect to update <head> dynamically for each page/route.
 */
import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

const BASE_URL = "https://dvinnik.dev";
const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/profile_c72f6f18.jpg";
const SITE_NAME = "Dmitry Vinnik — Developer Advocate";

function setMetaTag(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    if (property.startsWith("og:") || property.startsWith("twitter:")) {
      el.setAttribute("property", property);
    } else {
      el.setAttribute("name", property);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEOHead({ title, description, path = "/", image, type = "website" }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} — Dmitry Vinnik`;
    const fullUrl = `${BASE_URL}${path}`;
    const ogImage = image || DEFAULT_IMAGE;

    // Document title
    document.title = fullTitle;

    // Standard meta
    setMetaTag("description", description);

    // Open Graph
    setMetaTag("og:title", fullTitle);
    setMetaTag("og:description", description);
    setMetaTag("og:url", fullUrl);
    setMetaTag("og:image", ogImage);
    setMetaTag("og:type", type);
    setMetaTag("og:site_name", SITE_NAME);

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    return () => {
      // Reset to defaults on unmount
      document.title = "Dmitry Vinnik — Lead Developer Advocate at Meta";
    };
  }, [title, description, path, image, type]);

  return null;
}
