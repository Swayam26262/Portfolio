"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Animates the leading number of a value when it scrolls into view, preserving
 * any prefix-free suffix (e.g. "60–70", "1.5+", "24/7", "10-step"). Values with
 * no leading number (e.g. "Voice", "WhatsApp") render statically. Respects
 * prefers-reduced-motion and avoids SSR hydration mismatches.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!match || reduce) {
      setDisplay(value)
      return
    }

    const target = parseFloat(match[1])
    const suffix = match[2]
    const decimals = match[1].includes(".") ? 1 : 0
    const zero = (0).toFixed(decimals)
    setDisplay(zero + suffix)

    const el = ref.current
    if (!el) {
      setDisplay(value)
      return
    }

    let raf = 0
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        obs.disconnect()
        const duration = 1100
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay((target * eased).toFixed(decimals) + suffix)
          if (p < 1) raf = requestAnimationFrame(tick)
          else setDisplay(match[1] + suffix)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
