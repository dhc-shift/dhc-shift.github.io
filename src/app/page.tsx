import { HeroSection } from "@/components/sections/HeroSection";
import { InfoStrip } from "@/components/sections/InfoStrip";
import { ActivityCards } from "@/components/sections/ActivityCards";
import { Roadmap } from "@/components/sections/Roadmap";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { QuickLinks } from "@/components/sections/QuickLinks";

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeroSection />
      <InfoStrip />
      <ActivityCards />
      <Roadmap />
      <QuickLinks />
    </>
  );
}
