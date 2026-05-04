import type { Metadata } from "next";
import { CheckCircle2, Clock, FileText, Users } from "lucide-react";
import { getJoinPageContent } from "@/lib/site-content";

const content = getJoinPageContent();

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          {content.eyebrow}
        </p>
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{content.description}</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-primary" />
          <h2 className="text-xl font-bold">{content.qualificationsTitle}</h2>
        </div>
        <ul className="space-y-3">
          {content.qualifications.map((qualification) => (
            <li key={qualification} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm leading-relaxed">{qualification}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} className="text-primary" />
          <h2 className="text-xl font-bold">{content.timelineTitle}</h2>
        </div>
        <div className="relative pl-4">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-6">
            {content.timeline.map(({ step, title, description, date }) => (
              <div key={step} className="relative pl-8">
                <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center -translate-x-[calc(50%+0.5px)]">
                  <span className="text-[9px] font-bold text-primary-foreground">{step}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-semibold">{title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3">
          <FileText size={24} className="text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-2">{content.ctaTitle}</h2>
        <p className="text-sm text-muted-foreground mb-6">{content.ctaDescription}</p>
        <a
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {content.ctaLabel}
        </a>
        <p className="mt-3 text-xs text-muted-foreground">{content.deadlineLabel}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">{content.faqTitle}</h2>
        <div className="space-y-4">
          {content.faq.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-semibold mb-2 text-sm">
                {content.faqQuestionPrefix} {question}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
