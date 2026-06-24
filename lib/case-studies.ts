import type { FlowLane } from "@/components/flow-diagram"

/**
 * Case-study content. Copy is intentionally editable — tune any wording to taste.
 * Only the 60–70% Tier-1 figure is a stated metric; everything else describes the
 * system design / approach. Fill the TODO links when available.
 */

export type CaseMetric = { value: string; label: string }
export type CaseSection = { heading: string; body: string[] }

export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  outcome: string
  role: string
  timeline: string
  badge: "Production" | "Co-Founded" | "Live"
  stack: string[]
  demo?: string | null
  github?: string | null
  proprietary?: boolean
  metrics: CaseMetric[]
  problem: string[]
  approach: string[]
  diagram: { lanes: FlowLane[]; note?: string }
  build: string[]
  results: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "parkbuddy",
    title: "ParkBuddy",
    tagline: "RAG support bot for GoParkEasy",
    outcome:
      "A production RAG assistant on Google Gemini and MongoDB vector search that autonomously resolves 60–70% of Tier-1 support queries in under 2 seconds — right inside WhatsApp, where customers already are.",
    role: "Full-Stack & AI Engineer · GoParkEasy",
    timeline: "Nov 2025 – Present",
    badge: "Production",
    stack: [
      "Node.js",
      "Google Gemini",
      "MongoDB Vector Search",
      "WhatsApp API",
      "BullMQ",
      "Upstash Redis",
    ],
    demo: "#", // TODO: add a case-study demo / recording link if available
    github: null,
    proprietary: true,
    metrics: [
      { value: "60–70%", label: "Tier-1 queries auto-resolved" },
      { value: "<2s", label: "avg resolution time" },
      { value: "↓10–20%", label: "database load" },
      { value: "24/7", label: "autonomous coverage" },
    ],
    problem: [
      "GoParkEasy's support inbox was dominated by repetitive Tier-1 questions — pricing, how-to-book, location and timing queries, refund status. The answers already existed in the help material; agents were spending their day retyping them.",
      "That work didn't scale. Response times stretched during peak hours, the load grew with every new user, and skilled agents were stuck on questions a machine could answer — instead of the genuinely hard cases that need a human.",
      "Customers also weren't on a support portal. They were on WhatsApp. Any solution had to meet them there.",
    ],
    approach: [
      "A scripted decision-tree bot would be brittle and frustrating; a raw LLM would hallucinate confidently about pricing and policies — the worst possible failure mode for support. So I built a Retrieval-Augmented Generation (RAG) pipeline that grounds every answer in GoParkEasy's actual help corpus.",
      "Incoming questions are embedded and matched against a vector index of the knowledge base; the most relevant passages are retrieved and handed to Gemini as context, which composes a natural, on-brand reply. When confidence is low or the question falls outside scope, the bot escalates to a human instead of guessing.",
      "The whole thing lives on WhatsApp, a multi-tier cache (Upstash Redis + in-memory LRU) keeps hot queries off the database, and anything heavy or non-blocking (ingestion, logging, follow-up jobs) runs off the request path through a BullMQ queue.",
    ],
    diagram: {
      lanes: [
        {
          title: "Ingestion",
          tag: "offline",
          nodes: [
            { label: "Help docs & FAQs", sub: "knowledge base" },
            { label: "Chunk + clean", sub: "split into passages" },
            { label: "Embed", sub: "Gemini embeddings" },
            { label: "Atlas Vector index", sub: "stored vectors", accent: true },
          ],
        },
        {
          title: "Query",
          tag: "realtime",
          nodes: [
            { label: "Customer", sub: "WhatsApp message" },
            { label: "WhatsApp webhook", sub: "→ Node backend" },
            { label: "Cache check", sub: "Redis + LRU" },
            { label: "Vector search", sub: "top-k retrieval", accent: true },
            { label: "Gemini synthesis", sub: "answer + guardrails", accent: true },
            { label: "Reply", sub: "via WhatsApp" },
          ],
        },
      ],
      note: "A multi-tier cache (Upstash Redis + in-memory LRU) absorbs hot queries; BullMQ + Redis keep ingestion, logging, and follow-up jobs off the request path, so replies land in under 2s under load.",
    },
    build: [
      "Chunked the knowledge base into retrieval-friendly passages and embedded them into a MongoDB vector search index — keeping vectors next to the operational data instead of standing up a separate vector DB.",
      "On each message: check the cache, embed the query, run top-k vector retrieval, and construct a context-grounded prompt for Gemini with explicit guardrails — answer only from retrieved context, and escalate rather than speculate.",
      "Profiled query performance with Python/SQL EDA and added a multi-tier cache (Upstash Redis + in-memory LRU) for hot queries, cutting database load by 10–20% (verified via cache hit ratios and query logs).",
      "Integrated the WhatsApp Business API for inbound webhooks and outbound replies, and offloaded ingestion, logging, and follow-up work to a BullMQ pipeline backed by Redis.",
    ],
    results: [
      "60–70% of Tier-1 queries are now resolved autonomously in under 2 seconds, freeing the support team to focus on the complex cases that actually need them.",
      "The caching layer cut database load by 10–20%, and the system holds up 24/7 — every customer gets the same accurate, on-brand answer, instantly, at any hour.",
      "Because answers are grounded in the live help corpus, the system improves simply by improving the docs — and unresolved questions become a roadmap for what to add next.",
    ],
  },

  {
    slug: "ai-receptionist",
    title: "AI Receptionist",
    tagline: "Real-time voice AI receptionist",
    outcome:
      "A real-time voice AI receptionist that answers calls, books appointments, captures waitlists, and escalates to a human — with quick-reply caching that hits sub-100ms response paths for high-frequency intents.",
    role: "Builder · Personal project",
    timeline: "2025",
    badge: "Live",
    stack: ["Next.js", "TypeScript", "Supabase", "Retell AI", "GPT-4o-mini", "Gemini 2.0 Flash"],
    demo: "#", // TODO: add AI Receptionist live URL
    github: null,
    metrics: [
      { value: "<100ms", label: "hot-path responses" },
      { value: "24/7", label: "call answering" },
      { value: "14+", label: "countries served" },
      { value: "12", label: "business verticals" },
    ],
    problem: [
      "Businesses lose real revenue to the phone. Front desks are busy with customers in the room, after-hours calls roll to voicemail, and every missed call is a missed booking — or a customer who calls the next business instead.",
      "Hiring and training reception to cover that volume is expensive and doesn't scale. Meanwhile callers expect an immediate answer to simple things: opening hours, availability, booking, rescheduling.",
      "An old-school phone tree (\"press 1 for…\") only frustrates people. The bar is a conversation that actually understands and acts.",
    ],
    approach: [
      "An AI voice agent — not an IVR — that picks up, understands intent in natural speech, and takes action: answering FAQs, booking appointments, capturing waitlists, and routing urgent or complex cases to a human.",
      "It's built on Retell AI for low-latency real-time voice, with GPT-4o-mini and Gemini 2.0 Flash driving LLM tool-calling into Supabase and the Google Calendar API. A quick-reply cache short-circuits high-frequency intents to hit sub-100ms response paths.",
      "A Next.js + Supabase dashboard exposes call logs, scheduling, analytics, and billing — secured with PII encryption, Row-Level Security, and webhook-driven automations.",
    ],
    diagram: {
      lanes: [
        {
          title: "Call",
          tag: "realtime",
          nodes: [
            { label: "Inbound call", sub: "caller" },
            { label: "Retell AI", sub: "STT · LLM · TTS" },
            { label: "Quick-reply cache", sub: "<100ms hot paths", accent: true },
            { label: "LLM tool-calling", sub: "GPT-4o-mini · Gemini" },
            { label: "Action", sub: "book · waitlist · escalate", accent: true },
            { label: "Spoken reply", sub: "via Retell" },
          ],
        },
        {
          title: "Platform",
          tag: "config",
          nodes: [
            { label: "Next.js dashboard", sub: "logs · scheduling · billing" },
            { label: "Supabase", sub: "RLS · PII encryption" },
            { label: "Google Calendar", sub: "appointment sync" },
            { label: "Webhooks", sub: "automations" },
          ],
        },
      ],
      note: "Tool-calling writes through to Supabase and Google Calendar; urgent or complex calls are escalated to a human.",
    },
    build: [
      "Integrated Retell AI for natural, low-latency voice and wired its webhooks into LLM tool-calling with GPT-4o-mini and Gemini 2.0 Flash.",
      "Built intent handling — appointment booking, waitlist capture, and human escalation — backed by Supabase and the Google Calendar API.",
      "Added a quick-reply cache for high-frequency intents to hit sub-100ms response paths.",
      "Shipped a Next.js + Supabase dashboard for call logs, scheduling, analytics, and billing — secured with PII encryption, Row-Level Security, and webhook-driven automations.",
    ],
    results: [
      "Every call gets answered — 24/7 — so after-hours and overflow bookings stop leaking to voicemail or competitors.",
      "Quick-reply caching keeps high-frequency intents under 100ms, so the conversation feels immediate rather than laggy.",
      "Deployed across 12 business verticals and 14+ countries, with PII encryption and Row-Level Security guarding customer data.",
    ],
  },

  {
    slug: "goparkeasy",
    title: "GoParkEasy Platform",
    tagline: "Production SaaS parking platform",
    outcome:
      "A production-grade SaaS parking platform — 450+ REST APIs across a 51-collection schema, 5+ role-based access tiers, and a real-time availability engine processing 100 events every 5 seconds.",
    role: "Full-Stack Engineer · GoParkEasy",
    timeline: "Aug 2025 – Nov 2025",
    badge: "Production",
    stack: ["Next.js 15", "Node.js", "MongoDB", "Redis Streams", "Socket.io", "Puppeteer"],
    demo: "#", // TODO: add GoParkEasy live URL if public
    github: null,
    proprietary: true,
    metrics: [
      { value: "450+", label: "REST APIs" },
      { value: "51", label: "collection schema" },
      { value: "5+", label: "role-based tiers" },
      { value: "+15%", label: "operational throughput" },
    ],
    problem: [
      "Running parking operations at scale means a lot of moving parts — bookings, availability, check-ins, payments, and multiple kinds of users (customers, valets, operators, admins) who each need a different view and different permissions.",
      "It needed to be built from the ground up as a real product, not a prototype: a coherent data model, hundreds of endpoints, and access control that holds up across roles.",
      "And availability had to feel live. A spot that's already taken can't still show as free, so status had to propagate in real time rather than on a polling delay.",
    ],
    approach: [
      "I architected the platform on Next.js 15, Node.js, and MongoDB — defining a 51-collection schema and delivering 450+ REST APIs with 5+ role-based access tiers so each user type only sees and does what they should.",
      "A real-time availability engine built on Redis Streams and Socket.io pushes status changes to clients as they happen, processing roughly 100 events every 5 seconds.",
      "Check-in runs through a QR-based system generated with Puppeteer, and I resolved MongoDB indexing bottlenecks across the 51 collections to keep queries fast as the data grew.",
    ],
    diagram: {
      lanes: [
        {
          title: "Platform",
          tag: "core",
          nodes: [
            { label: "Next.js 15 app", sub: "client + SSR" },
            { label: "Node API layer", sub: "450+ REST endpoints" },
            { label: "Role-based access", sub: "5+ tiers", accent: true },
            { label: "MongoDB", sub: "51-collection schema" },
          ],
        },
        {
          title: "Realtime",
          tag: "live",
          nodes: [
            { label: "Availability events", sub: "~100 / 5s" },
            { label: "Redis Streams", sub: "event log" },
            { label: "Socket.io", sub: "push to clients", accent: true },
            { label: "QR check-in", sub: "Puppeteer-generated" },
          ],
        },
      ],
      note: "Indexing tuned across 51 collections to keep queries fast; availability propagates over Redis Streams instead of polling.",
    },
    build: [
      "Designed a 51-collection MongoDB schema and delivered 450+ REST APIs on Next.js 15 and Node.js, with 5+ role-based access tiers enforced across endpoints.",
      "Built a real-time availability engine with Redis Streams and Socket.io processing ~100 events every 5 seconds, eliminating polling.",
      "Shipped a QR-based check-in system generated with Puppeteer.",
      "Profiled and resolved MongoDB indexing bottlenecks across the 51 collections, boosting operational throughput by 15%.",
    ],
    results: [
      "A production SaaS platform with 450+ REST APIs and role-based access that scales across customers, valets, and operators.",
      "Availability stays live via Redis Streams and Socket.io, so customers never book a spot that's already gone.",
      "Indexing work boosted operational throughput by 15%, and the platform became the foundation the ParkBuddy assistant now runs on top of.",
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
