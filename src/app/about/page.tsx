import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { MissionCards } from "@/components/sections/MissionCards";
import { ShiftMeaning } from "@/components/sections/ShiftMeaning";
import { WhoFitsIn } from "@/components/sections/WhoFitsIn";
import { getAboutPageContent } from "@/lib/site-content";

const content = getAboutPageContent();

export const metadata: Metadata = {
  title: content.metadataTitle,
  description: content.metadataDescription,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">
      <AboutHero content={content.hero} />
      <MissionCards section={content.missionsSection} cards={content.missionCards} />
      <ShiftMeaning section={content.shiftSection} letters={content.shiftLetters} />
      <WhoFitsIn section={content.audienceSection} cards={content.audienceCards} />
    </div>
  );
}
