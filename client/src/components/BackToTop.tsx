/**
 * BackToTop — A floating button that appears when the user scrolls down.
 * Nature Distilled design: warm terracotta accent, smooth transitions.
 * Shows after scrolling 400px, smoothly scrolls back to top on click.
 */
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300"
      style={{
        background: "var(--color-nd-terracotta)",
        color: "var(--color-nd-cream)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
