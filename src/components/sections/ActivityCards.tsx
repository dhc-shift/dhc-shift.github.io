"use client";

import { motion } from "framer-motion";
import { Database, Brain, Lightbulb } from "lucide-react";
import type { IconCardContent, SectionContent } from "@/lib/site-content";

const ICONS = { Database, Brain, Lightbulb };

export function ActivityCards({
  section,
  cards,
}: {
  section: SectionContent;
  cards: IconCardContent[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
      {section.description && <p className="text-muted-foreground mb-10">{section.description}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(({ icon, title, description }, index) => {
          const Icon = ICONS[icon as keyof typeof ICONS] ?? Lightbulb;

          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
