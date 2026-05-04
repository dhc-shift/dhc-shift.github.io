"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* 배경 그라디언트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.85 0.08 240 / 0.4), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 카피 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              학과 디지털헬스케어 학술동아리
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              데이터로 건강을 읽고<br />
              기술로 서비스를 만듭니다.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              DHC-SHIFT는 의료 데이터, AI, 소프트웨어, 서비스 기획을 함께 공부하고
              학기별 프로젝트로 이어가는 학과 기반 커뮤니티입니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                지원하기 <ArrowRight size={16} />
              </Link>
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                활동 보기
              </Link>
            </div>
          </motion.div>

          {/* 비주얼 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center"
          >
            <img
              src="/images/hero-dashboard.svg"
              alt="디지털 헬스케어 대시보드"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
