/**
 * 404 Page — Nature Distilled
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
      />
      <Navigation />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <span className="nd-meta tracking-widest uppercase">Error 404</span>
          <h1
            className="mt-4 text-5xl lg:text-7xl font-medium"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-nd-charcoal)" }}
          >
            Page Not Found
          </h1>
          <p className="nd-body mt-4 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <span
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                background: "var(--color-nd-terracotta)",
                color: "var(--color-nd-cream)",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
