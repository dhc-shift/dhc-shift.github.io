import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllActivities, getActivityBySlug } from "@/lib/activities";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MDXRemote } from "@/components/MDXRemote";

const CATEGORY_COLORS: Record<string, string> = {
  스터디: "bg-blue-50 text-blue-700 border-blue-200",
  세미나: "bg-purple-50 text-purple-700 border-purple-200",
  프로젝트: "bg-green-50 text-green-700 border-green-200",
  행사: "bg-orange-50 text-orange-700 border-orange-200",
};

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

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/activities"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors"
      >
        <ArrowLeft size={14} /> 활동 목록
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            CATEGORY_COLORS[meta.category] ?? "bg-muted text-muted-foreground border-border"
          )}
        >
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
              #{tag}
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
