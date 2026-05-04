import { Clock, MapPin, BookOpen } from "lucide-react";
import type { IconTextContent } from "@/lib/site-content";

const ICONS = { Clock, MapPin, BookOpen };

export function InfoStrip({ items }: { items: IconTextContent[] }) {
  return (
    <div className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map(({ icon, label, value }) => {
            const Icon = ICONS[icon as keyof typeof ICONS] ?? BookOpen;

            return (
              <div key={label} className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm font-semibold">{value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
