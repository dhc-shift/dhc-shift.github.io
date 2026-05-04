import type { Metadata } from "next";
import { Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "뉴스레터",
  description: "DHC-SHIFT 공지 및 뉴스레터 아카이브",
};

type PostType = "공지" | "뉴스레터";

interface Post {
  id: string;
  type: PostType;
  title: string;
  date: string;
  summary: string;
  link?: string;
  pinned?: boolean;
}

const TYPE_COLORS: Record<PostType, string> = {
  공지: "bg-red-50 text-red-700 border-red-200",
  뉴스레터: "bg-sky-50 text-sky-700 border-sky-200",
};

const POSTS: Post[] = [
  {
    id: "1",
    type: "공지",
    title: "2026년 1기 신입 부원 모집 안내",
    date: "2026-04-28",
    summary:
      "DHC-SHIFT 1기 신입 부원을 모집합니다. 지원 자격, 전형 일정, 지원서 양식을 확인하세요.",
    link: "/join",
    pinned: true,
  },
  {
    id: "2",
    type: "공지",
    title: "킥오프 세션 일정 안내 (5월 7일)",
    date: "2026-05-01",
    summary:
      "1기 첫 번째 공식 모임인 킥오프 세션 일정을 안내합니다. 학과 세미나실에서 진행됩니다.",
  },
];

export default function NewsletterPage() {
  const pinned = POSTS.filter((p) => p.pinned);
  const rest = POSTS.filter((p) => !p.pinned);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
        Newsletter
      </p>
      <h1 className="text-4xl font-bold mb-2">뉴스레터</h1>
      <p className="text-muted-foreground mb-12">동아리 공지, 스터디 소식, 모집 안내</p>

      {pinned.length > 0 && (
        <div className="mb-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            📌 고정 공지
          </p>
          {pinned.map((post) => (
            <PostCard key={post.id} post={post} highlight />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          최근 게시물
        </p>
        {rest.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">등록된 게시물이 없습니다.</p>
          </div>
        ) : (
          rest.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

function PostCardInner({ post, highlight }: { post: Post; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 transition-all",
        highlight
          ? "border-primary/30 bg-primary/5 hover:border-primary/50"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
      )}
    >
      <div className="flex items-center justify-between mb-2 gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
              TYPE_COLORS[post.type]
            )}
          >
            {post.type}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={11} />
            {post.date}
          </span>
        </div>
        {post.link && (
          <ExternalLink size={14} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
        )}
      </div>
      <p className="font-semibold mb-1.5">{post.title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
    </div>
  );
}

function PostCard({ post, highlight }: { post: Post; highlight?: boolean }) {
  if (post.link) {
    return (
      <a href={post.link} className="group block">
        <PostCardInner post={post} highlight={highlight} />
      </a>
    );
  }
  return (
    <div className="block">
      <PostCardInner post={post} highlight={highlight} />
    </div>
  );
}
