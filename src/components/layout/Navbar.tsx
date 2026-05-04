"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/activities", label: "활동" },
  { href: "/newsletter", label: "뉴스레터" },
  { href: "/join", label: "가입안내" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="DHC-SHIFT" className="h-7 w-auto" />
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
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
          href="/join"
          className="hidden md:inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          지원하기
        </Link>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="메뉴"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
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
              {NAV_LINKS.map(({ href, label }) => (
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
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground"
            >
              지원하기
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
