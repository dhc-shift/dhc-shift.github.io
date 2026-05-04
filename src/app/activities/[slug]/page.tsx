import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllActivities, getActivityBySlug } from "@/lib/activities";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "@/components/MDXRemote";
import { getActivitiesPageContent } from "@/lib/site-content";

const CATEGORY_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary";

export async function generateStaticParams() {
  return getAllActivities().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getActivityBySlug(slug);
  if (!data) return {};
  return { title: data.meta.title, description: data.meta.summary };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getActivityBySlug(slug);
  if (!data) notFound();

  const { meta, content } = data;
  const pageContent = getActivitiesPageContent();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/activities"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft size={14} /> {pageContent.detailBackLabel}
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className={CATEGORY_BADGE_CLASS}>
          {meta.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={12} />
          {meta.date}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{meta.summary}</p>

      {meta.tags && meta.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <Tag size={13} className="text-muted-foreground" />
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {pageContent.tagPrefix}
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-slate prose-sm max-w-none">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
