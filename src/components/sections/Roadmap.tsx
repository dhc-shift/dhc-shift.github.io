"use client";

import { motion } from "framer-motion";
import type { RoadmapStepContent, SectionContent } from "@/lib/site-content";

export function Roadmap({
  section,
  steps,
}: {
  section: SectionContent;
  steps: RoadmapStepContent[];
}) {
  return (
    <section className="bg-muted/30 border-y border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
        {section.description && <p className="text-muted-foreground mb-10">{section.description}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map(({ num, title, description }, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative rounded-2xl bg-card border border-border p-6"
            >
              <p className="text-3xl font-black text-primary/20 mb-3">{num}</p>
              <p className="font-bold mb-1">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
