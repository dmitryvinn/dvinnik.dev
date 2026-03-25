/**
 * Footer — Nature Distilled
 * Warm, organic: sage background section, serif heading, generous spacing
 */
import { Link } from "wouter";

const footerLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Speaking", href: "/speaking" },
  { label: "Videos", href: "/videos" },
  { label: "Events", href: "/events" },
  { label: "Courses", href: "/courses" },
  { label: "Conversations", href: "/conversations" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-nd-sand)" }}>
      <div className="nd-divider" />
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="nd-heading text-2xl">Dmitry Vinnik</span>
            <div className="nd-accent-line mt-3 mb-4" />
            <p className="nd-body text-sm leading-relaxed">
              Lead Developer Advocate at Meta. Building bridges between developers and technology through open source, speaking, and education.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="nd-label mb-5">Explore</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-sm text-foreground/50 hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="nd-label mb-5">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/dmitryvinn" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/50 hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/dmitry-vinnik/" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/50 hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                LinkedIn
              </a>
              <a href="https://twitter.com/DmitryVinnik" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/50 hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                X (Twitter)
              </a>
              <a href="mailto:dmitry@dvinnik.dev" className="text-sm text-foreground/50 hover:text-foreground transition-colors" style={{ fontFamily: "var(--font-sans)" }}>
                dmitry@dvinnik.dev
              </a>
            </div>
          </div>
        </div>

        <div className="nd-divider mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="nd-meta">
            &copy; {new Date().getFullYear()} Dmitry Vinnik
          </p>
          <p className="nd-meta">
            dvinnik.dev
          </p>
        </div>
      </div>
    </footer>
  );
}
