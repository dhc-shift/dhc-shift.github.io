import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DHC-SHIFT",
    template: "%s | DHC-SHIFT",
  },
  description: "Digital Healthcare Community — 의료 데이터, AI, 서비스 기획을 함께 공부하는 학과 기반 학술동아리",
  metadataBase: new URL("https://dhc-shift.github.io"),
  openGraph: {
    siteName: "DHC-SHIFT",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
