/**
 * Conversations Page — Nature Distilled
 * Podcast appearances, interviews, and panel discussions
 */
import { ArrowLeft, Mic } from "lucide-react";
import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { conversations } from "@/data/content";

export default function Conversations() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Podcasts & Interviews"
        description={`${conversations.length} podcast appearances, interviews, and panel discussions by Dmitry Vinnik on developer advocacy, open source, and technology.`}
        path="/conversations"
      />
<main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Conversations"
            title="Podcasts & Interviews"
            description={`${conversations.length} podcast appearances, interviews, and panel discussions on developer advocacy, open source, and technology.`}
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {conversations.map((convo) => (
              <StaggerItem key={convo.slug}>
                <ContentCard
                  slug={convo.slug}
                  title={convo.title}
                  description={convo.description}
                  date={convo.date}
                  tags={convo.tags}
                  coverImage={convo.coverImage}
                  icon={<Mic className="w-3.5 h-3.5" style={{ color: "var(--color-nd-terracotta)" }} />}
                  dateFormat={{ year: "numeric", month: "short" }}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
</div>
  );
}
