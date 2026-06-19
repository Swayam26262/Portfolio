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
      "A production RAG assistant that autonomously resolves 60–70% of Tier-1 support queries — right inside WhatsApp, where customers already are.",
    role: "Full-Stack & AI Engineer · GoParkEasy",
    timeline: "2024 – 2025", // TODO: confirm exact dates
    badge: "Production",
    stack: [
      "Node.js",
      "MongoDB Atlas Vector Search",
      "Gemini API",
      "AiSensy",
      "WhatsApp API",
      "BullMQ",
      "Redis",
    ],
    demo: "#", // TODO: add a case-study demo / recording link if available
    github: null,
    proprietary: true,
    metrics: [
      { value: "60–70%", label: "Tier-1 queries auto-resolved" },
      { value: "24/7", label: "autonomous coverage" },
      { value: "↓ load", label: "on the support team" },
      { value: "WhatsApp", label: "native channel" },
    ],
    problem: [
      "GoParkEasy's support inbox was dominated by repetitive Tier-1 questions — pricing, how-to-book, location and timing queries, refund status. The answers already existed in the help material; agents were spending their day retyping them.",
      "That work didn't scale. Response times stretched during peak hours, the load grew with every new user, and skilled agents were stuck on questions a machine could answer — instead of the genuinely hard cases that need a human.",
      "Customers also weren't on a support portal. They were on WhatsApp. Any solution had to meet them there.",
    ],
    approach: [
      "A scripted decision-tree bot would be brittle and frustrating; a raw LLM would hallucinate confidently about pricing and policies — the worst possible failure mode for support. So I built a Retrieval-Augmented Generation (RAG) pipeline that grounds every answer in GoParkEasy's actual help corpus.",
      "Incoming questions are embedded and matched against a vector index of the knowledge base; the most relevant passages are retrieved and handed to Gemini as context, which composes a natural, on-brand reply. When confidence is low or the question falls outside scope, the bot escalates to a human instead of guessing.",
      "The whole thing lives on WhatsApp via the AiSensy API, and anything heavy or non-blocking (ingestion, logging, follow-up jobs) runs off the request path through a BullMQ queue.",
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
            { label: "AiSensy webhook", sub: "→ Node backend" },
            { label: "Embed query", sub: "Gemini embeddings" },
            { label: "Vector search", sub: "top-k retrieval", accent: true },
            { label: "Gemini synthesis", sub: "answer + guardrails", accent: true },
            { label: "Reply", sub: "via AiSensy → WhatsApp" },
          ],
        },
      ],
      note: "BullMQ + Redis keep ingestion, logging, and follow-up jobs off the request path, so replies stay fast under load.",
    },
    build: [
      "Chunked the knowledge base into retrieval-friendly passages and embedded them into a MongoDB Atlas Vector Search index — keeping vectors next to the operational data instead of standing up a separate vector DB.",
      "On each message: embed the query, run top-k vector retrieval, and construct a context-grounded prompt with explicit guardrails — answer only from retrieved context, and escalate rather than speculate.",
      "Integrated the AiSensy WhatsApp API for inbound webhooks and outbound replies, so the assistant runs in the channel customers already use.",
      "Offloaded ingestion, logging, and follow-up work to a BullMQ pipeline backed by Redis, keeping the reply path responsive.",
    ],
    results: [
      "60–70% of Tier-1 queries are now resolved autonomously, freeing the support team to focus on the complex cases that actually need them.",
      "Coverage is 24/7 and consistent — every customer gets the same accurate, on-brand answer, instantly, at any hour.",
      "Because answers are grounded in the live help corpus, the system improves simply by improving the docs — and unresolved questions become a roadmap for what to add next.",
    ],
  },

  {
    slug: "heyreeva",
    title: "HeyReeva",
    tagline: "AI voice agent SaaS for clinics",
    outcome:
      "A co-founded AI voice agent that answers clinic calls, books appointments, and handles FAQs autonomously — built for US dental, aesthetic, and veterinary practices.",
    role: "Co-Founder & Engineer",
    timeline: "2025 – Present", // TODO: confirm start date
    badge: "Co-Founded",
    stack: ["Next.js", "Node.js", "Retell AI", "MongoDB", "Razorpay"],
    demo: "#", // TODO: add HeyReeva live URL
    github: "#", // TODO: add repo link or remove if private
    metrics: [
      { value: "24/7", label: "call answering" },
      { value: "3", label: "clinic verticals" },
      { value: "Voice", label: "first, not forms" },
      { value: "US", label: "target market" },
    ],
    problem: [
      "Clinics lose real revenue to the phone. Front desks are busy with patients in the room, after-hours calls roll to voicemail, and every missed call is a missed booking — or a patient who calls the next clinic instead.",
      "Hiring and training reception to cover that volume is expensive and doesn't scale. Meanwhile patients expect an immediate answer to simple things: opening hours, availability, pricing, rescheduling.",
      "An old-school phone tree (\"press 1 for…\") only frustrates people. The bar is a conversation that actually understands and acts.",
    ],
    approach: [
      "HeyReeva is an AI voice agent — not an IVR — that picks up, understands intent in natural speech, and takes action: answering FAQs, booking and rescheduling appointments, and routing urgent or complex cases to a human.",
      "It's built on Retell AI for low-latency real-time voice (speech-to-text → LLM → text-to-speech), with a Node backend handling scheduling and business logic, per-clinic configuration, and MongoDB for data. Clinics manage hours, services, and FAQs from a Next.js dashboard; billing runs through Razorpay.",
      "Each clinic gets its own knowledge and calendar, so answers are specific and bookings land in the right place.",
    ],
    diagram: {
      lanes: [
        {
          title: "Call",
          tag: "realtime",
          nodes: [
            { label: "Patient call", sub: "inbound" },
            { label: "Retell AI", sub: "STT · LLM · TTS" },
            { label: "Webhook → backend", sub: "Node" },
            { label: "Intent routing", sub: "book · FAQ · escalate", accent: true },
            { label: "Action", sub: "schedule / answer", accent: true },
            { label: "Spoken reply", sub: "via Retell" },
          ],
        },
        {
          title: "Platform",
          tag: "config",
          nodes: [
            { label: "Clinic dashboard", sub: "Next.js" },
            { label: "Config + knowledge", sub: "hours · services · FAQs" },
            { label: "MongoDB", sub: "tenants & bookings" },
            { label: "Razorpay", sub: "subscriptions" },
          ],
        },
      ],
      note: "Multi-tenant: per-clinic knowledge and calendars; genuinely hard or urgent calls are warm-transferred to a human.",
    },
    build: [
      "Integrated Retell AI for natural, low-latency voice and wired its webhooks into a Node backend.",
      "Built intent handling with function-calling into scheduling logic — book, reschedule, cancel — plus a per-clinic FAQ knowledge base for grounded answers.",
      "Shipped a Next.js dashboard for clinics to configure hours, services, and responses, backed by a multi-tenant MongoDB model.",
      "Added Razorpay for subscription billing and an escalation path that hands off to a human when confidence is low.",
    ],
    results: [
      "Every call gets answered — 24/7 — so after-hours and overflow bookings stop leaking to voicemail or competitors.",
      "Front-desk staff are freed from repetitive calls to focus on in-clinic patients, while callers get a consistent, on-brand experience.",
      "An early-stage, co-founded venture: the focus now is onboarding US clinics across dental, aesthetic, and veterinary verticals.",
    ],
  },

  {
    slug: "goparkeasy",
    title: "GoParkEasy WhatsApp Bot",
    tagline: "10-step WhatsApp booking flow",
    outcome:
      "A conversational WhatsApp flow that takes a live parking startup's customers from request to paid, confirmed booking — fuel type, payment, and webhook-verified confirmation, all in chat.",
    role: "Full-Stack & AI Engineer · GoParkEasy",
    timeline: "2024 – 2025", // TODO: confirm dates
    badge: "Production",
    stack: ["Node.js", "AiSensy", "WhatsApp API", "Razorpay", "BullMQ", "Redis", "MongoDB"],
    demo: null,
    github: null,
    proprietary: true,
    metrics: [
      { value: "10-step", label: "guided booking flow" },
      { value: "Live", label: "real customers" },
      { value: "Razorpay", label: "in-chat payments" },
      { value: "0-install", label: "lives in WhatsApp" },
    ],
    problem: [
      "Booking parking through a separate app or web form adds friction at exactly the wrong moment — when someone is mobile, in a hurry, and just wants a spot.",
      "Customers were already on WhatsApp. The flow needed to collect booking details, take a real payment, and confirm reliably — without ever leaving the chat.",
      "And it had to stay responsive during demand spikes, where slow confirmations or dropped jobs would directly cost bookings.",
    ],
    approach: [
      "I built a stateful conversational flow over WhatsApp (via the AiSensy API) that guides each customer through a 10-step booking — vehicle and fuel type, slot details, payment, and confirmation — with validation and the ability to go back a step.",
      "Payment happens in-chat through a Razorpay link, and a booking is only finalized after the Razorpay webhook verifies the payment — so confirmations are trustworthy, not optimistic.",
      "Anything that doesn't need to block the reply — notifications, status updates, the valet dashboard feed — runs through a BullMQ pipeline on Redis, keeping the conversation snappy under load.",
    ],
    diagram: {
      lanes: [
        {
          title: "Booking",
          tag: "realtime",
          nodes: [
            { label: "Customer", sub: "WhatsApp" },
            { label: "AiSensy webhook", sub: "→ Node" },
            { label: "10-step state machine", sub: "fuel · slot · details" },
            { label: "Razorpay link", sub: "in-chat payment" },
            { label: "Payment webhook", sub: "verify before confirm", accent: true },
            { label: "Confirmed", sub: "reply in chat" },
          ],
        },
        {
          title: "Async",
          tag: "off the request path",
          nodes: [
            { label: "BullMQ workers", sub: "Redis-backed" },
            { label: "Notifications", sub: "status updates" },
            { label: "Valet dashboard", sub: "Redis Streams · Socket.io", accent: true },
          ],
        },
      ],
      note: "Conversation state is persisted per user; bookings are finalized only after webhook-verified payment.",
    },
    build: [
      "Designed a 10-step conversational state machine with per-step validation and back-navigation, persisted per conversation.",
      "Integrated the AiSensy WhatsApp API for inbound webhooks and outbound messages, including Razorpay payment links inside the chat.",
      "Verified payments through the Razorpay webhook before finalizing a booking — no confirmation without confirmed payment.",
      "Offloaded notifications, status updates, and the real-time valet dashboard (Redis Streams + Socket.io) to a BullMQ pipeline so the booking path stays fast.",
    ],
    results: [
      "Customers complete a full booking and payment without installing anything or leaving WhatsApp — friction that used to lose bookings is gone.",
      "Webhook-verified payments make confirmations reliable, and the async pipeline keeps the flow responsive during spikes.",
      "Running in production for a live parking startup, alongside the ParkBuddy support assistant.",
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
