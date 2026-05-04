"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavigationContent } from "@/lib/site-content";

export function Navbar({ content }: { content: NavigationContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="relative h-14 w-40 overflow-hidden sm:w-44"
          onClick={() => setOpen(false)}
        >
          <Image
            src={content.logoSrc}
            alt={content.logoAlt}
            width={2048}
            height={1536}
            className="absolute left-1/2 top-1/2 h-32 w-auto -translate-x-1/2 -translate-y-1/2"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {content.links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={content.ctaHref}
          className="hidden md:inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {content.ctaLabel}
        </Link>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={content.menuAriaLabel}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-border bg-background px-6 py-4"
          >
            <ul className="flex flex-col gap-1">
              {content.links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={content.ctaHref}
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground"
            >
              {content.ctaLabel}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
