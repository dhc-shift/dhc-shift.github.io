"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">About</p>
      <h1 className="text-4xl font-bold mb-6">DHC-SHIFT는 어떤 동아리인가요?</h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
        <strong className="text-foreground">Digital Healthcare Community</strong>를 지향하는 학과 기반
        학술동아리입니다. 디지털헬스케어, 의료 데이터, 인공지능, 서비스 기획에 관심 있는 학생들이
        모여 함께 공부하고 직접 만들어보는 활동을 합니다.
      </p>
      <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm leading-relaxed text-foreground">
          거창한 결과물보다{" "}
          <strong>꾸준한 기록, 팀 기반 협업, 학기 말 산출물</strong>을 중요하게 봅니다.
          처음에는 작은 분석 노트로 시작해도 괜찮습니다.
        </p>
      </div>
    </motion.div>
  );
}
