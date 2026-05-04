import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getFooterContent, getNavigationContent, getSiteMetaContent } from "@/lib/site-content";

const siteMeta = getSiteMetaContent();

export const metadata: Metadata = {
  title: {
    default: siteMeta.titleDefault,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.metadataBase),
  openGraph: {
    siteName: siteMeta.openGraphSiteName,
    locale: siteMeta.openGraphLocale,
    type: siteMeta.openGraphType,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigationContent();
  const footer = getFooterContent();

  return (
    <html lang={siteMeta.htmlLang} className="h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Navbar content={navigation} />
        <main className="flex-1">{children}</main>
        <Footer content={footer} />
      </body>
    </html>
  );
}
