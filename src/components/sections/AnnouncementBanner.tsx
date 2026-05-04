"use client";

import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import { useState } from "react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Megaphone size={14} className="shrink-0" />
          <span>
            <span className="font-semibold">2026년 1기 모집 중</span>
            <span className="ml-1 opacity-80">— 5월 15일 마감</span>
          </span>
          <Link href="/join" className="underline underline-offset-2 font-medium hover:opacity-80">
            지원하기 →
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label="닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
