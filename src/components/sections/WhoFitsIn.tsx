import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TYPES = [
  { title: "데이터가 궁금한 사람", desc: "헬스케어 데이터를 직접 정리하고 읽어보고 싶은 학생" },
  { title: "AI를 실험해보고 싶은 사람", desc: "모델을 학습시키는 과정과 평가 지표를 이해하고 싶은 학생" },
  { title: "서비스를 기획하고 싶은 사람", desc: "사용자 문제를 정의하고 프로토타입으로 풀어보고 싶은 학생" },
];

export function WhoFitsIn() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">이런 학생에게 잘 맞습니다</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {TYPES.map(({ title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold mb-2">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <Link
        href="/join"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        지원 절차 확인하기 <ArrowRight size={16} />
      </Link>
    </div>
  );
}
