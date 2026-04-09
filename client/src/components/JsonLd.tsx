/**
 * JsonLd — Generates Schema.org JSON-LD structured data for content detail pages.
 * Supports Article, VideoObject, PresentationDigitalDocument, Event, Course, and PodcastEpisode types.
 */
import type { ContentItem } from "@/data/content";

const SITE_URL = "https://dvinnik.dev";

interface JsonLdProps {
  item: ContentItem;
  category: string;
}

function buildArticleSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    datePublished: item.date,
    image: item.coverImage || undefined,
    url: `${SITE_URL}${item.slug}`,
    author: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
      jobTitle: "Engineering Leader",
    },
    publisher: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    keywords: item.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${item.slug}`,
    },
  };
}

function buildVideoSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: item.title,
    description: item.description,
    uploadDate: item.date,
    thumbnailUrl: item.coverImage || undefined,
    url: item.youtubeUrl || `${SITE_URL}${item.slug}`,
    contentUrl: item.youtubeUrl || undefined,
    author: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    keywords: item.tags.join(", "),
  };
}

function buildPresentationSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "PresentationDigitalDocument",
    name: item.title,
    description: item.description,
    datePublished: item.date,
    image: item.coverImage || undefined,
    url: `${SITE_URL}${item.slug}`,
    author: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    keywords: item.tags.join(", "),
  };
}

function buildEventSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: item.title,
    description: item.description,
    startDate: item.date,
    image: item.coverImage || undefined,
    url: `${SITE_URL}${item.slug}`,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    performer: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    organizer: {
      "@type": "Organization",
      name: item.title.replace(/\s*\d{4}$/, ""),
    },
    keywords: item.tags.join(", "),
  };
}

function buildCourseSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: item.title,
    description: item.description,
    datePublished: item.date,
    image: item.coverImage || undefined,
    url: `${SITE_URL}${item.slug}`,
    provider: item.platform
      ? {
          "@type": "Organization",
          name: item.platform,
        }
      : undefined,
    author: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    keywords: item.tags.join(", "),
  };
}

function buildConversationSchema(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: item.title,
    description: item.description,
    datePublished: item.date,
    image: item.coverImage || undefined,
    url: item.youtubeUrl || `${SITE_URL}${item.slug}`,
    author: {
      "@type": "Person",
      name: "Dmitry Vinnik",
      url: SITE_URL,
    },
    keywords: item.tags.join(", "),
  };
}

const schemaBuilders: Record<string, (item: ContentItem) => object> = {
  articles: buildArticleSchema,
  videos: buildVideoSchema,
  presentations: buildPresentationSchema,
  events: buildEventSchema,
  courses: buildCourseSchema,
  conversations: buildConversationSchema,
};

export default function JsonLd({ item, category }: JsonLdProps) {
  const builder = schemaBuilders[category];
  if (!builder) return null;

  const schema = builder(item);

  // Remove undefined values for clean output
  const cleanSchema = JSON.parse(
    JSON.stringify(schema, (_key, value) => (value === undefined ? undefined : value))
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}
