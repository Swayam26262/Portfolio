"use client"

import { useRef } from "react"

/**
 * Subtle 3D tilt toward the cursor on fine-pointer devices. No-ops on touch and
 * under reduced motion. Applies its transform to its own element, so it must not
 * share an element with Tailwind transform utilities (wrap, don't merge).
 */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
