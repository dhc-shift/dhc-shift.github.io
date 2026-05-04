import Link from "next/link";
import { Bell, Calendar, Users, FolderOpen, ArrowRight } from "lucide-react";
import type { QuickLinkContent, SectionContent } from "@/lib/site-content";

const ICONS = { Bell, Calendar, Users, FolderOpen };

export function QuickLinks({
  section,
  links,
}: {
  section: SectionContent;
  links: QuickLinkContent[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold mb-10">{section.title}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {links.map(({ icon, title, description, href, actionLabel }) => {
          const Icon = ICONS[icon as keyof typeof ICONS] ?? Bell;

          return (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div className="mb-3 inline-flex rounded-lg bg-accent p-2.5">
                <Icon size={18} className="text-accent-foreground" />
              </div>
              <p className="font-semibold mb-1">{title}</p>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>
              <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                {actionLabel} <ArrowRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
