/**
 * Contact Page — Nature Distilled
 * Features a contact form powered by Cloudflare Workers + social links + speaking topics
 */
import { useState } from "react";
import { ArrowLeft, ExternalLink, Github, Linkedin, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeader from "@/components/SectionHeader";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const WORKER_URL = "https://api.dvinnik.dev";

const contactLinks = [
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
    description: "Follow for thoughts on developer advocacy, AI/ML, open source, and tech.",
  },
];

const speakingTopics = [
  "AI/ML & Developer Advocacy",
  "Open Source Strategy & Community Building",
  "Developer Experience & Developer Tools",
  "Testing Frameworks & Quality Engineering",
  "Front-End Architecture & Design Systems",
  "Mobile Development (React Native, Android)",
  "Developer Relations & Advocacy",
  "Building & Scaling Developer Advocacy Teams",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // spam trap — hidden field
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${WORKER_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send message. Please try again or reach out via LinkedIn.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Contact"
        description="Get in touch with Dmitry Vinnik for engineering leadership opportunities, speaking engagements, podcast appearances, open source collaborations, or developer experience conversations."
        path="/contact"
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663407462879/97p7vQ5meEpw7kiKUeHkXx/og-contact-DNVjEn64whDshGK68DKTAs.png"
      />
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
            description="Whether it's engineering leadership, a conference talk, podcast appearance, open source collaboration, or a conversation about building great developer experiences — I'd love to hear from you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left column — Contact form + social links */}
            <div className="lg:col-span-7">
              {/* Contact Form */}
              <AnimatedSection>
                <div className="nd-card p-6 lg:p-8 mb-8">
                  <h3
                    className="text-xl font-medium mb-1"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
                  >
                    Send a Message
                  </h3>
                  <p className="nd-body text-sm mb-6">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>

                  {status === "success" ? (
                    <div
                      className="flex items-start gap-3 p-5 rounded-lg"
                      style={{ background: "var(--color-nd-sage-light)" }}
                    >
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "var(--color-nd-sage)" }} />
                      <div>
                        <p className="font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}>
                          Message sent!
                        </p>
                        <p className="nd-body text-sm mt-1">
                          Thank you for reaching out. I'll get back to you soon.
                        </p>
                        <button
                          onClick={() => setStatus("idle")}
                          className="nd-link text-sm mt-3 inline-block"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot — hidden from real users */}
                      <div className="absolute opacity-0 pointer-events-none" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                        <input
                          type="text"
                          name="honeypot"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.honeypot}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1.5"
                            style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
                          >
                            Name <span style={{ color: "var(--color-nd-terracotta)" }}>*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            maxLength={200}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full px-4 py-2.5 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2"
                            style={{
                              fontFamily: "var(--font-sans)",
                              background: "var(--color-nd-sand)",
                              borderColor: "var(--color-nd-sage-light)",
                              color: "var(--color-nd-charcoal)",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1.5"
                            style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
                          >
                            Email <span style={{ color: "var(--color-nd-terracotta)" }}>*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2"
                            style={{
                              fontFamily: "var(--font-sans)",
                              background: "var(--color-nd-sand)",
                              borderColor: "var(--color-nd-sage-light)",
                              color: "var(--color-nd-charcoal)",
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-1.5"
                          style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
                        >
                          Subject <span style={{ color: "var(--color-nd-terracotta)" }}>*</span>
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          maxLength={300}
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Speaking inquiry, collaboration, etc."
                          className="w-full px-4 py-2.5 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            background: "var(--color-nd-sand)",
                            borderColor: "var(--color-nd-sage-light)",
                            color: "var(--color-nd-charcoal)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1.5"
                          style={{ fontFamily: "var(--font-sans)", color: "var(--color-nd-charcoal)" }}
                        >
                          Message <span style={{ color: "var(--color-nd-terracotta)" }}>*</span>
                          <span className="nd-meta text-xs font-normal ml-1">(min. 10 characters)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          minLength={10}
                          maxLength={5000}
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, event, or idea..."
                          className="w-full px-4 py-2.5 rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 resize-y"
                          style={{
                            fontFamily: "var(--font-sans)",
                            background: "var(--color-nd-sand)",
                            borderColor: "var(--color-nd-sage-light)",
                            color: "var(--color-nd-charcoal)",
                          }}
                        />
                        <p className="nd-meta text-xs mt-1">
                          {formData.message.length}/5000 characters{formData.message.length > 0 && formData.message.length < 10 && (
                            <span style={{ color: "var(--color-nd-terracotta)", marginLeft: "0.5rem" }}>Minimum 10 characters required</span>
                          )}
                        </p>
                      </div>

                      {status === "error" && (
                        <div
                          className="flex items-start gap-3 p-4 rounded-md"
                          style={{ background: "#fef2f2", borderLeft: "3px solid #ef4444" }}
                        >
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#ef4444" }} />
                          <p className="text-sm" style={{ color: "#991b1b", fontFamily: "var(--font-sans)" }}>
                            {errorMessage}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="nd-button inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>

              {/* Social links */}
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

            {/* Right column — Speaking topics sidebar */}
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
                    "The best conversations start with a simple hello. Don't hesitate to reach out — Dmitry is always happy to connect with fellow developers and tech enthusiasts."
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
    </div>
  );
}
