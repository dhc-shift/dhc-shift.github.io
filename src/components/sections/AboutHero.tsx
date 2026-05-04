"use client";

import { motion } from "framer-motion";
import type { AboutPageContent } from "@/lib/site-content";

export function AboutHero({ content }: { content: AboutPageContent["hero"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
        {content.eyebrow}
      </p>
      <h1 className="text-4xl font-bold mb-6">{content.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
        {content.description}
      </p>
      <div className="mt-6 rounded-2xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-sm leading-relaxed text-foreground">{content.note}</p>
      </div>
    </motion.div>
  );
}
