"use client";

import { motion } from "framer-motion";
import { Link2, Users, Trophy } from "lucide-react";

const MISSIONS = [
  {
    icon: Link2,
    title: "전공과 실무 연결",
    desc: "수업에서 배운 통계, 프로그래밍, 데이터 분석 지식을 실제 헬스케어 문제에 연결합니다.",
  },
  {
    icon: Users,
    title: "함께 성장하는 스터디",
    desc: "기초 개념을 함께 정리하고, 발표와 실습을 통해 서로의 이해를 보완합니다.",
  },
  {
    icon: Trophy,
    title: "결과물이 남는 프로젝트",
    desc: "학기마다 작은 프로젝트를 완성해 포트폴리오와 활동 기록으로 남깁니다.",
  },
];

export function MissionCards() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">운영 목표</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {MISSIONS.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
              <Icon size={20} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
