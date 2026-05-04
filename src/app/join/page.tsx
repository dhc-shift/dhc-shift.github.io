import type { Metadata } from "next";
import { CheckCircle2, Clock, FileText, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "가입안내",
  description: "DHC-SHIFT 지원 자격, 전형 일정, 지원서 작성 안내",
};

const TIMELINE = [
  { step: "01", title: "지원서 제출", desc: "구글폼 작성 및 제출", date: "~5월 15일" },
  { step: "02", title: "서류 검토", desc: "운영진 내부 검토 및 선발", date: "5월 16–18일" },
  { step: "03", title: "결과 발표", desc: "이메일 또는 개별 연락", date: "5월 19일" },
  { step: "04", title: "킥오프 참석", desc: "첫 정기모임 참석으로 활동 시작", date: "5월 21일" },
];

const QUALIFICATIONS = [
  "학과 재학 중인 학부생 (학년 무관)",
  "매주 정기모임 참석 가능한 분",
  "학기 말 팀 프로젝트 완주 의지가 있는 분",
  "데이터, AI, 헬스케어 중 하나 이상에 관심 있는 분",
];

const FAQ = [
  {
    q: "프로그래밍을 전혀 못해도 지원할 수 있나요?",
    a: "네, 가능합니다. SHIFT는 배우는 과정을 중요하게 생각합니다. 기초부터 함께 시작하는 스터디가 준비되어 있습니다.",
  },
  {
    q: "학기 중 빠지는 경우가 생기면 어떻게 되나요?",
    a: "불가피한 경우 미리 공지하면 됩니다. 다만 정기모임 1/3 이상 결석 시 활동 부원에서 제외될 수 있습니다.",
  },
  {
    q: "프로젝트 팀은 어떻게 구성되나요?",
    a: "킥오프 세션에서 관심 분야를 공유하고, 운영진 조율 후 팀을 구성합니다. 원하는 팀원이 있다면 같이 지원해도 좋습니다.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
      {/* 헤더 */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Join</p>
        <h1 className="text-4xl font-bold mb-4">가입 안내</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          DHC-SHIFT 1기 신입 부원을 모집합니다. 관심 있는 분이라면 누구든 지원할 수 있습니다.
        </p>
      </div>

      {/* 지원 자격 */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-primary" />
          <h2 className="text-xl font-bold">지원 자격</h2>
        </div>
        <ul className="space-y-3">
          {QUALIFICATIONS.map((q) => (
            <li key={q} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 전형 일정 */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} className="text-primary" />
          <h2 className="text-xl font-bold">전형 일정</h2>
        </div>
        <div className="relative pl-4">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-6">
            {TIMELINE.map(({ step, title, desc, date }) => (
              <div key={step} className="relative pl-8">
                <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center -translate-x-[calc(50%+0.5px)]">
                  <span className="text-[9px] font-bold text-primary-foreground">{step}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-semibold">{title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3">
          <FileText size={24} className="text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-2">지원하기</h2>
        <p className="text-sm text-muted-foreground mb-6">
          아래 버튼을 눌러 지원서를 작성해주세요. 5분이면 충분합니다.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          지원서 작성하기 →
        </a>
        <p className="mt-3 text-xs text-muted-foreground">마감: 2026년 5월 15일</p>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-bold mb-6">자주 묻는 질문</h2>
        <div className="space-y-4">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2 text-sm">Q. {q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
