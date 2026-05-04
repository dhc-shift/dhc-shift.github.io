"use client";

import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import { useState } from "react";
import type { AnnouncementContent } from "@/lib/site-content";

export function AnnouncementBanner({ content }: { content: AnnouncementContent }) {
  const [dismissed, setDismissed] = useState(false);

  if (!content.enabled || dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Megaphone size={14} className="shrink-0" />
          <span>
            <span className="font-semibold">{content.title}</span>
            <span className="ml-1 opacity-80">{content.description}</span>
          </span>
          <Link href={content.href} className="underline underline-offset-2 font-medium hover:opacity-80">
            {content.linkLabel}
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label={content.closeLabel}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
