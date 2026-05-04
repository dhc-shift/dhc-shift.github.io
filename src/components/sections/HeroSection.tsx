"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/site-content";

export function HeroSection({ content }: { content: HeroContent }) {
  const titleLines = content.title.split("\n");

  return (
    <section className="relative overflow-hidden bg-background">
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {titleLines.map((line, index) => (
                <Fragment key={`${line}-${index}`}>
                  {line}
                  {index < titleLines.length - 1 && <br />}
                </Fragment>
              ))}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={content.primaryHref}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {content.primaryLabel} <ArrowRight size={16} />
              </Link>
              <Link
                href={content.secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                {content.secondaryLabel}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center"
          >
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              width={900}
              height={620}
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
