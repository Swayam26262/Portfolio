"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, ArrowUpRight, ArrowLeft } from "lucide-react"

const RESUME_URL =
  "https://drive.google.com/file/d/1P1EvdPLFmHG16GUYRoAI6XvwXH_ZdRf8/view?usp=sharing"

export function CaseNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/10 bg-nav/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal font-display text-sm font-bold text-[#0d0d0f] transition-transform duration-300 group-hover:-rotate-6">
            SP
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
            Swayam Patil
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-ink-mute transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
          <Link
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wide text-canvas transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
