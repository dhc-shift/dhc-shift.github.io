import type { Metadata } from "next";
import Link from "next/link";
import { getAllActivities } from "@/lib/activities";
import { Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "활동",
  description: "DHC-SHIFT의 스터디, 세미나, 프로젝트 활동 아카이브",
};

const CATEGORY_COLORS: Record<string, string> = {
  스터디: "bg-blue-50 text-blue-700 border-blue-200",
  세미나: "bg-purple-50 text-purple-700 border-purple-200",
  프로젝트: "bg-green-50 text-green-700 border-green-200",
  행사: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function ActivitiesPage() {
  const activities = getAllActivities();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Activities</p>
      <h1 className="text-4xl font-bold mb-2">활동 아카이브</h1>
      <p className="text-muted-foreground mb-12">스터디, 세미나, 프로젝트 기록</p>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">아직 활동 기록이 없습니다.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            첫 번째 활동 기록이 곧 올라올 예정입니다.
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
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                    CATEGORY_COLORS[activity.category] ?? "bg-muted text-muted-foreground border-border"
                  )}
                >
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
                      #{tag}
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
