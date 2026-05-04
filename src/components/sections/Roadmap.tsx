"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", title: "Learn", desc: "기초 개념과 도구를 함께 익힙니다." },
  { num: "02", title: "Explore", desc: "헬스케어 문제와 데이터를 탐색합니다." },
  { num: "03", title: "Build", desc: "팀별 프로젝트를 설계하고 구현합니다." },
  { num: "04", title: "Share", desc: "결과를 발표하고 활동 기록으로 남깁니다." },
];

export function Roadmap() {
  return (
    <section className="bg-muted/30 border-y border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold mb-2">SHIFT 로드맵</h2>
        <p className="text-muted-foreground mb-10">학기별 진행 흐름</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-2xl bg-card border border-border p-6"
            >
              <p className="text-3xl font-black text-primary/20 mb-3">{num}</p>
              <p className="font-bold mb-1">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
