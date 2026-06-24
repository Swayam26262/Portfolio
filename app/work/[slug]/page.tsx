import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, Github, Lock } from "lucide-react"

import { caseStudies, getCaseStudy } from "@/lib/case-studies"
import { FlowDiagram } from "@/components/flow-diagram"
import { CaseNav } from "@/components/case-nav"
import { TransitionLink } from "@/components/transition-link"
import { CountUp } from "@/components/count-up"
import { MagneticButton } from "@/components/magnetic-button"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  return {
    title: `${cs.title} — Case study · Swayam Patil`,
    description: cs.outcome,
  }
}

const BADGE_CLS: Record<string, string> = {
  Production: "bg-signal text-[#0d0d0f]",
  "Co-Founded": "bg-ink text-canvas",
  Live: "border border-ink/20 text-ink-soft",
}

const isPlaceholder = (href?: string | null) => !href || href === "#"

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-xs text-signal-deep dark:text-signal">{index}</span>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  const idx = caseStudies.findIndex((c) => c.slug === cs.slug)
  const next = caseStudies.length > 1 ? caseStudies[(idx + 1) % caseStudies.length] : null

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <CaseNav />

      <main className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        {/* Hero */}
        <header className="pt-14 sm:pt-20">
          <div className="flex items-center gap-2">
            <span className="eyebrow">Case study</span>
            <span
              className={`rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${BADGE_CLS[cs.badge]}`}
            >
              {cs.badge}
            </span>
          </div>

          <h1
            className="mt-5 font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            style={{ viewTransitionName: `case-${cs.slug}-title` }}
          >
            {cs.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">{cs.outcome}</p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/10 py-5 sm:grid-cols-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">Role</div>
              <div className="mt-1 text-sm font-medium">{cs.role}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">Timeline</div>
              <div className="mt-1 text-sm font-medium">{cs.timeline}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">Links</div>
              <div className="mt-1.5 flex items-center gap-4">
                {cs.demo &&
                  (isPlaceholder(cs.demo) ? (
                    <span className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm text-ink-mute" title="Link coming soon">
                      Visit <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <a href={cs.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
                      Visit <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                {cs.github ? (
                  <a href={cs.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink">
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                ) : (
                  cs.proprietary && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink-mute">
                      <Lock className="h-3 w-3" /> Proprietary
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {cs.stack.map((s) => (
              <span key={s} className="rounded-md border border-ink/10 bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-soft">
                {s}
              </span>
            ))}
          </div>
        </header>

        {/* Snapshot */}
        <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="bg-canvas p-5">
              <div className="font-display text-3xl font-bold tracking-tight">
                <CountUp value={m.value} />
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase leading-snug tracking-wider text-ink-mute">
                {m.label}
              </div>
            </div>
          ))}
        </section>

        {/* Problem */}
        <section className="mt-16">
          <SectionHeader index="01" title="The problem" />
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
            {cs.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="mt-16">
          <SectionHeader index="02" title="The approach" />
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
            {cs.approach.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mt-16">
          <SectionHeader index="03" title="Architecture" />
          <FlowDiagram lanes={cs.diagram.lanes} note={cs.diagram.note} />
        </section>

        {/* Build */}
        <section className="mt-16">
          <SectionHeader index="04" title="How it's built" />
          <ul className="max-w-2xl space-y-3">
            {cs.build.map((b, i) => (
              <li key={i} className="relative pl-6 text-lg leading-relaxed text-ink-soft">
                <span className="absolute left-0 top-1 text-signal-deep dark:text-signal">→</span>
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="mt-16">
          <SectionHeader index="05" title="The outcome" />
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
            {cs.results.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Next case */}
        {next && (
          <TransitionLink
            href={`/work/${next.slug}`}
            className="group mt-16 flex items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 sm:p-8"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                Next case study
              </div>
              <div className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {next.title}
              </div>
              <div className="mt-1 text-sm text-ink-soft">{next.tagline}</div>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-ink-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
          </TransitionLink>
        )}

        {/* CTA */}
        <section className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-sunken/60 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Want the deep dive?</h2>
            <p className="mt-2 text-ink-soft">Happy to walk through the design decisions and trade-offs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TransitionLink
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50"
            >
              All work
            </TransitionLink>
            <MagneticButton className="inline-block">
              <a
                href="mailto:patilswayam96@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-[#0d0d0f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--ink))]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl font-mono text-xs text-ink-mute">
          © {new Date().getFullYear()} Swayam Patil
        </div>
      </footer>
    </div>
  )
}
