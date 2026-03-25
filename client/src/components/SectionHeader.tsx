/**
 * SectionHeader — Nature Distilled
 * Terracotta accent line, serif heading, generous spacing
 */
import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ label, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <AnimatedSection className={`mb-10 lg:mb-14 ${align === "center" ? "text-center" : ""}`}>
      <div className={`nd-accent-line mb-4 ${align === "center" ? "mx-auto" : ""}`} />
      <span className="nd-label">{label}</span>
      <h2 className="nd-heading text-3xl lg:text-5xl mt-3">{title}</h2>
      {description && (
        <p
          className="nd-body mt-4 text-lg max-w-2xl"
          style={{ marginLeft: align === "center" ? "auto" : undefined, marginRight: align === "center" ? "auto" : undefined }}
        >
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
