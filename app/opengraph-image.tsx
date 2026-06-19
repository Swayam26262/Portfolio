import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const alt = "Swayam Patil — Full-Stack & AI Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const clash = await readFile(join(process.cwd(), "app/fonts/ClashDisplay-Bold.ttf"))

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#C8FF00",
              color: "#0D0D0F",
              fontSize: 26,
            }}
          >
            SP
          </div>
          <div style={{ fontSize: 28 }}>Swayam Patil</div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
            fontSize: 92,
            lineHeight: 1.02,
          }}
        >
          <span>Full-Stack &</span>
          <span
            style={{
              backgroundColor: "#C8FF00",
              color: "#0D0D0F",
              padding: "0 18px",
              borderRadius: 10,
            }}
          >
            AI Engineer
          </span>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#A0A0A8" }}>
          RAG chatbots · voice AI agents · production SaaS
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash", data: clash, weight: 700, style: "normal" }],
    },
  )
}
