import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"

export const alt = "Case study — Swayam Patil"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  const clash = await readFile(join(process.cwd(), "app/fonts/ClashDisplay-Bold.ttf"))

  const title = cs?.title ?? "Case study"
  const tagline = cs?.tagline ?? ""
  const metric = cs?.metrics?.[0]?.value ?? ""
  const metricLabel = cs?.metrics?.[0]?.label ?? ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0D0D0F",
          color: "#F5F3EC",
          fontFamily: "Clash",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: "#C8FF00",
                color: "#0D0D0F",
                fontSize: 24,
              }}
            >
              SP
            </div>
            <div style={{ fontSize: 26 }}>Swayam Patil</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#A0A0A8" }}>CASE STUDY</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 100, lineHeight: 1 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 34, color: "#A0A0A8" }}>{tagline}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {metric ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                backgroundColor: "#C8FF00",
                color: "#0D0D0F",
                padding: "10px 22px",
                borderRadius: 10,
                fontSize: 36,
              }}
            >
              <span>{metric}</span>
              <span style={{ fontSize: 22 }}>{metricLabel}</span>
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash", data: clash, weight: 700, style: "normal" }],
    },
  )
}
