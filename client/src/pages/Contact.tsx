/**
 * Contact Page — Nature Distilled
 */
import { ArrowLeft, Mail, ExternalLink, Github, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const contactLinks = [
  {
    label: "Email",
    value: "dmitry@dvinnik.dev",
    href: "mailto:dmitry@dvinnik.dev",
    icon: Mail,
    description: "For speaking inquiries, collaborations, or just to say hello.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dmitry-vinnik",
    href: "https://www.linkedin.com/in/dmitry-vinnik/",
    icon: Linkedin,
    description: "Connect professionally and stay updated on my latest activities.",
  },
  {
    label: "GitHub",
    value: "github.com/dmitryvinn",
    href: "https://github.com/dmitryvinn",
    icon: Github,
    description: "Check out my open source contributions and personal projects.",
  },
  {
    label: "X (Twitter)",
    value: "@DmitryVinnik",
    href: "https://twitter.com/DmitryVinnik",
    icon: ExternalLink,
    description: "Follow for thoughts on developer advocacy, open source, and tech.",
  },
];

const speakingTopics = [
  "Open Source Strategy & Community Building",
  "Testing Frameworks (Jest, Cypress, Applitools)",
  "Mobile Development (React Native, Android)",
  "Developer Relations & Advocacy",
  "WhatsApp Business Platform",
  "AI/ML & Engineering Leadership",
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Contact"
        description="Get in touch with Dmitry Vinnik for speaking engagements, podcast appearances, open source collaborations, or developer advocacy conversations."
        path="/contact"
      />
      <Navigation />
      <main className="flex-1">
        <div className="container py-12 lg:py-20">
          <Link href="/">
            <span className="nd-link text-sm inline-flex items-center gap-1 mb-8" style={{ fontFamily: "var(--font-sans)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </span>
          </Link>

          <SectionHeader
            label="Contact"
            title="Let's Connect"
            description="Whether it's a conference talk, podcast appearance, open source collaboration, or just a conversation about developer advocacy — I'd love to hear from you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Contact links */}
            <div className="lg:col-span-7">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactLinks.map((contact) => (
                  <StaggerItem key={contact.label}>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="nd-card h-full flex flex-col group block"
                    >
                      <contact.icon className="w-5 h-5 mb-3" style={{ color: "var(--color-nd-terracotta)" }} />
                      <h3
                        className="text-base font-medium group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                      >
                        {contact.label}
                      </h3>
                      <p className="nd-meta mt-1">{contact.value}</p>
                      <p className="nd-body text-sm mt-2 flex-1">{contact.description}</p>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Speaking topics sidebar */}
            <div className="lg:col-span-5">
              <AnimatedSection delay={0.1}>
                <div
                  className="nd-card p-6"
                  style={{ background: "var(--color-nd-sage-light)", borderColor: "transparent" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-5 h-5" style={{ color: "var(--color-nd-sage)" }} />
                    <h3
                      className="text-lg font-medium"
                      style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                    >
                      Speaking Topics
                    </h3>
                  </div>
                  <p className="nd-body text-sm mb-5">
                    Available for conference talks, workshops, podcasts, and panel discussions on these topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {speakingTopics.map((topic) => (
                      <span key={topic} className="nd-tag">{topic}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="nd-quote">
                    "The best conversations start with a simple hello. Don't hesitate to reach out — I'm always happy to connect with fellow developers and tech enthusiasts."
                  </div>
                </div>

                <div className="mt-6 nd-card p-5" style={{ background: "var(--color-nd-sand)" }}>
                  <h4
                    className="text-base font-medium mb-2"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                  >
                    DevRel Resources
                  </h4>
                  <p className="nd-body text-sm mb-3">
                    Looking for developer relations resources? Check out my curated collection.
                  </p>
                  <a
                    href="https://github.com/dmitryvinn/awesome-dev-advocacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nd-link text-sm inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    View on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
