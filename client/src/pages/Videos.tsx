/**
 * Videos Page — Nature Distilled
 */
import { ArrowLeft, Play } from "lucide-react";
import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContentCard from "@/components/ContentCard";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { videos } from "@/data/content";

export default function Videos() {
  const eli5Videos = videos.filter(v => v.title.includes("Explain Like I"));
  const otherVideos = videos.filter(v => !v.title.includes("Explain Like I"));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Video Content"
        description={`${videos.length} videos by Dmitry Vinnik including the popular 'Explain Like I'm 5' series, breaking down complex Meta open source projects.`}
        path="/videos"
      />
<main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Videos"
            title="Video Content"
            description={`${videos.length} videos including the popular 'Explain Like I'm 5' series, breaking down complex Meta open source projects into digestible explanations.`}
          />

          {/* ELI5 Series Highlight */}
          <AnimatedSection className="mb-16">
            <div className="nd-card p-6 lg:p-8" style={{ background: "var(--color-nd-sage-light)", borderColor: "transparent" }}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ background: "var(--color-nd-terracotta)", opacity: 0.9 }}
                >
                  <Play className="w-5 h-5" style={{ color: "var(--color-nd-cream)" }} />
                </div>
                <div>
                  <h3 className="nd-heading text-xl">ELI5 Series</h3>
                  <p className="nd-meta">Explain Like I'm 5 — {eli5Videos.length} episodes</p>
                </div>
              </div>
              <p className="nd-body mb-8 max-w-2xl">
                A video series that breaks down complex Meta open source projects into simple, approachable explanations. From PyTorch and React Native to CacheLib and RocksDB — making cutting-edge technology accessible to everyone.
              </p>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eli5Videos.map((video) => (
                  <StaggerItem key={video.slug}>
                    <Link href={video.slug}>
                      <div className="group bg-background/60 rounded-md hover:bg-background transition-all duration-200 cursor-pointer overflow-hidden">
                        {video.coverImage && (
                          <div className="w-full h-32 overflow-hidden">
                            <img
                              src={video.coverImage}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-3 flex items-start gap-3">
                          <Play className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--color-nd-terracotta)" }} />
                          <div>
                            <span
                              className="text-sm font-medium leading-snug block group-hover:text-primary transition-colors"
                              style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                            >
                              {video.title}
                            </span>
                            <span className="nd-meta mt-0.5 block">
                              {new Date(video.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Other Videos */}
          {otherVideos.length > 0 && (
            <>
              <div className="nd-divider mb-12" />
              <AnimatedSection className="mb-8">
                <div className="nd-accent-line mb-3" />
                <h3 className="nd-heading text-xl lg:text-2xl">Other Videos &amp; Shows</h3>
              </AnimatedSection>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherVideos.map((video) => (
                  <StaggerItem key={video.slug}>
                    <ContentCard
                      slug={video.slug}
                      title={video.title}
                      description={video.description}
                      date={video.date}
                      tags={video.tags}
                      coverImage={video.coverImage}
                      icon={<Play className="w-3.5 h-3.5" style={{ color: "var(--color-nd-terracotta)" }} />}
                      dateFormat={{ year: "numeric", month: "short" }}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}
        </div>
      </main>
</div>
  );
}
