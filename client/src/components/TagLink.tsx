/**
 * TagLink — Renders a tag as a clickable link to the tag aggregation page.
 * Uses the existing nd-tag styling from the Nature Distilled design system.
 */
import { Link } from "wouter";

interface TagLinkProps {
  tag: string;
  active?: boolean;
}

export default function TagLink({ tag, active = false }: TagLinkProps) {
  return (
    <Link href={`/tag/${encodeURIComponent(tag)}`}>
      <span
        className={active ? "nd-tag nd-tag-active cursor-pointer" : "nd-tag cursor-pointer"}
        onClick={(e) => e.stopPropagation()}
      >
        {tag}
      </span>
    </Link>
  );
}
