"use client";

import { motion } from "framer-motion";
import { Link2, Users, Trophy } from "lucide-react";
import type { IconCardContent, SectionContent } from "@/lib/site-content";

const ICONS = { Link2, Users, Trophy };

export function MissionCards({
  section,
  cards,
}: {
  section: SectionContent;
  cards: IconCardContent[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(({ icon, title, description }, index) => {
          const Icon = ICONS[icon as keyof typeof ICONS] ?? Link2;

          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
