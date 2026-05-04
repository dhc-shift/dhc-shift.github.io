"use client";

import { motion } from "framer-motion";
import { Database, Brain, Lightbulb } from "lucide-react";

const ACTIVITIES = [
  {
    icon: Database,
    title: "헬스케어 데이터 스터디",
    description:
      "공개 데이터셋, 설문 데이터, 웨어러블 데이터를 다루며 전처리와 시각화의 기본기를 쌓습니다.",
  },
  {
    icon: Brain,
    title: "의료 AI 세미나",
    description:
      "논문과 사례를 읽고, 모델의 가능성과 한계를 학과 수준에서 함께 토론합니다.",
  },
  {
    icon: Lightbulb,
    title: "팀 프로젝트",
    description:
      "문제 정의부터 프로토타입, 분석 리포트, 발표 자료까지 학기 말 산출물을 남깁니다.",
  },
];

export function ActivityCards() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold mb-2">이번 학기 활동</h2>
      <p className="text-muted-foreground mb-10">1기 2026년 1학기 커리큘럼</p>

      <div className="grid md:grid-cols-3 gap-6">
        {ACTIVITIES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
