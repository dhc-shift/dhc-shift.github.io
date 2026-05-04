import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { MissionCards } from "@/components/sections/MissionCards";
import { ShiftMeaning } from "@/components/sections/ShiftMeaning";
import { WhoFitsIn } from "@/components/sections/WhoFitsIn";

export const metadata: Metadata = {
  title: "소개",
  description: "DHC-SHIFT가 하는 일, 운영 목표, SHIFT의 의미",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">
      <AboutHero />
      <MissionCards />
      <ShiftMeaning />
      <WhoFitsIn />
    </div>
  );
}
