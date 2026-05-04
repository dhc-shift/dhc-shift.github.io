import Link from "next/link";
import { Bell, Calendar, Users, FolderOpen, ArrowRight } from "lucide-react";

const LINKS = [
  {
    icon: Bell,
    title: "공지사항",
    desc: "모집, 세미나, 제출 일정 안내",
    href: "/newsletter",
  },
  {
    icon: Users,
    title: "가입안내",
    desc: "지원 자격, 전형 일정, 지원서 양식",
    href: "/join",
  },
  {
    icon: FolderOpen,
    title: "활동 아카이브",
    desc: "스터디, 세미나, 프로젝트 기록",
    href: "/activities",
  },
  {
    icon: Calendar,
    title: "동아리 소개",
    desc: "운영 목표와 SHIFT의 의미",
    href: "/about",
  },
];

export function QuickLinks() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold mb-10">빠른 이동</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {LINKS.map(({ icon: Icon, title, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <div className="mb-3 inline-flex rounded-lg bg-accent p-2.5">
              <Icon size={18} className="text-accent-foreground" />
            </div>
            <p className="font-semibold mb-1">{title}</p>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{desc}</p>
            <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              확인하기 <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
