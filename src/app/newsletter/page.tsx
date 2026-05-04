import type { Metadata } from "next";
import { Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNewsletterPageContent, type NewsletterPostContent } from "@/lib/site-content";

const content = getNewsletterPageContent();

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

const TYPE_BADGE_CLASS =
  "inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary";

export default function NewsletterPage() {
  const pinned = content.posts.filter((post) => post.pinned);
  const rest = content.posts.filter((post) => !post.pinned);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
        {content.eyebrow}
      </p>
      <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
      <p className="text-muted-foreground mb-12">{content.description}</p>

      {pinned.length > 0 && (
        <div className="mb-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {content.pinnedLabel}
          </p>
          {pinned.map((post) => (
            <PostCard key={post.id} post={post} highlight />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {content.recentLabel}
        </p>
        {rest.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">{content.emptyTitle}</p>
          </div>
        ) : (
          rest.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

function PostCardInner({
  post,
  highlight,
}: {
  post: NewsletterPostContent;
  highlight?: boolean;
}) {
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
          <span className={TYPE_BADGE_CLASS}>
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

function PostCard({ post, highlight }: { post: NewsletterPostContent; highlight?: boolean }) {
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
