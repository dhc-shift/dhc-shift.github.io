import type { Metadata } from "next";
import Link from "next/link";
import { getAllActivities } from "@/lib/activities";
import { Calendar, Tag } from "lucide-react";
import { getActivitiesPageContent } from "@/lib/site-content";

const pageContent = getActivitiesPageContent();

export const metadata: Metadata = {
  title: pageContent.metadataTitle,
  description: pageContent.metadataDescription,
};

const CATEGORY_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary";

export default function ActivitiesPage() {
  const activities = getAllActivities();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
        {pageContent.eyebrow}
      </p>
      <h1 className="text-4xl font-bold mb-2">{pageContent.title}</h1>
      <p className="text-muted-foreground mb-12">{pageContent.description}</p>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">{pageContent.emptyTitle}</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            {pageContent.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Link
              key={activity.slug}
              href={`/activities/${activity.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={CATEGORY_BADGE_CLASS}>
                  {activity.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  {activity.date}
                </span>
              </div>
              <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {activity.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {activity.summary}
              </p>
              {activity.tags && activity.tags.length > 0 && (
                <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                  <Tag size={11} className="text-muted-foreground/60" />
                  {activity.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground/70">
                      {pageContent.tagPrefix}
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
