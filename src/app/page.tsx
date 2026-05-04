import { HeroSection } from "@/components/sections/HeroSection";
import { InfoStrip } from "@/components/sections/InfoStrip";
import { ActivityCards } from "@/components/sections/ActivityCards";
import { Roadmap } from "@/components/sections/Roadmap";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { getHomeContent } from "@/lib/site-content";

export default function Home() {
  const content = getHomeContent();

  return (
    <>
      <AnnouncementBanner content={content.announcement} />
      <HeroSection content={content.hero} />
      <InfoStrip items={content.infoItems} />
      <ActivityCards section={content.activitiesSection} cards={content.activityCards} />
      <Roadmap section={content.roadmapSection} steps={content.roadmapSteps} />
      <QuickLinks section={content.quickLinksSection} links={content.quickLinks} />
    </>
  );
}
