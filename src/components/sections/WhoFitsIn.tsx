import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AboutPageContent } from "@/lib/site-content";

export function WhoFitsIn({
  section,
  cards,
}: {
  section: AboutPageContent["audienceSection"];
  cards: AboutPageContent["audienceCards"];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {cards.map(({ title, description }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold mb-2">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
      <Link
        href={section.ctaHref}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        {section.ctaLabel} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
