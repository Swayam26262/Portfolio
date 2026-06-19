"use client"

import { useRef } from "react"

/**
 * Wraps an interactive element and eases it toward the cursor (magnetic effect)
 * on fine-pointer devices only. No-ops on touch and under reduced motion, and
 * keeps layout identical to an unwrapped element via the passed className.
 */
export function MagneticButton({
  children,
  className,
  strength = 16,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
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
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
