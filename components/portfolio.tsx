"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Plus,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Lock,
  Sun,
  Moon,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { TransitionLink } from "@/components/transition-link"
import { CountUp } from "@/components/count-up"
import { MagneticButton } from "@/components/magnetic-button"
import { TiltCard } from "@/components/tilt-card"

const RESUME_URL =
  "https://drive.google.com/file/d/1P1EvdPLFmHG16GUYRoAI6XvwXH_ZdRf8/view?usp=sharing"
const CALENDLY_URL = "#" // TODO: add your Calendly (or other scheduling) link

const isPlaceholderLink = (href?: string | null) => !href || href === "#"

function ProjectLink({ href, children }: { href?: string | null; children: React.ReactNode }) {
  if (isPlaceholderLink(href)) {
    return (
      <span
        title="Link coming soon"
        className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm text-ink-mute"
      >
        {children}
      </span>
    )
  }
  return (
    <Link
      href={href as string}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
    >
      {children}
    </Link>
  )
}

// status pill styles — all AA-safe in light & dark
const BADGES: Record<string, { label: string; cls: string }> = {
  cofounded: { label: "Co-Founded", cls: "bg-ink text-canvas" },
  production: { label: "Production", cls: "bg-signal text-[#0d0d0f]" },
  live: { label: "Live", cls: "border border-ink/20 text-ink-soft" },
  oss: { label: "Open Source", cls: "border border-ink/15 text-ink-mute" },
}

type Project = {
  title: string
  tagline: string
  description: string
  tech: string[]
  badge?: keyof typeof BADGES
  metric?: string
  demo?: string | null
  github?: string | null
  proprietary?: boolean
  slug?: string
}

export default function SwayamPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState("home")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [mounted, setMounted] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { theme, setTheme } = useTheme()

  const scrolled = scrollY > 32

  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return
    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 76
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis
    if (lenis) lenis.scrollTo(offsetTop)
    else window.scrollTo({ top: offsetTop, behavior: "smooth" })
  }, [])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
      const sections = ["home", "work", "about", "skills", "experience", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "-40px 0px -40px 0px" },
    )
    document.querySelectorAll("[data-animate]").forEach((s) => observerRef.current?.observe(s))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  const projects: Project[] = [
    {
      title: "ParkBuddy",
      tagline: "RAG support bot for GoParkEasy",
      description:
        "Production RAG chatbot built on Google Gemini and MongoDB vector search, integrated with WhatsApp to autonomously resolve 60–70% of Tier-1 support queries in under 2 seconds and cut support-team load.",
      tech: ["Node.js", "Google Gemini", "MongoDB Vector Search", "BullMQ", "Upstash Redis"],
      badge: "production",
      metric: "60–70% Tier-1 resolution",
      demo: "#", // TODO: add ParkBuddy case study / demo link
      github: null,
      proprietary: true,
      slug: "parkbuddy",
    },
    {
      title: "AI Receptionist",
      tagline: "Real-time voice AI receptionist",
      description:
        "Voice AI receptionist using Retell AI, GPT-4o-mini, and Gemini 2.0 Flash with LLM tool-calling for appointment booking, waitlist capture, and human escalation — plus a Next.js + Supabase dashboard for call logs, scheduling, analytics, and billing.",
      tech: ["Next.js", "TypeScript", "Supabase", "Retell AI", "GPT-4o-mini"],
      badge: "live",
      metric: "<100ms hot paths",
      demo: "#", // TODO: add AI Receptionist live URL
      github: null,
      slug: "ai-receptionist",
    },
    {
      title: "GoParkEasy Platform",
      tagline: "Production SaaS parking platform",
      description:
        "Production-grade SaaS parking platform on Next.js 15, Node.js, and MongoDB — 450+ REST APIs across a 51-collection schema with 5+ role-based access tiers and a real-time availability engine.",
      tech: ["Next.js 15", "Node.js", "MongoDB", "Redis Streams", "Socket.io"],
      badge: "production",
      metric: "450+ REST APIs",
      demo: "#", // TODO: add GoParkEasy live URL if public
      github: null,
      proprietary: true,
      slug: "goparkeasy",
    },
    {
      title: "FixMyResume",
      tagline: "AI resume analyzer with JD matching",
      description:
        "AI-driven resume optimization platform leveraging Gemini + NLP to score resumes against job descriptions across 1,000+ semantic data points, raising ATS match scores by 35%. JWT-secured REST APIs and a React/Tailwind UI.",
      tech: ["Python", "React", "PostgreSQL", "Gemini API", "NLP"],
      badge: "live",
      demo: "https://fix-my-resume.vercel.app",
      github: "https://github.com/Swayam26262/FixMyResume",
    },
    {
      title: "YT2Notes",
      tagline: "YouTube videos → study notes",
      description:
        "Converts YouTube videos into organized study notes using AI summarization, with Google OAuth for secure auth.",
      tech: ["Django", "React", "Google API", "AssemblyAI"],
      badge: "oss",
      demo: null,
      github: "https://github.com/Swayam26262/YT2Notes",
    },
  ]

  const skillGroups: { title: string; skills: string[] }[] = [
    { title: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML / CSS"] },
    { title: "Backend", skills: ["Node.js", "Express.js", "Django", "BullMQ", "Redis", "WebSockets", "REST APIs"] },
    {
      title: "AI / ML",
      skills: ["LLMs", "RAG Pipelines", "Computer Vision", "NLP", "Object Detection", "OCR", "Gemini API", "GPT-4o", "Retell AI"],
    },
    {
      title: "ML Frameworks",
      skills: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "YOLOv5", "DeepSORT"],
    },
    { title: "Databases & Cloud", skills: ["MongoDB", "PostgreSQL", "Vector Search", "SQL", "Docker", "Git", "CI/CD", "AWS S3", "Vercel"] },
    { title: "Tools & Integrations", skills: ["Supabase", "Razorpay", "Socket.io", "Google Calendar", "Postman", "Upstash Redis"] },
    { title: "Languages", skills: ["Python", "JavaScript", "SQL", "Java", "C++"] },
  ]

  const timeline = [
    {
      type: "experience" as const,
      current: true,
      role: "Full-Stack & AI Engineer",
      org: "GoParkEasy",
      period: "Nov 2025 – Present",
      location: "Mumbai, India",
      bullets: [
        "Built ParkBuddy, a RAG-based AI chatbot (Google Gemini + MongoDB vector search) that autonomously resolves 60–70% of Tier-1 support queries in under 2 seconds.",
        "Engineered a multi-tier caching system (Upstash Redis + in-memory LRU) informed by Python/SQL EDA, cutting database load by 10–20%.",
        "Led a fault-tolerant async job pipeline with BullMQ processing 1000+ booking events/day with ~40% fewer manual processing errors.",
        "Shipped real-time availability updates with Redis Streams and WebSockets, eliminating polling for 100+ concurrent users.",
      ],
      stack: ["Node.js", "Google Gemini", "MongoDB Vector Search", "BullMQ", "Upstash Redis", "Redis Streams", "WebSockets"],
    },
    {
      type: "experience" as const,
      current: false,
      role: "Full-Stack Engineer · Intern",
      org: "GoParkEasy",
      period: "Aug 2025 – Nov 2025",
      location: "Remote",
      bullets: [
        "Architected a production-grade SaaS parking platform (Next.js 15, Node.js, MongoDB) with 450+ REST APIs across a 51-collection schema and 5+ role-based access tiers.",
        "Built a real-time availability engine with Redis Streams and Socket.io processing 100 events/5s, plus a QR-based check-in system with Puppeteer.",
        "Resolved MongoDB indexing bottlenecks across 51 collections, boosting operational throughput by 15%.",
      ],
      stack: ["Next.js 15", "Node.js", "MongoDB", "Redis Streams", "Socket.io", "Puppeteer"],
    },
    {
      type: "experience" as const,
      current: false,
      role: "Machine Learning Intern",
      org: "Infosys Springboard",
      period: "May 2024 – Jul 2024",
      location: "Remote",
      bullets: [
        "Led development of BikeWatch, a production CV system using YOLOv5 + DeepSORT to flag helmet violations and triple-riding from live traffic streams, boosting enforcement efficiency by 45%.",
        "Achieved 85% classification accuracy on a multi-rider detection module and automated violation uploads to AWS S3, cutting data-handling overhead by 60%.",
        "Mentored a 5-member intern cohort through weekly knowledge-sharing workshops.",
      ],
      stack: ["Python", "YOLOv5", "DeepSORT", "OpenCV", "AWS S3"],
    },
    {
      type: "education" as const,
      current: false,
      role: "BTech, Computer Science & Engineering",
      org: "Dr. D Y Patil Pratishthan's College of Engineering",
      period: "Dec 2021 – Jun 2025",
      location: "Kolhapur, Maharashtra",
      grade: "CGPA 8.2 / 10",
      bullets: [
        "Computer Science with a strong foundation in software development, data structures, databases, and machine learning.",
      ],
      stack: ["DSA", "Databases", "Software Development", "Machine Learning"],
    },
  ]

  const navItems = [
    { name: "Work", href: "work", index: "01" },
    { name: "About", href: "about", index: "02" },
    { name: "Skills", href: "skills", index: "03" },
    { name: "Experience", href: "experience", index: "04" },
    { name: "Contact", href: "contact", index: "05" },
  ]

  const socials = [
    { icon: Github, href: "https://github.com/Swayam26262", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/swayampatil/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:patilswayam96@gmail.com", label: "Email" },
  ]

  const stats = [
    { value: "60–70", unit: "%", label: "Tier-1 queries auto-resolved" },
    { value: "450+", unit: "", label: "REST APIs shipped" },
    { value: "1000+", unit: "", label: "booking events / day" },
    { value: "100+", unit: "", label: "concurrent users served" },
  ]

  const marqueeTech = [
    "Next.js", "TypeScript", "Node.js", "Python", "RAG Pipelines", "Google Gemini",
    "Vector Search", "Redis", "BullMQ", "GPT-4o", "Retell AI", "Supabase",
    "PyTorch", "YOLOv5", "Socket.io", "Docker", "Vercel",
  ]

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 5)
  const hasMoreProjects = projects.length > 5

  const reveal = (id: string) =>
    visibleElements.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-signal transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "border-b border-ink/10 bg-nav/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-[72px]">
            <button onClick={() => smoothScrollTo("home")} className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal font-display text-sm font-bold text-[#0d0d0f] transition-transform duration-300 group-hover:-rotate-6">
                SP
              </span>
              <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
                Swayam Patil
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => smoothScrollTo(item.href)}
                  className={`group relative font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 ${
                    activeSection === item.href ? "text-ink" : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <span className="text-signal-deep dark:text-signal">{item.index}</span>{" "}
                  {item.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-signal transition-all duration-300 ${
                      activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
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

              {/* Mobile menu button */}
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative h-4 w-5">
                  <span className={`absolute left-0 top-0.5 h-0.5 w-5 bg-ink transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-2 h-0.5 w-5 bg-ink transition-all duration-300 ${isMenuOpen ? "scale-x-0 opacity-0" : ""}`} />
                  <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-ink transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile overlay */}
        <div
          className={`absolute left-0 top-full w-full border-b border-ink/10 bg-nav/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            isMenuOpen ? "opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          <div className="space-y-1 px-4 py-5 sm:px-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  smoothScrollTo(item.href)
                  setIsMenuOpen(false)
                }}
                className="flex w-full items-baseline gap-3 rounded-lg px-3 py-3 text-left font-display text-2xl font-semibold transition-colors hover:text-ink-soft"
              >
                <span className="font-mono text-xs text-signal-deep dark:text-signal">{item.index}</span>
                {item.name}
              </button>
            ))}
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-ink px-4 py-3 font-mono text-xs uppercase tracking-wide text-canvas"
            >
              Resume <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8"
        data-animate
      >
        {/* lime glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 28%, rgb(var(--signal) / 0.18) 0%, transparent 60%)",
          }}
        />
        {/* doodles */}
        <svg className="pointer-events-none absolute right-[8%] top-[22%] hidden h-16 w-16 text-ink/20 lg:block" viewBox="0 0 100 100" fill="none" aria-hidden>
          <path d="M50 5 L58 42 L95 50 L58 58 L50 95 L42 58 L5 50 L42 42 Z" fill="currentColor" />
        </svg>
        <svg className="pointer-events-none absolute left-[6%] bottom-[24%] hidden h-20 w-24 text-signal lg:block" viewBox="0 0 120 60" fill="none" aria-hidden>
          <path d="M5 40 C 25 5, 45 55, 65 25 S 105 20, 115 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-5xl py-16">
          <p
            className="eyebrow animate-fade-up opacity-0"
            style={{ animationDelay: "0.05s" }}
          >
            Full-Stack &amp; AI Engineer · GoParkEasy
          </p>

          <h1
            className="mt-6 animate-slide-up font-display text-[clamp(2.25rem,8vw,7rem)] font-bold leading-[0.98] tracking-[-0.03em] opacity-0 sm:leading-[0.95]"
            style={{ animationDelay: "0.12s" }}
          >
            I build <span className="marker">AI products</span>
            <br className="hidden sm:block" /> that actually <span className="marker">ship</span>.
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-soft opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Currently at GoParkEasy — shipping RAG chatbots, real-time booking systems, and
            full-stack SaaS for real users. I don&apos;t just call LLM APIs; I build the systems
            around them.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col items-start gap-3 opacity-0 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.42s" }}
          >
            <MagneticButton className="w-full sm:w-auto">
              <button
                onClick={() => smoothScrollTo("work")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 font-medium text-[#0d0d0f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--ink))]"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MagneticButton>
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50 sm:w-auto"
            >
              Resume <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="mt-1 flex items-center gap-2 sm:ml-2 sm:mt-0">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => smoothScrollTo("work")}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 animate-bounce-slow text-ink-mute sm:block"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </section>

      {/* Stat strip */}
      <section className="border-y border-ink/10 bg-sunken/60 px-4 sm:px-6 lg:px-8" data-animate id="stats">
        <div className={`mx-auto grid max-w-6xl grid-cols-2 transition-all duration-700 md:grid-cols-4 ${reveal("stats")}`}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 py-8 sm:py-10 ${i !== 0 ? "border-l border-ink/10" : ""} ${
                i === 2 ? "border-l-0 md:border-l" : ""
              }`}
            >
              <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <CountUp value={s.value} />
                {s.unit && <span className="text-signal-deep dark:text-signal">{s.unit}</span>}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-wider text-ink-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee tech strip */}
      <div className="relative overflow-hidden py-10">
        <div className="pause-on-hover w-[105vw] -translate-x-[2.5vw] -rotate-2 border-y border-ink bg-ink py-4">
          <div className="marquee-track flex w-max animate-marquee items-center">
            {[...marqueeTech, ...marqueeTech].map((t, i) => (
              <span key={i} className="flex items-center font-display text-xl font-medium text-canvas sm:text-2xl">
                <span className="mx-6">{t}</span>
                <span className="h-2 w-2 rotate-45 bg-signal" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work — bento */}
      <section id="work" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" data-animate>
        <div className="mx-auto max-w-6xl">
          <div className={`mb-12 flex flex-wrap items-end justify-between gap-4 transition-all duration-700 ${reveal("work")}`}>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Things I&apos;ve <span className="marker">shipped</span>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              Production products, SaaS, and AI integrations — built to solve real problems, not demos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {displayedProjects.map((project, index) => {
              const badge = project.badge ? BADGES[project.badge] : null
              const isBig = index === 0
              return (
                <div
                  key={project.title}
                  className={`transition-all duration-500 ${reveal("work")} ${
                    isBig ? "md:col-span-2 lg:col-span-4" : "md:col-span-1 lg:col-span-2"
                  }`}
                  style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
                >
                <TiltCard className="h-full">
                <div
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-ink/25 ${
                    isBig ? "lg:min-h-[300px]" : ""
                  }`}
                >
                  {/* giant monogram */}
                  <span className="pointer-events-none absolute -bottom-8 -right-2 select-none font-display font-bold leading-none text-ink/[0.04] transition-colors duration-500 group-hover:text-signal/20"
                    style={{ fontSize: isBig ? "13rem" : "8rem" }}
                    aria-hidden
                  >
                    {project.title.charAt(0)}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      {badge && (
                        <span className={`rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${badge.cls}`}>
                          {badge.label}
                        </span>
                      )}
                      <ArrowUpRight className="h-5 w-5 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </div>

                    {project.metric && (
                      <div className={`mt-4 font-display font-bold tracking-tight text-ink ${isBig ? "text-3xl" : "text-2xl"}`}>
                        {project.metric}
                      </div>
                    )}

                    <h3
                      className={`font-display font-semibold tracking-tight ${isBig ? "mt-4 text-3xl" : "mt-3 text-xl"}`}
                      style={project.slug ? { viewTransitionName: `case-${project.slug}-title` } : undefined}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-signal-deep dark:text-signal/90">{project.tagline}</p>

                    <p className={`mt-3 text-sm leading-relaxed text-ink-soft ${isBig ? "max-w-lg line-clamp-3" : "line-clamp-2"}`}>
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, isBig ? 6 : 3).map((tech) => (
                        <span key={tech} className="rounded-md border border-ink/10 bg-canvas px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      {project.slug && (
                        <TransitionLink
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-signal-deep dark:hover:text-signal"
                        >
                          Case study <ArrowRight className="h-3.5 w-3.5" />
                        </TransitionLink>
                      )}
                      {project.demo && (
                        <ProjectLink href={project.demo}>
                          Visit <ArrowUpRight className="h-3.5 w-3.5" />
                        </ProjectLink>
                      )}
                      {project.github ? (
                        <ProjectLink href={project.github}>
                          <Github className="h-3.5 w-3.5" /> Code
                        </ProjectLink>
                      ) : (
                        project.proprietary && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-ink-mute">
                            <Lock className="h-3 w-3" /> Proprietary
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                </TiltCard>
                </div>
              )
            })}
          </div>

          {hasMoreProjects && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-300 hover:border-ink/50 hover:text-ink"
              >
                {showAllProjects ? (
                  <>Show less <ChevronDown className="h-4 w-4 rotate-180" /></>
                ) : (
                  <>More projects <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" data-animate>
        <div className="mx-auto max-w-6xl">
          <div className={`grid items-center gap-12 transition-all duration-700 lg:grid-cols-[1.5fr_1fr] ${reveal("about")}`}>
            <div>
              <p className="eyebrow">Who I am</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Backend systems,
                <br className="hidden sm:block" /> meet <span className="marker">LLMs</span>.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  I&apos;m a Full-Stack and AI Engineer based in Maharashtra, India — building
                  AI-powered features and production systems at{" "}
                  <span className="font-medium text-ink">GoParkEasy</span>, working across the stack
                  from RAG pipelines to real-time infrastructure.
                </p>
                <p>
                  I&apos;ve shipped a production RAG chatbot resolving 60–70% of Tier-1 support queries
                  in under 2 seconds, architected a SaaS platform with 450+ REST APIs across a
                  51-collection schema, and built fault-tolerant async pipelines processing 1000+
                  booking events a day.
                </p>
                <p>
                  Outside work I&apos;m obsessed with what&apos;s next in AI tooling — voice agents and
                  agentic workflows — and I trade the Indian markets on the side, which keeps me sharp on
                  risk and decisions under uncertainty.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-sm text-ink-mute">
                <MapPin className="h-4 w-4 text-signal-deep dark:text-signal" />
                Maharashtra, India
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-signal" aria-hidden />
                <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-ink/10 bg-sunken sm:h-72 sm:w-72">
                  <Image
                    src="https://ik.imagekit.io/clttjxlvp/myimg.png?updatedAt=1751296015995"
                    alt="Swayam Patil"
                    width={320}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-sunken/50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8" data-animate>
        <div className="mx-auto max-w-6xl">
          <div className={`mb-12 transition-all duration-700 ${reveal("skills")}`}>
            <p className="eyebrow">The stack</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What I work with
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, gi) => (
              <div
                key={group.title}
                className={`rounded-2xl border border-ink/10 bg-surface p-6 transition-all duration-700 ${reveal("skills")}`}
                style={{ transitionDelay: `${(gi % 3) * 80}ms` }}
              >
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
                  <span className="h-1.5 w-1.5 rounded-sm bg-signal" />
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-ink/10 bg-canvas px-2.5 py-1 font-mono text-xs text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" data-animate>
        <div className="mx-auto max-w-6xl">
          <div className={`mb-12 transition-all duration-700 ${reveal("experience")}`}>
            <p className="eyebrow">The path</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Experience &amp; education
            </h2>
          </div>

          <div className={`mx-auto max-w-3xl transition-all duration-700 ${reveal("experience")}`}>
            {timeline.map((item, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-x-5 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    <span className={`h-3.5 w-3.5 rounded-full border-2 border-canvas ${item.current ? "animate-pulse-glow bg-signal" : "bg-ink/30"}`} />
                  </span>
                  {i < timeline.length - 1 && <span className="mt-1.5 w-px flex-1 bg-ink/15" />}
                </div>

                <div className="-mt-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${item.type === "education" ? "border border-ink/20 text-ink-soft" : "bg-ink text-canvas"}`}>
                      {item.type === "education" ? "Education" : "Experience"}
                    </span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#0d0d0f]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0f]" /> Current
                      </span>
                    )}
                    {"grade" in item && item.grade && (
                      <span className="rounded-full border border-ink/15 px-2.5 py-0.5 font-mono text-[10px] text-ink-mute">
                        {item.grade}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight">{item.role}</h3>
                  <p className="font-mono text-sm text-signal-deep dark:text-signal">{item.org}</p>
                  <p className="mt-0.5 font-mono text-xs text-ink-mute">
                    {item.period}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="relative pl-5 text-sm leading-relaxed text-ink-soft">
                        <span className="absolute left-0 top-0 text-signal-deep dark:text-signal">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <span key={s} className="rounded-md border border-ink/10 bg-surface px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" data-animate>
        <div className="mx-auto max-w-5xl">
          <div className={`text-center transition-all duration-700 ${reveal("contact")}`}>
            <p className="eyebrow justify-center">What&apos;s next</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build <span className="marker">something</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
              Open to full-time AI Engineer and Full-Stack roles — in India and remote. Also happy to
              chat about freelance work or collaborations.
            </p>
          </div>

          <div className={`mt-12 grid grid-cols-1 gap-4 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-4 ${reveal("contact")}`} style={{ transitionDelay: "120ms" }}>
            {[
              { icon: Mail, label: "Email", value: "patilswayam96@gmail.com", href: "mailto:patilswayam96@gmail.com" },
              { icon: Linkedin, label: "LinkedIn", value: "/in/swayampatil", href: "https://www.linkedin.com/in/swayampatil/" },
              { icon: Github, label: "GitHub", value: "/Swayam26262", href: "https://github.com/Swayam26262" },
              { icon: Calendar, label: "Schedule", value: "Book a call", href: CALENDLY_URL },
            ].map(({ icon: Icon, label, value, href }) => {
              const placeholder = isPlaceholderLink(href)
              const inner = (
                <>
                  <Icon className="h-5 w-5 text-ink transition-colors group-hover:text-signal-deep dark:group-hover:text-signal" />
                  <div className="mt-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">{label}</div>
                    <div className="mt-0.5 break-all text-sm font-medium">{placeholder ? "Coming soon" : value}</div>
                  </div>
                </>
              )
              const cls =
                "group flex flex-col items-start rounded-2xl border border-ink/10 bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ink/30"
              return placeholder ? (
                <div key={label} className={`${cls} cursor-not-allowed`} title="Link coming soon">{inner}</div>
              ) : (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className={cls}>
                  {inner}
                </a>
              )
            })}
          </div>

          <div className={`mt-10 text-center transition-all duration-700 ${reveal("contact")}`} style={{ transitionDelay: "240ms" }}>
            <MagneticButton className="inline-block">
              <Link
                href="mailto:patilswayam96@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-8 py-4 font-medium text-[#0d0d0f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgb(var(--ink))]"
              >
                <Mail className="h-5 w-5" />
                Start a conversation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-signal font-display text-[11px] font-bold text-[#0d0d0f]">SP</span>
            <span className="font-mono text-xs text-ink-mute">© {new Date().getFullYear()} Swayam Patil</span>
          </div>
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-ink-mute transition-colors hover:text-ink">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
